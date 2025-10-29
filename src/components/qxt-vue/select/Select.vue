<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { SelectOptions } from "./type"

const props = defineProps<SelectOptions>()

const modelValue = defineModel<string | number>()


</script>

<template>
    <Select v-model="modelValue">
        <SelectTrigger :class="cn('min-w-[8em]', props.class)">
            <SelectValue :placeholder="props.label" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <template v-for="(vo) in props.options" :key="vo.value">
                    <SelectLabel v-if="vo.type == 'label'">{{ vo.label }}</SelectLabel>
                    <SelectItem v-else :value="vo.value">
                        {{ vo.label }}
                    </SelectItem>
                </template>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>