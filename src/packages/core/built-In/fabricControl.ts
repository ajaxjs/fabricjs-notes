/**
 * 基础控制插件
 */
import hotkeys from 'hotkeys-js';
import type { CorePluginTemp, IHotkey } from '../interface'
import type { FabricCanvas } from './fabricCanvas'
import type { TMat2D, Point } from 'fabric'

export class FabricControl implements CorePluginTemp {
    pluginName = 'Control';
    canvas: FabricCanvas;
    hotkeys: IHotkey[] = [];
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
        let isPanning = false;
        let lastPosX = 0;
        let lastPosY = 0;
        // 监听键盘按下事件  
        document.addEventListener('keydown', (e: any) => {
            if (e.code === 'Space' && !isPanning) {
                e.preventDefault();
                isPanning = true;
                canvas.selection = false; // 禁用选择功能 
                canvas.currentTool = 'pan'; // 切换到平移工具
                canvas.setCursor('grab');
            }
        });

        // 监听键盘释放事件  
        document.addEventListener('keyup', (e) => {
            if (e.code === 'Space') {
                canvas.setCursor('default');
                isPanning = false;
                canvas.selection = true; // 恢复选择功能  
                // 切换到移动工具
                canvas.currentTool = 'move';
            }
        });

        // 监听鼠标按下事件  
        canvas.on('mouse:down', (opt) => {
            if (isPanning || canvas.currentTool === 'pan') {
                const evt: any = opt.e;
                canvas.setCursor('grabbing');
                lastPosX = evt.clientX;
                lastPosY = evt.clientY;
                canvas.fire('canvas:startmove', { x: lastPosX, y: lastPosY })
            }
        });

        // 监听鼠标移动事件  
        canvas.on('mouse:move', (opt) => {
            const evt: any = opt.e;
            if ((isPanning || canvas.currentTool === 'pan') && evt.buttons === 1) {
                canvas.setCursor('grabbing');
                const vpt = canvas.viewportTransform.slice() as TMat2D;
                vpt[4] += evt.clientX - lastPosX;
                vpt[5] += evt.clientY - lastPosY;
                canvas.setViewportTransform(vpt);
                lastPosX = evt.clientX;
                lastPosY = evt.clientY;
                canvas.fire('canvas:moveing', { x: -vpt[4], y: -vpt[5] })
            }
        });

        // 监听鼠标释放事件  
        canvas.on('mouse:up', () => {
            if (isPanning || canvas.currentTool === 'pan') {
                canvas.setCursor('grab');
                canvas.fire('canvas:endmove', { x: lastPosX, y: lastPosY })
            }
        });

        // 缩放画布
        // canvas.on('mouse:wheel', (opt) => {
        //     const delta = opt.e.deltaY;
        //     const zoom = canvas.getZoom();
        //     const point: any = { x: opt.e.offsetX, y: opt.e.offsetY };

        //     // 限制缩放范围
        //     if (delta < 0 && zoom < 3) {
        //         // 放大
        //         canvas.zoomToPoint(point, zoom * 1.1);
        //     } else if (delta > 0 && zoom > 0.1) {
        //         // 缩小
        //         canvas.zoomToPoint(point, zoom / 1.1);
        //     }

        //     opt.e.preventDefault();
        //     opt.e.stopPropagation();
        // })
    }

    // 滚轮操作
    protected _bindWheel() {
        const { canvas } = this;

        canvas.on('mouse:wheel', (opt) => {
            const delta = opt.e.deltaY;
            const direction = opt.e.shiftKey ? 'x' : 'y';
            const point: any = { x: opt.e.offsetX, y: opt.e.offsetY };
            if (opt.e.ctrlKey) {
                this.zoom(delta, point);
            } else {
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

}