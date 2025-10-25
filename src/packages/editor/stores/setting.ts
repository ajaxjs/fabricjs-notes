import { defineStore } from "pinia";

// 定义store状态的接口
interface SettingState {
    // 左侧工具条是否显示
    leftSideVisib: boolean;
    // 左侧工具条当前选中项
    leftSideActive: string;
    // 标尺是否显示
    rulerEnabled: boolean;
}

export const useSettingStore = defineStore('editor-setting', {
    state: (): SettingState => ({
        leftSideVisib: false,
        leftSideActive: '',
        rulerEnabled: true,
    }),
    persist: true
})