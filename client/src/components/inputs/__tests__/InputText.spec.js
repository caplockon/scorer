import { describe, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import InputText from "@/components/inputs/InputText.vue";
import {testDisabled, testError, testInputUpdate, testRegular} from "@/components/inputs/__tests__/input.test_helper";

describe('InputText', () => {

    it('renders properly', () => testRegular(InputText))

    it('renders error properly', () => testError(InputText))

    it('renders disabled properly', () => testDisabled(InputText))

    test('modelValue should be updated', async () => testInputUpdate(InputText))

})
