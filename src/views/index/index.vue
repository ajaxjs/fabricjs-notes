<script setup>
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import ContextMenu from '@/components/context-menu/ContextMenu.vue'
import LayerPanel from '@/components/layer-panel/LayerPanel.vue'
import {
    Square, Circle as CircleIcon, Type, Trash, FolderOpen, FileJson2, ImageDown, ImageUp, TextSelect, Triangle as TriangleIcon, Paintbrush,
    Brush, Pencil, SprayCan, Shell, BrushCleaning,
} from 'lucide-vue-next'
import { onMounted, onUnmounted, ref, shallowRef, useTemplateRef } from 'vue';
import { Canvas, classRegistry, Rect, Circle, FabricText, IText, FabricImage, Group, Textbox, Triangle } from 'fabric';
import { CircleBrush, SprayBrush, PencilBrush, PatternBrush } from 'fabric';
import { saveAs } from 'file-saver';
import { loadSvgFile } from './loadFile.js';
import { useDraggable } from '@vueuse/core'
import CustomCircleBrush from './brush.js';

let canvas = null;
let paintCanvas = null;
const pan = ref();
const brushType = ref('pencil');
const paintInited = ref(false);



function initPaintCanvas(elm) {
    if (paintCanvas) {
        paintInited.value = true;
        return;
    }
    paintCanvas = new Canvas('panter', {
        isDrawingMode: true,
    })
    paintInited.value = true;
    setPencilBrush()
}
function setPencilBrush() {
    paintCanvas.freeDrawingBrush = new PencilBrush(paintCanvas, {
        width: 30,      // 喷雾宽度（像素），控制喷雾范围，默认 10
        opacity: 1,   // 不透明度，控制喷雾点的透明感，默认 0.2
        color: '#FF0000', // 喷雾颜色，默认黑色,
        strokeLineJoin: 'miter',
        strokeMiterLimit: 0, // 控制笔触的最大斜接角度，默认 10
    });
}
function setSprayBrush() {
    paintCanvas.freeDrawingBrush = new SprayBrush(paintCanvas, {
        width: 30,      // 喷雾宽度（像素），控制喷雾范围，默认 10
        opacity: 0.5,   // 不透明度，控制喷雾点的透明感，默认 0.2
        color: '#FF0000' // 喷雾颜色，默认黑色
    });
}
function setCircleBrush() {
    paintCanvas.freeDrawingBrush = new CircleBrush(paintCanvas, {
        width: 30,      // 喷雾宽度（像素），控制喷雾范围，默认 10
        opacity: 0.5,   // 不透明度，控制喷雾点的透明感，默认 0.2
        color: '#FF0000' // 喷雾颜色，默认黑色
    });
}
function setCustomCircleBrush() {
    paintCanvas.freeDrawingBrush = new CustomCircleBrush(paintCanvas, {
        width: 30,      // 喷雾宽度（像素），控制喷雾范围，默认 10
        opacity: 0.5,   // 不透明度，控制喷雾点的透明感，默认 0.2
        color: '#FF0000' // 喷雾颜色，默认黑色
    });
}
function setPatternBrush() {
    paintCanvas.freeDrawingBrush = new PatternBrush(paintCanvas, {
        width: 30,      // 喷雾宽度（像素），控制喷雾范围，默认 10
        opacity: 0.5,   // 不透明度，控制喷雾点的透明感，默认 0.2
        color: '#FF0000' // 喷雾颜色，默认黑色
    });
}



function setPaintSave() {
    const objects = paintCanvas.getObjects()
    const id = getMaxId() + 1;
    const paints = new Group(objects, {id: id, label:'图层'+id})
    console.log(paints);
    
    canvas.add(paints)
    paintInited.value = false;
    paintCanvas.clear()
}
function onCleanPaint() {
    paintCanvas.clear()
}



function setPaintMode() {
    initPaintCanvas()
}



const canvasRef = ref(null);
const el = useTemplateRef('canvasContainer');
const disabled = shallowRef(true);
const { x, y, style } = useDraggable(el, {
    initialValue: { x: 80, y: 40 },
    preventDefault: true,
    disabled,
})

const layerList = ref([]);

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        disabled.value = false;
    }
})
document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        disabled.value = true;
    }
})

onMounted(() => {
    canvas = new Canvas('canvas', {
        //isDrawingMode: true,
        //fireRightClick: false, // 启用右键，button的数字为3
        //stopContextMenu: true, // 禁止默认右键菜单
        controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
        // imageSmoothingEnabled: false, // 解决文字导出后不清晰问题
        preserveObjectStacking: true, // 当选择画布中的对象时，让对象不在顶层。
    })
    /*
    canvas.freeDrawingBrush = new SprayBrush(canvas, {
        width: 30,      // 喷雾宽度（像素），控制喷雾范围，默认 10
        opacity: 0.5,   // 不透明度，控制喷雾点的透明感，默认 0.2
        color: '#FF0000' // 喷雾颜色，默认黑色
    });
    */
    // list变化
    function layerUpdate(e) {
        layerList.value = (canvas?.getObjects() || []);
    }
    canvas?.on('object:added', layerUpdate);
    canvas?.on('object:removed', layerUpdate);
    canvas?.on('selection:created', layerUpdate);
    canvas?.on('selection:updated', layerUpdate);
    canvas?.on('selection:cleared', layerUpdate);

    // 创建组
    const buildGroup = (items) => {
        items = canvas.getActiveObjects();
        if (items.length > 1) { // 至少需要两个对象才能创建组
            Group.customProperties = ['id', 'label']
            const id = getMaxId() + 1;
            const group = new Group(items, {
                id,
                label: `群组${id}`,
            });
            items.forEach(obj => canvas.remove(obj)); // 移除原始对象
            canvas.add(group); // 添加组到画布
            canvas.setActiveObject(group); // 选中新创建的组
            canvas.renderAll();
        } else if (items[0] && items[0].type === 'group') {
            // 取消组
            const group = items[0];
            canvas.remove(group);
            const children = group.removeAll(); // detaches all
            canvas.add(...children); // add back to canvas
            canvas.requestRenderAll();
            /*const objects = group.getObjects();
            canvas.remove(group); // 移除组
            objects.forEach(obj => canvas.add(obj)); // 添加组内对象到画布
            canvas.discardActiveObject(); // 清除当前活动对象
            canvas.requestRenderAll(); // 重新渲染画布
            canvas.renderAll();*/
        } else {
            console.log('选中的对象不是组');
        }
    }

    // 监听键盘事件，当按下 delete 键时删除选中对象
    const handleKeyDown = (e) => {

        if (e.key === 'Delete' && canvas) {
            const activeObjects = canvas.getActiveObjects();
            if (activeObjects.length > 0) {
                canvas.remove(...activeObjects);
                canvas.discardActiveObject();
                canvas.requestRenderAll();
            }
        } else if (e.key === 'g' && e.ctrlKey) {
            e.preventDefault();
            buildGroup();
            //canvas?.setActiveGroup(canvas?.getActiveObjects());
        }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 组件卸载时移除事件监听
    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeyDown);
    });
})

function getMaxId() {
    let maxId = 0;
    layerList.value.forEach(item => {
        if (item.id > maxId) {
            maxId = item.id;
        }
    })
    return maxId;
}

const addRect = () => {
    const id = getMaxId() + 1;
    Rect.customProperties = ['id', 'label']
    const rect = new Rect({
        left: Math.random() * 500,
        top: Math.random() * 500,
        width: 100,
        height: 100,
        fill: '#FDD696',
        id,
        label: `图层${id}`,
    });
    canvas?.add(rect);
}

const addCircle = () => {
    const id = getMaxId() + 1;
    Circle.customProperties = ['id', 'label']
    const circle = new Circle({
        left: Math.random() * 500,
        top: Math.random() * 500,
        radius: 50,
        fill: '#73B570',
        id,
        label: `图层${id}`,
    });
    canvas?.add(circle);
}

const addText = () => {
    const id = getMaxId() + 1;
    IText.customProperties = ['id', 'label']
    const text = new IText('hello world', {
        left: Math.random() * 400,
        top: Math.random() * 500,
        fontFamily: 'Arial',
        fontSize: 30,
        fill: '#333',
        id,
        label: `图层${id}`,
    });
    text.on('changed', (e) => {
        console.log('文本编辑：', text.text);
    })
    canvas?.add(text);
    // 设置文本对象可选
    text.selectable = true;
}

const clearCanvas = () => {
    canvas?.clear();
}
const addImage = (file) => {
    console.log('file', file);

    const reader = new FileReader();
    reader.onload = async (e) => {
        const img = await FabricImage.fromURL(e.target.result, {
            crossOrigin: 'anonymous',

        })
        // 设置最大宽度和高度
        const maxWidth = 200; // 最大宽度
        const maxHeight = 200; // 最大高度
        let scale = 1;

        // 计算缩放比例以适应最大尺寸，保持纵横比
        if (img.width > maxWidth || img.height > maxHeight) {
            const scaleX = maxWidth / img.width;
            const scaleY = maxHeight / img.height;
            scale = Math.min(scaleX, scaleY); // 取较小的缩放比例
        }
        img.set({
            left: 100,
            top: 100,
            scaleX: scale,
            scaleY: scale,
        })
        canvas?.add(img)
    }
    reader.readAsDataURL(file)
}

const addTriangle = () => {
    const id = getMaxId() + 1;
    Triangle.customProperties = ['id', 'label']
    const triangle = new Triangle({
        left: Math.random() * 500,
        top: Math.random() * 500,
        width: 100,
        height: 100,
        fill: '#FDD696',
        id,
        label: `图层${id}`,
    });
    canvas?.add(triangle);
}

const addTextBox = () => {
    const id = getMaxId() + 1;
    Textbox.customProperties = ['id', 'label']
    const textbox = new Textbox('hello world', {
        left: Math.random() * 400,
        top: Math.random() * 500,
        fontFamily: 'Arial',
        width: 130,
        height: 180,
        fontSize: 20,
        fill: '#333',
        id,
        label: `图层${id}`,
    });
    textbox.on('changed', (e) => {
        console.log('文本编辑：', textbox.text);
    })
    canvas?.add(textbox);
    // 设置文本对象可选
    textbox.selectable = true;
}



const handleAddImage = (e) => {
    Array.from(e.target.files).map(addImage)
}
const exportJson = () => {
    const json = canvas?.toJSON();
    const file = new File([JSON.stringify(json)], 'canvas.json', { type: 'application/json' });
    //saveAs(file, 'canvas.json');
    console.log('json', json);
}
const exportSvg = () => {
    const svg = canvas?.toSVG();
    if (svg) {
        const file = new File([svg], 'canvas.svg', { type: 'image/svg+xml' });
        saveAs(file, 'canvas.svg');
    }
    console.log('svg', svg);
}

function handleLoadSvg(e) {
    loadSvgFile(e, canvas);
}

function onDelete(obj) {
    if (obj && canvas) {
        const delObj = canvas.getObjects().filter(item => item.id === obj.id)[0];
        canvas.remove(delObj);
        canvas.renderAll();
    }
}

</script>

<template>
    <div class="flex w-screen h-screen">
        <div class="flex flex-col gap-2 p-2">
            <Button variant="outline" @click="addRect">
                <Square />
            </Button>
            <Button variant="outline" @click="addCircle">
                <CircleIcon />
            </Button>
            <Button variant="outline" @click="addTriangle">
                <TriangleIcon />
            </Button>
            <Button variant="outline" @click="addText">
                <Type />
            </Button>
            <Button variant="outline" @click="addTextBox">
                <TextSelect />
            </Button>
            <Button variant="outline" @click="setPaintMode" :class="paintInited ? 'text-blue' : ''">
                <Paintbrush />
            </Button>
            <Button variant="outline" as="label">
                <ImageUp />
                <input type="file" accept="image/*" multiple @change="handleAddImage" style="display: none;">
            </Button>
            <Button variant="outline" as="label" title="加载SVG文件">
                <input type="file" accept="image/svg+xml" @change="handleLoadSvg" style="display: none;">
                <FolderOpen />
            </Button>
            <div class="flex-1"></div>
            <Button variant="outline" @click="exportSvg">
                <ImageDown />
            </Button>
            <Button variant="outline" @click="exportJson">
                <FileJson2 />
            </Button>
            <Button variant="outline" @click="clearCanvas">
                <Trash />
            </Button>
        </div>
        <div class="flex-1 flex items-center justify-center relative">
            <!-- <div ref="canvasContainer" class="fixed size-40 border border-amber-400 bg-amber-200 z-999" :style="style">
                box-{{ x }}-{{ y }}-{{ disabled }}
            </div> -->
            <div ref="canvasContainer" class="canvas-box relative" :class="disabled ? '' : 'dragable'">
                <ContextMenu>
                    <div v-show="paintInited" class="absolute left-0 top-0 z-1 bg-blue-100/50">
                        <div class="w-full flex gap-2 absolute left-0 bottom-full z-1 p-1">
                            <Button variant="outline" @click="setCircleBrush">
                                <Brush />
                            </Button>
                            <Button variant="outline" @click="setPencilBrush">
                                <Pencil />
                            </Button>
                            <Button variant="outline" @click="setCustomCircleBrush">
                                <Brush />
                            </Button>
                            <Button variant="outline" @click="setSprayBrush">
                                <SprayCan />
                            </Button>
                            <Button variant="outline" @click="setPatternBrush">
                                <Shell />
                            </Button>
                            <Button variant="outline" @click="onCleanPaint">
                                <BrushCleaning />
                            </Button>
                            <div class="flex-1"></div>
                            <Button variant="outline" @click="setPaintSave">
                                完成
                            </Button>
                        </div>
                        <canvas id="panter" width="600" height="600"></canvas>
                    </div>
                    <canvas id="canvas" ref="canvasRef" width="600" height="600" class="shadow-sm"></canvas>
                </ContextMenu>
            </div>
        </div>
        <LayerPanel v-model="layerList" :canvas="canvas" @delete="onDelete" />
    </div>
</template>

<style lang="scss" scoped>
.canvas-box {
    position: fixed;
    width: 600px;
    height: 600px;
    border: 1px solid #000;
}
</style>