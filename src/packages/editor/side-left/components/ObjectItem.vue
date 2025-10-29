<script setup lang="ts">
import { onEditorReady, } from '../../../core'

let canvas: any = null;
onEditorReady((editor) => {
    canvas = editor.canvas;
});
const props = defineProps({
    name: {
        type: String,
        default: '',
    },
    target: {
        type: Object,
        required: true,
    },
    icon: {
        type: Object,
        default: '',
    }
})

// 创建元素
function createObject() {
    const obj = props.target;
    const maxSize = 150;
    if (obj.width > maxSize) {
        obj.scaleToWidth(maxSize);
    } else if (obj.height > maxSize) {
        obj.scaleToHeight(maxSize);
    }
    return obj;
}

// 添加元素
function addObject() {
    if (!canvas) return;
    const obj = createObject();
    canvas.add(obj);
    canvas.renderAll();
    console.log('add target:', obj);
}
// 拖动元素
function handleDragStart(e: DragEvent) {
    if (!canvas) return;
    e.dataTransfer!.effectAllowed = 'copy';
    // 创建元素
    const obj = createObject();
    canvas.dropPort = obj;
}
// 放置元素
function handleDragEnd() {
    canvas.dropPort = null;
}
</script>

<template>
    <div class="flex flex-col p-2 gap-1 justify-center items-center cursor-pointer select-none text-center border border-(--border) rounded-(--radius) bg-(--sidebar)"
        @click="addObject()" draggable="true" @dragstart="handleDragStart" @dragend="handleDragEnd">
        <component :is="icon" />
    </div>
</template>

<style lang="scss" scoped></style>