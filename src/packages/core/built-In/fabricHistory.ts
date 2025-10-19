import type { CorePluginTemp, IHotkey } from '../interface'
import type { FabricCanvas } from './fabricCanvas'
import { debounce } from 'es-toolkit'

type historyEvent = {
    action: string;
    target?: any;
}
type historyItem = historyEvent & {
    state: string
}

export class FabricHistory implements CorePluginTemp {
    static pluginName = 'history'
    hotkeys: IHotkey[] = [
        { hotkey: 'ctrl+z,command+z', label: '撤销', handler: this.undo },
        { hotkey: 'ctrl+y,command+y', label: '重做', handler: this.redo },
    ]
    canvas: FabricCanvas;

    // 历史记录栈
    private historyStack: historyItem[] = [];
    // 当前历史记录位置
    private currentIndex: number = -1;
    // 历史记录最大数量
    private maxHistorySize: number = 30;
    // 是否是历史操作
    private isHistoryAction: boolean = false;
    // 画布变化事件处理函数
    private changeHandler: any;

    constructor(canvas: FabricCanvas) {
        this.canvas = canvas;
        this._initHistory();
        this._canvasChange();
    }

    private _initHistory() {
        this.saveState({action:'init'})
    }

    // 监听画布变化事件
    protected _canvasChange() {
        const { canvas } = this;
        this.changeHandler = debounce((e: any) => {
            this.saveState.call(this,e)
        }, 300)
        // 对象修改事件
        canvas.on('object:modified', this.changeHandler);
        // 对象添加事件
        canvas.on('object:added', (e)=>this.changeHandler({...e,action:'add'}));
        // 对象移除事件
        canvas.on('object:removed', (e)=>this.changeHandler({...e,action:'remove'}));
    }

    private saveState({action,target}:historyEvent) {
        if (this.isHistoryAction) {
            this.isHistoryAction = false;
            return;
        }
        // 删除currentIndex之后的记录
        const historLen = this.historyStack.length
        if(this.currentIndex < historLen - 1){
            this.historyStack.splice(this.currentIndex,historLen)
        }
        
        const state = this.canvas.toJSON();
        const item: historyItem = {
            action,
            target,
            state: JSON.stringify(state)
        };

        this.historyStack.push(item);
        this.currentIndex++;
        // 保持历史记录数量不超过最大限制
        if (this.historyStack.length > this.maxHistorySize) {
            this.historyStack.shift();
            this.currentIndex--;
        }
    }

    // 定位到指定历史记录索引
    locaTo(index: number) {
        const item: historyItem|undefined = this.historyStack[index];
        if (!item) return;

        //console.log('+++isHistoryAction:true');
        this.isHistoryAction = true;
        this.currentIndex = index;
        this.canvas.loadFromJSON(item.state).then((canvas) => {
            canvas.requestRenderAll()
        });
    }

    // 撤销
    undo() {
        if (this.canUndo()) {
            this.locaTo(this.currentIndex - 1);
        }
    }

    // 重做
    redo() {
        if (this.canRedo()) {
            this.locaTo(this.currentIndex + 1);
        }
    }

    // 检查是否可以撤销
    public canUndo(): boolean {
        return this.currentIndex > 0;
    }

    // 检查是否可以重做
    public canRedo(): boolean {
        return this.currentIndex < this.historyStack.length - 1;
    }

    // 清空历史记录
    public clear() {
        this.historyStack = [];
        this.currentIndex = -1;
        this._initHistory();
    }

    // 获取历史记录信息
    public getHistory() {
        return {
            currentIndex: this.currentIndex,
            total: this.historyStack.length,
            canUndo: this.canUndo(),
            canRedo: this.canRedo()
        };
    }

    // 销毁插件
    public dispose() {
        const { canvas } = this;

        // 移除所有事件监听器
        canvas.off()
        //canvas.off('object:modified', this.changeHandler);
        //canvas.off('object:added', this.changeHandler);
        //canvas.off('object:removed', this.changeHandler);

        // 清空历史记录
        this.clear();
    }
}