<script>
export default {
    inheritAttrs: false
}
</script>

<script setup>
import {getClasses, sizeEnums} from "./setup"
import {computed} from "vue";

const props = defineProps({
    modelValue: String,
    textLabel: String,
    error: {
        type: String,
        default: ''
    },
    disabled: Boolean,
    size: {
        type: String,
        default: 'md',
        validator: (value) => {
            return sizeEnums.includes(value)
        }
    }
});

defineEmits(['update:modelValue']);

const labelClasses = computed(() => getClasses('InputLabel', props));
const inputClasses = computed(() => getClasses('InputText', props));
const inputErrorClasses = computed(() => getClasses('InputErrorText', props));
</script>

<template>
    <div class="mb-6">
        <label :for="$attrs.id" :class="labelClasses">{{textLabel}}</label>
        <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                  v-bind="$attrs" :class="inputClasses"></textarea>
        <p v-if="!!error" :class="inputErrorClasses">{{error}}</p>
    </div>
</template>