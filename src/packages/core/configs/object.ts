/**
 * 元素默认值配置
 */
const DEFAULT_PROPS = {
    left: 50,
    top: 50,
}
export const Rect = {
    ...DEFAULT_PROPS,
    width: 100,
    height: 100,
    fill: '#009966',
}

export const Circle = {
    ...DEFAULT_PROPS,
    radius: 50,
    rx: 50,
    ry: 50,
    fill: '#fe9a00',
}

export const Triangle = {
    ...DEFAULT_PROPS,
    radius: 50,
    fill: '#4f39f6',
}

export const Polygon = {
    ...DEFAULT_PROPS,
    fill: '#00c950',
}

export const Ellipse = {
    ...DEFAULT_PROPS,
    rx: 35,
    ry: 50,
    fill: '#ff6600',
}

export const Star = {
    ...DEFAULT_PROPS,
    fill: '#ffcc00',
}