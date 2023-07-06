/**
 * Common setup for all jest tests.  This is where you put any mocks that you need to be shared among the different components
 */
import { createVuetify } from 'vuetify/dist/vuetify.esm'
import { VBottomSheet, VDataTable, VSkeletonLoader } from 'vuetify/dist/vuetify-labs.esm'
import VueTestUtils from '@vue/test-utils'
import _ from 'lodash'

import veociJS from '@mock/veociJSMock'

// shut jest up
global.console = {
  ...console,
  info: function () {}
}

// shut even more up on the CI env
if (process.env.CI) {
  global.console = {
    ...console,
    warn: function () {}
  }
}

global.URL.createObjectURL = jest.fn()

// Make sure Vuetify works
// Vue.use(Vuetify)
// Vue.use(Vuex)
// Vue.use(VueObserveVisibility)
// Vue.use(veociUserPrefs)

const veociStandard = {
  dark: false,
  colors: {
    primary: '#1f3d5c',
    secondary: '#14293d',
    'primary-darken-1': '#1a334d',
    accent: '#6699cc',
    white: '#fafafa',
    surface: '#fafafa',
    background: '#0A141F',
    black: '#383838'
  }
}

VueTestUtils.config.global.plugins = [
  createVuetify({
    // components: { VTextField }, // this is needed for the vuetify text field so it knows about the component
    // blueprint: md2,
    theme: {
      defaultTheme: 'veociStandard',
      themes: {
        veociStandard // not sure if this is the way to go but
      },
    },
    defaults: {
      global: {
        density: 'comfortable'
      },
      VBtn: {
        variant: 'flat',
        color: 'primary',
        density: 'comfortable',
        VIcon: {
          color: 'white'
        }
      },
      VList: {
        density: 'comfortable'
      },
      VSelect: {
        itemTitle: 'text'
      },
      VAutocomplete: {
        color: 'black',
        variant: 'filled',
        itemTitle: 'text'
      },
      VSlideGroup: {
        VBtn: {
          density: 'default' // not working yet
        }
      },
      VDataTable: {
        VSelect: {
          itemTitle: 'title'
        },
        VBtn: {
          VIcon: {
            color: 'primary'
          }
        }
      }
    },
    icons: {
      iconfont: 'mdi' // default
    },
    components: {
      VDataTable,
      VSkeletonLoader,
      VBottomSheet
    }
  })
]

VueTestUtils.config.global.stubs = {
  'router-link': true,
  'router-view': true
}

// component shared mocks
VueTestUtils.config.global.mocks = {
  $vtheme: {},
  // GENERALLY, you won't need to have the translation stubs.  However, if you have something that requires a text string,
  // you may need to stub in the translation to get it to work.  For example, FIELD_REQUIRED is necessary for a v-text-field
  // validator, which doesn't like if you pass it undefined
  $vtrans: {
    FIELD_REQUIRED: 'Field Required',
    DRAFT: 'Draft',
    LIVE: 'Live',
    ROOM_MESSAGES: 'Room Messages',
    ROOM_MAP: 'Room Map',
    OPEN_IN_WINDOW: 'open_in_window',
    OPEN_IN_MAIN_WINDOW: 'open_in_main_window',
  },
  $t: jest.fn(key => key),
  $firebase: {
    database () {
      return {
        ref () {
          return {
            on () {
              return null
            },
            off () {}
          }
        }
      }
    }
  },
  $vError: jest.fn(),
  $confirm: jest.fn(),
  $veocijs: veociJS,
  $mockVeocijs: veociJS,
  $notification: jest.fn(),
  $router: {
    push: jest.fn()
  },
  $route: {
    params: {}
  },
  isTest: process.env.JEST_WORKER_ID !== undefined,
  transLoadedKey: true
}

// jquery shim 🤢
global.$ = function () {
  return []
}

global.structuredClone = _.cloneDeep

// bugsnag shim
global.bugsnagClient = {
  notify: jest.fn()
}

document.body.setAttribute('data-app', true)
