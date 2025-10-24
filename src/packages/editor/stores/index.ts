import { defineStore } from "pinia";

export const useSettingStore = defineStore('editor-setting', {
    state: () => ({
        // 左侧工具条是否显示
        leftSideVisib: false,
        // 左侧工具条当前选中项
        leftSideActive: '',
        // 标尺是否显示
        rulerEnabled: true,
        
    }),
    persist: true
})