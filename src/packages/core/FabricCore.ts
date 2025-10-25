//import { Canvas } from 'fabric'
import hotkeys from 'hotkeys-js';
import type { CanvasOptions } from 'fabric';
import type { IPluginMap, IPluginTempl, IPluginOption, IPluginClass, IPluginClass2, IPluginOptionMap } from './interface'
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import { FabricRuler } from './built-In/fabricRuler';
import { FabricGuide } from './built-In/fabricGuide';
import { FabricCanvas } from './built-In/fabricCanvas';
import { FabricFrame } from './built-In/fabricFrame';
import { FabricHotkey } from './built-In/fabricHotkey';
import { FabricControl } from './built-In/fabricControl';
import { FabricHistory } from './built-In/fabricHistory';
import { FabricAlign } from './built-In/fabricAlign';
//import { initAligningGuidelines } from './built-In/Guideline';

// 定义回调函数类型
type EditorReadyCallback = (editor: FabricCore) => void;

// 存储回调与实例的映射
interface CallbackEntry {
    instanceId: string;
    callback: EditorReadyCallback;
}
// 存储所有注册的回调
const editorReadyCallbacks: CallbackEntry[] = [];
// 存储所有实例
const editorInstances: Record<string, FabricCore> = {};

// 钩子函数，用于注册回调
export function onEditorReady(callback: EditorReadyCallback, instanceId?: string): void {
    instanceId = instanceId || '';
    const entry: CallbackEntry = { instanceId, callback };
    editorReadyCallbacks.push(entry);
    // 触发延时挂载
    if (editorInstances[instanceId]) {
        entry.callback(editorInstances![instanceId]!);
    }
    
}

class FabricCore {
    protected id: string = '';
    protected _wrapper: HTMLElement | null = null;
    protected _canvasDom: HTMLCanvasElement | null = null;
    protected _canvas: FabricCanvas | null = null;
    protected options: CanvasOptions;
    // 插件map
    protected plubinMap: IPluginMap = new Map()
    protected pluginOptionsMap: IPluginOptionMap = {};
    // 插件实例map
    protected plugins: Record<string, IPluginClass2> = {};
    [key: string]: any;

    constructor(options?: any, pluginOptionsMap?: IPluginOptionMap) {
        this.options = options as CanvasOptions;
        // 初始化插件配置
        if (pluginOptionsMap) this.pluginOptionsMap = pluginOptionsMap;
        // hotkeys('*', e => console.log(e))
    }
    get wrapper(): HTMLElement | null {
        return this._wrapper
    }
    get canvas(): FabricCanvas {
        if (!this._canvas) {
            throw new Error('canvas is not mounted')
        }
        return this._canvas
    }
    // 挂载canvas
    mount(target: HTMLCanvasElement | string) {
        const wrapper: HTMLCanvasElement | null = typeof target === 'string' ? document.querySelector(target) : target;
        if (!wrapper) {
            throw new Error('mount element not found')
        }

        wrapper.style.position = 'relative';
        wrapper.style.minWidth = '0px';
        this._wrapper = wrapper
        const { width, height } = wrapper.getBoundingClientRect();
        // 创建画布Dom
        this._canvasDom = document.createElement('canvas')
        wrapper.appendChild(this._canvasDom)

        // 画布
        const canvas = new FabricCanvas(this._canvasDom, {
            ...this.options,
            width,
            height,
        });
        this._canvas = canvas;
        // 标尺插件
        canvas.use(FabricRuler, this.pluginOptionsMap.ruler);
        // 网格插件
        canvas.use(FabricGuide);
        // 画板插件
        canvas.use(FabricFrame, this.pluginOptionsMap.frame);
        // 内置热键插件
        canvas.use(FabricHotkey);
        // 基础控制插件
        canvas.use(FabricControl);
        // 历史记录插件
        canvas.use(FabricHistory);
        // 对齐插件
        canvas.use(FabricAlign);
        // 安装插件
        this.plubinMap.forEach(([plugin, options]) => this._pluginInstaller(plugin, options))
        //initAligningGuidelines(canvas)

        
        // 存储实例
        editorInstances[this.id] = this as FabricCore;
        // 调用所有注册的editorReady回调函数
        //editorReadyCallbacks.forEach(callback => callback(canvas!, this));
        editorReadyCallbacks
            .filter(entry => entry.instanceId === this.id || entry.instanceId === '')
            .forEach(entry => entry.callback(this));

        // 监听wrapper resize事件
        const resizeFn = useDebounceFn(([entry]) => {
            const { width, height } = entry!.contentRect
            if (canvas) {
                canvas.setDimensions({ width, height })
                canvas.fire('canvas:resize', { width, height })
            }
        }, 10)
        useResizeObserver(this._wrapper, resizeFn)

        return this;
    }
    // 注册插件
    use(plugin: IPluginTempl, options?: IPluginOption) {
        const { name: pluginName } = plugin
        if (this.plubinMap.has(pluginName)) {
            throw new Error(`plugin ${pluginName} already used`)
        }
        this.plubinMap.set(pluginName, [plugin, options]);
        if (this.canvas) {
            this._pluginInstaller(plugin, options)
        }
    }

    protected _pluginInstaller(plugin: IPluginTempl, options?: IPluginOption) {
        if (!this.canvas) {
            throw new Error('canvas is not mounted')
        }
        const { pluginName, expose } = plugin;
        const pluginInstance = new (plugin as IPluginClass)(this.canvas, this, options)
        this.plugins[pluginName] = pluginInstance
        // 暴露插件方法
        expose.forEach((item: string) => {
            this[item] = pluginInstance[item].bind(pluginInstance)
        })
    }
    protected _destroy() {
        this._canvas = null;
        this._wrapper?.querySelectorAll('canvas').forEach((item) => item.remove());
        this._wrapper = null;
        this._canvasDom = null;
        hotkeys.unbind();
    }
    destroy() {
        if (this.canvas) {
            this.canvas.destroy();
            this._destroy()
        }
    }
    // 销毁canvas
    dispose() {
        return new Promise((resolve, reject) => {
            if (this.canvas) {
                this.canvas.dispose().then(() => {
                    this._destroy()
                    resolve(true)
                }).catch((err) => {
                    reject(err)
                })
            } else {
                resolve(true)
            }
        })
    }
}

export default FabricCore
