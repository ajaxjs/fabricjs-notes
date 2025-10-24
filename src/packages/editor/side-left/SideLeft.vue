<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Toggle } from "@/components/ui/toggle"
import { useSettingStore } from '../stores/index.ts'
import { sideNavItems } from './useSideNav.ts'
import IconExpend from '../assets/IconExpend.vue'

const settingStore = useSettingStore()
const { leftSideVisib, leftSideActive } = storeToRefs(settingStore)

function onClickNav(item: any) {
    leftSideVisib.value = true
    leftSideActive.value = item.label
}

</script>

<template>
    <div class="left-side flex relative z-9" :class="{ 'expended': leftSideVisib }">
        <div class="tool-bar flex flex-col w-13 p-1 gap-1">
            <Toggle :model-value="leftSideActive === item.label" v-for="(item, i) in sideNavItems" :key="i"
                class="flex-col h-auto py-2 gap-1" @click="onClickNav(item)">
                <component :is="item.icon" class="size-6" />
                <small>{{ item.label }}</small>
            </Toggle>
        </div>
        <div class="tool-panel relative z-10">
            <Transition name="sidebar">
                <div v-if="leftSideVisib" class="tool-panel-inner flex flex-1 w-80 overflow-hidden px-2">
                    <template v-for="(item) in sideNavItems">
                        <KeepAlive>
                            <component v-if="settingStore.leftSideActive === item.label" :is="item.component" />
                        </KeepAlive>
                    </template>
                </div>
            </Transition>
        </div>
        <div class="absolute top-1/2 left-[100%] -translate-y-1/2" @click="leftSideVisib = !leftSideVisib">
            <IconExpend :expended="leftSideVisib" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.left-side {
    .tool-bar {
        background-color: var(--sidebar);
    }
    
    .tool-panel {
        background-color: var(--sidebar-accent);
    }

    &.expended .tool-panel {
        border-left: 1px solid var(--sidebar-border);
    }
}

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