<script setup lang="ts">
import { computed } from 'vue'
import {
    DropdownMenuGroup,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import DropdownMenuItem from './DropdownMenuItem.vue'
import type { TDropdownMenuItems } from './type'

const { items } = defineProps<{
    items: TDropdownMenuItems | TDropdownMenuItems[]
}>()
const itemsGroup = computed(() => {
    const group: TDropdownMenuItems[] = [];
    let _temp: TDropdownMenuItems = [];
    items.forEach((item) => {
        if (Array.isArray(item)) {
            if (_temp.length) {
                group.push(_temp)
                _temp = []
            }
            group.push(item)
        } else {
            _temp.push(item)
        }
    })
    return [items]
})
</script>

<template>
    <template v-for="(group, i) in itemsGroup" :key="i">
        <DropdownMenuGroup>
            <DropdownMenuItem v-for="(item, i) in group" :key="i" v-bind="item" />
        </DropdownMenuGroup>
        <DropdownMenuSeparator v-if="i < itemsGroup.length - 1" />
    </template>
</template>

<style lang="scss" scoped></style>