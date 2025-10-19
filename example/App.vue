<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import {
	ButtonGroup
} from '@/components/ui/button-group'


import { Editor } from '@/packages/editor'
import { random } from 'es-toolkit'
import { FabricCanvas } from '@/packages/core/built-In/fabricCanvas'

import { Rect, Ellipse, Triangle, IText, Path, FabricText, FabricImage } from 'fabric'
import { PencilBrush, CircleBrush, SprayBrush, PatternBrush } from 'fabric'
// import { ArcText } from '@/packages/core/extension/object/ArcText'

let icanvas: FabricCanvas | null = null;



// const pathObject = new Path('M 0 0 A 20 20 0 0 1 200 0', {
// 	fill: 'transparent',
// 	stroke: 'grey',
// 	strokeWidth: 1
// });
const makePath = (textObj: FabricText) => {
	const textWidth = textObj.calcTextWidth(); // 计算文字总宽度  
	const radius = textWidth / Math.PI; // 根据文字宽度计算半径  

	// 创建足够长的弧线  
	const pathString = `M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`;
	return new Path(pathString, {
		fill: 'transparent',
		stroke: 'grey',
		strokeWidth: 1
	});
};

const editorRef = ref()
// Editor cleanup function is handled elsewhere
function getCanvas() {
	const { editor } = editorRef.value
	return editor.getCanvas()
}

function setZoom(z: number) {
	const canvas = getCanvas()
	const zoom = canvas.getZoom()
	console.log(zoom);
	canvas.setZoom(zoom + z)
	canvas.renderAll()
}
function addShape(options: any) {
	const canvas = getCanvas()
	const shapes = [Ellipse, Rect, Triangle]
	// 使用Math.floor确保返回整数索引
	const rid = Math.floor(random(0, shapes.length))
	const { width: w, height: h } = canvas;
	const width = Math.floor(random(50, 100))
	const height = Math.floor(random(50, 100))
	const left = Math.floor(random(100, w - width - 200))
	const top = Math.floor(random(100, h - height - 200))
	const fill = `#${Math.floor(Math.random() * 0x666666).toString(16).padStart(6, '0')}`

	const size = rid ? { width, height } : { rx: height, ry: width }
	const opts = {
		left: left,
		top: top,
		fill: fill,
		...size,
		...options
	}
	// 确保shapes[rid]是构造函数
	if (typeof shapes[rid] === 'function') {
		const shape = new (shapes[rid] as new (options: any) => any)(opts)
		canvas.add(shape)
		console.log('Shape added:', shape.type, opts)
	} else {
		console.error('Invalid shape constructor at index:', rid, shapes[rid])
	}
}
const exportJson = () => {
	const canvas = getCanvas()
	const json = canvas.toJSON()
	console.log(json);
}
const exportPng = () => {
	const canvas = getCanvas()
	canvas.toBlob({
		format: 'png',      // 'png' 或 'jpeg',默认 'png'  
		quality: 1,         // 0-1 之间,仅用于 jpeg,默认 1  
		multiplier: 12,      // 缩放倍数,默认 1  
		enableRetinaScaling: false  // 是否启用 Retina 缩放,默认 false 
	}).then((blob: Blob) => {
		console.log(blob);
		const a = document.createElement('a')
		a.href = URL.createObjectURL(blob)
		a.download = 'canvas.png'
		a.click()
	}).catch((err: any) => {
		console.log(err);
	})
}
const exportSvg = () => {
	const canvas = getCanvas()
	const svg = canvas.toSVG({
		format: 'svg',      // 'svg' 或 'json',默认 'svg'  
		multiplier: 1,      // 缩放倍数,默认 1  
		enableRetinaScaling: false  // 是否启用 Retina 缩放,默认 false 
	})
	console.log(svg);
}

const exportMenu = [
	{ label: 'Export as JSON', onClick: exportJson },
	{ label: 'Export as PNG', onClick: exportPng },
	{ label: 'Export as SVG', onClick: exportSvg },
]

function importJson() {
	const json = window.prompt('Are you sure you want to import?')
	if (!json || !icanvas) {
		return
	}
	//console.log(json);
	icanvas.loadFromJSON(json).then((canvas) => canvas.requestRenderAll());
}
function onEditorMounted(canvas: FabricCanvas) {
	icanvas = canvas
	console.log('-onEditorMounted', canvas);
	//testArcText(canvas)
	// 初始化canvas尺寸
	canvas.frame.setFrame({
		width: 400,
		height: 600,
		fill: '#ffffff',
	})
	// canvas.backgroundColor = '#f0f0f0'
}

function testArcText(canvas: FabricCanvas) {

	const arcText = new IText('HelloWorld!', {
		left: 100,
		top: 100,
		fill: '#ff0000',
		lineHeight: 1.5,
		fontSize: 40,
		//charSpacing: -50,
		//editable: true,
	})

	const pathObject = makePath(arcText);

	arcText.set('path', pathObject);
	arcText.set('pathStartOffset', 0);
	setTimeout(() => {
		console.log(arcText.__charBounds[0]);
	}, 0);

	arcText.on('editing:entered', () => {
		arcText.set('path', null)
		console.log('editing:entered');
	})
	arcText.on('editing:exited', () => {
		arcText.set('path', pathObject);
		console.log('editing:exited');
	})

	canvas.add(arcText)
}

function addImage(e: any) {
	const canvas = getCanvas()
	const file = e.target.files[0]
	if (!file) {
		return
	}
	const reader = new FileReader()
	reader.onload = (e: any) => {
		const { width: w, height: h } = canvas.frame;
		const img = new Image()
		img.src = e.target.result as string
		img.onload = () => {
			let { width, height } = img;
			const imgProps: any = {
				left: 10,
				top: 10,
			};

			const fabricImg = new FabricImage(img, imgProps)

			if (width > w) {
				const scale = (w * 0.8) / width;
				width *= scale;
				height *= scale;
				fabricImg.scaleToWidth(width)
			}
			if (height > h) {
				const scale = (h * 0.8) / height;
				width *= scale;
				height *= scale;
				fabricImg.scaleToHeight(height)
			}


			canvas.add(fabricImg)
			canvas.setActiveObject(fabricImg)
			canvas.renderAll()
		}
	}
	reader.readAsDataURL(file)
}


// 切换工具
const brashTools = [
	{ label: '铅笔', value: PencilBrush },
	{ label: '圆刷', value: CircleBrush },
	{ label: '喷刷', value: SprayBrush },
	{ label: '图案刷', value: PatternBrush }
]
const activeTool = ref('move')
const setActiveTool = (name: string, brash?: any) => {
	const canvas = getCanvas()
	activeTool.value = name
	if (brash) {
		canvas.setActiveTool(name, new brash.selected.value(canvas))
	}else{
		canvas.activeTool = name
	}
}
</script>

<template>
	<div class="w-screen h-screen border-gray-200 flex flex-col overflow-hidden p-5">
		<div class="p-1 flex gap-1">
			<Button as="label" variant="outline">
				Add Img
				<input type="file" accept="image/*" @change="addImage" class="hidden" />
			</Button>
			<Button variant="outline" @click="addShape({})">Add Shap</Button>
			<Button variant="outline" @click="addShape({ left: 0, top: 0 })">Add 0</Button>
			<Button variant="outline" @click="setZoom(0.2)">Zoom+</Button>
			<Button variant="outline" @click="setZoom(-0.2)">Zoom-</Button>

			<div class="flex-1"></div>
			<Button variant="outline" @click="importJson">Import</Button>
			<DropdownMenu :items="exportMenu">
				<Button variant="outline">Export</Button>
			</DropdownMenu>
			<!--<Button variant="outline" @click="destroyEditor">Destroy</Button>-->
		</div>
		<Editor ref="editorRef" class="flex-1" @mounted="onEditorMounted" />
		<div class="flex gap-2 pt-2">
			<ButtonGroup>
				<Button variant="outline" :class="{ 'text-blue-500': activeTool === 'move' }"
					@click="setActiveTool('move')">选择</Button>
				<Button variant="outline" :class="{ 'text-blue-500': activeTool === 'pan' }"
					@click="setActiveTool('pan')">移动</Button>
				<DropdownMenu :items="brashTools" @selected="(brash) => setActiveTool('brash', brash)">
					<Button variant="outline" :class="{ 'text-blue-500': activeTool === 'brash' }">绘制</Button>
				</DropdownMenu>
			</ButtonGroup>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
