import { Grid2x2Plus, PencilRuler,Image, Type, Shapes } from 'lucide-vue-next';

import PanelAdd from './PanelAdd.vue'
import PanelDesign from './PanelDesign.vue'
import PanelMaterial from './PanelMaterial.vue'
import PanelText from './PanelText.vue'
import PanelShape from './PanelShape.vue'

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
        icon: Shapes,
        label: '形状',
        component: PanelShape
    },
    {
        icon: Image,
        label: '素材',
        component: PanelMaterial
    },
]

export function useSideNav() {
    return sideNavItems
}