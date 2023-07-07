<template>
  <v-menu
    v-model="colorEditing"
    :close-on-content-click="false"
    content-class="color-picker"
    location="top"
    class="pl-1"
  >
    <template #activator="{ props }">
      <v-btn
        v-if="selectorStyle === 'BUTTON'"
        v-bind="props"
        :disabled="disableButton"
        :color="color"
        :style="`background-color: ${color}; border: 1px solid grey;`"
        variant="text"
      >
        <slot name="activatorContent" />
      </v-btn>

      <v-text-field
        v-if="selectorStyle === 'SELECT'"
        ref="colorSelect"
        v-model="hexColor"
        :disabled="disableButton"
        :placeholder="color || $t($vtrans.NO_COLOR)"
        :rules="rules"
        maxlength="7"
        class="colorSelect"
        density="compact"
        variant="outlined"
        @keydown.enter="colorEditing = !colorEditing"
        @keydown.stop="handleKeydown"
      >
        <template
          #prepend-inner
        >
          <v-icon
            :color="color || '#FFFFFF'"
            class="elevation-1 rounded-circle"
          >
            mdi-checkbox-blank-circle
          </v-icon>
        </template>
        <template #append>
          <v-btn
            v-bind="props"
            :title="$t($vtrans.SELECT_COLOR)"
            icon
            variant="text"
            size="large"
          >
            <v-icon
              color="primary"
            >
              mdi-palette
            </v-icon>
          </v-btn>
        </template>

        <template
          v-if="clearable && color"
          #append-inner
        >
          <v-btn
            :title="$t($vtrans.CLEAR_COLOR)"
            icon
            variant="text"
            size="small"
            @click.prevent.stop="clearColor"
          >
            <v-icon
              color="primary"
            >
              mdi-close
            </v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </template>

    <v-card
      width="225"
    >
      <v-toolbar
        density="compact"
      >
        <strong class="pl-3">
          {{ $t($vtrans.COLOR_PICKER) }}
        </strong>
        <v-spacer />
        <v-btn
          :title="$t($vtrans.CLOSE)"
          variant="text"
          icon
          size="small"
          @click="colorEditing = false"
        >
          <v-icon
            color="primary"
          >
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>

      <color-selector
        v-model="selectedColor"
      />
    </v-card>
  </v-menu>
</template>

<script lang="ts">
  import { Chrome } from '@ckpack/vue-color'
  import { conv } from 'color-shorthand-hex-to-six-digit'

  export default {
    name: 'ColorPicker',

    emits: ['colorChange'],

    components: {
      'color-selector': Chrome
    },

    props: {
      color: {
        type: String,
        default: '#404040'
      },

      disableButton: {
        type: Boolean,
        default: false
      },

      selectorStyle: {
        type: String,
        default: 'BUTTON' // SELECT
      },

      clearable: {
        type: Boolean,
        default: false
      }
    },

    data () {
      const hexColorRegex = /^#[0-9a-f]{3,6}$/i
      return {
        colorEditing: false,
        selectedColor: this.color,
        hexColor: this.color,
        rules: [
          v => {
            return !v || hexColorRegex.test(v) || this.$t(this.$vtrans.HEX_VALIDATION)
          }
        ]
      }
    },

    watch: {
      selectedColor () {
        if (typeof this.selectedColor === 'object') {
          const { hex } = this.selectedColor
          this.hexColor = hex
          this.$emit('colorChange', { hex })
        }
      },
      hexColor () {
        this.handleHexColor(this.hexColor)
      }
    },

    mounted () {
      this.selectedColor = this.color
      this.hexColor = this.color
    },

    methods: {
      handleKeydown (event) {
        if (event.keyCode === 9 || event.keyCode === 27) {
          this.colorEditing = false
        }
      },
      handleHexColor: function (hex) {
        if (!hex) {
          this.$emit('colorChange', { hex: '' })
          this.selectedColor = ''
          return
        }
        const matchShortHex = /^#[0-9a-f]{3}$/i
        const matchFullHex = /^#[0-9a-f]{6}$/i
        if (hex !== this.color) {
          if (matchShortHex.test(hex)) {
            // convert shorthand in full hex color: #3fa -> #33FFAA
            const converted = conv(hex)
            this.$emit('colorChange', { hex: converted })
            this.selectedColor = converted
          } else if (matchFullHex.test(hex)) {
            this.$emit('colorChange', { hex })
            this.selectedColor = hex
          }
        }
      },
      clearColor (event) {
        event.stopPropagation()
        event.preventDefault()
        this.$emit('colorChange', { hex: '' })
        this.$nextTick(() => {
          this.$refs.colorSelect.blur()
        })
      },
    }
  }
</script>

<style lang="scss">
  .colorPicker__activator {
    border: 1px solid $black;
    border-radius: 4px;
    height: 24px;
    width: 24px;

    &.transparent {
      border-color: #404040 !important; // Thanks vuetify
    }

    .v-icon {
      color: $white;
      opacity: 0;
      transition: .2s opacity ease;
    }

    &.orange .v-icon,
    &.yellow .v-icon,
    &.light-green .v-icon,
    &.transparent .v-icon {
      color: $primary; // For contrast, should change this later
    }

    &:hover {
      .v-icon {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .colorSelect input::placeholder {
    color: $black;
  }
</style>
