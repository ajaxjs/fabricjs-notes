import { Rect, Group } from 'fabric'
import Background from '../extension/object/Background'
import type { RectProps } from 'fabric'
import type { IPluginOption, IPluginTempl, IFabricCore } from '../interface/plugin'
import type { BackgroundProps } from '../extension/object/Background'
import type { FabricCanvas } from '../built-In/fabricCanvas'

interface BoardPluginOptions extends IPluginOption {
    width: number
    height: number
}

export default class BoardPlugin implements IPluginTempl {
    static name = 'Board'
    static events: string[] = []
    static expose: string[] = ['addBoard']
    canvas: FabricCanvas
    editor: IFabricCore
    options: BoardPluginOptions
    top: number = 0
    left: number = 0
    overlay: Group | null = null
    hotkeyEvent?: (name: string, e: KeyboardEvent) => void;

    constructor(canvas: FabricCanvas, editor: IFabricCore, options: BoardPluginOptions) {
        this.canvas = canvas
        this.editor = editor
        this.options = options

    }

    addBoard(props: BoardPluginOptions, overlayProps: RectProps) {
        let zoom = this.canvas.getZoom()
        const { width: cw, height: ch } = this.canvas
        const { width, height } = props
        this.left = (cw - width) / 2
        this.top = (ch - height) / 2
        const bg = new Background(props)
        this.canvas.add(bg)
        this.canvas.setViewportTransform([1, 0, 0, 1, this.left, this.top])
        console.log('--c', zoom, this.top);


        let beforeRunder = false;
        this.canvas.on('before:render', () => beforeRunder = true);
        this.canvas.on('after:render', () => {
            // 防止重复绘制
            if (!beforeRunder) return
            beforeRunder = false;
            // 绘制遮罩
            this.drawOverlay.apply(this, [props])
        })


    }
    drawOverlay(props: BoardPluginOptions) {
        //if (!this.overlay) return
        //this.overlay.set('dirty', true); 
        //const { width, height } = this.options
        const { ruler } = this.canvas
        const ctx = this.canvas.contextContainer;
        const zoom = this.canvas.getZoom()
        let { width: cw, height: ch } = this.canvas;
        let { width: bw, height: bh } = props
        let [, , , , vptX, vptY] = this.canvas.viewportTransform
        let left = 0, top = 0;
        console.log('drawOverlay', cw, ch, '-', vptX, vptY);
        console.log(ctx);
        bw *= zoom
        bh *= zoom


        if (ruler) {
            const { ruleSize } = ruler.options;
            top = ruleSize
            left = ruleSize
            cw -= ruleSize
            ch -= ruleSize
        }

        // 绘制遮罩,思路：画4个矩形，分别遮住4个边(负数为0)
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.rect(left, top, cw, vptY - top)
        ctx.rect(left, vptY + bh, cw, vptY)
        ctx.rect(left, top, vptX - left, ch)
        ctx.rect(vptX + bw, top, vptX + cw, ch)
        ctx.fill()
        ctx.restore()

    }

}

/* // 遮罩
        const overlayPub = {
            selectable: false,
            evented: false,
            excludeFromExport: true,
        }
        overlayProps = Object.assign({
            fill: '#000000',
        }, overlayProps, overlayPub)

        const oW = cw * 1.2
        const oH = ch * 1.2
        const oX = (cx + (oW-cw) / 2)
        const oY = (cy + (oH-ch) / 2)
        this.overlay = new Group([
            new Rect({ width: oW, height: oH, stroke: 'red', fill: '', }),
            new Rect({ ...overlayProps, width: oW, height: oY }),
            new Rect({ ...overlayProps, width: oX, height: oH, left: oX + width, top: 0 }),
            new Rect({ ...overlayProps, width: oW, height: oY, left: 0, top: oY + height }),
            new Rect({ ...overlayProps, width: oX, height: oH }),
        ], {
            ...overlayPub,
            left: -oX,
            top: -oY,
            opacity: 0.5,
        })
        this.canvas.add(this.overlay)
        this.canvas.preserveObjectStacking = true;
        this.canvas.on('after:render', () => {
            this.canvas.bringObjectToFront(this.overlay!)
            const currentZoom = this.canvas.getZoom();
            if (currentZoom !== zoom) {
                zoom = currentZoom
                this.overlay?.set('dirty', true); 
            }
        })
        */