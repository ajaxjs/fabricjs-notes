import { EventEmitter } from 'events';
import hotkeys from 'hotkeys-js';
import { Canvas } from 'fabric';

class Editor extends EventEmitter {
    // fabric Canvas 实例
    private canvas: Canvas | null = null;
    // plugins: 插件列表
    // hotkeys: 热键列表
    
    // 初始化
    init(canvas: Canvas) {
        this.canvas = canvas;
        this.emit('ready', this);
    }
    // 获取fabric Canvas
    get fabricCanvas() {
        return this.canvas;
    }
    // 注册插件
    use(){

    }
}

export default Editor;