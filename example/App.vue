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
</script>

<template>
	<div class="p-4">
		<Button>Click me</Button>
		<Button @click="destroyEditor">Destroy</Button>
		<Editor ref="editorRef" class="border border-gray-200" />
	</div>
</template>

<style lang="scss" scoped></style>
