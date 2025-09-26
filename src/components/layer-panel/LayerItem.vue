<script setup>
import { ref } from 'vue';
import { Eye, EyeOff, Trash } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const props = defineProps({
  layer: {
    type: Object,
    default: () => { },
  },
  activated: {
    type: Boolean,
    default: false,
  }
})
const emit = defineEmits(['toggle', 'delete'])

console.log('----', props.layer);
const toggle = () => {
  //props.layer.activated = !props.layer?.activated
  //props.layer.set('visible', !props.layer?.visible)
  emit('toggle', !props.layer?.visible)
}
const deleteLayer = () => {
  emit('delete', props.layer)
}
</script>

<template>
  <div class="flex gap-2" :class="layer?.activated ? 'selected text-blue-500' : ''">
    <div>
      <div class="p-1" @click="toggle">
        <Eye v-if="layer?.visible" class="size-4" />
        <EyeOff v-else class="size-4" />
      </div>
    </div>
    <div class="flex-1">{{ layer.label || layer?.type }}</div>
    <div class="p-1" @click="deleteLayer">
      <Button size="icon" variant="ghost" class="size-4">
        <Trash />
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>