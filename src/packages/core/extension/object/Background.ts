import { Rect } from "fabric";
import type { RectProps } from "fabric";

export interface BackgroundProps extends RectProps {
    
}

export default class Background extends Rect {
    static type = 'Background'
    fill = '#ffffff';
    selectable = false;
    hoverCursor = 'default';
}