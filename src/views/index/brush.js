import {CircleBrush, Circle, BaseBrush} from 'fabric';

class CustomCircleBrush extends BaseBrush {
    constructor(canvas, options = {}) {
        super(canvas);
        this.width = options.width || 5; // 默认固定半径（像素）
        this.color = options.color || '#000000';
        this.opacity = options.opacity || 1;
        this.isDrawing = false;
        this.points = [];
    }

    // 重写 onMouseDown，开始绘制
    onMouseDown(pointer) {
        if (!this.canvas) return;
        this.isDrawing = true;
        this.points = [pointer];
        this.render();
    }

    // 重写 onMouseMove，记录绘制点并渲染
    onMouseMove(pointer) {
        if (!this.canvas || !this.isDrawing) return;
        this.points.push(pointer);
        this.render();
    }

    // 重写 onMouseUp，将绘制内容转换为持久对象
    onMouseUp() {
        if (!this.canvas || !this.isDrawing) return;
        
        // 清除临时绘制内容
        this.canvas.clearContext(this.canvas.contextTop);
        
        // 将所有绘制点转换为持久的圆对象
        this.points.forEach(pointer => {
            const circle = new Circle({
                left: pointer.x - this.width,
                top: pointer.y - this.width,
                radius: this.width,
                fill: this.color,
                opacity: this.opacity,
                selectable: false,
                hasControls: false,
                hasBorders: false
            });
            this.canvas.add(circle);
        });
        
        // 重置状态
        this.isDrawing = false;
        this.points = [];
        
        // 调用父方法清理
        super.onMouseUp?.();
    }

    // 渲染临时绘制内容
    render() {
        if (!this.canvas) return;
        
        // 清除临时上下文
        this.canvas.clearContext(this.canvas.contextTop);
        
        // 在临时上下文上绘制所有点
        const ctx = this.canvas.contextTop;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        this.points.forEach(pointer => {
            ctx.beginPath();
            ctx.arc(pointer.x, pointer.y, this.width, 0, 2 * Math.PI, false);
            ctx.fill();
        });
        
        ctx.restore();
    }
}

export default CustomCircleBrush;