import { mount } from '@vue/test-utils'
import BorderEditor from '@/components/container/pages/blockEditor/shared/BorderEditor.vue'
import ColorPicker from '@/components/shared/veoci-inputs/ColorPicker.vue'

describe('BorderEditor.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BorderEditor, {
      props: {
        border: {
          style: 'solid',
          radius: {
            topLeft: 10,
            topRight: 20,
            bottomLeft: 30,
            bottomRight: 40
          },
          color: '#123456'
        }
      }
    })
  })

  afterEach(() => {
    if (wrapper) { wrapper.unmount() }
  })

  it('renders border styles correctly', () => {
    const styleButtons = wrapper.findAll('.setting__toggle-icon')
    expect(styleButtons.length).toBe(2)
  })

  it('renders color picker correctly', () => {
    const colorPicker = wrapper.findComponent(ColorPicker)
    expect(colorPicker.exists()).toBe(true)
  })

  it('renders border radius inputs correctly', () => {
    const radiusInputs = wrapper.findAll('.blockEditor__setting-radius .v-input')
    expect(radiusInputs.length).toBe(4)
  })

  it('updates border style', async () => {
    const solidBtn = wrapper.find('[value="solid"]')
    const dashedBtn = wrapper.find('[value="dashed"]')

    await dashedBtn.trigger('click')
    expect(wrapper.vm.innerBorder.style).toBe('dashed')

    await solidBtn.trigger('click')
    expect(wrapper.vm.innerBorder.style).toBe('solid')
  })

  it('emits borderUpdated event when innerBorder changes', async () => {
    wrapper.vm.innerBorder.style = 'dashed'
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('borderUpdated')).toBeTruthy()
    expect(wrapper.emitted('borderUpdated')[0]).toEqual([{ ...wrapper.vm.innerBorder }])
  })
})
