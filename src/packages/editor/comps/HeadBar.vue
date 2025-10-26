<script setup lang="ts">
import { onEditorReady } from '../../core'
import { Canvas } from 'fabric'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-vue-next'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)


let canvas: Canvas | null = null;
onEditorReady((editor) => {
    canvas = editor.canvas;
})

function exportJSON() {
    if (!canvas) return;
    const json = canvas.toJSON();
    console.log('export json:', json);
}

</script>

<template>
    <div class="head-bar flex p-1 gap-1">
        <Button @click="toggleDark()" variant="outline">
            <Moon v-if="!isDark" />
            <Sun v-else />
        </Button>
        <Button variant="outline" @click="exportJSON">导出</Button>
    </div>
</template>

<style lang="scss" scoped>
.head-bar {
    background-color: var(--sidebar);
}
</style>