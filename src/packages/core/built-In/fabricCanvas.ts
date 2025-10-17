import { Canvas } from 'fabric';
import type { CanvasOptions, TMat2D, TSVGExportOptions, TSVGReviver } from 'fabric';
//import { FabricRuler } from './fabricRuler';
import type { CorePluginClass } from '../interface/core'
import type { IHotkey } from '../interface';

import hotkeys from 'hotkeys-js';
import { Group } from 'fabric';

import type { TDataUrlOptions } from 'fabric';

export class FabricCanvas extends Canvas {
	//ruler?: FabricRuler;
	//pluginMap: Record<string, CorePluginClass> = {};
	//exportClipPath?: Rect
	[key: string]: any;
	constructor(el: string | HTMLCanvasElement, options: CanvasOptions) {
		super(el, options)

		

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

	use(plugin: any) {
		const { pluginName } = plugin
		if (pluginName && this[pluginName.toLowerCase()]) {
			throw new Error(`${pluginName} is exist`);
		}
		const pluginInstance = new (plugin as CorePluginClass)(this)
		// 安装插件事件
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
		if (pluginName) {
			this[pluginName.toLowerCase()] = pluginInstance
		}
	}
}