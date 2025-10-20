import type { FabricCore } from '../'
import type { FabricCanvas } from '../built-In/fabricCanvas'

export interface IFabricCore extends FabricCore {
     [key: string]: any;
}

// 生命周期事件类型
export type IEditorHooksType =
    | 'hookImportBefore'
    | 'hookImportAfter'
    | 'hookSaveBefore'
    | 'hookSaveAfter'
    | 'hookTransform';

// 插件实例
export declare class IPluginTempl {
    constructor(canvas: FabricCanvas, core: IFabricCore, options?: IPluginOption);
    static name: string;
    static events: string[];
    static expose: string[];
    static hotkeys: IHotkey[];
    hotkeyEvent?: (name: string, e: KeyboardEvent) => void;
    hookImportBefore?: (...args: unknown[]) => Promise<unknown>;
    hookImportAfter?: (...args: unknown[]) => Promise<unknown>;
    hookSaveBefore?: (...args: unknown[]) => Promise<unknown>;
    hookSaveAfter?: (...args: unknown[]) => Promise<unknown>;
    hookTransform?: (...args: unknown[]) => Promise<unknown>;
    canvas?: FabricCanvas;
    core?: IFabricCore;
    [propName: string]: any;
}

export declare interface IPluginOption {
    [propName: string]: unknown | undefined;
}

export declare class IPluginClass2 extends IPluginTempl {
    constructor();
}
// 插件class
export declare interface IPluginClass {
    new(canvas: FabricCanvas, core: IFabricCore, options?: IPluginOption): IPluginClass2;
}

export type IPluginMap = Map<string, [IPluginTempl, IPluginOption | undefined]>

export declare interface IPluginMenu {
    text: string;
    command?: () => void;
    child?: IPluginMenu[];
}


// 定义快捷按键类型
export type IHotkey = {
    hotkey: string;   // 快捷按键
    label: string;     // 快捷按键描述
    handler?: (e: KeyboardEvent) => void; // 快捷按键触发事件(为空时，类初始化时中绑定)
}
