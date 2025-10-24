<script setup lang="ts">
import { ref } from 'vue'
import { Toggle } from "@/components/ui/toggle"
import { Grid2x2Plus } from 'lucide-vue-next';

const visible = ref(false)
</script>

<template>
    <div class="left-side-wrap flex">
        <div class="tool-bar flex flex-col w-13 p-1">
            <Toggle class="flex-col h-auto py-2 gap-1" @click="visible = !visible">
                <Grid2x2Plus />
                <small>添加</small>
            </Toggle>
        </div>
        <div class="tool-panel relative z-10">
            <Transition name="sidebar">
                <div v-if="visible" class="tool-panel-inner flex flex-1 w-80 overflow-hidden">
                    123
                </div>
            </Transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-enter-active,
.sidebar-leave-active {
    transition: all 0.2s ease;
    overflow: hidden;
}

.sidebar-enter-from,
.sidebar-leave-to {
    width: 0;
}

.sidebar-enter-to,
.sidebar-leave-from {
    width: 320px;
}
</style>