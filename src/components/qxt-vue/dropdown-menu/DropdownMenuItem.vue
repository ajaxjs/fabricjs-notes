<script setup lang="ts">
import {
    DropdownMenuItem,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import DropdownMenuSub from "./DropdownMenuSub.vue"

import type { TDropdownMenuItem } from "./type"

const props = defineProps<TDropdownMenuItem>()

function onClickHandler(e: Event) {
    if (props.disabled) {
        return
    }
    props.onClick?.(e)
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