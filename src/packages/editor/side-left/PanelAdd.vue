<script setup lang="ts">
import { ref } from 'vue'
import { onEditorReady } from '../../core'
import { getObjectMap } from './useAddObject'
const objectMap = getObjectMap()

const canvas = ref()
onEditorReady((editor) => {
    canvas.value = editor.canvas;
    //canvas.value = editor.getCanvas();
    console.log('canvas is ok:', editor);
})
function addObject(creator: any) {
    const obj = creator();
    canvas.value.add(obj);
    canvas.value.renderAll();
    console.log('add object:', obj);
}
</script>

<template>
    <div>
        <h3>添加元素+</h3>
        <div class="flex gap-2">
            <div variant="outline"
                class="flex flex-col h-auto p-2 gap-1 items-center cursor-pointer border border-(--border) rounded-(--radius) bg-(--sidebar)"
                v-for="item in objectMap" :key="item.name" @click="addObject(item.creator)">
                <component :is="item.icon" class="size-6" />
                <small>{{ item.name }}</small>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>