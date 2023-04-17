import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseLayout from "@/components/BaseLayout.vue";

describe('BaseLayout', () => {
    it('renders properly', () => {
        const wrapper = mount(BaseLayout, {
            slots: {
                default: '<p>Main Content</p>',
                starting: '<div>Before Content</div>',
                ending: '<div>After Content</div>',
            }
        })

        expect(wrapper.text()).toContain('Main Content')
        expect(wrapper.text()).toContain('Before Content')
        expect(wrapper.text()).toContain('After Content')
    })
})