import hotkeys from 'hotkeys-js';
import { Canvas, classRegistry, FabricObject } from 'fabric';
import type { TOptions, CanvasOptions, TSVGExportOptions, TSVGReviver } from 'fabric';
import type { CorePluginClass } from '../interface/core'
import type { IHotkey, IWheelTool, ICursorTool } from '../interface';
import { isCollection } from '../utils/check'
import type { TDataUrlOptions } from 'fabric';

export class FabricCanvas extends Canvas {
	[key: string]: any;
	// 注册插件列表
	pluginMap: string[] = []
	// 当前光标操作工具 (move:移动, pan：平移, brash:笔刷)
	protected _activeTool: ICursorTool = 'move';
	// 滚轮工具
	wheelTool: IWheelTool = 'scroll';
	constructor(el: string | HTMLCanvasElement, options: TOptions<CanvasOptions>) {
		super(el, options)
		// 导入自定义属性
		FabricObject.customProperties = ['index', 'label', 'selectable', 'evented']
		// 控制点的大小（像素）
		FabricObject.ownDefaults.cornerSize = 8
		// 设置选中对象边框的颜色
		FabricObject.ownDefaults.borderColor = 'blue'
		// 设置选中对象控制点的填充颜色
		FabricObject.ownDefaults.cornerColor = 'white'
		// 设置选中对象控制点的描边颜色
		FabricObject.ownDefaults.cornerStrokeColor = '#c0c0c0'
		// 控制点是否透明，false表示不透明
		FabricObject.ownDefaults.transparentCorners = false
		
		// 画布变化事件
		const changeHandler = (e: any) => this.fire('canvas:change', e)
		// 对象修改事件
		this.on('object:modified', (e) => changeHandler({ ...e, action: 'modify' }));
		// 对象添加事件
		this.on('object:added', (e) => changeHandler({ ...e, action: 'add' }));
		// 对象移除事件
		this.on('object:removed', (e) => changeHandler({ ...e, action: 'remove' }));
	}
	get activeTool() {
		return this._activeTool
	}
	set activeTool(name: ICursorTool) {
		this._activeTool = name;
		if (this.isDrawingMode) {
			this.isDrawingMode = false;
			this.freeDrawingBrush = undefined;
		}
	}
	setActiveTool(name: ICursorTool, tool?: any) {
		// 普通实现，待优化
		if (name === 'brash') {
			if (this.freeDrawingBrush === tool) return
			//this.setCursor('crosshair')
			// 开启绘制模式
			this.isDrawingMode = true;
			// 笔刷实例
			this.freeDrawingBrush = tool;
			// 配置笔刷属性  
			this.freeDrawingBrush!.color = 'red';
			this.freeDrawingBrush!.width = 5;
		} else {
			this.isDrawingMode = false;
			this.freeDrawingBrush = undefined;
			//this.setCursor('default')
		}
		this._activeTool = name
	}
	// 重写添加对象
	override add(...objects: FabricObject[]): number {
		return super.add(...this.resetObject(objects))
	}
	// 重写插入对象
	override insertAt(index: number, ...object: FabricObject[]): number {
		return super.insertAt(index, ...this.resetObject(object))
	}
	// 重置对象默认值
	private resetObject(objects: FabricObject[]) {
		return objects.map((item) => {
			// 元素索引从0开始
			if (!item.hasOwnProperty('index')) {
				const index = this._objects.length ? Math.max(...this._objects.map((vo) => vo.index + 1)) : 0
				item.set({ index })
			}
			// 元素标签默认值
			if (!item.hasOwnProperty('label')) {
				item.set({ label: item.type + '-' + item.index })
			}
			// 递归处理集合对象
			if (isCollection(item)) {
				this.resetObject(item._objects)
			}
			return item
		})
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
	use(plugin: any, options?: any) {
		const { pluginName } = plugin;
		if (!pluginName) {
			throw new Error('pluginName is required');
		} else if (this[pluginName.toLowerCase()]) {
			throw new Error(`${pluginName} is exist`);
		}
		const pluginKey = pluginName.toLowerCase();
		// 实例化插件
		const pluginInstance = new (plugin as CorePluginClass)(this, options)
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
	// 从json创建对象
	objectFromJSON(json: any) {
		const ObjectClass: any = classRegistry.getClass(json.type);
		return ObjectClass.fromObject(json);
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