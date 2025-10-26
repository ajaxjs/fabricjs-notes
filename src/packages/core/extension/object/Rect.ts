import { Rect as FabricRect, type RectProps } from 'fabric';


export class Rect extends FabricRect {
    constructor(options: RectProps) {
        super(options);
    }
}