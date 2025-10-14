<script setup lang="ts">
import {
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import DropdownMenuItem from "./DropdownMenuItem.vue"

import type { TDropdownMenu } from "./type"

defineProps<TDropdownMenu>()

</script>

<template>
    <DropdownMenuSub>
        <DropdownMenuSubTrigger>
            {{ label }}
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
            <DropdownMenuSubContent>
                <DropdownMenuItem v-for="(item, i) in items" :key="i" v-bind="item"></DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuPortal>
    </DropdownMenuSub>
</template>

<style lang="scss" scoped></style>