<script setup lang="ts">
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { ScrollArea } from '@/components/ui/scroll-area'

import { h, onMounted, shallowRef } from 'vue';
import { Path, type FabricObject } from 'fabric'
import ObjectItem from './components/ObjectItem.vue'
import { getPathApi } from '../api/object/pathApi'

type PathItem = {
    name: string;
    target: FabricObject;
}

const loading = shallowRef(false);
const pathList = shallowRef<PathItem[]>();

async function createIcon(target: Path) {
    const size = 48;
    const icon = await target.clone();

    if (icon.width > icon.height) {
        icon.scaleToWidth(size);
    } else {
        icon.scaleToHeight(size);
    }
    const width = icon.width * icon.scaleX;
    const height = icon.height * icon.scaleY;
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${icon.toSVG()}</svg>`;
    return svg;
}
// 获取路径列表
function loadData() {
    if (loading.value) return;
    loading.value = true;
    getPathApi().then(async (list) => {
        const task = list.map(async ({ name, path, width, height }) => {
            const target = new Path(path, { fill: '#CCCCCC', width, height });
            const iconSvg = await createIcon(target);
            const icon = h('div', { innerHTML: iconSvg });
            return {
                name,
                icon,
                target,
            };
        });
        pathList.value = await Promise.all(task);
    }).catch(err => {
        console.error('获取路径列表失败:', err);
    }).finally(() => {
        loading.value = false;
    })
}
onMounted(loadData)
</script>

<template>
    <ScrollArea class="flex-1 relative h-full">
        <div v-if="loading" class="flex justify-center items-center p-2">
            <Button variant="outline" disabled>
                <Spinner />
                Please wait
            </Button>
        </div>
        <div v-if="pathList" class="grid grid-cols-4 gap-2 p-3">
            <ObjectItem v-for="(item, i) in pathList" :key="i" v-bind="item" />
        </div>
    </ScrollArea>
</template>

<style lang="scss" scoped></style>