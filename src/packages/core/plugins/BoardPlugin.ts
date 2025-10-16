import { Rect } from 'fabric'
import Background from '../extension/object/Background'
import type { Canvas } from 'fabric'
import type { IPluginOption, IPluginTempl, IFabricCore } from '../interface/plugin'
import type { BackgroundProps } from '../extension/object/Background'



export default class BoardPlugin implements IPluginTempl {
    static name = 'Board'
    static events: string[] = []
    static expose: string[] = ['addBoard']
    canvas: Canvas
    core: IFabricCore
    options: IPluginOption
    hotkeyEvent?: (name: string, e: KeyboardEvent) => void;

    constructor(canvas: Canvas, core: IFabricCore, options: IPluginOption) {
        this.canvas = canvas
        this.core = core
        this.options = options
    }

    addBoard(props: BackgroundProps) {
        const { width: cw, height: ch } = this.canvas
        const { width, height } = props
        const x = (cw - width) / 2
        const y = (ch - height) / 2
        const board = new Background(props)
        this.canvas.add(board)
        this.canvas.setViewportTransform([1, 0, 0, 1, x, y])

        const _maskW = cw * 2
        const _maskH = ch * 2
        const _maskX = (_maskW / 2) - width / 2
        const _maskY = (_maskH / 2) - height / 2

        const mask = new Rect({
            left: -_maskX,
            top: -_maskY,
            width: _maskW,
            height: _maskH,
            fill: 'rgba(150, 150, 150, 0.7)', // 半透明黑色  
            selectable: false,
            evented: false,
            excludeFromExport: true // 导出时不包含  
        });
        const mask_clip = new Rect({
            ...board,
            left: -width / 2,
            top: -height / 2,
        })
        // 将 canvas 的 clipPath 作为遮罩的反向 clipPath  
        mask.clipPath = mask_clip;
        mask.clipPath.inverted = true; // 反向裁剪,只显示 clipPath 外部
        this.canvas.add(mask)
        this.canvas.bringObjectToFront(mask)

        this.canvas.on('object:added', (e) => {
            //if (e.target === mask) {}
            //console.log(e);

            this.canvas.bringObjectToFront(mask)
        })
        //this.canvas.clipPath = board;
        //this.canvas.overlayColor = 'rgba(0, 0, 0, 0.5)'

        console.log('addBoard', board);
        //const bg = new Rect({ ...props, fill: '#ffee99', excludeFromExport: true });
        //this.canvas.add(bg)
        //this.canvas.sendObjectToBack(bg)

    }

}