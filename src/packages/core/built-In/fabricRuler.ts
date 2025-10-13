// Lightweight, dependency-free FabricRuler
// Usage: import FabricRuler from '@/app/fabricRuler1'; new FabricRuler(canvas)

// rely on global `fabric` (the project already brings fabric into scope)
// Helper constants / functions moved outside class so this file has no external runtime dependencies.
// PiBy180, isMobile, px2mm
// - PiBy180, isMobile: originally from '@/utils/common' in the project (approximation here)
// - px2mm: originally from '@/utils/image' in the project (approximation here)

const PiBy180 = Math.PI / 180; // from '@/utils/common'
const isMobile = () => typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent); // simplified
const px2mm = (px: number, dpi = 96) => (px / dpi) * 25.4; // from '@/utils/image' concept - convert px to mm using DPI

type Rect = { left: number; top: number; width: number; height: number };
export type HighlightRect = { skip?: 'x' | 'y' } & Rect;

interface RulerOptions {
  ruleSize?: number;
  fontSize?: number;
  enabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  highlightColor?: string;
  unitName?: string;
}

export default class FabricRuler {
  private canvas: any;
  public options: Required<RulerOptions>;
  private lastCursor = 'default';
  private tempRefLine: any = null;
  private objectRect: { x: HighlightRect[]; y: HighlightRect[] } | undefined;
  private events: Record<string, any>;

  constructor(canvas: any, opts?: RulerOptions) {
    this.canvas = canvas;
    this.lastCursor = this.canvas.defaultCursor || 'default';

    this.options = Object.assign(
      {
        ruleSize: 20,
        fontSize: 8,
        enabled: isMobile() ? false : true,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        highlightColor: '#165dff3b',
        textColor: '#444',
        unitName: opts?.unitName || 'px',
      },
      opts || {}
    );

    this.events = {
      'after:render': this.render.bind(this),
      'mouse:move': this.onMouseMove.bind(this),
      'mouse:down': this.onMouseDown.bind(this),
      'mouse:up': this.onMouseUp.bind(this),
    };

    // attach
    this.enabled = this.options.enabled;

    // expose reference for convenience
    (this.canvas as any).ruler = this;
  }

  get enabled() {
    return this.options.enabled;
  }
  set enabled(v: boolean) {
    this.options.enabled = v;
    if (v) {
      this.canvas.on(this.events);
      this.render({ ctx: this.canvas.contextContainer });
    } else {
      this.canvas.off(this.events);
      this.canvas.requestRenderAll();
    }
  }

  private getPointHover(pt?: { x: number; y: number } | null) {
    if (!pt) return '';
    const { ruleSize } = this.options;
    if (pt.x <= ruleSize) return 'vertical';
    if (pt.y <= ruleSize) return 'horizontal';
    return '';
  }

  private onMouseMove(e: any) {
    const vp = e && e.viewportPoint;
    if (!vp) return;
    if (this.tempRefLine && e.scenePoint) {
      const axis = (this.tempRefLine as any).axis || ((this.tempRefLine as any).top !== undefined ? 'horizontal' : 'vertical');
      if (axis === 'horizontal') (this.tempRefLine as any).top = e.scenePoint.y;
      else (this.tempRefLine as any).left = e.scenePoint.x;
      this.canvas.renderAll();
      const evt = { e: e.e, pointer: e.scenePoint, target: this.tempRefLine };
      this.canvas.fire('object:moving', evt);
      (this.tempRefLine as any).fire && (this.tempRefLine as any).fire('moving', evt);
    }

    const hover = this.getPointHover(vp);
    this.canvas.defaultCursor = this.lastCursor;
    if (!hover) return;
    this.lastCursor = this.canvas.defaultCursor;
    this.canvas.defaultCursor = hover === 'horizontal' ? 'ns-resize' : 'ew-resize';
  }

  private onMouseDown(e: any) {
    const vp = e && e.viewportPoint;
    const hover = this.getPointHover(vp);
    if (!hover) return;
    // create simple reference line
    this.canvas.selection = false;
    const point = hover === 'horizontal' ? e.viewportPoint.y : e.viewportPoint.x;
  const line = new (this.canvas.fabric && this.canvas.fabric.Rect ? this.canvas.fabric.Rect : (window as any).fabric && (window as any).fabric.Rect ? (window as any).fabric.Rect : (this.canvas.Rect ? this.canvas.Rect : (window as any).fabric && (window as any).fabric.Rect))({
      left: hover === 'horizontal' ? 0 : point,
      top: hover === 'horizontal' ? point : 0,
      width: hover === 'horizontal' ? this.canvas.getWidth() || this.canvas.width : 1,
      height: hover === 'horizontal' ? 1 : this.canvas.getHeight() || this.canvas.height,
      fill: 'pink',
      originX: 'left',
      originY: 'top',
      selectable: false,
      hasControls: false,
      hasBorders: false,
    });
    (line as any).axis = hover === 'horizontal' ? 'horizontal' : 'vertical';
    this.tempRefLine = line;
    this.canvas.add(line);
    this.canvas.setActiveObject(line);
    // emulate fabric internal transform start when possible
    if (this.canvas._setupCurrentTransform) {
      try {
        this.canvas._setupCurrentTransform(e.e, line, true);
      } catch {}
    }
  }

  private onMouseUp(e: any) {
    if (!this.tempRefLine) return;
    this.canvas.selection = true;
    (this.tempRefLine as any).selectable = false;
    this.canvas.renderAll();
    (this.tempRefLine as any).fire && (this.tempRefLine as any).fire('up', { e: e.e, pointer: e && e.scenePoint });
    this.tempRefLine = null;
  }

  private render({ ctx }: { ctx: CanvasRenderingContext2D }) {
    if (!this.options.enabled) return;
    if (ctx !== this.canvas.contextContainer) return;

    const vpt = this.canvas.viewportTransform || [1,0,0,1,0,0];
    this.calcObjectRect();

    const size = { width: this.canvas.getWidth ? this.canvas.getWidth() : this.canvas.width, height: this.canvas.getHeight ? this.canvas.getHeight() : this.canvas.height };

    this.drawRuler(ctx, true, size.width, -(vpt[4] / vpt[0]));
    this.drawRuler(ctx, false, size.height, -(vpt[5] / vpt[3]));

    const { borderColor, backgroundColor, ruleSize, textColor } = this.options;
    this.drawRect(ctx, { left: 0, top: 0, width: ruleSize, height: ruleSize, fill: backgroundColor, stroke: borderColor });
    this.drawText(ctx, { text: this.options.unitName, left: ruleSize / 2, top: ruleSize / 2, align: 'center', baseline: 'middle', fill: textColor });
  }

  private drawRuler(ctx: CanvasRenderingContext2D, isHorizontal: boolean, rulerLength: number, startCalibration: number) {
    const zoom = (this.canvas.getZoom && this.canvas.getZoom()) || 1;
    const gap = this.getGap(zoom);
    const unitLength = Math.ceil(rulerLength / zoom);
    const startValue = Math.floor(startCalibration / gap) * gap;
    const startOffset = startValue - startCalibration;

    const canvasSize = { width: this.canvas.width, height: this.canvas.height };
    const { textColor, borderColor, ruleSize, highlightColor } = this.options;
    const padding = 2.5;

    this.drawRect(ctx, { left: 0, top: 0, width: isHorizontal ? canvasSize.width : ruleSize, height: isHorizontal ? ruleSize : canvasSize.height, fill: this.options.backgroundColor, stroke: this.options.borderColor });

    for (let pos = 0; pos + startOffset <= unitLength; pos += gap) {
      for (let index = 0; index < 10; index++) {
        const position = Math.round((startOffset + pos + (gap * index) / 10) * zoom);
        const isMajorLine = index === 0;
        const [left, top] = isHorizontal ? [position, isMajorLine ? 0 : ruleSize - 8] : [isMajorLine ? 0 : ruleSize - 8, position];
        const [width, height] = isHorizontal ? [0, ruleSize - top] : [ruleSize - left, 0];
        this.drawLine(ctx, { left, top, width, height, stroke: borderColor });
      }
    }

    if (this.objectRect) {
      const axis = isHorizontal ? 'x' : 'y';
      this.objectRect[axis].forEach((rect) => {
        if (rect.skip === axis) return;
        const left = isHorizontal ? (rect.left - startCalibration) * zoom : 0;
        const top = isHorizontal ? 0 : (rect.top - startCalibration) * zoom;
        const width = isHorizontal ? rect.width * zoom : ruleSize;
        const height = isHorizontal ? ruleSize : rect.height * zoom;
        this.drawRect(ctx, { left, top, width, height, fill: highlightColor });
      });
    }

    for (let pos = 0; pos + startOffset <= unitLength; pos += gap) {
      const position = (startOffset + pos) * zoom;
      let textValue = (startValue + pos).toString();
      const [left, top, angle] = isHorizontal ? [position + 6, padding, 0] : [padding, position - 6, -90];
      this.drawText(ctx, { text: textValue, left, top, fill: textColor, angle });
    }
  }

  private getGap(zoom: number) {
    const zooms = [0.02, 0.03, 0.05, 0.1, 0.2, 0.5, 1, 2, 5];
    const gaps = [5000, 2500, 1000, 500, 200, 100, 50, 20, 10];
    let i = 0;
    while (i < zooms.length && zooms[i]! < zoom) i++;
    return gaps[i - 1] || 10000;
  }

  private drawRect(ctx: CanvasRenderingContext2D, r: { left: number; top: number; width: number; height: number; fill?: any; stroke?: string; strokeWidth?: number }){
    ctx.save();
    ctx.beginPath();
    if (r.fill) ctx.fillStyle = r.fill;
    ctx.rect(r.left, r.top, r.width, r.height);
    ctx.fill();
    if (r.stroke) { ctx.strokeStyle = r.stroke; ctx.lineWidth = r.strokeWidth || 1; ctx.stroke(); }
    ctx.restore();
  }

  private drawText(ctx: CanvasRenderingContext2D, opt: { left: number; top: number; text: string; fill?: any; align?: CanvasTextAlign; baseline?: CanvasTextBaseline; angle?: number; fontSize?: number }){
    ctx.save();
    if (opt.fill) ctx.fillStyle = opt.fill;
    ctx.textAlign = opt.align || 'left';
    ctx.textBaseline = opt.baseline || 'top';
    ctx.font = `${opt.fontSize || this.options.fontSize}px Helvetica`;
    if (opt.angle) {
      ctx.translate(opt.left, opt.top);
      ctx.rotate(PiBy180 * opt.angle);
      ctx.translate(-opt.left, -opt.top);
    }
    ctx.fillText(opt.text, opt.left, opt.top);
    ctx.restore();
  }

  private drawLine(ctx: CanvasRenderingContext2D, opt: { left: number; top: number; width: number; height: number; stroke?: any; lineWidth?: number }){
    ctx.save();
    ctx.beginPath();
    if (opt.stroke) ctx.strokeStyle = opt.stroke;
    ctx.lineWidth = opt.lineWidth || 1;
    ctx.moveTo(opt.left, opt.top);
    ctx.lineTo(opt.left + opt.width, opt.top + opt.height);
    ctx.stroke();
    ctx.restore();
  }

  private calcObjectRect() {
    const active = this.canvas.getActiveObjects ? this.canvas.getActiveObjects() : (this.canvas.getActiveObject ? [this.canvas.getActiveObject()] : []);
    if (!active || active.length === 0) { this.objectRect = undefined; return; }
    // skip reference-line like objects
    if (active[0] && ((active[0] as any).type || '').toLowerCase() === 'referenceline') { this.objectRect = undefined; return; }
    const rects: HighlightRect[] = active.map((o: any) => o.getBoundingRect ? o.getBoundingRect(true, true) : ({ left: o.left || 0, top: o.top || 0, width: o.width || 0, height: o.height || 0 }));
    if (rects.length === 0) return;
    this.objectRect = { x: this.mergeLines(rects, true), y: this.mergeLines(rects, false) };
  }

  private mergeLines(rect: Rect[], isHorizontal: boolean) {
    const axis = isHorizontal ? 'left' : 'top';
    const length = isHorizontal ? 'width' : 'height';
    rect.sort((a, b) => a[axis] - b[axis]);
    const merged: Rect[] = [];
    let cur = Object.assign({}, rect[0]);
    for (let i = 1; i < rect.length; i++) {
      const line = Object.assign({}, rect[i]);
      if ((cur as any)[axis] + (cur as any)[length] >= (line as any)[axis]) {
        (cur as any)[length] = Math.max((cur as any)[axis] + (cur as any)[length], (line as any)[axis] + (line as any)[length]) - (cur as any)[axis];
      } else {
        merged.push(cur);
        cur = Object.assign({}, line);
      }
    }
    merged.push(cur);
    return merged;
  }

  public dispose() {
    this.enabled = false;
    this.tempRefLine = null;
    try { delete (this.canvas as any).ruler; } catch {}
  }
}
