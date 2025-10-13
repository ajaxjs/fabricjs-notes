<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Editor } from '@/packages/editor'
import { onMounted, onUnmounted, ref } from 'vue'

const editorRef = ref()
function destroyEditor() {
	console.log(editorRef.value);
	if (editorRef.value) {

		editorRef.value.editor.destroy()
	}
}
function setZoom(z) {
	const { editor } = editorRef.value
	const canvas = editor.getCanvas()
	const zoom = canvas.getZoom()
	console.log(zoom);
	canvas.setZoom( zoom + z )
	canvas.renderAll()

}
</script>

<template>
	<div class="w-screen h-screen border-gray-200 flex flex-col overflow-hidden">
		<div class="p-1 flex gap-1">
			<Button>Click me</Button>
			<Button @click="setZoom(0.2)">Zoom+</Button>
			<Button @click="setZoom(-0.2)">Zoom-</Button>
			<Button @click="destroyEditor">Destroy</Button>
		</div>
		<Editor ref="editorRef" class="flex-1" />
	</div>
</template>

<style lang="scss" scoped></style>
