import { useFetch } from '@vueuse/core'
/**
 Illusion:
$elementmaster,$png,$illustrationpng

Patterns:
$elementmaster,$png,$pngpatterns

Frame:
$elementmaster,$png,$frames

Borders
$elementmaster,$png,$borders

Icons
$elementmaster,$png,$icons

Watercolor
$elementmaster,$png,$watercolorelements

3D
$elementmaster,$png,$3delements

Art
$elementmaster,$png,$originalartelements

People
$elementmaster,$png,$peopleelements

Portrait
$elementmaster,$png,$peopleportraitphotoelements
 */

export const Category = [
    { label: 'PNG', name: 'Png', tags: '$png' },
    { label: '幻想', name: 'Illusion', tags: '$illustrationpng' },
    { label: '模式', name: 'Patterns', tags: '$pngpatterns' },
    { label: '框架', name: 'Frame', tags: '$frames' },
    { label: '边框', name: 'Borders', tags: '$borders' },
    { label: '图标', name: 'Icons', tags: '$icons' },
    { label: '水彩', name: 'Watercolor', tags: '$watercolorelements' },
    { label: '3D', name: '3D', tags: '$3delements' },
    { label: '艺术', name: 'Art', tags: '$originalartelements' },
    { label: '人物', name: 'People', tags: '$peopleelements' },
    { label: '肖像', name: 'Portrait', tags: '$peopleportraitphotoelements' },
];

export type RawPixelParams = {
    keys: string,
    tags: string,
}

export function getRawPixel(params: RawPixelParams) {
    const searchParams = new URLSearchParams({
        lang: 'zh-Hans', query: '墨镜', ...params,
        client_id: 'OZnu8hElHC_3stB7P4wU7knCDv0JH8LCSDzE4XbPSBg'
    })
    return useFetch(`https://api.unsplash.com/search/photos/?${searchParams.toString()}`, { method: 'GET' })
}