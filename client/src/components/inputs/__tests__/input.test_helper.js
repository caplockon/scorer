import {expect} from "vitest";
import {mount} from "@vue/test-utils";

export const testRegular = (component, options) => {
    options = options || {}
    const wrapper = mount(component, {
        props: Object.assign({
            textLabel: 'Hello'
        }, options.props || {})
    });

    expect(wrapper.text()).toContain('Hello');
}

export const testError = (component, options) => {
    options = options || {}
    const wrapper = mount(component, {
        props: Object.assign({
            textLabel: 'Hello',
            error: 'Something error'
        }, options.props || {})
    });

    expect(wrapper.text()).toContain('Something error');
}

export const testDisabled = (component, input, options) => {
    input = input || 'input'
    options = options || {}
    const wrapper = mount(component, {
        props: Object.assign({
            textLabel: 'Hello',
            disabled: true
        }, options.props || {})
    });

    const classes = wrapper.find(input).attributes();
    expect(classes).hasOwnProperty('disabled')
}

export const testInputUpdate = async (component, input, options) => {

    options = options || {}
    input = input || 'input'

    const wrapper = mount(component, {
        props: Object.assign({
            textLabel: 'Hello',
            modelValue: 'initialData',
            'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
        }, options.props || {})
    });

    await wrapper.find(input).setValue('hello');
    expect(wrapper.props('modelValue')).contain('hello')
}
