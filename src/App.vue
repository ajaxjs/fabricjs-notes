<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Button } from '@/components/ui/button'
import Canvas from '@/components/Canvas.vue'

const canvasRef = ref<HTMLCanvasElement>();
onMounted(() => {
  console.log('canvas',canvasRef.value);
});

</script>

<template>
  <div>
    <router-view />
  </div>
</template>