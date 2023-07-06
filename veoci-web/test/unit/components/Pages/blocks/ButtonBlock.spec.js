import '@mock/mockJsdom'

import ButtonBlock from '@/components/container/pages/blocks/ButtonBlock'
import { mount } from '@vue/test-utils'

describe('ButtonBlock.vue Test', () => {
  let wrapper
  let block

  // run before each test
  beforeEach(() => {
    block = require('../../../__mocks__/data/pages/blocks').buttons
    // need to stub out the store pieces needed for testing

    wrapper = mount(ButtonBlock, {
      global: {
        provide: {
          mode: 'EDIT',
          builderProvisions: {
            editBlock: null
          }
        }
      },
      props: {
        block
      }
    })
  })

  afterEach(() => {
    if (wrapper) { wrapper.unmount() }
  })

  // check component creation
  it('renders when component is created', () => {
    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('ButtonBlock')

    const buttons = wrapper.findAll('.linkItem__item--BUTTON')
    expect(buttons).toHaveLength(4)

    let button = buttons.at(0)
    expect(button.element.style.getPropertyValue('background-color')).toBe('rgb(36, 71, 107)')
    expect(button.element.style.getPropertyValue('color')).toBe('rgb(255, 255, 255)')
    expect(button.element.style.getPropertyValue('border')).toBe('5px solid #24390a')
    expect(button.findComponent('.linkItem__icon').classes()).toContain(block.properties.buttons[0].icon)
    expect(button.findComponent('.linkItem__link').text()).toEqual(block.properties.buttons[0].action.label)

    button = buttons.at(1)
    expect(button.findComponent('.linkItem__content').classes()).toContain('flex-column')
    expect(button.element.style.getPropertyValue('background-color')).toBe('rgb(216, 216, 216)')
    expect(button.element.style.getPropertyValue('color')).toBe('')
    expect(button.findComponent('.linkItem__icon').classes()).toContain(block.properties.buttons[1].icon)
    expect(button.findComponent('.linkItem__link').text()).toEqual(block.properties.buttons[1].action.label)

    button = buttons.at(2)
    expect(button.findComponent('.linkItem__content').classes()).toContain('flex-row-reverse')
    expect(button.element.style.getPropertyValue('background-color')).toBe('rgb(216, 216, 216)')
    expect(button.element.style.getPropertyValue('color')).toBe('')
    expect(button.findComponent('.linkItem__icon').classes()).toContain(block.properties.buttons[2].icon)
    expect(button.findComponent('.linkItem__link').text()).toEqual(block.properties.buttons[2].action.label)
  })
})
