<script setup>
import IconTimes from "@/components/icons/IconTimes.vue";
const props = defineProps({
    shown: {
        type: Boolean,
        default: false
    }
});

defineEmits(['close']);
</script>

<template>
    <div :class="{'hidden': !props.shown}" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="flex fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center">
        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        <slot name="header"></slot>
                    </h3>
                    <button @click="$emit('close')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                        <IconTimes/>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6"><slot></slot></div>
            </div>
        </div>
    </div>
    <div v-if="props.shown" modal-backdrop class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
</template>