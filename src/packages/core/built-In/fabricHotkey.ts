/**
 * 基础热键插件
 */

import type { CorePluginTemp, IHotkey } from '../interface'
import type { FabricCanvas } from './fabricCanvas'
import { Group } from 'fabric'

export class FabricHotkey implements CorePluginTemp {
    pluginName = 'Hotkey';
    canvas: FabricCanvas;
    hotkeys: IHotkey[] = [
        { hotkey: 'ctrl+g', label: '组合对象', handler: this.group },
        { hotkey: 'ctrl+shift+g', label: '取消组合', handler: this.ungroup },
        { hotkey: 'delete', label: '删除选中', handler: this.delete },
    ];
    constructor(canvas: FabricCanvas) {
        this.canvas = canvas;
    }
    // 组合选中对象
    group() {
        const activeObjects = this.canvas.getActiveObjects()
        if (activeObjects.length > 1) {
            const group = new Group(activeObjects)
            this.canvas.add(group)
            this.canvas.remove(...activeObjects)
            this.canvas.setActiveObject(group)
            console.log(activeObjects, group);
        }
    }
    // 取消组合
    ungroup() {
        const activeObjects = this.canvas.getActiveObjects()
        activeObjects.forEach((item) => {
            if (item instanceof Group) {
                console.log('取消组合选中对象', item);
                this.canvas.add(...item.removeAll())
                this.canvas.remove(item)
            }
        })
        //this.canvas.discardActiveObject()
        this.canvas.requestRenderAll()
    }
    // 删除选中
    delete() {
        this.canvas.getActiveObjects().forEach((item) => {
            this.canvas.remove(item)
            this.canvas.requestRenderAll();
            this.canvas.discardActiveObject();
        })
    }
}
