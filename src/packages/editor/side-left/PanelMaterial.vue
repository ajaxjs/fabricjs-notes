<script setup lang="ts">
import { ref } from 'vue';
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, type OptionItem } from '@/components/qxt-vue/select'
import { getPixabayApi, type PixabayParams } from '../api/background/pixabayApi';

const params = ref<PixabayParams>({ q: '', page: 1 })
const { isLoading, error, data, execute } = getPixabayApi(params.value)

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


</script>

<template>
    <div class="flex justify-end p-2 gap-1 bg-sidebar">
        <Select v-model="params.category" :options="imgTypes" label="分类" class="min-w-[6em]" />
        <Input v-model="params.q" placeholder="搜索关键字" class="w-full" />
        <Button variant="outline" @click="execute({ params })">搜索</Button>
    </div>

    <div class="p-2">
        <div v-if="isLoading">
            <Button variant="outline" disabled>
                <Spinner />
                加载中...
            </Button>
        </div>
        <div v-if="error" class="text-red-500 p-3 rounded-sm">请求失败：{{ error }}</div>
        <div v-if="data" class="columns-3 gap-2 space-y-2">
            <div v-for="item in data.hits" :key="item.id">
                <img :src="item.previewURL" alt="" class="w-full h-auto rounded-sm block">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>