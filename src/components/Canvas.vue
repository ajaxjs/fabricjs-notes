<script setup lang="ts">
import { ref } from 'vue';
// import Editor from 'omc-core';
import { Button } from '@/components/ui/button'
import { onMounted } from 'vue';
import { Canvas, classRegistry, Rect } from 'fabric';

const canvasRef = ref<HTMLCanvasElement>();
//const editor = new Editor();
let canvas: Canvas | null = null;

onMounted(() => {
  console.log('classRegistry', classRegistry);

  if (canvasRef.value) {
    canvas = new Canvas(canvasRef.value);
    console.log('canvas', canvas.get('lowerCanvasEl'));

    //editor.init(canvas);
  }
});

const addRect = () => {
  if (canvas) {
    const rect = new Rect({
      left: Math.random() * 500,
      top: Math.random() * 500,
      width: 100,
      height: 100,
      fill: 'red',
    });
    canvas.add(rect);
  }
}

const removeItem = () => {
  if (canvas) {
    const activeObject = canvas.getActiveObjects();
    console.log('activeObject', activeObject);
    if (activeObject.length) {
      activeObject.forEach(item => {
        canvas?.remove(item);
      })
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }
}
</script>

<template>
  <div>
    <canvas ref="canvasRef" width="600" height="600" class="shadow-sm"></canvas>
    <div class="flex gap-2">
      <Button @click="addRect">add Rect</Button>
      <Button @click="removeItem">remove Item</Button>

    </div>
  </div>
</template>

<style lang="scss" scoped></style>