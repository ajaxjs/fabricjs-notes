import type { CorePluginTemp, IHotkey } from '../interface'
import type { FabricCanvas } from './fabricCanvas'
import { ActiveSelection, type FabricObject } from 'fabric'

export class FabricAlign implements CorePluginTemp {
    static pluginName = 'align'
    hotkeys: IHotkey[] = [
        { hotkey: 'ctrl+ArrowLeft', label: '左对齐', handler: this.left.bind(this) },
        { hotkey: 'ctrl+ArrowUp', label: '上对齐', handler: this.top.bind(this) },
        { hotkey: 'ctrl+ArrowRight', label: '右对齐', handler: this.right.bind(this) },
        { hotkey: 'ctrl+ArrowDown', label: '下对齐', handler: this.bottom.bind(this) },
        { hotkey: 'alt+x', label: '居中对齐X轴', handler: this.centerX.bind(this) },
        { hotkey: 'alt+y', label: '居中对齐Y轴', handler: this.centerY.bind(this) },
        { hotkey: 'alt+c', label: '居中对齐', handler: this.center.bind(this) },
    ]
    canvas: FabricCanvas;
    constructor(canvas: FabricCanvas) {
        this.canvas = canvas;
    }

    left() {
        const { canvas } = this;
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length === 0) return;
        const minX = Math.min(...selectedObjects.map(obj => obj.left));
        selectedObjects.forEach(obj => obj.set({ left: minX }));

        this.updateActiveSelection(selectedObjects);
    }
    top() {
        const { canvas } = this;
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length === 0) return;
        const minY = Math.min(...selectedObjects.map(obj => obj.top));
        selectedObjects.forEach(obj => obj.set({ top: minY }));

        this.updateActiveSelection(selectedObjects);
    }
    right() {
        const { canvas } = this;
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length === 0) return;
        const maxX = Math.max(...selectedObjects.map(obj => obj.left + obj.width));
        selectedObjects.forEach(obj => obj.set({ left: maxX - obj.width }));

        this.updateActiveSelection(selectedObjects);
    }
    bottom() {
        const { canvas } = this;
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length === 0) return;
        const maxY = Math.max(...selectedObjects.map(obj => obj.top + obj.height));
        selectedObjects.forEach(obj => obj.set({ top: maxY - obj.height }));

        this.updateActiveSelection(selectedObjects);
    }
    center() {
        const { canvas } = this;
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length === 0) return;
        this.centerX();
        this.centerY();
    }
    centerX() {
        const { canvas } = this;
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length === 0) return;

        // 计算选中元素组的边界框
        const minX = Math.min(...selectedObjects.map(obj => obj.left));
        const maxX = Math.max(...selectedObjects.map(obj => obj.left + obj.width!));
        const groupCenterX = minX + (maxX - minX) / 2;

        // 将每个元素相对于组中心对齐
        selectedObjects.forEach(obj => {
            const objCenter = obj.left + obj.width! / 2;
            const offset = groupCenterX - objCenter;
            obj.set({ left: obj.left + offset });
        });
        this.updateActiveSelection(selectedObjects);
    }
    centerY() {
        const { canvas } = this;
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length === 0) return;

        // 计算选中元素组的边界框
        const minY = Math.min(...selectedObjects.map(obj => obj.top));
        const maxY = Math.max(...selectedObjects.map(obj => obj.top + obj.height!));
        const groupCenterY = minY + (maxY - minY) / 2;

        // 将每个元素相对于组中心对齐
        selectedObjects.forEach(obj => {
            const objCenter = obj.top + obj.height! / 2;
            const offset = groupCenterY - objCenter;
            obj.set({ top: obj.top + offset });
        });

        this.updateActiveSelection(selectedObjects);
    }
    // 更新编辑框大小
    private updateActiveSelection(selectedObjects: FabricObject[]) {
        const { canvas } = this;
        canvas.discardActiveObject();
        const newSelection = new ActiveSelection(selectedObjects, {
            canvas
        });
        canvas.setActiveObject(newSelection);
        canvas.requestRenderAll();
    }
}