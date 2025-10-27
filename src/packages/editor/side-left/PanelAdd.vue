<script setup lang="ts">
//import { getObjectMap } from './useAddObject'
import { factory } from '../../core';
import ObjectItem from './components/ObjectItem.vue'

// 自定义形状
const customShapes = Object.entries(factory.CustomShape).map(([key, creator]: [string, any]) => {
    return {
        name: key,
        creator,
    }
})

</script>

<template>
    <div>
        <h3>添加元素+</h3>
        <div class="grid grid-cols-4 gap-2">
            <ObjectItem v-for="item in customShapes" :key="item.name" v-bind="item" />

        </div>
    </div>
</template>

<style lang="scss" scoped></style>