import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputButton from "@/components/inputs/InputButton.vue";

describe('InputButton', () => {

    it('renders properly', () => {
        const button = mount(InputButton, {
            slots: {
                default: 'Click Me'
            }
        });

        expect(button.text()).eq('Click Me')
        expect(button.attributes().disabled).toBe(undefined)
    })

    it('renders disabled properly', () => {
        const button = mount(InputButton, {
            props: {
                disabled: true
            },
            slots: {
                default: 'Click Me'
            }
        });

        expect(button.attributes()).hasOwnProperty('disabled')
    })
})