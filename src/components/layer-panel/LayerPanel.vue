<script setup>
import { ref, computed, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Plus, Eye, EyeOff, Trash, ChevronDown, ChevronRight } from 'lucide-vue-next';
import LayerItem from './LayerItem.vue';

const modelValue = defineModel({
  type: Array,
  default: () => [],
})
const props = defineProps({
  canvas: {
    type: Object,
    default: () => { },
  }
})
const emit = defineEmits(['delete']);

const onToggle = (visible, i) => {
  //console.log('onToggle', visible, layer);
  //layer.visible = visible
  console.log('onToggle', visible, i);
  modelValue.value[i].set('visible', visible)
  //modelValue.value[i].visible = visible
  props.canvas.renderAll();
}

const deleteLayer = (obj) => {
  console.log('deleteLayer', obj);
  // 确保过滤逻辑正确
  modelValue.value = modelValue.value.filter((item) => item !== obj)
  // 检查canvas和obj是否有效
  if (props.canvas && obj) {
    props.canvas.remove(obj)
    props.canvas.discardActiveObject();
    props.canvas.requestRenderAll();
  }
}

const onDragEnd = (e) => {
  console.log('onDragEnd', e);
}

const onDragEnter = (e) => {
  console.log('onDragEnter', e);
}


const onDragDrop = (e) => {
  console.log('onDragDrop', e);
}



</script>

<template>
  <div class="w-50 border border-gray-200 flex flex-col gap-2 p-2">
    <div v-if="modelValue.length === 0" class="text-center text-gray-500 py-4">无图层</div>
    <!-- 渲染图层列表 -->
    <template v-else>
      <LayerItem v-for="(item, i) in modelValue" :key="i" :layer="item" :activated="item.activated"
        @toggle="onToggle($event, i)" @delete="() => emit('delete', modelValue[i])" draggable="true" @dragend="onDragEnd"
        @dragenter="onDragEnter" @drop="onDragDrop" />
    </template>
  </div>
</template>

<style lang="scss" scoped></style>