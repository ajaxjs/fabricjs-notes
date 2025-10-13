import { Canvas } from 'fabric'
import type { CanvasOptions } from 'fabric';
import type { IFabricCore, IPluginTempl, IPluginOption, IPluginClass, IPluginClass2 } from './interface'
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import FabricRuler from './built-In/fabricRuler';

class FabricCore {
    protected _mountEl: HTMLElement | null = null;
    protected _canvasDom: HTMLCanvasElement | null = null;
    protected canvas: Canvas | null = null;
    protected options: CanvasOptions;
    // 插件map
    protected plubinMap = new Map<string, [IPluginTempl, IPluginOption | undefined]>()
    // 插件实例map
    protected plugins = new Map<string, IPluginClass2>()
    constructor(options?: CanvasOptions) {
        this.options = options || {} as CanvasOptions;
    }
    // 获取canvas实例
    getCanvas(): Canvas {
        if (!this.canvas) {
            throw new Error('canvas is not mounted')
        }
        return this.canvas
    }
    // 挂载canvas
    mount(target: HTMLCanvasElement | string) {
        const mountEl: HTMLCanvasElement | null = typeof target === 'string' ? document.querySelector(target) : target;
        if (!mountEl) {
            throw new Error('mount element not found')
        }
        this._mountEl = mountEl
        const { width, height } = mountEl.getBoundingClientRect()
        // 创建画布Dom
        this._canvasDom = document.createElement('canvas')
        mountEl.appendChild(this._canvasDom)

        // 安装插件
        this._installPlugins()

        // 画布
        this.canvas = new Canvas(this._canvasDom, {
            ...this.options,
            width,
            height,
        })
        new FabricRuler(this.canvas);

        // 监听mountEl resize事件
        const resizeFn = useDebounceFn(([entry]) => {
            const { width, height } = entry!.contentRect
            this.canvas!.setDimensions({ width, height })
        }, 200)
        useResizeObserver(this._mountEl, resizeFn)

        return this;
    }
    // 注册插件
    use(plugin: IPluginTempl, options?: IPluginOption) {
        if (this.canvas) {
            throw new Error('Please use plugins before mounting')
        }
        const { pluginName } = plugin
        if (this.plubinMap.has(pluginName)) {
            throw new Error(`plugin ${pluginName} already used`)
        }
        this.plubinMap.set(pluginName, [plugin, options])
    }
    // 安装插件
    protected _installPlugins() {
        // mounted后安装插件
        this.plubinMap.forEach(([plugin, options]) => {
            const pluginInstance = new (plugin as IPluginClass)(this.canvas!, this, options)
            this.plugins.set(plugin.pluginName, pluginInstance)
        })
    }
    // 销毁canvas
    destroy() {
        if (this.canvas) {
            console.log('destroy canvas');
            this.canvas.destroy();
            this.canvas = null;
            this._mountEl?.querySelectorAll('canvas').forEach((item) => item.remove());
            this._mountEl = null;
            this._canvasDom = null;
        }
    }
}

export default FabricCore