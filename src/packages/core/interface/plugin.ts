import type { FabricCore } from '../'
import type { Canvas } from 'fabric'

export interface IFabricCore extends FabricCore { }

// 生命周期事件类型
export type IEditorHooksType =
    | 'hookImportBefore'
    | 'hookImportAfter'
    | 'hookSaveBefore'
    | 'hookSaveAfter'
    | 'hookTransform';

// 插件实例
export declare class IPluginTempl {
    constructor(canvas: Canvas, core: IFabricCore, options?: IPluginOption);
    static pluginName: string;
    static events: string[];
    static expose: string[];
    hotkeyEvent?: (name: string, e: KeyboardEvent) => void;
    hookImportBefore?: (...args: unknown[]) => Promise<unknown>;
    hookImportAfter?: (...args: unknown[]) => Promise<unknown>;
    hookSaveBefore?: (...args: unknown[]) => Promise<unknown>;
    hookSaveAfter?: (...args: unknown[]) => Promise<unknown>;
    hookTransform?: (...args: unknown[]) => Promise<unknown>;
    [propName: string]: any;
    canvas?: Canvas;
    core?: IFabricCore;
}

export declare interface IPluginOption {
    [propName: string]: unknown | undefined;
}

declare class IPluginClass2 extends IPluginTempl {
    constructor();
}
// 插件class
export declare interface IPluginClass {
    new(canvas: Canvas, core: IFabricCore, options?: IPluginOption): IPluginClass2;
}

export declare interface IPluginMenu {
    text: string;
    command?: () => void;
    child?: IPluginMenu[];
}