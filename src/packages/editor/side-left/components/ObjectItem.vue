<script setup lang="ts">
import { computed } from 'vue'
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
    creator: {
        type: Function,
        required: true,
    },
})
const icon = computed(() => {
    const width = 48, height = 48;
    const shape = props.creator({ width, height, fill: '#CCCCCC' })
    if (shape.width > shape.height) {
        shape.scaleToWidth(width);
    } else {
        shape.scaleToHeight(height);
    }
    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${shape.toSVG()}</svg>`;
    return svg;
})
// 创建元素
function createObject(options?: any) {
    const obj = props.creator({ fill: '#CCCCCC', ...options });
    obj.scaleToWidth(100)
    return obj;
}

// 添加元素
function addObject(options?: any) {
    if (!canvas) return;
    const obj = createObject(options);
    canvas.add(obj);
    canvas.renderAll();
    console.log('add object:', obj);
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
    <div class="flex flex-col p-2 gap-1 justify-center cursor-pointer select-none text-center border border-(--border) rounded-(--radius) bg-(--sidebar)"
        @click="addObject()" draggable="true" @dragstart="handleDragStart" @dragend="handleDragEnd">
        <div v-html="icon" class="obj-icon flex justify-center items-center" :title="name"></div>
    </div>
</template>

<style lang="scss" scoped></style>