<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DropdownMenuGroup from './DropdownMenuGroup.vue'



import type { TDropdownMenu, TSelectedEvent } from './type'

const { items } = defineProps<TDropdownMenu>()
const emits = defineEmits(['selected'])
function onSelectedHandler(e: TSelectedEvent) {
    emits('selected', e)
}

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <slot></slot>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <template v-if="$slots.label || label">
                <DropdownMenuLabel>
                    <slot v-if="$slots.label" name="label">{{ label }}</slot>
                    <span v-else>{{ label }}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
            </template>
            <DropdownMenuGroup :items="items" @selected="onSelectedHandler"></DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>