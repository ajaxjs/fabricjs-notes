<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { FabricCore } from '../core'
import { Rect, Circle } from 'fabric'

const app = new FabricCore();
const editorRef = ref();
onMounted(() => {
    console.log(editorRef.value);
    
    app.mount(editorRef.value)
    const canvas = app.getCanvas()
    canvas.backgroundColor = '#f0f0f0'
    canvas.renderAll()

    console.log(canvas, '----+++');

    const circle = new Circle({
        radius: 50,
        fill: '#666',
        left: 50,
        top: 50,
    })
    canvas.add(circle)
    const rect = new Rect({
        width: 50,
        height: 50,
        fill: '#999',
        left: 100,
        top: 100,
    })
    canvas.add(rect)
    canvas.renderAll()
})

defineExpose({
    editor: app,
})

// 组件卸载时销毁canvas
onUnmounted(async () => {
    console.log('unmounted-');
    if (editorRef.value) {
        app.destroy()
        await app.getCanvas().dispose()
    }
})
</script>

<template>
    <div ref="editorRef" id="editor"></div>
</template>

<style lang="scss" scoped>
#editor {
    width: 600px;
    height: 400px;
}
</style>