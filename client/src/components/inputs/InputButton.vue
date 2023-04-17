<script setup>
import {getClasses, sizeEnums} from "@/components/inputs/setup";
import {computed} from "vue";

const props = defineProps({
    disabled: Boolean,
    size: {
        type: String,
        default: 'md',
        validator: (value) => {
            return sizeEnums.includes(value)
        }
    }
});

defineEmits(['click']);
const buttonClasses = computed(() => getClasses('InputButton', props))
</script>

<template>
    <button @click="$emit('click', $event.target.value)" type="submit" :disabled="disabled" :class="buttonClasses"><slot></slot></button>
</template>