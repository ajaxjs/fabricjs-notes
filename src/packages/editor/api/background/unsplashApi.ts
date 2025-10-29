import { useFetch } from '@vueuse/core'

export type SearchParams = {
    query: string;
    page?: number;
    per_page?: number;
    order_by?: 'latest' | 'relevant';
    collections?: string;
    content_filter?: 'low' | 'high';
    color?: 'black_and_white' | 'black' | 'white' | 'yellow' | 'orange' | 'red' | 'purple' | 'magenta' | 'green' | 'teal' | 'blue';
    orientation?: 'landscape' | 'portrait' | 'squarish';
}


const BASE_URL = 'https://api-proxy-wvtehyeycw.cn-hangzhou.fcapp.run/unsplash';
export function getSearchApi(params: SearchParams) {
    const searchParams = new URLSearchParams({
        ...params,
        page: params.page?.toString() || '1',
        per_page: params.per_page?.toString() || '10',
    })
    return useFetch(`${BASE_URL}/search/photos/?${searchParams.toString()}`, { method: 'GET' })
}