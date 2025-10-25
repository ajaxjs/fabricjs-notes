<script setup lang="ts">
import { onEditorReady } from '@/packages/core'
import { Editor, HeadBar } from '@/packages/editor'
import { Rect } from 'fabric'

onEditorReady(({ canvas }) => {
	const rect = new Rect({
		left: 100,
		top: 100,
		width: 100,
		height: 100,
		fill: 'green',
	})
	canvas.add(rect)
})
</script>

<template>
	<div class="w-screen h-screen flex flex-col">
		<HeadBar class="head-bar" />
		<Editor class="flex-1" />
	</div>
</template>

<style lang="scss" scoped></style>