import { Canvas } from 'fabric'
import type { CanvasOptions } from 'fabric';
import type { IFabricCore, IPluginTempl, IPluginOption } from './interface'

class FabricCore {
    protected _mountEl: HTMLElement | null = null;
    protected _canvasDom: HTMLCanvasElement | null = null;
    protected canvas: Canvas | null = null;
    protected options: CanvasOptions;
    protected plubinMap = new Map<string, [IPluginTempl, IPluginOption | undefined]>()
    constructor(options?: CanvasOptions) {
        this.options = options || {} as CanvasOptions;
    }
    getCanvas(): Canvas {
        if (!this.canvas) {
            throw new Error('canvas is not mounted')
        }
        return this.canvas
    }
    mount(target: HTMLCanvasElement | string) {
        const mountEl: HTMLCanvasElement | null = typeof target === 'string' ? document.querySelector(target) : target;
        if (!mountEl) {
            throw new Error('mount element not found')
        }
        this._mountEl = mountEl
        const { width, height } = mountEl.getBoundingClientRect()
        this._canvasDom = document.createElement('canvas')
        this._canvasDom.width = width
        this._canvasDom.height = height
        mountEl.appendChild(this._canvasDom)
        console.log('this._canvasDom', this._canvasDom);
        // 画布
        this.canvas = new Canvas(this._canvasDom, {
            ...this.options,
            selection: true,
            width,
            height,
        })
        // 安装插件
        this._install()

        this.canvas.renderAll()
        return this;
    }
    // 注册插件
    use(plugin: IPluginTempl, options?: IPluginOption) {
        const pluginName = plugin.pluginName
        if (this.plubinMap.has(pluginName)) {
            throw new Error(`plugin ${pluginName} already used`)
        }
        this.plubinMap.set(pluginName, [plugin, options])
    }
    // 安装插件
    protected _install() {
        // mounted后安装插件
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