import { defineStore } from "pinia";
import { FabricCore } from "../../core";
import type { Canvas } from 'fabric';

// 定义store状态的接口
interface EditorState {
    // 内核实例
    core: FabricCore | null;
    // canvas实例
    canvas: Canvas | null;
}

export const useEditorStore = defineStore('editor-setting', {
    state: (): EditorState => ({
        core: null,
        canvas: null,
    }),
})

