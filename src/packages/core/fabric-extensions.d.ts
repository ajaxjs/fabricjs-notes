import { CanvasEvents } from 'fabric';
import { Point } from 'fabric';

declare module 'fabric' {
    interface CanvasEvents {
        // 扩展 canvas:change 事件
        'canvas:change': {
            action: string;
            target?: any;
        };
        // 扩展 canvas:move 事件
        'canvas:moveing': {
            x: number;
            y: number;
            //delta: Point;
        };
        // 扩展 canvas:move 事件
        'canvas:startmove': {
            x: number;
            y: number;
            //delta: Point;
        };
        // 扩展 canvas:move 事件
        'canvas:endmove': {
            x: number;
            y: number;
            //delta: Point;
        };
        'canvas:resize': {
            width: number;
            height: number;
        }
        // 扩展 canvas:rulerToggle 事件
        'canvas:ruler_toggle': {
            enabled: boolean;
        }
    }
}