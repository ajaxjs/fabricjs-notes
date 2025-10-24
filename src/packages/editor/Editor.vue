<script setup lang="ts">
import CenterStage from './comps/CenterStage.vue'
import SideLeft from './side-left/SideLeft.vue'
import SideRight from './comps/SideRight.vue'
</script>

<template>
    <div class="editor flex overflow-hidden">
        <SideLeft />
        <CenterStage />
        <SideRight />
    </div>
</template>

<style lang="scss" scoped>
.editor {
    min-width: 400px;
    min-height: 400px;
}
</style>