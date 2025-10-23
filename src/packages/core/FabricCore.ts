//import { Canvas } from 'fabric'
import hotkeys from 'hotkeys-js';
import type { CanvasOptions } from 'fabric';
import type { IPluginMap, IPluginTempl, IPluginOption, IPluginClass, IPluginClass2 } from './interface'
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

class FabricCore {
    protected _wrapper: HTMLElement | null = null;
    protected _canvasDom: HTMLCanvasElement | null = null;
    protected canvas: FabricCanvas | null = null;
    protected options: CanvasOptions;
    // 插件map
    protected plubinMap: IPluginMap = new Map()
    // 插件实例map
    protected plugins: Record<string, IPluginClass2> = {};
    [key: string]: any;

    constructor(options?: CanvasOptions) {
        this.options = options || {} as CanvasOptions;
        // hotkeys('*', e => console.log(e))
    }
    get wrapper(): HTMLElement | null {
        return this._wrapper
    }
    // 获取canvas实例
    getCanvas(): FabricCanvas {
        if (!this.canvas) {
            throw new Error('canvas is not mounted')
        }
        return this.canvas
    }
    // 挂载canvas
    mount(target: HTMLCanvasElement | string) {
        const wrapper: HTMLCanvasElement | null = typeof target === 'string' ? document.querySelector(target) : target;
        if (!wrapper) {
            throw new Error('mount element not found')
        }
        wrapper.style.position = 'relative';
        this._wrapper = wrapper
        const { width, height } = wrapper.getBoundingClientRect()
        // 创建画布Dom
        this._canvasDom = document.createElement('canvas')
        wrapper.appendChild(this._canvasDom)

        // 画布
        this.canvas = new FabricCanvas(this._canvasDom, {
            ...this.options,
            width,
            height,
        })
        // 内置插件
        new FabricRuler(this.canvas);
        new FabricGuide(this.canvas);
        // 画板插件
        this.canvas.use(FabricFrame);
        // 内置热键插件
        this.canvas.use(FabricHotkey);
        // 基础控制插件
        this.canvas.use(FabricControl);
        // 历史记录插件
        this.canvas.use(FabricHistory);
        // 对齐插件
        this.canvas.use(FabricAlign);

        // 安装插件
        this.plubinMap.forEach(([plugin, options]) => this._pluginInstaller(plugin, options))
        //initAligningGuidelines(this.canvas)

        // 监听wrapper resize事件
        const resizeFn = useDebounceFn(([entry]) => {
            const { width, height } = entry!.contentRect
            if(this.canvas){
                this.canvas.setDimensions({ width, height })
                this.canvas.fire('canvas:resize', { width, height })
            }
        }, 200)
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
        this.canvas = null;
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