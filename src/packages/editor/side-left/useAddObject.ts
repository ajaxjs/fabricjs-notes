import { Rect, Circle } from 'fabric'
import {Circle as IconCircle, Square as IconSquare} from 'lucide-vue-next'
export function getObjectMap() {
    return [
        {
            name: '矩形',
            icon: IconSquare,
            target: Rect,
        },
        {
            name: '圆形',
            icon: IconCircle,
            target: Circle,
        }
    ]
}