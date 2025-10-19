/**
 * 基础控制插件
 */
import { FabricObject } from 'fabric'
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

        // 控制对象是否缓存渲染结果，设为false可提高动画性能但会增加渲染开销
        FabricObject.ownDefaults.objectCaching = false
        // 设置选中对象边框的颜色
        FabricObject.ownDefaults.borderColor = 'blue'
        // 设置选中对象控制点的填充颜色
        FabricObject.ownDefaults.cornerColor = 'white'
        // 设置选中对象控制点的描边颜色
        FabricObject.ownDefaults.cornerStrokeColor = '#c0c0c0'
        // 移动对象时边框的不透明度，1表示完全不透明
        FabricObject.ownDefaults.borderOpacityWhenMoving = 1
        // 边框粗细相对于对象大小的缩放因子（默认值为1）
        // FabricObject.ownDefaults.borderScaleFactor = 1
        // 控制点的大小（像素）
        FabricObject.ownDefaults.cornerSize = 8
        // 控制点的形状，'rect'表示矩形，可选'circle'（默认值为'rect'）
        // FabricObject.ownDefaults.cornerStyle = 'rect'
        // 缩放操作是否以对象中心为原点，false表示以鼠标位置为原点（默认值为false）
        // FabricObject.ownDefaults.centeredScaling = false
        // 旋转操作是否以对象中心为原点，true表示以中心为原点（默认值为true）
        // FabricObject.ownDefaults.centeredRotation = true
        // 控制点是否透明，false表示不透明
        FabricObject.ownDefaults.transparentCorners = false
        // 旋转控制点距离对象的偏移量（像素），控制旋转点与对象的距离
        // FabricObject.ownDefaults.rotatingPointOffset = 1
        // 是否锁定等比例缩放，设为true时只能按比例缩放对象
        // FabricObject.ownDefaults.lockUniScaling = true
        // 是否显示旋转控制点，设为false时对象将没有旋转控制点
        // FabricObject.ownDefaults.hasRotatingPoint = false

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
                const vpt = canvas.viewportTransform.slice() as TMat2D;
                vpt[4] += evt.clientX - this.lastPosX;
                vpt[5] += evt.clientY - this.lastPosY;
                canvas.setViewportTransform(vpt);
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
                canvas.setCursor('grabbing');
                canvas.fire('canvas:moveing', { x: -vpt[4], y: -vpt[5] })
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
            canvas.setCursor('grab');
        }
    }
    // 释放空格键结束平移画布
    protected _spaceUp(e: any) {
        if (e.code === 'Space') {
            const { canvas } = this;
            canvas.setCursor('default');
            this.isPanning = false;
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