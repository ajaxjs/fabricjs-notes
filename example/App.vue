<script setup lang="ts">
import { onEditorReady } from '@/packages/core'
import { Editor, HeadBar } from '@/packages/editor'
import { Rect, Polygon, Circle, Triangle } from 'fabric'


onEditorReady(({ canvas }) => {
	// 创建三角形
	// const triangle = new Triangle({
	// 	left: 100,
	// 	top: 100,
	// 	radius: 50,
	// 	fill: '#4f39f6',
	// })
	// canvas.add(triangle)

	// const circle = new Circle({
	// 	left: 100,
	// 	top: 100,
	// 	radius: 50,
	// 	fill: 'red',
	// })
	// canvas.add(circle)

	// const poly = new Polygon([
	// 	{ x: 0, y: -50 },
	// 	{ x: 47, y: -15 },
	// 	{ x: 29, y: 40 },
	// 	{ x: -29, y: 40 },
	// 	{ x: -47, y: -15 }
	// ], {
	// 	stroke: 'orange',
	// 	fill: 'blue',
	// 	left: 100,
	// 	top: 220,
	// 	strokeWidth: 2,
	// })


	// const rect = new Rect({
	// 	left: 100,
	// 	top: 100,
	// 	width: 100,
	// 	height: 100,
	// 	fill: 'green',
	// })
	// canvas.add(rect)
	// canvas.add(poly)
})
</script>

<template>
	<div class="w-screen h-screen flex flex-col">
		<HeadBar class="head-bar" />
		<Editor class="flex-1" />
	</div>
</template>

<style lang="scss" scoped></style>