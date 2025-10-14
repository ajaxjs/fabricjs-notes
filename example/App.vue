<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
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
function setZoom(z: number) {
	const { editor } = editorRef.value
	const canvas = editor.getCanvas()
	const zoom = canvas.getZoom()
	console.log(zoom);
	canvas.setZoom(zoom + z)
	canvas.renderAll()
}
function addShape() {
	const { editor } = editorRef.value
	const canvas = editor.getCanvas()
	const shapes = [Rect, Circle, Triangle]
	const Shape: any = sample(shapes);
	const { width:w, height:h } = canvas;
	console.log(w, h);
	const width = random(50, 100)
	const height = random(50, 100)
	const left = random(0, w - width)
	const top = random(0, h - height)
	const randomNum = Math.floor(Math.random() * 16777216);
	const fill = `#${randomNum.toString(16).padStart(6, '0')}`
	

	const rect = new Shape({
		left: left,
		top: top,
		width: width,
		height: height,
		fill: fill,
	})
	canvas.add(rect)
}
</script>

<template>
	<div class="w-screen h-screen border-gray-200 flex flex-col overflow-hidden">
		<div class="p-1 flex gap-1">
			<Button variant="outline">Click me</Button>
			<Button variant="outline" @click="addShape">Add Shap</Button>
			<Button variant="outline" @click="setZoom(0.2)">Zoom+</Button>
			<Button variant="outline" @click="setZoom(-0.2)">Zoom-</Button>
			<div class="flex-1"></div>
			<Button variant="outline" @click="destroyEditor">Destroy</Button>
		</div>
		<Editor ref="editorRef" class="flex-1" />
	</div>
</template>

<style lang="scss" scoped></style>
