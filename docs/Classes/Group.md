# Fabric.js Group 类 API 文档（中文翻译）

以下是 Fabric.js Group 类的 API 文档的中文翻译。原文基于提供的网页内容提取，包括类描述、构造函数、属性和方法。我已将属性、构造函数参数、方法参数等整理成表格形式，便于查看。翻译力求准确，并保留了技术术语的英文原词以便参考。

## 类描述

Group 类定义在 src/shapes/Group.ts:82。它扩展了 FabricObject，带有 GroupProps、SerializedGroupProps 和 GroupEvents。Group 类会发出以下事件：object:added、object:removed、layout:before、layout:after。该类用于将多个 Fabric 对象分组在一起，管理它们的布局和交互。静态类型为 'Group'。它包含集合 mixin，用于处理多个对象。

## 构造函数

`new Group(objects?, options?): Group`

定义在：src/shapes/Group.ts:137

返回类型：Group

构造函数用于创建 Group 实例，等同于 createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>).constructor。

### 构造函数参数表格

| 参数名   | 类型                                                                 | 默认值 | 描述                     |
|----------|----------------------------------------------------------------------|--------|--------------------------|
| objects | FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[] | []     | 要添加到组的实例对象。   |
| options | Partial<GroupProps>                                                  | {}     | 配置组的选项对象。       |

## 属性

以下是 Group 类的实例属性列表。大多数属性是从父类或 mixin 继承而来，包括名称、类型、默认值（如果适用）和描述。

| 属性名                   | 类型                              | 默认值                  | 描述                                                                 |
|---------------------------|-----------------------------------|-------------------------|----------------------------------------------------------------------|
| __corner                 | string (可选)                    | -                       | 鼠标移动期间保持最后悬停角的值。0 表示无角，或 'mt'、'ml'、'mtr' 等。它应该是私有的，但作为只读属性使用没有害处。这不会自动清理。非选中对象可能有错误值。从 createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>).__corner 继承。 |
| _controlsVisibility      | Record<string, boolean>          | -                       | 此对象的控件可见性映射。当引入控件时保留此项，以不破坏 API 太多。此项优先于通用控件可见性。从 createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>)._controlsVisibility 继承。 |
| _objects                 | FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[] | []                      | 需要也在构造函数中结束。从 createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>)._objects 继承。 |
| _scaling                 | boolean (可选)                   | -                       | 当没有缩放变换时，用于从手势模块跟踪缩放动作的布尔值。这是一个边缘情况，在所有代码库中使用两次。可能添加用于跟踪某些性能问题。使用 git blame 调查添加原因。不要使用它。我们将尝试移除它。从 createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>)._scaling 继承。 |
| absolutePositioned       | boolean                          | false                   | 仅当对象用作 clipPath 时有意义。如果为 true，clipPath 的 top 和 left 将相对于画布，并且不受对象变换影响。这将使 clipPath 相对于画布，但仅剪裁特定对象。警告：这是 beta 功能，可能更改或重命名。从 2.4.0 开始。从 GroupProps.absolutePositioned 继承。 |
| aCoords                  | TCornerPoint                     | -                       | 描述对象的角位置在场景坐标中。坐标来源于：left、top、width、height、scaleX、scaleY、skewX、skewY、angle、strokeWidth。坐标不受视口变化影响。使用 setCoords 更新坐标。可以不更新使用 calcACoords 计算。从 createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>).aCoords 继承。 |
| angle                    | TDegree                          | 0                       | 对象的旋转角度（以度为单位）。从 GroupProps.angle 继承。 |
| backgroundColor          | string                           | -                       | 对象的背景颜色。接受 CSS 颜色 https://www.w3.org/TR/css-color-3/。从 GroupProps.backgroundColor 继承。 |
| borderColor              | string                           | rgb(178,204,255)        | 对象激活时的控制边框颜色。从 GroupProps.borderColor 继承。 |
| borderDashArray          | null \| number[]                 | -                       | 指定对象边框的虚线模式数组（hasBorder 必须为 true）。从 1.6.2 开始。从 GroupProps.borderDashArray 继承。 |
| borderOpacityWhenMoving  | number                           | 0.4                     | 对象激活并移动时控制边框的不透明度。从 GroupProps.borderOpacityWhenMoving 继承。 |
| borderScaleFactor        | number                           | 1                       | 对象的边框（选择框和控件描边）的缩放因子。更大的数字会使边框更粗。边框默认值为 1，因此此缩放值等于边框和控件 strokeWidth。如果需要将边框与控件 strokeWidth 分开，需要编写自己的控件渲染函数。从 GroupProps.borderScaleFactor 继承。 |
| centeredRotation         | boolean                          | -                       | 当为 true 时，对象将围绕其中心旋转。当为 false 时，将围绕由 originX 和 originY 定义的原点旋转。此属性的值在变换期间被忽略，如果画布已将 centeredRotation 设置为 true。对象方法 rotate 将始终考虑此属性，而非画布的属性。从 1.3.4 开始。从 GroupProps.centeredRotation 继承。 |
| centeredScaling          | boolean                          | -                       | 当为 true 时，此对象在使用控件缩放时将使用中心点作为变换原点。从 1.3.4 开始。从 GroupProps.centeredScaling 继承。 |
| clipPath                 | BaseFabricObject<Partial<ObjectProps>, SerializedObjectProps, ObjectEvents> (可选) | -                       | 一个 FabricObject，没有描边定义一个用其形状的剪裁区域。用黑色填充的 clipPath 对象在对象渲染时使用，上下文放置在对象缓存画布的中心。如果希望 clipPath 的 0,0 与对象中心对齐，请使用 clipPath.originX/Y 设置为 'center'。从 GroupProps.clipPath 继承。 |
| clipPathId               | string (可选)                    | -                       | 当对象作为 SVG 中的 clippath 导出时，需要 SVG 中的引用。此引用是 Fabric 命名空间中的 UID，并临时存储在这里。从 createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>).clipPathId 继承。 |
| controls                 | TControlSet                      | -                       | 持有对象的控件。由 default_controls.js 添加。从 createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>).controls 继承。 |
| cornerColor              | string                           | rgb(178,204,255)        | 对象激活时的控制角颜色。从 GroupProps.cornerColor 继承。 |
| cornerDashArray          | null \| number[]                 | null                    | 指定对象控件的虚线模式数组（hasBorder 必须为 true）。从 1.6.2 开始。从 GroupProps.cornerDashArray 继承。 |
| cornerSize               | number                           | 13                      | 对象控制角的大小（以像素为单位）。从 GroupProps.cornerSize 继承。 |
| cornerStrokeColor        | string                           | ''                      | 对象激活且 transparentCorners 为 false 时的控制角颜色。从 1.6.2 开始。从 GroupProps.cornerStrokeColor 继承。 |
| cornerStyle              | "circle" \| "rect"               | 'rect'                  | 指定控件的样式，'rect' 或 'circle'。这是已弃用的。将来会有标准控件渲染。您可以使用控件 API 交换提出的备选方案。从 1.6.2 开始。从 GroupProps.cornerStyle 继承。 |
| dirty                    | boolean                          | true                    | 当设置为 true 时，下次渲染调用时将重新渲染对象的缓存。从 1.7.0 开始。从 createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>).dirty 继承。 |
| evented                  | boolean                          | -                       | 当设置为 false 时，对象不能成为事件的目标。所有事件都会通过它传播。从 v1.3.4 引入。从 GroupProps.evented 继承。 |
| excludeFromExport        | boolean                          | -                       | 当为 true 时，对象不会在 OBJECT/JSON 中导出。从 1.6.3 开始。从 GroupProps.excludeFromExport 继承。 |
| fill                     | null \| string \| TFiller        | rgb(0,0,0)              | 对象的填充颜色。接受 CSS 颜色 https://www.w3.org/TR/css-color-3/。从 GroupProps.fill 继承。 |
| fillRule                 | CanvasFillRule                   | nonzero                 | 用于填充对象的填充规则。可接受的值为 nonzero、evenodd。向后兼容性说明：此属性曾用于设置 globalCompositeOperation，直到 v1.4.12（请改用 globalCompositeOperation）。从 GroupProps.fillRule 继承。 |
| flipX                    | boolean                          | false                   | 当为 true 时，对象水平翻转渲染。从 GroupProps.flipX 继承。 |
| flipY                    | boolean                          | false                   | 当为 true 时，对象垂直翻转渲染。从 GroupProps.flipY 继承。 |
| globalCompositeOperation | GlobalCompositeOperation         | -                       | 用于画布 globalCompositeOperation 的复合规则。从 GroupProps.globalCompositeOperation 继承。 |

**注意**：属性列表基于提取的内容，可能不完整（原文被截断）。更多属性可能存在于完整文档中。

## 方法

以下是 Group 类的实例方法列表，包括方法签名、参数表格、返回类型和描述。大多数方法是从 mixin 继承而来。

### off <K>(eventName: K, handler: TEventCallback): void
定义在：src/Observable.ts:128  
描述：取消订阅事件监听器。  
返回类型：void  

| 参数名    | 类型                | 描述                                      |
|-----------|---------------------|-------------------------------------------|
| eventName | K (extends keyof GroupEvents) | 事件名称（例如 'after:render'）          |
| handler   | TEventCallback      | 要取消订阅的事件监听器                    |

### off(handlers: EventRegistryObject<EventSpec>): void
定义在：src/Observable.ts:133  
描述：取消订阅事件监听器。  
返回类型：void  

| 参数名   | 类型                          | 描述                                      |
|----------|-------------------------------|-------------------------------------------|
| handlers | EventRegistryObject<EventSpec>| 处理程序键/值对（例如 {'after:render': handler, 'selection:cleared': handler}） |

### off(): void
定义在：src/Observable.ts:137  
描述：取消订阅所有事件监听器。  
返回类型：void  

参数：无

### on <K, E>(eventName: K, handler: TEventCallback<E>): VoidFunction
定义在：src/Observable.ts:23  
描述：观察指定事件。  
返回类型：VoidFunction - disposer  

| 参数名    | 类型                  | 描述                                      |
|-----------|-----------------------|-------------------------------------------|
| eventName | K (extends keyof GroupEvents) | 事件名称（例如 'after:render'）          |
| handler   | TEventCallback<E>     | 当指定类型事件发生时接收通知的函数        |

### on(handlers: EventRegistryObject<EventSpec>): VoidFunction
定义在：src/Observable.ts:27  
描述：观察指定事件。  
返回类型：VoidFunction - disposer  

| 参数名   | 类型                          | 描述                                      |
|----------|-------------------------------|-------------------------------------------|
| handlers | EventRegistryObject<EventSpec>| 键/值对（例如 {'after:render': handler, 'selection:cleared': handler}） |

### once <K, E>(eventName: K, handler: TEventCallback<E>): VoidFunction
定义在：src/Observable.ts:62  
描述：观察指定事件一次。  
返回类型：VoidFunction - disposer  

| 参数名    | 类型                  | 描述                                      |
|-----------|-----------------------|-------------------------------------------|
| eventName | K (extends keyof GroupEvents) | 事件名称（例如 'after:render'）          |
| handler   | TEventCallback<E>     | 当指定类型事件发生时接收通知的函数        |

### once(handlers: EventRegistryObject<EventSpec>): VoidFunction
定义在：src/Observable.ts:66  
描述：观察指定事件一次。  
返回类型：VoidFunction - disposer  

| 参数名   | 类型                          | 描述                                      |
|----------|-------------------------------|-------------------------------------------|
| handlers | EventRegistryObject<EventSpec>| 键/值对（例如 {'after:render': handler, 'selection:cleared': handler}） |

### onDeselect(_options?: TPointerEvent): boolean
定义在：src/shapes/Object/InteractiveObject.ts:658  
描述：每次 _discardActiveObject 或 _setActiveObject 尝试取消选择此对象时调用此回调函数。如果函数返回 true，则取消过程。  
返回类型：boolean  

| 参数名    | 类型             | 描述                                      |
|-----------|------------------|-------------------------------------------|
| _options? | TPointerEvent    | 从上层函数发送的选项                      |

### onDragStart(_e: DragEvent): boolean
定义在：src/shapes/Object/InteractiveObject.ts:691  
描述：覆盖以自定义拖动行为。拖动会话开始时触发一次。  
返回类型：boolean - true 表示处理拖动事件  

| 参数名 | 类型       | 描述                                      |
|--------|------------|-------------------------------------------|
| _e     | DragEvent  |                                           |

### onSelect(_options?: TPointerEvent): boolean
定义在：src/shapes/Object/InteractiveObject.ts:672  
描述：每次 _discardActiveObject 或 _setActiveObject 尝试选择此对象时调用此回调函数。如果函数返回 true，则取消过程。  
返回类型：boolean  

| 参数名    | 类型             | 描述                                      |
|-----------|------------------|-------------------------------------------|
| _options? | TPointerEvent    | 如果过程由事件生成，则为事件              |

### remove(...objects: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[]): FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[]
定义在：src/shapes/Group.ts:250  
描述：移除对象。  
返回类型：FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[] - 移除的对象  

| 参数名    | 类型                                                                 | 描述                                      |
|-----------|----------------------------------------------------------------------|-------------------------------------------|
| ...objects| FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[] |                                           |

### removeAll(): FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[]
定义在：src/shapes/Group.ts:317  
描述：移除所有对象。  
返回类型：FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[] - 移除的对象  

参数：无

### render(ctx: CanvasRenderingContext2D): void
定义在：src/shapes/Group.ts:537  
描述：在给定上下文中渲染实例。  
返回类型：void  

| 参数名 | 类型                      | 描述                                      |
|--------|---------------------------|-------------------------------------------|
| ctx    | CanvasRenderingContext2D  | 要渲染实例的上下文                        |

### renderCache(this: TCachedFabricObject, options?: any): void
定义在：src/shapes/Object/Object.ts:683  
返回类型：void  

| 参数名  | 类型                | 描述                                      |
|---------|---------------------|-------------------------------------------|
| this    | TCachedFabricObject |                                           |
| options?| any                 |                                           |

### renderDragSourceEffect(_e: DragEvent): void
定义在：src/shapes/Object/InteractiveObject.ts:712  
描述：覆盖以自定义拖放行为，当对象是拖动事件的源时渲染特定效果。例如：渲染文本对象的拖动部分的选择状态。  
返回类型：void  

| 参数名 | 类型       | 描述                                      |
|--------|------------|-------------------------------------------|
| _e     | DragEvent  |                                           |

### renderDropTargetEffect(_e: DragEvent): void
定义在：src/shapes/Object/InteractiveObject.ts:724  
描述：覆盖以自定义拖放行为，当对象是拖动事件的目标时渲染特定效果。用于显示底层对象可以接收放置，或显示对象在放置时如何变化。例如：显示文本即将放置的光标。  
返回类型：void  

| 参数名 | 类型       | 描述                                      |
|--------|------------|-------------------------------------------|
| _e     | DragEvent  |                                           |

### rotate(angle: TDegree): void
定义在：src/shapes/Object/Object.ts:1443  
描述：使用居中旋转设置实例的“angle”。  
返回类型：void  

| 参数名 | 类型     | 描述                                      |
|--------|----------|-------------------------------------------|
| angle  | TDegree  | 角度值（以度为单位）                      |

### scale(value: number): void
定义在：src/shapes/Object/ObjectGeometry.ts:370  
描述：缩放对象（x 和 y 等比例）。  
返回类型：void  

| 参数名 | 类型   | 描述                                      |
|--------|--------|-------------------------------------------|
| value  | number | 缩放因子                                  |

### scaleToHeight(value: number): void
定义在：src/shapes/Object/ObjectGeometry.ts:393  
描述：相对于边界框将对象缩放到给定高度（x/y 等比例缩放）。  
返回类型：void  

| 参数名 | 类型   | 描述                                      |
|--------|--------|-------------------------------------------|
| value  | number | 新高度值                                  |

### scaleToWidth(value: number): void
定义在：src/shapes/Object/ObjectGeometry.ts:381  
描述：相对于边界框将对象缩放到给定宽度（x/y 等比例缩放）。  
返回类型：void  

| 参数名 | 类型   | 描述                                      |
|--------|--------|-------------------------------------------|
| value  | number | 新宽度值                                  |

### sendObjectBackwards(object: FabricObject, intersecting?: boolean): boolean
定义在：src/Collection.ts:214  
描述：将对象或选择向下移动到绘制对象的堆栈中。可选参数 intersecting 允许将对象移动到第一个相交对象后面。其中相交使用边界框计算。如果未找到相交，则堆栈中不会有变化。  
返回类型：boolean - 如果发生变化则为 true  

| 参数名       | 类型         | 描述                                      |
|--------------|--------------|-------------------------------------------|
| object       | FabricObject | 要发送的对象                              |
| intersecting?| boolean      | 如果为 true，则发送对象到下一个较低相交对象后面 |

### sendObjectToBack(object: FabricObject): boolean
定义在：src/Collection.ts:178  
描述：将对象或多个选择的对象移动到绘制对象堆栈的底部。  
返回类型：boolean - 如果发生变化则为 true  

| 参数名 | 类型         | 描述                                      |
|--------|--------------|-------------------------------------------|
| object | FabricObject | 要发送到后面的对象                        |

### set(key: string | Record<string, any>, value?: any): Group
定义在：src/CommonMethods.ts:29  
描述：将属性设置为给定值。当更改位置/维度相关属性（left、top、scale、angle 等）时，set 不会更新对象的边框/控件位置。如果需要更新那些，请调用 setCoords()。  
返回类型：Group  

| 参数名 | 类型                     | 描述                                      |
|--------|--------------------------|-------------------------------------------|
| key    | string \| Record<string, any> | 属性名称或对象（如果是对象，则迭代对象属性） |
| value? | any                      | 属性值（如果是函数，则传入值并使用其返回值作为新值） |

### setControlsVisibility(options?: Record<string, boolean> = {}): void
定义在：src/shapes/Object/InteractiveObject.ts:611  
描述：设置对象控件的可见性状态，这是 setControlVisible 的批量选项。  
返回类型：void  

| 参数名   | 类型                     | 描述                                      |
|----------|--------------------------|-------------------------------------------|
| options? | Record<string, boolean>  | 带有可选键的每个控件的选项，例如 {Boolean} [options.bl] true 以启用左下控件，false 以禁用它 |

### setControlVisible(controlKey: string, visible: boolean): void
定义在：src/shapes/Object/InteractiveObject.ts:599  
描述：设置指定控件的可见性。请勿使用。请与团队讨论此优先级的重叠。Andrea Bogazzi 了解详情。  
返回类型：void  

| 参数名    | 类型    | 描述                                      |
|-----------|---------|-------------------------------------------|
| controlKey| string  | 控件的键。可能的值为 'tl'、'tr'、'br'、'bl'、'ml'、'mt'、'mr'、'mb'、'mtr'。但由于控件 API 允许任何控件名称，可以是任何字符串。 |
| visible   | boolean | true 以设置指定控件可见，否则为 false     |

### setCoords(): void
定义在：src/shapes/Group.ts:519  
返回类型：void  

参数：无

### setOnGroup(): void
定义在：src/shapes/Object/Object.ts:1475  
描述：对象的父组每次在组上更改非委托属性时调用此回调函数。它传递键和值作为参数。不在函数签名中添加，以避免 Travis 构建错误关于未使用变量。  
返回类型：void  

参数：无

### setPositionByOrigin(pos: Point, originX: TOriginX, originY: TOriginY): void
定义在：src/shapes/Object/ObjectGeometry.ts:778  
描述：考虑对象的原点设置对象的位置。  
返回类型：void  

| 参数名  | 类型     | 描述                                      |
|---------|----------|-------------------------------------------|
| pos     | Point    | 对象的新位置                              |
| originX | TOriginX | 水平原点：'left'、'center' 或 'right'     |
| originY | TOriginY | 垂直原点：'top'、'center' 或 'bottom'     |

### setRelativeX(value: number): void
定义在：src/shapes/Object/ObjectGeometry.ts:123  
描述：根据对象的 originX 属性在父坐标平面中的 x 位置。如果父级是画布，则此方法与 setX 相同。  
返回类型：void  

| 参数名 | 类型   | 描述                                      |
|--------|--------|-------------------------------------------|
| value  | number |                                           |

### setRelativeXY(point: Point, originX?: TOriginX = ..., originY?: TOriginY = ...): void
定义在：src/shapes/Object/ObjectGeometry.ts:186  
描述：与 setXY 相同，但位于当前父坐标平面中（如果有当前组或画布）。  
返回类型：void  

| 参数名   | 类型     | 描述                                      |
|----------|----------|-------------------------------------------|
| point    | Point    | 根据对象的 originX originY 属性在父坐标平面中的位置 |
| originX? | TOriginX | 水平原点：'left'、'center' 或 'right'     |
| originY? | TOriginY | 垂直原点：'top'、'center' 或 'bottom'     |

### setRelativeY(value: number): void
定义在：src/shapes/Object/ObjectGeometry.ts:139  
描述：根据对象的 originY 属性在父坐标平面中的 y 位置。如果父级是画布，则此属性与 setY 相同。  
返回类型：void  

| 参数名 | 类型   | 描述                                      |
|--------|--------|-------------------------------------------|
| value  | number |                                           |

### setX(value: number): void
定义在：src/shapes/Object/ObjectGeometry.ts:93  
描述：根据对象的 originX 属性在画布坐标平面中的 x 位置。  
返回类型：void  

| 参数名 | 类型   | 描述                                      |
|--------|--------|-------------------------------------------|
| value  | number |                                           |

