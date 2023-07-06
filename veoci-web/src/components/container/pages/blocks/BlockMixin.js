import BlockLabel from '@/components/container/pages/blockEditor/blocks/BlockLabel'

export default {
  inject: [
    'containerId',
    'mode',
    'pageProvisions',
  ],

  components: {
    BlockLabel
  },

  props: {
    block: {
      type: Object,
      required: true
    },

    parent: {
      type: Object,
      default: null
    },

    isPublic: {
      type: Boolean,
      default: false
    },

    publicKey: {
      type: String,
      default: ''
    }
  },

  computed: {
    editBlock () {
      return this.pageProvisions?.editBlock
    },

    theme () {
      return this.pageProvisions?.theme
    },

    styleString () {
      let style = `color: ${this.color};${this.alignment};`
      if (this.backgroundColor) {
        style += `background-color: ${this.backgroundColor};`
      }
      if (this.fontSize) {
        style += `font-size: ${this.fontSize}px;`
      }

      if (this.margin) {
        Object.keys(this.margin).forEach((marginDir) => {
          style += `margin-${marginDir}: ${this.margin[marginDir]}px;`
        })
      }

      if (this.padding) {
        Object.keys(this.padding).forEach((paddingDir) => {
          style += `padding-${paddingDir}: ${this.padding[paddingDir]}px;`
        })
      }

      if (this.fontWeight) {
        style += `font-weight: ${this.fontWeight};`
      }

      if (this.border) {
        style += this.border
      }

      if (this.boxShadow) {
        style += this.boxShadow
      }

      style += this.textDecoration
      return style
    },

    alignment () {
      return `text-align: ${this.block?.properties.alignment || 'left'};`
    },

    margin () {
      return this.block?.properties?.spacing?.margin || false
    },

    padding () {
      return this.block?.properties?.spacing?.padding || false
    },

    color () {
      return this.block?.properties?.color || '#404040'
    },

    fontSize () {
      return this.block?.properties?.fontSize || ''
    },

    fontWeight () {
      return this.block?.properties?.fontWeight || 'normal'
    },

    backgroundColor () {
      return this.block?.properties?.backgroundColor || ''
    },

    textDecoration () {
      let style = ''
      const prop = this.block?.properties?.textDecoration || []
      prop.forEach((textDec) => {
        switch (textDec) {
          case 'italic':
            style += `font-style: italic;`
            break
          case 'underline':
            style += `border-bottom: 2px solid;`
            break
          case 'strikethrough':
            style += `text-decoration: line-through;`
            break
          default:
            break
        }
      })
      return style
    },

    border () {
      let style = ''
      if (this.block.properties.border) {
        const border = this.block.properties.border
        style += `border-style: ${border.style};`
        style += `border-color: ${border.color};`

        if (border.radius.topLeft) {
          style += `border-top-left-radius: ${border.radius.topLeft}px;`
          style += `border-top-right-radius: ${border.radius.topRight}px;`
          style += `border-bottom-left-radius: ${border.radius.bottomLeft}px;`
          style += `border-bottom-right-radius: ${border.radius.bottomRight}px;`
        }
      }

      return style
    },

    boxShadow () {
      let style = ''
      if (this.block.properties.boxShadow) {
        const boxShadow = this.block.properties.boxShadow
        style += `box-shadow: `
        style += boxShadow.horizontal ? `${boxShadow.horizontal}px ` : '0 '
        style += boxShadow.vertical ? `${boxShadow.vertical}px ` : '0 '
        style += boxShadow.blur ? `${boxShadow.blur}px ` : '0 '
        style += boxShadow.spread ? `${boxShadow.spread}px ` : '0 '
        style += boxShadow.color ? boxShadow.color : '#000000'
        style += ';'
      }

      return style
    }
  }
}
