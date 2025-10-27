import {
    Rect, type RectProps,
    Circle, type CircleProps,
    Triangle,
    Polygon,
    Ellipse, type EllipseProps,
    type FabricObjectProps,
} from 'fabric';
import * as DefaultProps from '../../configs/object';

// 创建矩形
export const rect = (options?: RectProps) => new Rect({ ...DefaultProps.Rect, ...options })

// 创建圆形
export const circle = (options?: CircleProps) => new Circle({ ...DefaultProps.Circle, ...options })

// 创建三角形
export const triangle = (options?: FabricObjectProps) => new Triangle({ ...DefaultProps.Triangle, ...options })

// 创建多边形 - 待优化：做成自定义元素，传入顶点数+半径生成多边形（包括多边路径）
export const polygon = (options?: FabricObjectProps) => new Polygon([
    { x: 0, y: -50 },
    { x: 47, y: -15 },
    { x: 29, y: 40 },
    { x: -29, y: 40 },
    { x: -47, y: -15 }
], { ...DefaultProps.Polygon, ...options })

// 创建椭圆
export const ellipse = (options?: EllipseProps) => new Ellipse({ ...DefaultProps.Ellipse, ...options })

// 创建星形 - 待优化：做成自定义元素
type starProps = {
    numPoints: number,
    outerRadius: number,
    innerRadius: number
}
function createStarPoints(options: starProps): { x: number; y: number }[] {
    const { numPoints, outerRadius, innerRadius } = options;
    const points = [];
    const step = Math.PI / numPoints;

    for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = i * step - Math.PI / 2;
        points.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        });
    }

    return points;
}
export const star = (options?: starProps) => {
    const { numPoints = 5, outerRadius = 50, innerRadius = 25 } = options || {}
    const points = createStarPoints({ numPoints, outerRadius, innerRadius })
    return new Polygon(points, { ...DefaultProps.Star, ...options })
}