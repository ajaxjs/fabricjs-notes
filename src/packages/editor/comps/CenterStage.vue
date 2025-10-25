<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { FabricCore } from '../../core'
import { useDark } from '@vueuse/core'
import { useSettingStore,useEditorStore } from '../stores/index.ts'

const isDark = useDark()
// 设置仓库
const settingStore = useSettingStore()

const emit = defineEmits(['mounted'])
const editorRef = ref();
const core = new FabricCore({}, {
    ruler: {
        enabled: settingStore.rulerEnabled,
        isDark: isDark.value,
    }
});

// 编辑器仓库
const editorStore = useEditorStore()

onMounted(() => {
    core.mount(editorRef.value)
    const canvas = core.canvas;
    editorStore.canvas = canvas
    canvas.frame.setFrame({
        width: 400,
        height: 600
    });
    // 监听标尺切换事件
    canvas.on('canvas:ruler_toggle', ({ enabled }) => {
        settingStore.rulerEnabled = enabled
    })
    // 触发 mounted 事件
    nextTick(() => emit('mounted', canvas, core))
    // 监听 isDark 变化
    watch(isDark, (isDark) => {
        console.log('isDark', isDark);
        if (canvas.ruler.enabled) {
            canvas.ruler.updateTheme(isDark)
        }
    })
})

defineExpose({ core })

// 组件卸载时销毁canvas
onUnmounted(() => core.destroy())
</script>

<template>
    <div class="editor-wrap flex-1 min-w-0 w-full overflow-hidden">
        <div ref="editorRef" id="editor" class="absolute top-0 left-0 w-full h-full"></div>
    </div>
</template>

<style lang="scss" scoped>
.editor-wrap {
    position: relative;
}
#editor {
    width: 100%;
}
</style>