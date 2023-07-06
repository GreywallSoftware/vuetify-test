<template>
  <v-list
    :style="blockStyleString"
    class="buttonBlock block"
  >
    <block-label
      :block="block"
    />
    <template v-for="(button) in block.properties.buttons">
      <link-item
        v-if="mode !== 'EDIT'"
        :key="button.uuid"
        :link="button.action"
        :widget-props="{ widgetContainerId: containerId }"
        :options="{
          backgroundColor: button.color,
          textColor: button.textColor,
          icon: button.icon,
          iconPosition: button.iconPosition,
          borderColor: button.borderColor,
          borderWidth: button.borderWidth,
          iconColor: button.iconColor
        }"
        :style="buttonStyle"
        display-style="BUTTON"
      />

      <div
        v-else
        :key="button.uuid"
        class="buttonBlock__edit-wrapper"
      >
        <link-item
          :link="button.action"
          :widget-props="{ widgetContainerId: containerId }"
          :options="{
            backgroundColor: button.color,
            textColor: button.textColor,
            icon: button.icon,
            iconPosition: button.iconPosition,
            borderColor: button.borderColor,
            borderWidth: button.borderWidth,
            iconColor: button.iconColor
          }"
          :style="buttonStyle"
          display-style="BUTTON"
          read-only
        />
      </div>
    </template>

    <v-list-item
      v-if="mode !== 'VIEW' && !disableAdd"
      :aria-label="$t($vtrans.ADD_BUTTON)"
      class="linkItem__item linkItem__item--BUTTON addButton"
      tag="li"
      @click.stop.prevent="$emit('addButton', block)"
    >
      <v-icon class="ml-n1">
        mdi-plus
      </v-icon>
    </v-list-item>
  </v-list>
</template>

<script>
  import BlockMixin from '@/components/container/pages/blocks/BlockMixin'
  import LinkItem from '@/components/container/room/views/dashboard/tiles/links/LinkItem'

  export default {
    name: 'ButtonBlock',
    emits: ['addButton'],

    components: {
      LinkItem
    },

    mixins: [BlockMixin],

    props: {
      disableAdd: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      flexSpacing () {
        if (this.block.properties.direction === 'column') {
          switch (this.block.properties.alignment) {
            case 'left':
              return `align-items: baseline;`
            case 'right':
              return `align-items: end;`
            default:
              return 'align-items: center;'
          }
        } else {
          return `justify-content: ${this.block.properties.alignment};`
        }
      },

      blockStyleString () {
        let style = this.styleString
        style += `flex-direction: ${this.block.properties.direction};${this.flexSpacing}`
        return style
      },

      backgroundColor () {
        return this.block.properties.backgroundColor || ''
      },

      buttonStyle () {
        return this.buttonPadding + this.buttonMargin
      },

      buttonPadding () {
        let padding = ''
        if (this.block.properties.buttonSpacing?.padding) {
          Object.keys(this.block.properties.buttonSpacing.padding).forEach((paddingDir) => {
            padding += `padding-${paddingDir}: ${this.block.properties.buttonSpacing.padding[paddingDir]}px;`
          })
        }

        return padding
      },

      buttonMargin () {
        let margin = ''
        if (this.block.properties.buttonSpacing?.margin) {
          Object.keys(this.block.properties.buttonSpacing.margin).forEach((marginDir) => {
            margin += `margin-${marginDir}: ${this.block.properties.buttonSpacing.margin[marginDir]}px;`
          })
        }

        return margin
      }
    }
  }
</script>

<style lang="scss">
  // button block
  .v-list.buttonBlock.block {
    align-items: center;
    background: none;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }

  .canvasBlock__BUTTON_SET .buttonBlock .v-btn {
    height: 42px;
  }

  .blockButton .v-btn__content {
    display: flex;
  }

  .blockButton .blockButton__icon {
    margin-right: 8px;
  }

  .blockButton.blockButton--top .v-btn__content {
    flex-direction: column;
  }

  .blockButton.blockButton--right .v-btn__content {
    flex-direction: row-reverse;
  }

  .blockButton.blockButton--right .blockButton__icon {
    margin-left: 8px;
    margin-right: 0;
  }

  .canvasBlock__child.canvasBlock__BUTTON_SET {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .buttonBlock {
    @media (max-width: $xsmall-screen) {
      flex-wrap: wrap;
    }

    .linkItem__content.v-list-item__content {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;
      padding: 4px;
    }

    .linkItem__link {
      color: inherit;
      margin-bottom: 0;
      text-decoration: none;
      white-space: normal;
      word-break: break-word;
    }

    .linkItem__icon {
      max-width: 20px;
    }

    .linkItem__link.linkItem__link--icon {
      max-width: calc(100% - 20px);
    }

    .linkItem__item {
      margin: 4px;
      padding: 8px;

      @media (max-width: $xsmall-screen) {
        width: 100%;
      }
    }
  }

  .buttonBlock__edit-wrapper {
    position: relative;
  }

  .blockMenu--button {
    bottom: -20px;
    position: absolute;
  }

  .buttonBlock__edit-wrapper:hover .blockMenu--button {
    display: flex;
  }

  .linkItem__item--BUTTON.addButton {
    min-width: 0;
    width: 50px;
  }

  .linkItem__item--BUTTON.addButton:hover {
    background-color: $light-gray;
  }

  .canvasGrid--dark .linkItem__item--BUTTON {
    background-color: $off-white;
  }
</style>
