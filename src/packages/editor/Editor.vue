<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { FabricCore } from '../core'
// 移除未使用的导入
//import type { IPluginTemplate } from '../core/interface/plugin'
import { BoardPlugin } from '../core/plugins'

const app = new FabricCore();
app.use(BoardPlugin)

const editorRef = ref();

onMounted(() => {


    app.mount(editorRef.value)
    const canvas = app.getCanvas()
    canvas.backgroundColor = '#f0f0f0'
    console.log(app);

    app.addBoard({
        width: 400,
        height: 600,
        fill: '#f0f0f0',
    })
    //canvas.renderAll()
    /*
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
    canvas.renderAll()*/
})

defineExpose({
    editor: app,
})

// 组件卸载时销毁canvas
onUnmounted(() => app.destroy())
</script>

<template>
    <div ref="editorRef" id="editor"></div>
</template>

<style lang="scss" scoped>
#editor {
    width: 100%;
    height: 400px;
}
</style>