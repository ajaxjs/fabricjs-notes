import { Canvas } from 'fabric';
import type { CanvasOptions, TMat2D } from 'fabric';
import { FabricRuler } from './fabricRuler';
import hotkeys from 'hotkeys-js';
import { Group } from 'fabric';


export class FabricCanvas extends Canvas {
	ruler?: FabricRuler
	constructor(el: string | HTMLCanvasElement, options: CanvasOptions) {
		super(el, options)

		// 组合选中对象
		hotkeys('ctrl+g', (e) => {
			const activeObjects = this.getActiveObjects()

			if (activeObjects.length > 1) {
				e.preventDefault();
				const group = new Group(activeObjects)
				this.add(group)
				this.remove(...activeObjects)
				this.setActiveObject(group)
				console.log(activeObjects, group);
			}
		})
		// 取消组合选中对象
		hotkeys('ctrl+shift+g', (e) => {
			e.preventDefault();
			const activeObjects = this.getActiveObjects()

			activeObjects.forEach((item) => {
				if (item instanceof Group) {
					console.log('取消组合选中对象', item);
					this.add(...item.removeAll())
					this.remove(item)
				}
			})

			//this.discardActiveObject()
			this.requestRenderAll()

		})

		// 删除
		hotkeys('delete', () => {
			this.getActiveObjects().forEach((item) => {
				this.remove(item)
				this.requestRenderAll();
				this.discardActiveObject();
			})
		})
		// 平移画布
		let isPanning = false;
		let lastPosX = 0;
		let lastPosY = 0;
		// 监听键盘按下事件  
		document.addEventListener('keydown', (e: any) => {
			if (e.code === 'Space' && !isPanning) {
				e.preventDefault();
				isPanning = true;
				this.selection = false; // 禁用选择功能  
				this.setCursor('grab');
			}
		});

		// 监听键盘释放事件  
		document.addEventListener('keyup', (e) => {
			if (e.code === 'Space') {
				this.setCursor('default');
				isPanning = false;
				this.selection = true; // 恢复选择功能  
			}
		});

		// 监听鼠标按下事件  
		this.on('mouse:down', (opt) => {
			if (isPanning) {
				const evt: any = opt.e;
				this.setCursor('grabbing');
				lastPosX = evt.clientX;
				lastPosY = evt.clientY;
			}
		});

		// 监听鼠标移动事件  
		this.on('mouse:move', (opt) => {
			const evt: any = opt.e;
			if (isPanning && evt.buttons === 1) {
				this.setCursor('grabbing');
				const vpt = this.viewportTransform.slice() as TMat2D;
				vpt[4] += evt.clientX - lastPosX;
				vpt[5] += evt.clientY - lastPosY;
				this.setViewportTransform(vpt);
				lastPosX = evt.clientX;
				lastPosY = evt.clientY;
			}
		});

		// 监听鼠标释放事件  
		this.on('mouse:up', () => {
			if (isPanning) {
				this.setCursor('grab');
			}
		});


		// 缩放画布
		this.on('mouse:wheel', (opt) => {
			const delta = opt.e.deltaY;
			const zoom = this.getZoom();
			const point: any = { x: opt.e.offsetX, y: opt.e.offsetY };

			// 限制缩放范围
			if (delta < 0 && zoom < 3) {
				// 放大
				this.zoomToPoint(point, zoom * 1.1);
			} else if (delta > 0 && zoom > 0.1) {
				// 缩小
				this.zoomToPoint(point, zoom / 1.1);
			}

			opt.e.preventDefault();
			opt.e.stopPropagation();
		})


	}
}