import type { IEditor, IPluginTempl } from '../interface/Editor';

const AddBaseObjectPlugin: IPluginTempl = {
    name: 'AddBaseObjectPlugin',
    editor: null,
    init(editor: IEditor) {
        this.editor = editor;
    },
    addBaseObject() {
        const canvas = this.editor.fabricCanvas;
        if (canvas) {
            const rect = new fabric.Rect({
                left: 100,
                top: 100,
                width: 100,
                height: 100,
                fill: 'red',
            });
            canvas.add(rect);
        }
    }
}
