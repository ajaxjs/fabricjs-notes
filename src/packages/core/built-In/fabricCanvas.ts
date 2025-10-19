import hotkeys from 'hotkeys-js';
import { Canvas, FabricObject } from 'fabric';
import type { CanvasOptions, TSVGExportOptions, TSVGReviver } from 'fabric';
import type { CorePluginClass } from '../interface/core'
import type { IHotkey, IWheelTool, ICursorTool } from '../interface';
import { isCollection, isImage } from '../utils/check'
import type { TDataUrlOptions } from 'fabric';

export class FabricCanvas extends Canvas {
	[key: string]: any;
	// 注册插件列表
	pluginMap: string[] = []
	// 当前光标操作工具 (move:移动, pan：平移, draw:绘制)
	cursorTool: ICursorTool = 'move';
	// 滚轮工具
	wheelTool: IWheelTool = 'scroll';
	constructor(el: string | HTMLCanvasElement, options: CanvasOptions) {
		super(el, options)
		// 导入自定义属性
		FabricObject.customProperties = ['index', 'selectable', 'evented']
	}
	// 重写添加对象
	override add(...objects: FabricObject[]): number {
		return super.add(...this.resetObject(objects))
	}
	// 重写插入对象
	override insertAt(index: number, ...object: FabricObject[]): number {
		return super.insertAt(index, ...this.resetObject(object))
	}
	private resetObject(objects: FabricObject[]) {
		return objects.map((item) => {
			// 元素索引从0开始
			if (!item.hasOwnProperty('index')) {
				const index = this._objects.length ? Math.max(...this._objects.map((vo) => vo.index + 1)) : 0
				item.set({ index })
			}
			// 递归处理集合对象
			if (isCollection(item)) {
				this.resetObject(item._objects)
			}
			return item
		})
	}
	// 重写设置光标
	override setCursor(value: CSSStyleDeclaration['cursor']): void {
		this.upperCanvasEl && super.setCursor(value);
	}
	// 重写导出blob
	override toBlob(options?: TDataUrlOptions) {
		if (this.frame) {
			// 按clipPath导出
			this.clipPath = this.frame.clipPath;
			const blob: any = super.toBlob(options);
			this.clipPath = undefined;
			this.requestRenderAll();
			return blob;
		}
		return super.toBlob()
	}
	// 重写导出svg
	override toSVG(options?: TSVGExportOptions, reviver?: TSVGReviver): string {
		if (this.frame) {
			const { width, height, left, top } = this.frame;
			// 导出svg时，需要将画布复位到原始位置
			this.setViewportTransform([1, 0, 0, 1, 0, 0]);
			options = {
				...options,
				viewBox: { width, height, x: 0, y: 0 },
				width,
				height,
			}

			// 按clipPath导出
			this.clipPath = this.frame.clipPath;
			const svg: string = super.toSVG(options, reviver);
			// 导出svg后，需要将画布复位到原始位置
			this.clipPath = undefined;
			this.setViewportTransform([1, 0, 0, 1, left, top]);
			this.requestRenderAll();
			return svg;
		}
		return super.toSVG(options, reviver);
	}
	// 注册插件
	use(plugin: any) {
		const { pluginName } = plugin;
		if (!pluginName) {
			throw new Error('pluginName is required');
		} else if (this[pluginName.toLowerCase()]) {
			throw new Error(`${pluginName} is exist`);
		}
		const pluginKey = pluginName.toLowerCase();
		// 实例化插件
		const pluginInstance = new (plugin as CorePluginClass)(this)
		// 绑定快捷键
		pluginInstance.hotkeys.forEach((item: IHotkey) => {
			const { hotkey, handler } = item
			if (handler) {
				hotkeys(hotkey, (e: KeyboardEvent) => {
					e.preventDefault();
					handler.call(pluginInstance, e)
				})
			}
		})
		// 注册到实例
		this[pluginKey] = pluginInstance
		// 注册到插件列表
		this.pluginMap.push(pluginKey)
	}
	// 重写销毁canvas
	override async dispose(): Promise<boolean> {
		return super.dispose().then((res) => {
			// 移除所有事件
			hotkeys.unbind()
			// 销毁所有插件
			this.pluginMap.forEach((key) => {
				this[key].dispose && this[key].dispose()
			})
			return res
		})
	}
}