<script setup lang="ts">
import { Canvas } from 'fabric'
import { onEditorReady } from '../../core'
import { getObjectMap } from './useAddObject'
const objectMap = getObjectMap()

let canvas: Canvas | null = null;
onEditorReady((editor) => {
    canvas = editor.canvas;
    //canvas.value = editor.getCanvas();
    console.log('canvas is ok:', editor);
})
function addObject(creator: any) {
    const obj = creator();
    canvas!.add(obj);
    canvas!.renderAll();
    console.log('add object:', obj);
}
</script>

<template>
    <div>
        <h3>添加元素+</h3>
        <div class="grid grid-cols-4 gap-2">
            <div class="flex flex-col grid h-auto p-2 gap-1 justify-center cursor-pointer border border-(--border) rounded-(--radius) bg-(--sidebar)"
                v-for="item in objectMap" :key="item.name" @click="addObject(item.creator)">
                <component :is="item.icon" class="size-8" />
                <small>{{ item.name }}</small>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>