import type { CorePluginTemp, IHotkey } from '../interface'
import type { FabricCanvas } from './fabricCanvas'

export class FabricExample implements CorePluginTemp {
    name = 'example'
    hotkeys: IHotkey[] = []
    canvas: FabricCanvas;
    constructor(canvas: FabricCanvas) {
        this.canvas = canvas;
    }
}