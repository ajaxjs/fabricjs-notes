import {
    classRegistry,
    FabricObject,
    type RectProps,
    type CircleProps,
    type FabricObjectProps,
    type EllipseProps
} from 'fabric'
import {
    Circle as IconCircle, Square as IconSquare, Triangle as IconTriangle,
    Hexagon as IconHexagon,
    Slash as IconSlash,
    Star as IconStar,
} from 'lucide-vue-next'
import IconEllipse from '../assets/IconEllipse.vue'
import * as objectsDefaults from '../../core/configs/object'
import {factory} from '../../core/index.ts'
console.log('customShapes',factory.CustomShape);
console.log('customShapes.arc',factory.CustomShape.arc({width:100,height:100,fill:'green'}).toSVG());




function createShape(type: string, props?: Record<string, any>) {
    const ShapeClass = classRegistry.getClass<typeof FabricObject>(type);
    return new ShapeClass(props);
}

export function getObjectMap() {
    return [
        {
            name: '矩形',
            icon: IconSquare,
            //creator: createRect,
            creator: (props?: RectProps) => factory.CustomShape.arc({width:100,height:100,fill:'green'}),
        },
        {
            name: '圆形',
            icon: IconCircle,
            //creator: createCircle,
        },
        {
            name: '三角形',
            icon: IconTriangle,
            //creator: createTriangle,
        },
        {
            name: '椭圆',
            icon: IconEllipse,
            //creator: createEllipse,
        },
        {
            name: '多边形',
            icon: IconHexagon,
            //creator: createPolygon,
        },
        {
            name: '星形',
            icon: IconStar,
            //creator: createStar,
        },
    ]
}

/**
 * 
        {
            name: '直线',
            icon: IconSlash,
            creator: (props?: FabricObjectProps) => createShape('line', props),
        },
        {
            name: '文字',
            icon: IconEllipse,
            creator: (props?: any) => {},
        },
 */