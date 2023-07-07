<template>
  <div class="borderEditor">
    <div class="blockEditor__sublabel mt-4">
      {{ $t($vtrans.BORDER) }}
    </div>
    <div class="blockEditor__row">
      <div class="blockEditor__setting blockEditor__setting--third blockEditor__setting--dense blockEditor__setting-style">
        <div class="fieldBuilder__label">
          {{ $t($vtrans.STYLE) }}
        </div>

        <v-btn-toggle
          v-model="innerBorder.style"
          class="setting__alignment setting__toggle bg-primary"
          density="compact"
          variant="flat"
        >
          <v-btn
            :title="$t($vtrans.SOLID)"
            size="x-small"
            color="primary"
            value="solid"
          >
            <v-icon
              class="setting__toggle-icon"
            >
              mdi-square-rounded-outline
            </v-icon>
          </v-btn>

          <v-btn
            :title="$t($vtrans.DASHED)"
            size="x-small"
            color="primary"
            value="dashed"
          >
            <v-icon
              class="setting__toggle-icon"
            >
              mdi-border-radius
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="blockEditor__setting blockEditor__setting--third blockEditor__setting--dense">
        <div class="fieldBuilder__label">
          {{ $t($vtrans.COLOR) }}
        </div>

        <color-picker
          :color="innerBorder.color"
          class="buttonColor__picker"
          selector-style="SELECT"
          @colorChange="innerBorder.color = $event.hex"
        />
      </div>
      <div class="blockEditor__setting blockEditor__setting--third blockEditor__setting--dense blockEditor__setting-radius">
        <div class="fieldBuilder__label">
          {{ $t($vtrans.BORDER_RADIUS) }}
        </div>

        <div class="d-flex">
          <v-text-field
            v-model="innerBorder.radius.topLeft"
            :aria-label="$t($vtrans.BORDER_RADIUS_TOP_LEFT)"
            prepend-inner-icon="mdi-arrow-top-left"
            density="compact"
            variant="outlined"
          />
          <v-text-field
            v-model="innerBorder.radius.topRight"
            :aria-label="$t($vtrans.BORDER_RADIUS_TOP_RIGHT)"
            prepend-inner-icon="mdi-arrow-top-right"
            density="compact"
            variant="outlined"
          />
          <v-text-field
            v-model="innerBorder.radius.bottomLeft"
            :aria-label="$t($vtrans.BORDER_RADIUS_BOTTOM_LEFT)"
            prepend-inner-icon="mdi-arrow-bottom-left"
            density="compact"
            variant="outlined"
          />
          <v-text-field
            v-model="innerBorder.radius.bottomRight"
            :aria-label="$t($vtrans.BORDER_RADIUS_BOTTOM_RIGHT)"
            prepend-inner-icon="mdi-arrow-bottom-right"
            density="compact"
            variant="outlined"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import ColorPicker from '@/components/shared/veoci-inputs/ColorPicker.vue'
  export default {
    name: 'BorderEditor',
    emits: ['update:border'],

    components: {
      ColorPicker
    },

    props: {
      border: {
        type: Object,
        default: () => {
          return {
            style: 'solid',
            radius: {
              topLeft: 0,
              topRight: 0,
              bottomLeft: 0,
              bottomRight: 0
            },
            color: '#000000'
          }
        }
      }
    },

    data () {
      return {
        innerBorder: structuredClone(this.border)
      }
    },

    watch: {
      innerBorder: {
        handler () {
          if (this.skipEvent) {
            return // skip this
          }
          this.$emit('update:border', this.innerBorder)
        },
        deep: true
      },

      border: {
        handler () {
          this.skipEvent = true
          this.innerBorder = structuredClone(this.border)
          this.$nextTick(() => {
            this.skipEvent = false
          })
        },
        deep: true
      },
    }
  }
</script>

<style lang="scss">
  .blockEditor__settings .blockEditor__setting-style.blockEditor__setting {
    max-width: 95px;
  }

  .blockEditor__settings .blockEditor__setting-radius.blockEditor__setting {
    width: 75%; // override for this specific setting
  }

  .blockEditor__setting-radius.blockEditor__setting .v-input {
    margin-right: 5px;
  }

  .blockEditor__setting .v-btn-group .v-btn:not(.v-btn--active) {
    background-color: $light-gray;
  }
</style>
