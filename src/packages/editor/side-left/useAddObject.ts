import { Rect, type RectProps, Circle, type CircleProps, Triangle, type FabricObjectProps } from 'fabric'
import { Circle as IconCircle, Square as IconSquare, Triangle as IconTriangle } from 'lucide-vue-next'


/**
 * 待优化: 这种无法旋转和绽放
 */

const DEFAULT_PROPS = {
    left: 100,
    top: 100,
}

export function getObjectMap() {
    return [
        {
            name: '矩形',
            icon: IconSquare,
            creator: (props?: RectProps) => new Rect({
                ...DEFAULT_PROPS,
                width: 100,
                height: 100,
                fill: '#666',
                ...props
            }),
        },
        {
            name: '圆形',
            icon: IconCircle,
            creator: (props?: CircleProps) => new Circle({
                ...DEFAULT_PROPS,
                radius: 50,
                rx: 50,
                ry: 50,
                fill: '#666',
                ...props
            }),
        },
        {
            name: '三角形',
            icon: IconTriangle,
            creator: (props?: FabricObjectProps) => new Triangle({
                ...DEFAULT_PROPS,
                radius: 50,
                fill: '#666',
                ...props
            }),
        }
    ]
}