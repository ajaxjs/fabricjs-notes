import { FabricObject, Line, classRegistry, Point } from "fabric"
import type { FabricCanvas } from "../../built-In/fabricCanvas";
import type { TPointerEventInfo, TPointerEvent } from 'fabric'
import type { ReferenceLineProps } from "../../types/canvas"
//import { FabricCanvas } from "@/app/fabricCanvas";

export class ReferenceLine extends Line {
  static type = 'ReferenceLine';
  public axis: string | undefined = ''

  constructor(point: number | [number, number, number, number], options: Partial<ReferenceLineProps> = {}) {
    // 设置新的点
    // point += 100
    const size = 999999
    let points = options.axis === 'horizontal' ? [-size, 0, size, 0] : [0, -size, 0, size]
    if (typeof point === 'object') {
      points = point
    }
    if (typeof point === 'number') {
      points = options.axis === 'horizontal' ? [-size, point, size, point] : [point, -size, point, size]
    }

    const isHorizontal = options.axis === 'horizontal'
    options[isHorizontal ? 'lockMovementX' : 'lockMovementY'] = true
    super(points as [number, number, number, number], options)
    this.axis = options.axis
    this.initEvent()
    this.hoverCursor = isHorizontal ? 'ns-resize' : 'ew-resize'
  }

  public initEvent() {
    const callback = () => { }

    this.on('mousedown:before', (e: TPointerEventInfo<TPointerEvent>) => {
      if (this.activeOn === 'down') {
        this.canvas?.setActiveObject(this, e.e);
      }
    });

    //this.on('moving', (e: TPointerEventInfo<TPointerEvent>) => {
    this.on('moving', (e: any) => {
      if (this.isPointOnRuler(e.e)) {
        this.moveCursor = 'not-allowed';
      }
      else {
        this.moveCursor = this.isHorizontal() ? 'ns-resize' : 'ew-resize';
      }
      
      this.canvas?.fire('referenceline:moving' as any, {
        target: this,
        e: e.e,
      });
    });

    this.on('mouseup', (e: TPointerEventInfo<TPointerEvent>) => {
      if (this.isPointOnRuler(e.e)) {
        this.canvas?.remove(this);
        return;
      }
      this.moveCursor = this.isHorizontal() ? 'ns-resize' : 'ew-resize';
      this.selectable = false
      this.canvas?.fire('referenceline:mouseup' as any, {
        target: this,
        e: e.e,
      });
      this.canvas?.fire('object:modified')
    });

    this.on('removed', () => {
      this.off('removed', callback);
      this.off('mousedown:before', callback);
      this.off('moving', callback);
      this.off('mouseup', callback);
      this.canvas?.fire('object:modified')
    });
  }

  isHorizontal() {
    return this.height === 0;
  }

  getBoundingRect() {
    this.canvas?.bringObjectToFront(this);
    const isHorizontal = this.isHorizontal();
    const rect = super.getBoundingRect()
    rect[isHorizontal ? 'top' : 'left'] += rect[isHorizontal ? 'height' : 'width'] / 2;
    rect[isHorizontal ? 'height' : 'width'] = 0;
    return rect;
  }

  isPointOnRuler(e: any) {
    const isHorizontal = this.isHorizontal();
    const fabricCanvas = this.canvas as FabricCanvas
    const hoveredRuler = fabricCanvas.ruler?.getPointHover(new Point(e.offsetX, e.offsetY));
    if ((isHorizontal && hoveredRuler === 'horizontal') || (!isHorizontal && hoveredRuler === 'vertical')) {
      return hoveredRuler;
    }
    return false;
  }

  fire(eventName: any, options?: any) {
    super.fire(eventName, options)
  }

  async fromObject(options: any): Promise<Line> {
    const isHorizontal = options.height === 0;
    options.xy = isHorizontal ? options.y1 : options.x1;
    options.axis = isHorizontal ? 'horizontal' : 'vertical';
    return await FabricObject._fromObject(options.type, options);
  }
}

classRegistry.setClass(ReferenceLine, 'ReferenceLine')


