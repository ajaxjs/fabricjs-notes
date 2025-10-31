<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, type OptionItem } from '@/components/qxt-vue/select'
import { getPixabayApi, type PixabayParams, type PixabayResponse } from '../api/background/pixabayApi';
import { layoutMasonry } from '../utils/masonry'

const params = ref<PixabayParams>({ q: '', page: 1 })
const isLoading = ref(false);
const error = ref<string>('')
const data = ref<PixabayResponse>()

// 图片分类
const imgTypes: OptionItem[] = [
    { label: '背景', value: 'backgrounds' },
    { label: '时尚', value: 'fashion' },
    { label: '自然', value: 'nature' },
    { label: '科学', value: 'science' },
    { label: '教育', value: 'education' },
    { label: '情感', value: 'feelings' },
    { label: '健康', value: 'health' },
    { label: '人物', value: 'people' },
    { label: '宗教', value: 'religion' },
    { label: '地点', value: 'places' },
    { label: '动物', value: 'animals' },
    { label: '工业', value: 'industry' },
    { label: '计算机', value: 'computer' },
    { label: '食物', value: 'food' },
    { label: '运动', value: 'sports' },
    { label: '交通', value: 'transportation' },
    { label: '旅行', value: 'travel' },
    { label: '建筑', value: 'buildings' },
    { label: '商业', value: 'business' },
    { label: '音乐', value: 'music' }
]

// 分页加载
const target = useTemplateRef<HTMLDivElement>('pageTrigger')
const { stop } = useIntersectionObserver(target, ([entry]) => {
    if (entry?.isIntersecting) {
        params.value.page!++
        loadData()
        if (data.value && params.value.page! * data.value.per_page >= data.value.totalHits) {
            stop()
        }
    }
})
function onSearch() {
    params.value.page = 1;
    data.value = undefined
    loadData()
}
const container = useTemplateRef<HTMLElement>('container')
function loadData() {
    isLoading.value = true
    getPixabayApi(params.value).then(res => {
        if (!data.value) {
            data.value = res
        } else {
            data.value.hits.push(...res.hits)
        }
        nextTick(() => layoutMasonry(container.value!))
    }).catch(err => {
        error.value = err.message
    }).finally(() => {
        isLoading.value = false
    })
}

onMounted(loadData)
</script>

<template>
    <div class="flex justify-end p-2 gap-1 bg-sidebar">
        <Select v-model="params.category" :options="imgTypes" label="分类" class="min-w-[6em]" />
        <Input v-model="params.q" placeholder="搜索关键字" class="w-full" />
        <Button variant="outline" @click="onSearch">搜索</Button>
    </div>
    <div class="flex-1 relative overflow-hidden">
        <ScrollArea class="absolute left-0 top-0 w-full h-full">
            <div v-if="isLoading">
                <Button variant="outline" disabled>
                    <Spinner />
                    加载中...
                </Button>
            </div>
            <div v-if="error" class="text-red-500 p-3 rounded-sm">请求失败：{{ error }}</div>
            <div v-if="data" class="p-2">
                <div ref="container" class="grid grid-cols-3 gap-2">
                    <div v-for="item in data.hits" :key="item.id" class="item-box bg-gray-200">
                        <img :src="item.previewURL" alt="" class="w-full h-auto rounded-sm block">
                    </div>
                </div>
                <div ref="pageTrigger" class="bg-gray-200 flex items-center justify-center p-2 rounded-sm mt-2">
                    <Spinner /> 正在加载...
                </div>
            </div>
        </ScrollArea>
    </div>

</template>

<style lang="scss" scoped>
.item-box {
    position: relative;
    height: 30%;
}
</style>