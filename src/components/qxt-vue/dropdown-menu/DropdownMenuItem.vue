<script setup lang="ts">
import {
    DropdownMenuItem,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import DropdownMenuSub from "./DropdownMenuSub.vue"

import type { TDropdownMenuItem, TSelectedEvent } from "./type"
import { useAttrs } from "vue";

const emits = defineEmits(['selected'])

const props = defineProps<TDropdownMenuItem>()
const attrs = useAttrs()

function onClickHandler(e: Event) {
    if (props.disabled) {
        return
    }
    // 点击事件数据
    const event = e as TSelectedEvent
    event.selected = { ...props, ...attrs }

    props.onClick?.(event)
    emits('selected', event)
}

</script>

<template>
    <DropdownMenuSub v-if="submenu" v-bind="submenu"></DropdownMenuSub>
    <DropdownMenuItem v-else @click="onClickHandler">
        <span>{{ label }}</span>
        <DropdownMenuShortcut v-if="shortcut">{{ shortcut }}</DropdownMenuShortcut>
    </DropdownMenuItem>
</template>

<style lang="scss" scoped></style>