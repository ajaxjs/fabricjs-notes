import { Grid2x2Plus, PencilRuler,Image, Wallpaper, Type } from 'lucide-vue-next';

import PanelAdd from './PanelAdd.vue'
import PanelDesign from './PanelDesign.vue'
import PanelMaterial from './PanelMaterial.vue'
import PanelBackground from './PanelBackground.vue'
import PanelText from './PanelText.vue'

export const sideNavItems = [
    {
        icon: Grid2x2Plus,
        label: '添加',
        component: PanelAdd
    },
    {
        icon: PencilRuler,
        label: '模板',
        component: PanelDesign
    },
    {
        icon: Type,
        label: '文本',
        component: PanelText
    },
    {
        icon: Image,
        label: '素材',
        component: PanelMaterial
    },
    {
        icon: Wallpaper,
        label: '背景',
        component: PanelBackground
    },
]

export function useSideNav() {
    return sideNavItems
}