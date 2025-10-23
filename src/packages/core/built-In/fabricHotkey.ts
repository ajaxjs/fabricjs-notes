/**
 * 基础热键插件
 */

import type { CorePluginTemp, IHotkey } from '../interface'
import type { FabricCanvas } from './fabricCanvas'
import { Group, ActiveSelection, FabricObject, classRegistry } from 'fabric'

export class FabricHotkey implements CorePluginTemp {
    static pluginName = 'Hotkey';
    // 剪贴板
    private _clipboard: object[] = [];
    canvas: FabricCanvas;
    hotkeys: IHotkey[] = [
        { hotkey: 'ctrl+g', label: '组合对象', handler: this.group },
        { hotkey: 'ctrl+shift+g', label: '取消组合', handler: this.ungroup },
        { hotkey: 'delete,backspace', label: '删除选中', handler: this.delete },
        // 图层索引操作
        { hotkey: 'ctrl+a', label: '全选', handler: this.selectAll.bind(this) },
        { hotkey: 'ctrl+]', label: '上移', handler: this.objectUpper.bind(this) },
        { hotkey: 'ctrl+[', label: '下移', handler: this.objectLower.bind(this) },
        { hotkey: 'ctrl+shift+]', label: '置顶', handler: this.objectTop.bind(this) },
        { hotkey: 'ctrl+shift+[', label: '置底', handler: this.objectBottom.bind(this) },
        // 图层拷贝
        { hotkey: 'ctrl+j', label: '克隆', handler: this.duplicate.bind(this) },
        { hotkey: 'ctrl+c', label: '复制', handler: this.copy.bind(this) },
        { hotkey: 'ctrl+v', label: '粘贴', handler: this.paste.bind(this) },

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
    // 全选
    selectAll() {
        const { canvas } = this;
        // 获取画布上的所有对象  
        const allObjects = canvas.getObjects();

        // 如果有对象,创建 ActiveSelection 并设置为活动对象  
        if (allObjects.length > 0) {
            const activeSelection = new ActiveSelection(allObjects, {
                canvas: canvas
            });
            canvas.setActiveObject(activeSelection);
            canvas.requestRenderAll();
        }
    }
    // 对象下移一层
    objectLower() {
        const { canvas } = this;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            const index = activeObject.index;
            // 底层或背景上一层不移动            
            if (index === 0 || index == 1 && canvas.item(0).label == 'background') {
                return;
            }
            canvas.sendObjectBackwards(activeObject, true);
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        }
    }
    // 对象上移一层
    objectUpper() {
        const { canvas } = this;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringObjectForward(activeObject, true);
            canvas.requestRenderAll();
        }
    }
    // 对象置顶
    objectTop() {
        const { canvas } = this;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringObjectToFront(activeObject);
            canvas.requestRenderAll();
        }
    }
    // 对象置底
    objectBottom() {
        const { canvas } = this;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            // 背景层不移动
            if (canvas.item(0).label == 'background') {
                canvas.moveObjectTo(activeObject, 1);
            } else {
                canvas.sendObjectToBack(activeObject);
            }
            canvas.requestRenderAll();
        }
    }
    // 复制选中元素
    duplicate() {
        const { canvas } = this;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            const index = activeObject.index;
            activeObject.clone().then(clone => {
                canvas.insertAt(index + 1, clone);
                canvas.setActiveObject(clone);
                canvas.requestRenderAll();
            })
        }
    }

    copy() {
        const { canvas } = this;
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0) {
            // 序列化对象 
            this._clipboard = activeObjects.map(item => {
                const { x: left, y: top } = item.getCenterPoint();
                const json = item.toJSON()
                return { ...json, left, top }
            });
        }
    }
    // 粘贴
    paste() {
        const { canvas } = this;
        if (!this._clipboard) {
            return;
        }
        const objects = this._clipboard.map((json) => canvas.objectFromJSON(json));
        Promise.all(objects).then((objs) => {
            objs.forEach((obj) => canvas.add(obj))
            const left = Math.min(...objs.map(item => item.left || 0));
            const top = Math.min(...objs.map(item => item.top || 0));
            // 选中多个
            const activeSelection = new ActiveSelection(objs, {
                canvas,
                left,
                top,
            });
            canvas.setActiveObject(activeSelection);
            canvas.requestRenderAll();
        })
    }
}
