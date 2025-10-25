<script setup lang="ts">
import { onEditorReady } from '../../core'
import { getObjectMap } from './useAddObject'
const objectMap = getObjectMap()

onEditorReady((editor) => {
    //canvas.value = editor.getCanvas();
    console.log('canvas is ok:', editor);
})

</script>

<template>
    <div>
        <h3>添加元素+</h3>
        <div class="flex gap-2">
            <div v-for="item in objectMap" :key="item.name">
                <component :is="item.icon" />
                <div>{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>