import { describe, it, test } from 'vitest'
import InputTextarea from "@/components/inputs/InputTextarea.vue";
import {testDisabled, testError, testInputUpdate, testRegular} from "@/components/inputs/__tests__/input.test_helper";


describe('InputTextarea', () => {

    it('renders properly', () => testRegular(InputTextarea))

    it('renders error properly', () => testError(InputTextarea))

    it('renders disabled properly', () => testDisabled(InputTextarea, 'textarea'))

    test('modelValue should be updated', () => testInputUpdate(InputTextarea, 'textarea'))
})
