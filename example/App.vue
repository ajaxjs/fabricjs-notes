<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import { Editor } from '@/packages/editor'
import { random, sample } from 'es-toolkit'

import { Rect, Circle, Triangle } from 'fabric'



const editorRef = ref()
function destroyEditor() {
	console.log(editorRef.value);
	if (editorRef.value) {

		editorRef.value.editor.destroy()
	}
}
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
	const shapes = [Rect, Circle, Triangle]
	const Shape: any = sample(shapes);
	const { width: w, height: h } = canvas;
	console.log(w, h);
	const width = random(50, 100)
	const height = random(50, 100)
	const left = random(0, w - width-100)
	const top = random(0, h - height-100)
	const fill = `#${Math.floor(Math.random() * 0x666666).toString(16).padStart(6, '0')}`


	const rect = new Shape({
		left: left,
		top: top,
		width: width,
		height: height,
		fill: fill,
		...options
	})
	console.log(rect);
	

	canvas.add(rect)
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
			<Button variant="outline" @click="addShape">Add Shap</Button>
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
