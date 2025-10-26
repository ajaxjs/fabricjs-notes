import { classRegistry, FabricObject } from 'fabric';

const DEFAULT_PROPS = {
    left: 100,
    top: 100,
}
const DEFAULT_SIZE = {
    width: 100,
    height: 100,
}

const DEFAULT_CONFIG = {
    rect: {
        ...DEFAULT_PROPS,
        ...DEFAULT_SIZE,
        fill: '#22c753',
    },
    circle: {
        ...DEFAULT_PROPS,
        radius: 50,
        rx: 50,
        ry: 50,
        fill: '#fdc700',
    },
    triangle: {
        ...DEFAULT_PROPS,
        radius: 50,
        fill: '#00bc7d',
    },
    polygon: {
        ...DEFAULT_PROPS,
        sides: 5,
        radius: 50,
        fill: '#00b8db',
    },
    ellipse: {
        ...DEFAULT_PROPS,
        rx: 35,
        ry: 50,
        fill: '#fe9a00',
    },
    line: {
        ...DEFAULT_PROPS,
        stroke: '#2b7fff',
    },
}

export function createShape(shapeType: string, props: Record<string, any> = {}) {
    if (!classRegistry.has(shapeType)) {
        throw new Error(`No class registered for ${shapeType}`);
    }
    const defaultProps = DEFAULT_CONFIG[shapeType as keyof typeof DEFAULT_CONFIG] || {};
    const ShapeClass = classRegistry.getClass<typeof FabricObject>(shapeType);
    const mergedProps = { ...defaultProps, ...props };
    return new ShapeClass(mergedProps);
}