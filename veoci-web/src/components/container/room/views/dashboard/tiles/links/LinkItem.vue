<template>
  <v-list-item
    class="linkItem__item"
    :theme="dark ? 'dark' : ''"
    :disabled="disabled"
    tag="li"
    :class="[
      `linkItem__item--${displayStyle}`,
      options && options.iconPosition ? 'linkItem__item--' + options.iconPosition : ''
    ]"
    :style="displayStyle === 'BUTTON' || displayStyle === 'IMAGE' ? computedStyle : ''"
    tabindex="-1"
    density="compact"
    @click.capture="processLink($event)"
  >
    <v-progress-circular
      v-if="showLoader"
      :size="20"
      color="primary"
      indeterminate
    />
    <template
      v-else
    >
      <v-icon
        v-if="options && options.icon"
        :style="computedIconColor"
        class="linkItem__icon"
      >
        {{ options.icon }}
      </v-icon>
      <template v-if="link.label || (!link.label && displayStyle === 'IMAGE')">
        <a
          v-if="href && !disabled && (typeof href === 'string' || href.rawLink) && href !== 'IMITATION_LINK'"
          :target="newWindow ? '_blank' : ''"
          :href="typeof href === 'string' ? href : href.rawLink"
          :title="link.label || link.url"
          :class="options && options.icon ? 'linkItem__link--icon' : ''"
          class="linkItem__link"
          tabindex="0"
        >
          <v-img
            v-if="displayStyle === 'IMAGE'"
            :lazy-src="imageSource"
            :src="imageSource"
            :alt="imageSource"
            :height="options.height"
            :width="options.width"
            class="imageBlock__image"
            max-height="100%"
            max-width="100%"
          >
            <template #placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                />
              </v-row>
            </template>
          </v-img>

          <span v-else>
            {{ link.label || link.url }}
          </span>
        </a>
        <span
          v-else-if="href === 'IMITATION_LINK'"
          tabindex="0"
          class="linkItem__link linkItem__link--imitation-text"
        >
          {{ link.label || link.url }}
        </span>
        <router-link
          v-else
          :to="href"
          :target="link.newWindow || (typeof href === 'string' && href !== 'IMITATION_LINK') ? '_blank' : ''"
          :title="link.label || link.url"
          :class="options && options.icon ? 'linkItem__link--icon' : ''"
          class="linkItem__link"
        >
          <v-img
            v-if="displayStyle === 'IMAGE'"
            :lazy-src="imageSource"
            :src="imageSource"
            :alt="imageSource"
            :height="options.height"
            :width="options.width"
            class="imageBlock__image"
            max-height="100%"
            max-width="100%"
          >
            <template #placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                />
              </v-row>
            </template>
          </v-img>

          <span v-else>
            {{ link.label || link.url }}
          </span>
        </router-link>
      </template>
    </template>

    <side-room-starter-dialog
      v-if="link.linkAction === 'CREATE_SIDEROOM'"
      :open="showSideRoomDialog"
      launch-type="SIDEROOM"
      :target-plan="null"
      :target-group="link.group"
      :target-container="link.fullContainerInfo || container"
      member-access
      @close="showSideRoomDialog = false"
    />
  </v-list-item>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { localStorageStore, sessionStorageStore, sessionStorageRemove } from '@/assets/js/utils'
  import { generateRouteFromLink } from '@/assets/js/utils/routeUtils'
  import SideRoomStarterDialog from '@/components/structure/mega-menu/rooms/room-starter/SideRoomStarterDialog'
  import _ from 'lodash'
  import OrgMixin from '@/components/container/org/mixins/OrgMixin'
  import { generatePageRoute } from '@shared/utils/pageUtils'
  import { emitter } from '@/shared-boot'

  export default {
    name: 'LinkItem',

    components: {
      SideRoomStarterDialog
    },

    mixins: [OrgMixin],

    props: {
      link: {
        type: Object,
        required: true
      },

      containerId: {
        type: String,
        default: ''
      },

      widgetProps: {
        type: Object,
        required: true
      },

      disabled: {
        type: Boolean,
        default: false
      },

      publicKey: {
        type: String,
        default: ''
      },

      imageSource: {
        type: String,
        default: ''
      },

      dark: {
        type: Boolean,
        default: false
      },

      details: {
        type: Object,
        default: null
      },

      defRoomTasktype: {
        type: String,
        default: null
      },

      displayStyle: {
        type: String,
        default: 'LINKS'
      },

      options: {
        type: Object,
        default: null
      },

      readOnly: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        showLoader: false,
        showSideRoomDialog: false,
        newLink: this.link,
        resolvingSideroomLink: false
      }
    },

    computed: {
      ...mapState('authdUser', ['user']),
      ...mapGetters('container', ['container']),

      imitationLink () {
        const action = this.link.linkAction

        return (
          action === 'CREATE_TASK' ||
          action === 'REQUEST_CHECK_IN' ||
          action === 'LAUNCH_PLAN_OBJECTS' ||
          action === 'LAUNCH_PLAN' ||
          action === 'PRINT_FORM_ENTRIES' ||
          action === 'NAVIGATE_TO_SIDEROOM' ||
          action === 'CREATE_SIDEROOM'
        )
      },

      createLink () {
        switch (this.link.linkAction) {
          case 'CREATE_TASK':
          case 'CREATE_WORKFLOW':
          case 'CREATE_FORM_ENTRY':
          case 'REQUEST_CHECK_IN':
            return !this.link.newWindow
          case 'OBJECT_MANUAL':
            return true
          case 'NONE': // plain link builder
            return !!(this.link?.url)
          default:
            return false
        }
      },

      newWindow () {
        // Files are, well, files, so we always open them in a new window
        return this.link.newWindow || this.link.linkAction === 'FILE_LINK'
      },

      linkContainerId () {
        const linkObj = this.link
        const properties = this.widgetProps
        const dynamicOption = linkObj.dynamicContainer || linkObj.dynamicParentContainer

        let linkContainerId = ''

        if (dynamicOption) {
          if (linkObj.dynamicContainer) {
            linkContainerId = properties.widgetContainerId || this.containerId
          } else if (linkObj.dynamicParentContainer) {
            // linkContainerId = properties.widgetParentContainerId || view.model.get('dashboard').get('container').parentContainerId
            linkContainerId = properties.widgetParentContainerId || this.containerId // TODO: figure out how to get the parent ID
          } else {
            linkContainerId = this.containerId
          }
        } else {
          linkContainerId = linkObj.container
        }
        return linkContainerId
      },

      iconPos () {
        switch (this.options?.iconPosition) {
          case 'right':
            return 'flex-row-reverse'
          case 'top':
            return 'flex-column'
          case 'bottom':
            return 'flex-column flex-column-reverse'
          default:
            return ''
        }
      },

      href () {
        const linkObj = this.link
        let linkAction = linkObj.linkAction
        const linkObjectId = linkObj.linkObject || linkObj.createObj // legacy

        if (!linkAction) {
          // legacy data
          const createType = linkObj.createType
          switch (createType) {
            case 'FORM':
              linkAction = 'CREATE_FORM_ENTRY'
              break
            case 'WORKFLOW':
              linkAction = 'CREATE_WORKFLOW'
              break
            case 'TASK':
              linkAction = 'CREATE_TASK'
              break
          }
        }

        let link
        // render the individual links
        switch (linkAction) {
          case 'CREATE_TASK':
          case 'REQUEST_CHECK_IN':
          case 'LAUNCH_PLAN_OBJECTS':
          case 'LAUNCH_PLAN':
          case 'PRINT_FORM_ENTRIES':
          case 'NAVIGATE_TO_SIDEROOM':
          case 'CREATE_SIDEROOM':
            link = 'IMITATION_LINK'
            break
          case 'PAGE_LINK':
            link = generatePageRoute(linkObj.page, 'LINK')
            break
          default:
            const url = linkObj.url
            link = generateRouteFromLink(linkAction, {
              ...this.link,
              containerId: this.linkContainerId,
              objectId: linkObjectId,
              url,
              savedViewKey: linkObj.savedViewKey
            })
            // External URLs MUST have a target
            if (!link) {
              link = url
            }
            break
        }

        return link
      },

      computedStyle () {
        if (!this.options) {
          console.log('no options')
        }

        let style = ''

        if (this.options.backgroundColor) {
          style += `background: ${this.options.backgroundColor};`
        }
        if (this.options.textColor) {
          style += `color: ${this.options.textColor};`
        }
        if (this.options.borderColor || this.options.borderWidth) {
          style += `border: ${this.options.borderWidth || 1}px solid ${this.options.borderColor || 'black'};`
        }
        style += `flex: ${this.options.flexGrow} ${this.options.flexShrink} auto;`
        return style
      },

      computedIconColor () {
        let style = ''
        if (this.options.iconColor) {
          style += `color: ${this.options.iconColor};`
        }
        return style
      }
    },
    async beforeMount () {
      if (this.link?.url?.includes('://')) {
        // Remove the extra '://' substring for corrupted urls.
        const url = this.link.url.replace('://', '')
        /* eslint-disable */
        this.link.url = url.includes('://') ? url : this.link.url
        /* eslint-enable */
      }
    },
    methods: {
      processLink (e) {
        e.preventDefault()
        // read only buttons
        if (this.readOnly) {
          return
        }

        e.stopPropagation()
        const newWindow = this.imitationLink ? false : this.link.newWindow
        if ((this.disabled || this.href === 'IMITATION_LINK' || typeof this.href === 'object' || this.createLink) &&
          ((this.link.linkAction === 'PRINT_FORM_ENTRIES' || this.link.linkAction === 'CREATE_SIDEROOM' || this.link.linkAction === 'NAVIGATE_TO_SIDEROOM') || !newWindow)) {
          // if an action ID is defined on the link, we need to ensure the action handler is always fired
          // unfortunately, this is different from how classic works.  We're going to have some
          // backwards compatibility issues here.
          let actionType = this.link.linkAction
          if (this.link.actionid) {
            actionType = 'OBJECT_MANUAL'
          }

          const supportPublicLinks = {
            NONE: true,
            CREATE_FORM_ENTRY: true,
            CREATE_WORKFLOW: true,
            NAVIGATE_RESOURCE_TIMELINE: true,
            FILE_LINK: true,
            PAGE_LINK: true,
          }

          if (this.disabled || (this.publicKey && !this.user && !supportPublicLinks[actionType])) {
            return // this is disabled on the template
          }
          switch (actionType) {
            case 'NONE':
            case 'FILE_LINK':
              try {
                let route
                if (this.link.linkObject) {
                  route = `/v/o/${this.link.linkObject}`
                } else if (actionType === 'NONE') {
                  route = this.link.url
                }
                if (actionType === 'FILE_LINK' && this.publicKey && this.link.publicInfo) {
                  route = Array.isArray(this.link.publicInfo) ? this.link.publicInfo[0].url : this.link.publicInfo.url
                }
                window.open(route, '_blank')
              } catch (e) {
              }
              return
            case 'OBJECT_MANUAL':
              this.showLoader = true
              let linkContainer
              if (this.link?.dynamicContainer && !this.link?.dynamicParentContainer) {
                linkContainer = this.containerId
              } else if (!this.link?.dynamicContainer && this.link?.dynamicParentContainer) {
                linkContainer = this.widgetParentContainerId
              } else {
                linkContainer = this.link?.container
              }
              const linkObject = this.link?.linkAction === 'CREATE_TASK' ? this.link?.formId : this.link?.linkObject
              this.$veocijs.api.v2.Object.id().actions.evaluate({
                actionId: this.link.actionid,
                parentId: linkObject,
                containerId: linkContainer
              }).then((result) => {
                // Workflow Action
                if (result.workItems) {
                  if (!result.process?.id) {
                    return // nothing we can do here if the server doesn't return the workflow object
                  }
                  this.$workflowDialog('show', {
                    containerId: result.container?.id || linkContainer,
                    workflowId: result.process.id,
                    entryObject: result,
                    onEntrySubmitted: function () {
                      this.$notification({
                        msg: this.$t(this.$vtrans.WORKFLOW_ENTRY_CREATED),
                        theme: 'success',
                        timeout: 5000
                      })
                    }.bind(this)
                  })
                  return
                }

                if (result.objectType === 'TASK') {
                  const placeholder = _.find(result.values, value => value.fieldType === 'PLACEHOLDER')
                  this.$taskDialog('show', {
                    containerId: result.container?.id || linkContainer,
                    taskTypeId: placeholder.data.value.category?.categoryId,
                    taskId: 'create',
                    task: result,
                    enableTaskTypeSelect: false,
                    onEntrySubmitted: function () {
                      this.$notification({
                        msg: this.$t(this.$vtrans.TASK_CREATED_SUCCESSFULLY),
                        theme: 'success',
                        timeout: 5000
                      })
                    }.bind(this)
                  })
                  return
                }

                this.$formDialog('show', {
                  containerId: result.container?.id || linkContainer,
                  formId: result.formId,
                  entryObject: result,
                  onEntrySubmitted: function () {
                    this.$notification({
                      msg: this.$t(this.$vtrans.FORM_ENTRY_CREATED),
                      theme: 'success',
                      timeout: 5000
                    })
                  }.bind(this)
                })
              }).catch((error) => {
                this.$vError({ error })
              }).finally(() => {
                this.showLoader = false
              })
              break
            case 'LAUNCH_PLAN':
              emitter.emit('showRoomDialog', { action: 'PLAN', plan: this.link.plan, group: this.link.plan.group })
              break
            case 'LAUNCH_PLAN_OBJECTS':
              emitter.emit('showLaunchObjectsDialog')
              break
            case 'CREATE_TASK':
              let groupDetails
              this.showLoader = true
              const groupId = this.details?.group
              if (groupId) {
                this.$veocijs.api.v1.Container.id(`${groupId}`).getDetails({ getContainerSettings: true }).then(response => {
                  groupDetails = response
                }).catch((error) => {
                  this.$vError({ error })
                }).finally(() => {
                  const defGroupTT = (groupDetails?.settings && groupDetails.settings['task.category.default']) || null
                  this.showLoader = false
                  this.showCreateTaskDialog(defGroupTT)
                })
              } else {
                this.showLoader = false
                this.showCreateTaskDialog()
              }
              break
            case 'CREATE_WORKFLOW':
              if (this.link.linkObject || this.link.createObj) {
                if (!this.user && this.publicKey) {
                  this.$router.push(this.href)
                } else {
                  this.$workflowDialog('show', {
                    containerId: this.linkContainerId?.toString(),
                    workflowId: this.link.linkObject?.toString() || this.link.createObj?.toString(),
                  })
                }
              }
              break
            case 'PRINT_FORM_ENTRIES':
              const data = {
                time: new Date().getTime()
              }
              if (this.link.savedView) {
                data.jsonFilters = this.link.savedView.state
              }
              localStorageStore(`print_data_${this.link.linkObject}`, JSON.stringify(data))
              // this may look a little bit weird, but we need to do this to
              // be able to open this link from welcome message in homepages
              if (!this.link.printView.route.params.containerId) {
                /* eslint-disable */
                this.link.printView.route.params.containerId = this.link.container
                /* eslint-enable */
              }
              if (this.link.newWindow) {
                const routeData = this.$router.resolve(this.link.printView.route)
                window.open(routeData.href, '_blank')
              } else {
                this.$router.push(this.link.printView.route)
              }
              break
            case 'NAVIGATE_TO_SIDEROOM':
              const planId = this.link.sideRoomInfo.selectedPlan.id
              const roomId = this?.containerId
              const planObjectId = this.link.sideRoomInfo.selectedDashboard ? this.link.sideRoomInfo.selectedDashboard.id : this.link.sideRoomInfo.selectedTemplate.id
              const objectType = this.link.sideRoomInfo.selectedDashboard ? 'DASHBOARD' : 'ROOM'
              // Prevent to trigger multiple calls to the API
              if (!this.resolvingSideroomLink) {
                this.resolvingSideroomLink = true
                this.$veocijs.api.v2.Plan.id(planId).roomData.get(roomId, planObjectId, objectType).then(room => {
                  this.resolvingSideroomLink = false
                  const name = room.planObjectType === 'DASHBOARD' ? 'room/dashboard/members' : 'room/cockpit'
                  const route = {
                    name,
                    params: {
                      containerId: room.chatId
                    },
                  }
                  if (room.planObjectType === 'DASHBOARD') {
                    route.params.dashboardId = room.launchedObjectId
                  }
                  // if the link is pointing to the same route that you're currently on, do nothing
                  if (this.$route.name === route.name && _.isEqual(route.params, this.$route.params)) {
                    return
                  }
                  const routeData = this.$router.resolve(route)
                  window.open(routeData.href, '_blank')
                }).catch(error => {
                  this.resolvingSideroomLink = false
                  this.$vError({ error })
                })
              }
              break
            case 'CREATE_SIDEROOM':
              this.showSideRoomDialog = true
              // Do a return instead of a break statement to prevent to redirect to room cockpit when opening this link
              return
            case 'CREATE_FORM_ENTRY':
              if (this.link.linkObject) {
                if (!this.user && this.publicKey) {
                  this.$router.push(this.href)
                } else {
                  this.$formDialog('show', {
                    containerId: this.linkContainerId.toString(),
                    formId: this.link.linkObject?.toString() || this.link.createObj.toString(),
                    onEntrySubmitted: function () {
                      this.$notification({
                        msg: this.$t(this.$vtrans.FORM_ENTRY_CREATED),
                        theme: 'success',
                        timeout: 5000
                      })
                    }.bind(this)
                  })
                }
              }
              break
            case 'REQUEST_CHECK_IN':
              if (this.link.linkObject) {
                emitter.emit('launchNotification', {
                  containerId: this.linkContainerId.toString(),
                  eventId: this.link.linkObject.toString()
                })
              } else {
                emitter.emit('launchNotification', {
                  containerId: this.linkContainerId.toString()
                })
              }
              break
            case 'NAVIGATE_FORM':
            case 'NAVIGATE_WORKFLOW':
            case 'NAVIGATE_LIST':
            case 'NAVIGATE_TASK':
              this.handleSavedView(this.link)
              this.routeToHref(this.href)
              break
            case 'NAVIGATE_MAP':
            case 'NAVIGATE_ROOM':
            case 'NAVIGATE_DASHBOARD':
            case 'NAVIGATE_CALENDAR':
            case 'NAVIGATE_RESOURCE_TIMELINE':
            case 'NAVIGATE_CARDWALL':
            case 'MY_TASKS':
            case 'MY_PROFILE':
            case 'PAGE_LINK':
              this.routeToHref(this.href)
          }
        } else if (!this.disabled && (typeof this.href === 'string' || this.href.rawLink) && this.href !== 'IMITATION_LINK') {
          // If href is a string, route there
          typeof this.href === 'string' ? window.open(this.href, this.newWindow ? '_blank' : '_self') : window.open(this.href.rawLink, this.newWindow ? '_blank' : '_self')
        } else if (!this.disabled && this.href) {
          // If the href is an object, route there properly (using the router if necessary)
          if (
            this.link.linkAction === 'NAVIGATE_FORM' ||
            this.link.linkAction === 'NAVIGATE_WORKFLOW' ||
            this.link.linkAction === 'NAVIGATE_LIST' ||
            this.link.linkAction === 'NAVIGATE_TASK'
          ) {
            this.handleSavedView(this.link)
          }
          this.routeToHref(this.href)
        }
      },
      handleSavedView (link) {
        let viewType = link.linkAction.replace('NAVIGATE_', '').toLowerCase() + 'Details'
        if (link.linkAction === 'NAVIGATE_TASK') {
          viewType = 'task'
        }
        let storageSavedViewKey = this.$store?.state?.authdUser?.user ? `user.${this.$store.state.authdUser.user.id}.container.${this.link.container}.${viewType}.savedView` : ''

        if (link.linkAction === 'NAVIGATE_LIST') {
          storageSavedViewKey = this.$store?.state?.authdUser?.user ? `user.${this.$store.state.authdUser.user.id}.list.${this.link.linkObject}.${viewType}.savedView` : ''
        }

        sessionStorageRemove(storageSavedViewKey)

        if (storageSavedViewKey) {
          sessionStorageStore(storageSavedViewKey, link.savedViewKey)
        }
      },
      routeToHref (href) {
        if (this.newWindow) {
          const routeData = this.$router.resolve(href)
          window.open(routeData.href, '_blank')
        } else {
          this.$router.push(href)
        }
      },
      showCreateTaskDialog (defGroupTT = null) {
        let taskTypeId = (!this.link?.linkObject || this.link.linkObject === '0') ? null : this.link.linkObject
        // If there is a def groupTT apply it
        if (!taskTypeId) {
          // give preceednce to the room taskType; if its not there, apply the group default
          taskTypeId = this.defRoomTasktype ? this.defRoomTasktype : defGroupTT || null
        }
        this.$taskDialog('show', {
          containerId: this.linkContainerId.toString(),
          taskTypeId,
          taskId: 'create',
          mode: 'CREATE',
          onEntrySubmitted: function () {
            this.$notification({
              msg: this.$t(this.$vtrans.TASK_CREATED_SUCCESSFULLY),
              theme: 'success',
              timeout: 5000
            })
          }.bind(this)
        })
      },

      iconClass (button) {
        switch (button.iconPosition) {
          case 'right':
            return 'blockButton--right'
          case 'top':
            return 'blockButton--top'
          default:
            return ''
        }
      }
    }
  }
</script>

<style lang="scss">
  .linkItem__item {
    padding: 4px 0;

    .v-list-item {
      height: auto;
    }

    &:focus {
      background-color: $light-gray;
    }
  }

  .linkItem__content.v-list-item__content {
    padding: 0;
  }

  .linksTilePanel__button-preview-list {
    display: flex;
  }

  .linkItem__item--BUTTON.linkItem__item {
    border: 0;
    border-radius: 4px;
    flex: 0 0 auto;
    font-weight: 700;
    list-style-type: none;
    margin: 0 4px 0 0;
    min-width: 180px;
    padding: 16px;
    text-align: center;

    &:last-child {
      margin: 0;
    }

    a.linkItem__button {
      color: inherit;
      text-decoration: none;
    }
  }

  .imageBlock__image {
    z-index: 1;
  }

  .linkItem__content .linkItem__icon {
    color: inherit;
  }
</style>
