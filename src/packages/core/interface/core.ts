
import type { FabricCanvas } from '../built-In/fabricCanvas'
import type { IHotkey } from '../interface'

// 插件实例
export declare class CorePluginTemp {
    static pluginName: string;
    hotkeys: IHotkey[];
    constructor(canvas: FabricCanvas);
}

declare class IPluginClass2 extends CorePluginTemp {
  constructor();
}
export declare interface CorePluginClass {
    pluginName: string;
    hotkeys: IHotkey[];
    new(canvas: FabricCanvas): IPluginClass2;
}


// Frame 参数
export interface IFrameOptions {
    width: number
    height: number
    fill: string
    overlayFill: string
}

// 滚轮工具
export type IWheelTool = 'zoom' | 'scroll';
// 光标工具
export type ICursorTool = 'move' | 'pan' | 'draw';