import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

export type PixabayParams = {
    q?: string; // URL 编码的搜索词，不超过 100 字符
    lang?: 'cs' | 'da' | 'de' | 'en' | 'es' | 'fr' | 'id' | 'it' | 'hu' | 'nl' | 'no' | 'pl' | 'pt' | 'ro' | 'sk' | 'fi' | 'sv' | 'tr' | 'vi' | 'th' | 'bg' | 'ru' | 'el' | 'ja' | 'ko' | 'zh'; // 搜索语言，默认 en
    id?: string; // 通过 ID 获取单张图片
    image_type?: 'all' | 'photo' | 'illustration' | 'vector'; // 图片类型，默认 all
    orientation?: 'all' | 'horizontal' | 'vertical'; // 图片方向，默认 all
    category?: 'backgrounds' | 'fashion' | 'nature' | 'science' | 'education' | 'feelings' | 'health' | 'people' | 'religion' | 'places' | 'animals' | 'industry' | 'computer' | 'food' | 'sports' | 'transportation' | 'travel' | 'buildings' | 'business' | 'music'; // 分类
    min_width?: number; // 最小宽度，默认 0
    min_height?: number; // 最小高度，默认 0
    colors?: 'grayscale' | 'transparent' | 'red' | 'orange' | 'yellow' | 'green' | 'turquoise' | 'blue' | 'lilac' | 'pink' | 'white' | 'gray' | 'black' | 'brown' | string; // 颜色过滤，允许多值逗号分隔
    editors_choice?: boolean; // 编辑推荐，默认 false
    safesearch?: boolean; // 全年龄安全搜索，默认 false
    order?: 'popular' | 'latest'; // 排序方式，默认 popular
    page?: number; // 页码，默认 1
    per_page?: number; // 每页条数，3-200，默认 20
    callback?: string; // JSONP 回调函数名
    pretty?: boolean; // 美化 JSON 输出，默认 false，生产环境勿用
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

const PIXABAY_API_URL = 'http://alifc.afengx.com/proxy/pixabay';

const instance = axios.create({
    baseURL: PIXABAY_API_URL,
    timeout: 30000,
})

export function getPixabayApi(params: any) {
    return useAxios('/', { params }, instance)
}