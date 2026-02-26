import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '~/components/ui/Button.vue'

describe('Button Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies default variant classes', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-primary')
    expect(button.classes()).toContain('text-primary-foreground')
  })

  it('applies destructive variant classes', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'destructive',
      },
      slots: {
        default: 'Delete',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-destructive')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.classes()).toContain('disabled:opacity-50')
  })
})
