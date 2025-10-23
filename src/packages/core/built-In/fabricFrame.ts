import { Rect } from 'fabric'
import type { IFrameOptions, IHotkey, CorePluginTemp } from '../interface'
import type { FabricCanvas } from './fabricCanvas'

export class FabricFrame implements CorePluginTemp {
    static pluginName: string = 'Frame';
    hotkeys: IHotkey[] = [];
    canvas: FabricCanvas
    left: number = 0
    top: number = 0
    width: number = 0
    height: number = 0
    clipPath?: Rect
    constructor(canvas: FabricCanvas) {
        this.canvas = canvas
        // 画面重新居中
        canvas.on('canvas:resize', (e) => {
            const { width: canvaWidth, height: canvaHeight } = e
            const { width, height } = this;
            this.left = (canvaWidth - width) / 2;
            this.top = (canvaHeight - height) / 2;
            this.canvas.setViewportTransform([1, 0, 0, 1, this.left, this.top])
        })
    }

    setFrame(props: IFrameOptions) {
        const { width: canvaWidth, height: canvaHeight } = this.canvas
        const { width, height } = props
        this.left = (canvaWidth - width) / 2;
        this.top = (canvaHeight - height) / 2;
        this.width = width;
        this.height = height;
        const { overlayFill, ...rectProps } = props
        const bg = new Rect({
            selectable: false,
            evented: false,
            ...rectProps
        })
        this.canvas.add(bg)
        //this.canvas.sendToBack(bg)
        this.canvas.setViewportTransform([1, 0, 0, 1, this.left, this.top])
        this.clipPath = new Rect(rectProps);

        // 防止重复绘制
        let beforeRunder = false;
        this.canvas.on('before:render', () => beforeRunder = true);
        this.canvas.on('after:render', () => {
            if (beforeRunder) {
                beforeRunder = false;
                // 绘制遮罩
                this.darwFrame.apply(this, [props])
            }
        })
    }

    darwFrame(props: IFrameOptions) {
        const { ruler } = this.canvas
        const ctx = this.canvas.contextContainer;
        const ruleSize = ruler?.options.ruleSize || 0;
        const left = ruleSize, top = ruleSize;
        let [zoomX, , , zoomY, vptX, vptY] = this.canvas.viewportTransform;
        let { width: canvaWidth, height: canvaHeight } = this.canvas;
        let { width: boardWidth, height: boardHeight, overlayFill = 'rgba(100, 100, 100, 0.8)' } = props;
        // 计算缩放后的宽度和高度
        boardWidth *= zoomX
        boardHeight *= zoomY

        const topHeight = vptY - top < 0 ? 0 : vptY - top;
        const buttonTop = vptY + boardHeight
        const buttonHeight = canvaHeight - buttonTop
        const leftWidth = vptX - left < 0 ? 0 : vptX - left;
        const rightLeft = vptX + boardWidth;
        const rightWidth = canvaWidth - rightLeft < 0 ? 0 : canvaWidth - rightLeft;

        // 绘制遮罩
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = overlayFill;
        ctx.rect(left, top, canvaWidth, topHeight);// 上
        ctx.rect(left, buttonTop, canvaWidth, buttonHeight);// 下
        ctx.rect(left, top, leftWidth, canvaHeight);// 左
        ctx.rect(rightLeft, top, rightWidth, canvaHeight);// 右
        ctx.fill()
        ctx.restore()
    }
}