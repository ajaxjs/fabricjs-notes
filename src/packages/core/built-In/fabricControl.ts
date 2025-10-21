/**
 * 基础控制插件
 * 1. 移动画布
 * 2. 缩放画布
 */
import type { CorePluginTemp, IHotkey } from '../interface'
import type { FabricCanvas } from './fabricCanvas'
import type { TMat2D, Point } from 'fabric'

export class FabricControl implements CorePluginTemp {
    static pluginName = 'Control';
    canvas: FabricCanvas;
    hotkeys: IHotkey[] = [];
    protected isPanning = false;
    protected lastPosX = 0;
    protected lastPosY = 0;
    constructor(canvas: FabricCanvas) {
        this.canvas = canvas;
        // 平移画布
        this._bindPanCanvas();
        // 滚轮操作
        this._bindWheel();
    }

    // 拖拽平移画布
    protected _bindPanCanvas() {
        const { canvas } = this;

        // 监听键盘按下事件  
        document.addEventListener('keydown', this._spaceDown.bind(this));

        // 监听键盘释放事件  
        document.addEventListener('keyup', this._spaceUp.bind(this));

        // 监听鼠标按下事件  
        canvas.on('mouse:down', (opt) => {
            if (this.isPanning || canvas.activeTool === 'pan') {
                const evt: any = opt.e;
                canvas.selection = false;
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
                canvas.setCursor('grabbing');
                canvas.fire('canvas:startmove', { x: this.lastPosX, y: this.lastPosY })
            }
        });

        // 监听鼠标移动事件  
        canvas.on('mouse:move', (opt) => {
            const evt: any = opt.e;
            if ((this.isPanning || canvas.activeTool === 'pan') && evt.buttons === 1) {
                const vpt = canvas.viewportTransform;
                vpt[4] += evt.clientX - this.lastPosX;
                vpt[5] += evt.clientY - this.lastPosY;
                //canvas.setViewportTransform(vpt);
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
                canvas.setCursor('grabbing');
                canvas.fire('canvas:moveing', { x: -vpt[4], y: -vpt[5] })
                canvas.requestRenderAll();
            }
        });

        // 监听鼠标释放事件  
        canvas.on('mouse:up', () => {
            if (this.isPanning || canvas.activeTool === 'pan') {
                canvas.setCursor('grab');
                canvas.fire('canvas:endmove', { x: this.lastPosX, y: this.lastPosY })
            }
        });

    }
    // 按下空格键开始平移画布
    protected _spaceDown(e: any) {
        const { canvas } = this;
        if (e.code === 'Space' && !this.isPanning) {
            e.preventDefault();
            this.isPanning = true;
            canvas.selection = false; // 禁用选择功能 
            canvas.activeTool = 'pan'; // 切换到平移工具
            canvas.defaultCursor = 'grab';
        }
    }
    // 释放空格键结束平移画布
    protected _spaceUp(e: any) {
        if (e.code === 'Space') {
            const { canvas } = this;
            this.isPanning = false;
            canvas.defaultCursor = 'default';
            canvas.selection = true; // 恢复选择功能  
            // 切换到移动工具
            canvas.activeTool = 'move';
        }
    }

    // 滚轮操作
    protected _bindWheel() {
        const { canvas } = this;
        canvas.on('mouse:wheel', (opt) => {
            const delta = opt.e.deltaY;
            const point: any = { x: opt.e.offsetX, y: opt.e.offsetY };
            if (opt.e.altKey) {
                this.zoom(delta, point);
            } else {
                const direction = opt.e.shiftKey || opt.e.ctrlKey ? 'x' : 'y';
                this.pan(-delta, direction);
            }
            opt.e.preventDefault();
            opt.e.stopPropagation();
        })
    }

    // 缩放画布
    zoom(delta: number, point: Point) {
        const { canvas } = this;
        const zoom = canvas.getZoom();
        // 限制缩放范围
        if (delta < 0 && zoom < 3) {
            // 放大
            canvas.zoomToPoint(point, zoom * 1.1);
        } else if (delta > 0 && zoom > 0.1) {
            // 缩小
            canvas.zoomToPoint(point, zoom / 1.1);
        }
    }

    // 平移画布
    pan(delta: number, direction: 'x' | 'y' = 'y') {
        const { canvas } = this;
        const vpt = canvas.viewportTransform.slice() as TMat2D;
        const setp = 0.2;
        if (direction === 'x') {
            vpt[4] += delta * setp;
        } else if (direction === 'y') {
            vpt[5] += delta * setp;
        }
        canvas.setViewportTransform(vpt);
    }



    dispose() {
        document.removeEventListener('keydown', this._spaceDown.bind(this));
        document.removeEventListener('keyup', this._spaceUp.bind(this));
    }

}