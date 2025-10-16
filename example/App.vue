<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import { Editor } from '@/packages/editor'
import { random } from 'es-toolkit'

import { Rect, Ellipse, Triangle } from 'fabric'



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
	console.log(w, h);
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
		multiplier: 1,      // 缩放倍数,默认 1  
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
</script>

<template>
	<div class="w-screen h-screen border-gray-200 flex flex-col overflow-hidden p-5">
		<div class="p-1 flex gap-1">
			<Button variant="outline">Click me</Button>
			<Button variant="outline" @click="addShape({})">Add Shap</Button>
			<Button variant="outline" @click="addShape({ left: 0, top: 0 })">Add 0</Button>
			<Button variant="outline" @click="setZoom(0.2)">Zoom+</Button>
			<Button variant="outline" @click="setZoom(-0.2)">Zoom-</Button>
			<div class="flex-1"></div>
			<DropdownMenu :items="exportMenu">
				<Button variant="outline">Export</Button>
			</DropdownMenu>
			<!--<Button variant="outline" @click="destroyEditor">Destroy</Button>-->
		</div>
		<Editor ref="editorRef" class="flex-1" />
	</div>
</template>

<style lang="scss" scoped></style>
