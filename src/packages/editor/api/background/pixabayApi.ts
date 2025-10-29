import { useFetch } from '@vueuse/core'

export type PixabayParams = {
    [key: string]: string
}

export type PixabayItem = {
    id: number;
    pageURL: string;
    previewURL: string;
    webformatURL: string;
    largeImageURL: string;
    views: number;
    downloads: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatWidth: number;
    webformatHeight: number;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
};

type PixabayResponse = {
    total: number,
    totalHits: number,
    hits: PixabayItem[]
}

const PIXABAY_API_URL = 'https://api-proxy-wvtehyeycw.cn-hangzhou.fcapp.run/pixabay/';

export function getPixabayApi(params: any) {
    const searchParams = new URLSearchParams({ ...params as Record<string, string> })
    return useFetch<PixabayResponse>(`${PIXABAY_API_URL}?${searchParams.toString()}`, { method: 'GET' }).json()
}