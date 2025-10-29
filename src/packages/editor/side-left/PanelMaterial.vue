<script setup lang="ts">
import { ref } from 'vue';
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, type OptionItem } from '@/components/qxt-vue/select'
import { getPixabayApi } from '../api/background/pixabayApi';

const params = ref({ q: '', category: '' })
const { isFetching, error, data, execute, onFetchResponse } = getPixabayApi(params.value)

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



onFetchResponse((res) => {
    console.log('请求数', res.headers.get('X-RateLimit-Limit'))
    console.log('剩余请求数', res.headers.get('X-RateLimit-Remaining'))
    console.log('重置时间', res.headers.get('X-RateLimit-Reset'))
})
</script>

<template>
    <div class="flex justify-end p-2 gap-1">
        <Select v-model="params.category" :options="imgTypes" label="图片类型" class="w-[4em]" />
        <Input v-model="params.q" placeholder="搜索关键字" class="w-full" />
        <Button variant="outline" @click="execute">搜索</Button>
    </div>
    <div>{{ params }}</div>
    <div class="py-2">
        <div v-if="isFetching">
            <Button variant="outline" disabled>
                <Spinner />
                加载中...
            </Button>
        </div>
        <div v-if="error">请求失败：{{ error }}</div>
        <div v-if="data" class="columns-3 gap-2 space-y-2">
            <div v-for="item in data.hits" :key="item.id">
                <img :src="item.previewURL" alt="" class="w-full h-auto rounded-sm">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>