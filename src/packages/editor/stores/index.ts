import { defineStore } from "pinia";

export const useSettingStore = defineStore('editor-setting', {
    state: () => ({
        rulerEnable: true,
    }),
})