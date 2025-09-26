# fabricjs-notes
FabricJS 学习笔记

# Fabric.js API 核心模块整理
本文档基于 [Fabric.js 官方 API 文档](https://fabricjs.com/api/)，将核心模块按 **Namespaces（命名空间）**、**Classes（类）**、**Interfaces（接口）**、**Type Aliases（类型别名）**、**Variables（变量）**、**Functions（函数）** 分类整理，每个模块均包含名称及详细说明，便于开发者快速查阅和理解。


## 一、Namespaces（命名空间）
命名空间用于组织相关功能的工具、过滤器或辅助方法，避免全局作用域污染，便于模块化调用。

| 名称 | 详细说明 |
|------|----------|
| `controlsUtils` | 提供与对象控制（如缩放、旋转控件）相关的工具函数，例如控件位置计算、交互逻辑封装等，支持自定义对象控制行为的扩展。 |
| `filters` | 包含 Fabric.js 所有内置图像过滤器（如模糊、灰度、对比度调整等），并提供过滤器的创建、应用和序列化能力，可用于图像和图形的视觉效果优化。 |
| `util` | 全局工具函数集合，涵盖数据处理（如坐标转换、矩阵运算）、类型判断（如检查是否为 Fabric 对象）、DOM 操作辅助、颜色处理等通用功能，是框架内部和开发者常用的工具库。 |


## 二、Classes（类）
类是 Fabric.js 功能实现的核心载体，涵盖画布、图形、交互、布局等所有核心能力，开发者通过实例化类实现具体功能。

| 名称 | 详细说明 |
|------|----------|
| `ActiveSelection` | 管理多个选中对象的集合类，支持对选中对象进行批量操作（如移动、缩放、旋转），并维护选中状态的同步，区别于 `Group`（`Group` 会将对象合并为一个整体，`ActiveSelection` 保留对象独立性）。 |
| `BaseBrush` | 所有画笔工具的基类，定义画笔的核心接口（如绘制、结束绘制），子类（如 `PencilBrush`、`CircleBrush`）基于此类实现具体画笔逻辑，支持自定义画笔扩展。 |
| `BaseFabricObject` | 所有 2D 图形对象的根类（如 `Rect`、`Circle`、`Path`），封装了图形的基础属性（位置、尺寸、样式）、事件（选中、移动、修改）和方法（克隆、序列化、变换），是图形类的继承基础。 |
| `Canvas` | 交互式画布核心类，基于 HTML5 Canvas 元素，提供图形渲染、事件监听（如鼠标、触摸）、对象管理（添加、删除、选中）等功能，是 Fabric.js 应用的入口。 |
| `Canvas2dFilterBackend` | 基于 2D Canvas API 实现的过滤器后端，负责处理图像过滤器的渲染逻辑，适用于不支持 WebGL 的环境，确保过滤器功能的兼容性。 |
| `CanvasDOMManager` | 管理 `Canvas` 类相关的 DOM 元素（如画布容器、辅助元素），处理 DOM 事件绑定、尺寸自适应、样式调整等，协调 Canvas 与 DOM 环境的交互。 |
| `Circle` | 圆形图形类，继承自 `BaseFabricObject`，支持通过半径、位置、样式（填充、描边）等属性创建圆形，提供圆形特有的几何计算（如边界框、包含点判断）。 |
| `CircleBrush` | 圆形画笔类，继承自 `BaseBrush`，使用户可在画布上绘制圆形或类圆形笔触（如喷溅效果的圆形点），支持调整笔触大小、密度等参数。 |
| `ClipPathLayout` | 裁剪路径（ClipPath）的布局管理类，负责控制裁剪路径与目标对象的位置对齐、尺寸适配逻辑，确保裁剪效果符合预期。 |
| `Color` | 颜色处理类，支持 RGB、RGBA、Hex、HSL 等多种颜色格式的解析、转换和操作（如调整透明度、亮度），提供颜色的序列化和反序列化能力。 |
| `Control` | 对象控制元素（如缩放手柄、旋转按钮）的类，定义控制元素的外观、位置、交互逻辑（如点击、拖拽），支持自定义对象的控制组件。 |
| `Ellipse` | 椭圆形图形类，继承自 `BaseFabricObject`，通过长轴、短轴、位置、旋转角度等属性创建椭圆，支持椭圆特有的几何计算和渲染。 |
| `FabricImage` | 图像对象类，用于在画布上加载和渲染图像（支持 URL、DOM 图像元素、Base64 等源），支持图像的缩放、裁剪、滤镜应用等操作，继承自 `BaseFabricObject`。 |
| `FabricObject` | `BaseFabricObject` 的核心实现类，进一步封装图形对象的变换（旋转、缩放、倾斜）、缓存、序列化等功能，是多数图形类的直接父类。 |
| `FabricText` | 文本对象类，支持在画布上渲染静态文本，可设置字体、大小、颜色、对齐方式等样式，继承自 `BaseFabricObject`，是 `Textbox` 和 `IText` 的基础。 |
| `FitContentLayout` | “自适应内容”布局策略类，用于自动调整容器或对象的尺寸以适配其内容（如文本框根据文字长度调整宽度），属于 `LayoutStrategy` 的具体实现。 |
| `FixedLayout` | “固定布局”策略类，用于将对象固定在指定位置或尺寸（不随内容变化），适用于需要固定布局结构的场景，属于 `LayoutStrategy` 的具体实现。 |
| `Gradient` | 渐变效果类，支持线性渐变（LinearGradient）和径向渐变（RadialGradient），可定义渐变颜色停止点、方向、范围等属性，用于图形对象的填充或描边。 |
| `Group` | 对象组类，用于将多个图形对象合并为一个整体，支持对组进行统一的移动、缩放、旋转等操作，组内对象的相对位置和属性保持不变，适用于批量管理关联对象。 |
| `InteractiveFabricObject` | 增强交互能力的图形对象类，继承自 `BaseFabricObject`，添加了更丰富的交互事件（如拖拽、悬停）和状态管理，是需要复杂交互的对象的父类。 |
| `Intersection` | 几何交集计算类，提供图形对象之间（如矩形与圆形、线段与多边形）的交集检测和计算，返回交集区域的坐标或类型，用于碰撞检测、裁剪等场景。 |
| `IText` | 可编辑文本对象类，继承自 `FabricText`，支持文本的实时编辑（如插入、删除字符）、光标定位、文本样式局部调整（如部分文字变色），适用于需要文本交互的场景。 |
| `LayoutManager` | 布局管理器类，负责协调和应用布局策略（如 `FitContentLayout`、`FixedLayout`），管理对象的布局更新、事件触发（如布局前/后回调），支持自定义布局逻辑扩展。 |
| `LayoutStrategy` | 布局策略抽象基类，定义了布局逻辑的核心接口（如计算布局、应用布局），具体布局行为由子类（如 `FitContentLayout`）实现，是布局系统的扩展基础。 |
| `Line` | 线段图形类，继承自 `BaseFabricObject`，通过起点和终点坐标创建线段，支持设置描边样式、线宽、线端/拐角样式，提供线段的几何计算（如长度、斜率）。 |
| `Observable` | 事件订阅与发布的基类，提供 `on`（绑定事件）、`off`（解绑事件）、`fire`（触发事件）等方法，被 `Canvas`、`BaseFabricObject` 等类继承，支撑框架的事件系统。 |
| `Path` | 路径图形类，继承自 `BaseFabricObject`，通过 SVG 路径字符串（如 `M 0 0 L 100 100`）定义复杂图形，支持任意形状的创建和编辑，是 Fabric.js 中最灵活的图形类之一。 |
| `Pattern` | 图案填充类，支持使用图像、Canvas 或 SVG 作为图案，定义图案的重复方式（如重复、水平重复、垂直重复）、缩放比例等，用于图形对象的填充或描边。 |
| `PatternBrush` | 图案画笔类，继承自 `BaseBrush`，使用自定义图案（如纹理、图标）作为笔触，用户可在画布上绘制带有图案的线条或区域，支持调整图案大小和密度。 |
| `PencilBrush` | 铅笔画笔类，继承自 `BaseBrush`，模拟真实铅笔的绘制效果，支持自由绘制连续线条，可调整线条宽度、透明度，线条平滑度可通过参数控制。 |
| `Point` | 2D 坐标点类，封装了 X 和 Y 坐标，提供点的加减、距离计算、旋转、缩放等几何操作，是 Fabric.js 中处理坐标的基础数据结构。 |
| `Polygon` | 多边形图形类，继承自 `BaseFabricObject`，通过顶点坐标数组创建闭合多边形（如三角形、五边形），支持填充、描边样式，提供多边形的面积、边界框等计算。 |
| `Polyline` | 折线图形类，继承自 `BaseFabricObject`，通过顶点坐标数组创建开放折线（与 `Polygon` 区别在于不闭合），支持描边样式，适用于绘制路径、网格等。 |
| `Rect` | 矩形图形类，继承自 `BaseFabricObject`，通过宽度、高度、位置、圆角半径等属性创建矩形或圆角矩形，支持填充、描边样式，是最常用的基础图形之一。 |
| `Shadow` | 阴影效果类，定义图形对象的阴影样式（如颜色、模糊度、偏移量），支持阴影的序列化和反序列化，可应用于所有继承自 `BaseFabricObject` 的图形。 |
| `SprayBrush` | 喷溅画笔类，继承自 `BaseBrush`，模拟喷溅效果（如喷漆、粒子喷绘），用户可在画布上绘制随机分布的点或图案，支持调整喷溅密度、大小等参数。 |
| `StaticCanvas` | 静态画布类，与 `Canvas` 区别在于不支持交互（如鼠标选中、拖拽），仅用于图形渲染，适用于无需用户交互的场景（如生成静态图像、导出 SVG），性能更优。 |
| `StaticCanvasDOMManager` | 管理 `StaticCanvas` 相关的 DOM 元素，处理静态画布的尺寸调整、样式设置、DOM 事件屏蔽（因静态画布无交互），协调静态画布与 DOM 环境的适配。 |
| `Textbox` | 文本框类，继承自 `FabricText`，支持多行文本渲染和自动换行，可设置文本框的宽度、高度、对齐方式，文本会根据文本框尺寸自动调整换行，适用于多行文本展示。 |
| `Triangle` | 三角形图形类，继承自 `BaseFabricObject`，通过底边长度、高度、位置等属性创建等腰三角形，支持填充、描边样式，提供三角形的几何计算（如面积、边界框）。 |
| `WebGLFilterBackend` | 基于 WebGL 实现的过滤器后端，利用 GPU 加速图像过滤器的渲染，支持更复杂的滤镜效果和更高的性能，适用于支持 WebGL 的现代浏览器。 |


## 三、Interfaces（接口）
接口定义了类或对象的属性、方法的结构规范，确保类型一致性，便于代码协作和扩展（TypeScript 特性）。

| 名称 | 详细说明 |
|------|----------|
| `ActiveSelectionOptions` | 定义 `ActiveSelection` 类的初始化配置选项，如是否启用批量变换、选中样式等，约束 `ActiveSelection` 实例化时的参数结构。 |
| `BasicTransformEvent` | 定义基础变换事件（如旋转、缩放、移动）的事件数据结构，包含变换前后的对象状态、变换类型等信息，用于事件回调函数的参数类型约束。 |
| `CanvasEvents` | 定义 `Canvas` 类支持的所有事件（如 `object:added`、`mouse:down`）的类型和事件数据结构，规范画布事件的订阅和触发逻辑。 |
| `CanvasOptions` | 定义 `Canvas` 类的初始化配置选项，如画布尺寸、背景色、是否启用交互、过滤器后端类型等，约束 `new Canvas(elem, options)` 中 `options` 的结构。 |
| `CircleProps` | 定义 `Circle` 类的属性结构，包含圆形特有的属性（如 `radius` 半径）和继承自 `BaseFabricObject` 的通用属性（如 `left`、`top`），用于类型检查和自动补全。 |
| `CollectionEvents` | 定义对象集合（如 `Group`、`ActiveSelection`）支持的事件（如 `object:removed`、`collection:changed`）的类型和数据结构，规范集合类的事件系统。 |
| `DragEventData` | 定义拖拽事件（如 `object:dragging`）的事件数据结构，包含拖拽的对象、鼠标位置、拖拽偏移量等信息，用于拖拽相关回调函数的参数约束。 |
| `DropEventData` | 定义放置事件（如 `object:dropped`）的事件数据结构，包含被放置的对象、放置目标、鼠标位置等信息，用于放置相关回调函数的参数约束。 |
| `EllipseProps` | 定义 `Ellipse` 类的属性结构，包含椭圆特有的属性（如 `rx` 长轴半径、`ry` 短轴半径）和通用属性，用于类型检查和自动补全。 |
| `FabricObjectProps` | 定义所有 `FabricObject` 子类的通用属性结构（如 `fill`、`stroke`、`opacity`），是 `CircleProps`、`RectProps` 等具体图形属性接口的基础。 |
| `GroupEvents` | 定义 `Group` 类支持的事件（如 `group:modified`、`object:added`）的类型和数据结构，规范组对象的事件订阅和触发。 |
| `GroupOwnProps` | 定义 `Group` 类特有的属性结构（如 `subTargetCheck` 是否检查子对象、`coords` 组的坐标），区别于继承的通用属性。 |
| `GroupProps` | 定义 `Group` 类的完整属性结构，包含 `GroupOwnProps` 和继承自 `BaseFabricObject` 的通用属性，用于 `Group` 实例的类型约束。 |
| `ImageProps` | 定义 `FabricImage` 类的属性结构，包含图像特有的属性（如 `src` 图像源、`crossOrigin` 跨域设置）和通用属性，用于图像对象的类型检查。 |
| `ITextProps` | 定义 `IText` 类的属性结构，包含可编辑文本特有的属性（如 `editable` 是否可编辑、`cursorColor` 光标颜色）和通用文本属性，用于可编辑文本的类型约束。 |
| `MiscEvents` | 定义框架中通用的杂项事件（如 `animation:end`、`error`）的类型和数据结构，涵盖非特定类的全局事件。 |
| `ModifiedEvent` | 定义对象修改事件（如 `object:modified`）的事件数据结构，包含修改的对象、修改前后的属性差异等信息，用于对象修改回调的参数约束。 |
| `ModifyPathEvent` | 定义路径修改事件（如 `path:modified`）的事件数据结构，包含被修改的路径对象、修改的路径段信息等，用于路径编辑相关的回调约束。 |
| `ObjectEvents` | 定义所有 `BaseFabricObject` 子类支持的事件（如 `selected`、`moving`、`rotating`）的类型和数据结构，规范图形对象的事件系统。 |
| `PathProps` | 定义 `Path` 类的属性结构，包含路径特有的属性（如 `path` SVG 路径字符串、`pathOffset` 路径偏移）和通用属性，用于路径对象的类型检查。 |
| `RectProps` | 定义 `Rect` 类的属性结构，包含矩形特有的属性（如 `width` 宽度、`height` 高度、`rx`/`ry` 圆角半径）和通用属性，用于矩形对象的类型约束。 |
| `SerializedCircleProps` | 定义 `Circle` 类序列化后的属性结构（如 `radius` 会被包含在序列化结果中），规范圆形对象转为 JSON 时的字段格式。 |
| `SerializedEllipseProps` | 定义 `Ellipse` 类序列化后的属性结构（如 `rx`、`ry` 会被包含），规范椭圆对象的序列化格式。 |
| `SerializedGroupProps` | 定义 `Group` 类序列化后的属性结构（如包含子对象的序列化数据 `objects`），规范组对象的序列化格式。 |
| `SerializedImageProps` | 定义 `FabricImage` 类序列化后的属性结构（如 `src`、`crossOrigin` 会被包含），规范图像对象的序列化格式。 |
| `SerializedITextProps` | 定义 `IText` 类序列化后的属性结构（如 `editable`、`text` 会被包含），规范可编辑文本的序列化格式。 |
| `SerializedLineProps` | 定义 `Line` 类序列化后的属性结构（如 `x1`/`y1` 起点、`x2`/`y2` 终点会被包含），规范线段对象的序列化格式。 |
| `SerializedObjectProps` | 定义所有 `BaseFabricObject` 子类序列化后的通用属性结构（如 `left`、`top`、`fill`、`stroke`），是具体图形序列化接口的基础。 |
| `SerializedPathProps` | 定义 `Path` 类序列化后的属性结构（如 `path` 路径字符串会被包含），规范路径对象的序列化格式。 |
| `SerializedPolylineProps` | 定义 `Polyline` 类序列化后的属性结构（如 `points` 顶点数组会被包含），规范折线对象的序列化格式。 |
| `SerializedRectProps` | 定义 `Rect` 类序列化后的属性结构（如 `width`、`height`、`rx`/`ry` 会被包含），规范矩形对象的序列化格式。 |
| `SerializedTextboxProps` | 定义 `Textbox` 类序列化后的属性结构（如 `width`、`height`、`text` 会被包含），规范文本框的序列化格式。 |
| `SerializedTextProps` | 定义 `FabricText` 类序列化后的属性结构（如 `text`、`fontFamily`、`fontSize` 会被包含），规范静态文本的序列化格式。 |
| `StaticCanvasEvents` | 定义 `StaticCanvas` 类支持的事件（如 `after:render`）的类型和数据结构，因静态画布无交互，事件多与渲染相关。 |
| `StaticCanvasOptions` | 定义 `StaticCanvas` 类的初始化配置选项（如 `width`、`height`、`backgroundColor`），约束静态画布实例化时的参数结构。 |
| `TEvent` | 定义 Fabric.js 中所有事件的通用类型结构，包含事件名称、目标对象、事件数据等，是所有具体事件类型的基础。 |
| `TextboxProps` | 定义 `Textbox` 类的属性结构，包含文本框特有的属性（如 `width`、`height`、`wrapStrategy` 换行策略）和通用文本属性，用于文本框的类型约束。 |
| `TextProps` | 定义 `FabricText` 类的属性结构，包含静态文本特有的属性（如 `text`、`fontFamily`、`textAlign`）和通用属性，用于静态文本的类型检查。 |
| `TPointerEventInfo` | 定义指针事件（如鼠标、触摸）的详细信息结构，包含指针位置、按下状态、修饰键（如 Ctrl、Shift）等，用于指针事件回调的参数约束。 |
| `XY` | 定义包含 `x` 和 `y` 坐标的基础数据结构，用于表示位置、尺寸、偏移量等，是框架中最常用的坐标接口（如 `Point` 类实现此接口）。 |


## 四、Type Aliases（类型别名）
类型别名用于简化复杂类型定义，提高代码可读性，主要基于接口或基础类型组合而成（TypeScript 特性）。

| 名称 | 详细说明 |
|------|----------|
| `Abortable` | 定义支持“中止”功能的对象类型，通常包含 `abort()` 方法，用于可取消的操作（如动画、网络请求）。 |
| `CanvasPointerEvents` | 定义 `Canvas` 类支持的指针事件类型（如 `mousedown`、`mousemove`、`touchstart`），是字符串字面量类型的集合。 |
| `CircleBrushPoint` | 定义 `CircleBrush` 画笔绘制的点的类型，包含点的坐标、大小、透明度等信息，用于画笔绘制逻辑。 |
| `CollectionChangeLayoutContext` | 定义集合对象（如 `Group`）布局变化时的上下文类型，包含变化的对象、布局策略、布局前后的状态等，用于布局回调。 |
| `ColorStop` | 定义渐变颜色停止点的类型，包含 `offset`（偏移量，0-1 或百分比）和 `color`（颜色值），用于 `Gradient` 类的渐变配置。 |
| `CommonLayoutContext` | 定义所有布局策略通用的上下文类型，包含布局目标对象、容器尺寸、布局选项等，是具体布局上下文的基础。 |
| `CompleteTextStyleDeclaration` | 定义完整的文本样式声明类型，包含字体、大小、颜色、对齐方式、行高、字间距等所有文本相关样式属性。 |
| `Constructor` | 定义类的构造函数类型，泛型参数约束构造函数的实例类型，用于工厂函数、类继承相关的类型约束。 |
| `ControlActionHandler` | 定义控件交互行为的处理函数类型，参数包含控件实例、事件数据、对象状态等，用于自定义控件的点击、拖拽逻辑。 |
| `ControlCallback` | 定义控件回调函数的类型，用于控件状态变化（如激活、禁用）时的通知，参数包含控件实例和相关事件数据。 |
| `ControlCursorCallback` | 定义控件光标样式的回调函数类型，返回光标样式字符串（如 `'pointer'`、`'crosshair'`），用于根据控件状态动态调整光标。 |
| `CursorBoundaries` | 定义光标移动边界的类型，包含 `minX`、`maxX`、`minY`、`maxY`，用于限制光标在指定范围内移动。 |
| `CursorRenderingData` | 定义光标渲染数据的类型，包含光标位置、样式、尺寸等信息，用于自定义光标的渲染逻辑。 |
| `DrawContext` | 定义绘制上下文的类型，包含 Canvas 2D 上下文、绘制选项（如是否启用缓存）、变换矩阵等，用于图形对象的绘制方法参数。 |
| `GradientCoords` | 定义渐变坐标的通用类型，是 `LinearGradientCoords`（线性渐变坐标）和 `RadialGradientCoords`（径向渐变坐标）的联合类型。 |
| `GradientCoordValue` | 定义渐变坐标值的类型，支持数字（绝对像素）、百分比（如 `'50%'`）或 `'center'` 等关键字，用于渐变位置的灵活配置。 |
| `GradientOptions` | 定义渐变创建选项的类型，包含渐变类型（线性/径向）、颜色停止点、坐标、单位等，用于 `Gradient` 类的实例化参数。 |
| `GradientType` | 定义渐变类型的字符串字面量类型，取值为 `'linear'`（线性）或 `'radial'`（径向），用于约束渐变类型的输入。 |
| `GradientUnits` | 定义渐变坐标单位的类型，取值为 `'pixels'`（像素）或 `'percent'`（百分比），用于指定渐变坐标的计算方式。 |
| `GraphemeBBox` | 定义单个字符（ grapheme ）的边界框类型，包含 `left`、`top`、`width`、`height`，用于文本字符的定位和碰撞检测。 |
| `GraphemeData` | 定义单个字符的元数据类型，包含字符内容、边界框（`GraphemeBBox`）、样式（`TextStyle`）等，用于文本渲染和编辑。 |
| `ImageFormat` | 定义图像导出格式的字符串字面量类型，取值为 `'png'`、`'jpeg'`、`'webp'` 等，用于 `toDataURL` 等导出方法的格式参数。 |
| `ImageSource` | 定义图像源的类型，支持 `HTMLImageElement`、`HTMLCanvasElement`、`Blob`、Base64 字符串等，用于 `FabricImage` 的图像源输入。 |
| `ImperativeLayoutContext` | 定义“命令式”布局的上下文类型，包含布局触发方式、强制更新标志等，用于手动触发布局更新的场景。 |
| `ImperativeLayoutOptions` | 定义“命令式”布局的选项类型，包含是否动画过渡、布局优先级等，用于控制命令式布局的执行行为。 |
| `InitializationLayoutContext` | 定义初始化阶段布局的上下文类型，包含对象初始状态、容器初始尺寸等，用于对象创建时的首次布局计算。 |
| `InitializationLayoutContext` | 定义初始化布局的上下文类型，包含对象初始属性、容器尺寸、布局策略等，用于对象创建时的首次布局。 |
| `IntersectionType` | 定义几何交集类型的字符串字面量类型，取值为 `'none'`（无交集）、`'partial'`（部分交集）、`'full'`（完全包含），用于交集检测结果。 |
| `ITextEvents` | 定义 `IText` 类支持的特有事件类型（如 `text:changed`、`cursor:moved`），是 `ObjectEvents` 的扩展，规范可编辑文本的事件。 |
| `LayoutAfterEvent` | 定义布局完成后事件的类型，包含布局结果、目标对象、布局上下文等，用于布局完成后的回调参数。 |
| `LayoutBeforeEvent` | 定义布局开始前事件的类型，包含目标对象、布局上下文、布局选项等，用于布局开始前的回调参数。 |
| `LayoutContext` | 定义布局上下文的通用类型，是 `CommonLayoutContext`、`InitializationLayoutContext` 等具体上下文的联合类型，涵盖所有布局场景。 |
| `LayoutResult` | 定义布局结果的类型，包含对象最终的位置、尺寸、布局状态等，用于布局策略的返回值。 |
| `LayoutStrategyResult` | 定义布局策略执行结果的类型，包含布局后的对象列表、布局是否成功、错误信息（可选）等，用于布局管理器的结果处理。 |
| `LayoutTrigger` | 定义布局触发原因的类型，取值为 `'initialization'`（初始化）、`'objectChange'`（对象变化）、`'containerResize'`（容器缩放）等，用于判断布局触发场景。 |
| `LinearGradientCoords` | 定义线性渐变的坐标类型，包含 `x1`、`y1`（起点）和 `x2`、`y2`（终点），用于线性渐变的方向配置。 |
| `ModifierKey` | 定义键盘修饰键的类型，取值为 `'shift'`、`'ctrl'`、`'alt'`、`'meta'`，用于事件中修饰键的判断（如按住 Shift 缩放）。 |
| `MultiSelectionStacking` | 定义多选中对象堆叠顺序的类型，取值为 `'select'`（选中时置顶）、`'persist'`（保持原有顺序），用于控制多选中对象的显示层级。 |
| `ObjectModificationEvents` | 定义对象修改相关事件的类型，是 `ModifiedEvent`、`ModifyPathEvent` 等事件的联合类型，涵盖对象所有修改场景的事件。 |
| `ObjectModifiedLayoutContext` | 定义对象修改后触发布局的上下文类型，包含被修改的对象、修改的属性、布局前后的状态等，用于对象修改后的布局更新。 |
| `ObjectModifyingLayoutContext` | 定义对象修改中触发布局的上下文类型，包含被修改的对象、修改中的属性、临时状态等，用于对象修改过程中的实时布局调整。 |
| `ObjectPointerEvents` | 定义图形对象支持的指针事件类型（如 `object:mousedown`、`object:mouseover`），是字符串字面量类型的集合。 |
| `PatternOptions` | 定义图案（`Pattern`）的创建选项类型，包含图案源（`source`）、重复方式（`repeat`）、缩放（`scaleX`/`scaleY`）、偏移（`offsetX`/`offsetY`）等。 |
| `PatternRepeat` | 定义图案重复方式的字符串字面量类型，取值为 `'repeat'`（双向重复）、`'repeat-x'`（水平重复）、`'repeat-y'`（垂直重复）、`'no-repeat'`（不重复）。 |
| `Percent` | 定义百分比值的类型，支持数字（如 `50` 表示 50%）或带百分号的字符串（如 `'50%'`），用于尺寸、偏移等属性的百分比配置。 |
| `RadialGradientCoords` | 定义径向渐变的坐标类型，包含 `cx`、`cy`（圆心）、`r`（半径）、`fx`、`fy`（焦点），用于径向渐变的范围和焦点配置。 |
| `RegistrationContext` | 定义对象注册上下文的类型，包含注册的对象、注册目标（如画布、组）、注册状态等，用于对象管理的注册逻辑。 |
| `SerializedLayoutManager` | 定义 `LayoutManager` 序列化后的类型，包含布局策略、布局选项、序列化后的对象数据等，用于布局管理器的持久化。 |
| `SerializedPatternOptions` | 定义 `Pattern` 类序列化后的选项类型，包含图案源的序列化数据、重复方式、缩放等，用于图案的序列化和反序列化。 |
| `SerializedShadowOptions` | 定义 `Shadow` 类序列化后的选项类型，包含阴影颜色、模糊度、偏移量（`offsetX`/`offsetY`）等，用于阴影的序列化和反序列化。 |
| `SprayBrushPoint` | 定义 `SprayBrush` 喷溅画笔的点类型，包含点的坐标、大小、透明度、颜色等，用于喷溅效果的粒子渲染。 |
| `StrictLayoutContext` | 定义“严格模式”布局的上下文类型，包含更严格的类型检查和必填属性，用于需要精确布局的场景。 |
| `SupportedSVGUnit` | 定义 Fabric.js 支持的 SVG 单位类型，取值为 `'px'`、`'em'`、`'rem'`、`'%'` 等，用于 SVG 导入时的单位转换。 |
| `SVGElementName` | 定义支持的 SVG 元素名称类型，取值为 `'rect'`、`'circle'`、`'path'`、`'text'` 等，用于 SVG 导入时的元素识别。 |
| `SVGOptions` | 定义 SVG 导入/导出选项的类型，包含是否导入样式、是否忽略隐藏元素、导出精度等，用于控制 SVG 与 Fabric 对象的转换。 |
| `T2DPipelineState` | 定义 2D 渲染管线的状态类型，包含画布上下文状态（如填充样式、变换矩阵）、过滤器状态、缓存状态等，用于渲染过程的状态管理。 |
| `TAxis` | 定义坐标轴类型，取值为 `'x'` 或 `'y'`，用于表示水平或垂直方向（如缩放、移动的轴向）。 |
| `TAxisKey` | 定义坐标轴键的类型，取值为 `'x1'`、`'y1'`、`'x2'`、`'y2'` 等，用于线段、渐变等对象的轴向属性标识。 |
| `TBBox` | 定义边界框的类型，包含 `left`、`top`、`width`、`height`、`right`（`left+width`）、`bottom`（`top+height`），用于图形对象的边界计算。 |
| `TBrushEventData` | 定义画笔事件数据的类型，包含画笔实例、绘制的点、事件类型（如 `'down'`、`'move'`、`'up'`），用于画笔事件的回调参数。 |
| `TCacheCanvasDimensions` | 定义缓存画布尺寸的类型，包含 `width`、`height`、`scaleX`、`scaleY`（缓存缩放比例），用于管理对象缓存的画布大小。 |
| `TCanvasSizeOptions` | 定义画布尺寸选项的类型，包含 `width`、`height`、`preserveAspectRatio`（是否保持宽高比），用于画布尺寸调整。 |
| `TClassProperties` | 定义类属性的类型，泛型参数约束类的类型，返回类的实例属性集合，用于类属性的批量操作（如序列化）。 |
| `TColorArg` | 定义颜色参数的类型，支持 Hex 字符串（如 `'#ff0000'`）、RGB 字符串（如 `'rgb(255,0,0)'`）、`Color` 实例等，用于颜色相关属性的输入。 |
| `TCornerPoint` | 定义图形对象四个角点的类型，是包含 `tl`（左上）、`tr`（右上）、`bl`（左下）、`br`（右下）四个 `Point` 的对象，用于边界框的角点计算。 |
| `TCrossOrigin` | 定义跨域设置的类型，取值为 `'anonymous'`、`'use-credentials'` 或 `null`，用于图像、SVG 等资源的跨域加载。 |
| `TDataUrlOptions` | 定义 `toDataURL` 方法的选项类型，包含图像格式（`format`）、质量（`quality`，0-1）、是否包含透明背景（`enableRetinaScaling`）等。 |
| `TDegree` | 定义角度值的类型（数字），用于旋转、倾斜等属性（如 `angle: 45` 表示 45 度），区别于弧度（`TRadian`）。 |
| `TextStyle` | 定义文本样式的类型，包含 `fontFamily`、`fontSize`、`fontWeight`、`fill`、`textAlign` 等，用于文本对象的样式配置。 |
| `TextStyleDeclaration` | 定义文本样式声明的类型，是 `Partial<TextStyle>`（部分文本样式），用于文本样式的局部调整（如 `IText` 中部分文字的样式）。 |
| `TFabricObjectProps` | 定义 `FabricObject` 类的属性类型，是 `FabricObjectProps` 的别名，用于简化类型引用，确保类型一致性。 |
| `TFiller` | 定义填充类型的联合类型，支持 `string`（颜色）、`Gradient` 实例、`Pattern` 实例，用于图形对象的 `fill` 或 `stroke` 属性。 |
| `TMat2D` | 定义 2D 变换矩阵的类型，是长度为 6 的数字数组（`[a, b, c, d, e, f]`），用于表示平移、旋转、缩放、倾斜等变换，是框架变换计算的核心。 |
| `TMatColorMatrix` | 定义颜色矩阵的类型，是长度为 20 的数字数组（4x5 矩阵），用于图像颜色调整（如灰度、对比度），是过滤器的核心数据结构。 |
| `TModificationEvents` | 定义对象修改事件的类型，是 `ObjectModificationEvents` 的别名，用于简化类型引用，涵盖所有对象修改相关事件。 |
| `TOptionalModifierKey` | 定义可选修饰键的类型，是 `ModifierKey` 或 `null`，用于表示事件中可能存在或不存在的修饰键。 |
| `TOptions` | 定义类初始化选项的通用类型，泛型参数约束选项的结构（如 `TOptions<RectProps>` 表示矩形的初始化选项），用于类构造函数的参数约束。 |
| `TOriginX` | 定义水平原点的类型，取值为 `'left'`、`'center'`、`'right'`，用于图形对象的变换原点（如旋转、缩放的基准点）配置。 |
| `TOriginY` | 定义垂直原点的类型，取值为 `'top'`、`'center'`、`'bottom'`，用于图形对象的变换原点配置。 |
| `TPathAlign` | 定义路径对齐方式的类型，取值为 `'start'`、`'center'`、`'end'`，用于文本沿路径排列时的对齐方式。 |
| `TPathSide` | 定义路径侧边的类型，取值为 `'left'`、`'right'`，用于文本沿路径排列时的位置（路径的左侧或右侧）。 |
| `TPipelineResources` | 定义渲染管线资源的类型，包含 WebGL 程序、纹理、缓冲区等，用于 WebGL 渲染后端的资源管理。 |
| `TPointerEvent` | 定义指针事件的类型，是 `MouseEvent`、`TouchEvent` 的联合类型，用于统一处理鼠标和触摸事件。 |
| `TPointerEventNames` | 定义指针事件名称的类型，是 `'mousedown'`、`'mousemove'`、`'touchstart'`、`'touchmove'` 等的联合类型，用于事件绑定的类型约束。 |
| `TProgramCache` | 定义 WebGL 程序缓存的类型，是键值对（键为程序标识，值为 `TWebGLProgramCacheItem`），用于 WebGL 程序的复用，提升性能。 |
| `TRadian` | 定义弧度值的类型（数字），用于几何计算（如三角函数），区别于角度（`TDegree`），框架内部变换计算多使用弧度。 |
| `Transform` | 定义变换的类型，包含 `type`（变换类型：`'scale'`、`'rotate'` 等）、`originX`/`originY`（变换原点）、`values`（变换参数），用于记录对象的变换操作。 |
| `TransformAction` | 定义变换动作的类型，取值为 `'scaleX'`、`'scaleY'`、`'rotate'`、`'move'` 等，用于标识具体的变换行为。 |
| `TransformActionHandler` | 定义变换动作处理函数的类型，参数包含对象实例、变换数据、事件信息等，用于自定义变换逻辑（如限制缩放范围）。 |
| `TRectBounds` | 定义矩形边界的类型，包含 `x`、`y`（左上角）、`width`、`height`，与 `TBBox` 类似，用于简化矩形边界的表示。 |
| `TRGBAColorSource` | 定义 RGBA 颜色源的类型，支持 `[r, g, b, a]` 数组（0-255）、`'rgba(r,g,b,a)'` 字符串、`Color` 实例，用于精确的颜色配置。 |
| `TRGBColorSource` | 定义 RGB 颜色源的类型，支持 `[r, g, b]` 数组（0-255）、`'rgb(r,g,b)'` 字符串、`Color` 实例，用于无透明度的颜色配置。 |
| `TSize` | 定义尺寸的类型，包含 `width` 和 `height`，用于表示对象、画布、缓存等的尺寸。 |
| `TSVGExportOptions` | 定义 SVG 导出选项的类型，包含是否导出样式、是否包含画布背景、导出精度（`decimalPlaces`）等，用于 `toSVG` 方法的参数。 |
| `TSVGReviver` | 定义 SVG 复活函数的类型，用于 SVG 导入时自定义元素的解析（如将 SVG 自定义元素转换为 Fabric 对象），参数包含 SVG 元素和解析选项，返回 Fabric 对象。 |
| `TTextureCache` | 定义纹理缓存的类型，是键值对（键为纹理标识，值为 WebGL 纹理对象），用于 WebGL 渲染后端的纹理复用，提升性能。 |
| `TToCanvasElementOptions` | 定义 `toCanvasElement` 方法的选项类型，包含画布尺寸、是否启用透明背景、是否应用过滤器等，用于将 Fabric 对象转为 Canvas 元素。 |
| `TValidToObjectMethod` | 定义 `toObject` 方法的有效返回类型，泛型参数约束返回的对象结构，用于确保 `toObject` 方法返回符合预期的序列化数据。 |
| `TWebGLAttributeLocationMap` | 定义 WebGL 属性位置映射的类型，是键值对（键为属性名称，值为 WebGL  attribute 位置），用于 WebGL 程序的属性绑定。 |
| `TWebGLPipelineState` | 定义 WebGL 渲染管线的状态类型，包含 WebGL 上下文、程序缓存、纹理缓存、属性位置映射等，用于 WebGL 渲染的状态管理。 |
| `TWebGLProgramCacheItem` | 定义 WebGL 程序缓存项的类型，包含 WebGL 程序对象、属性位置映射（`TWebGLAttributeLocationMap`）、uniform 位置映射，用于 WebGL 程序的缓存和复用。 |
| `TWebGLUniformLocationMap` | 定义 WebGL uniform 位置映射的类型，是键值对（键为 uniform 名称，值为 WebGL uniform 位置），用于 WebGL 程序的 uniform 变量赋值。 |


## 五、Variables（变量）
全局变量用于存储框架配置、缓存数据、版本信息等，可在全局作用域访问，部分变量支持开发者自定义配置。

| 名称 | 详细说明 |
|------|----------|
| `cache` | 全局缓存对象，用于存储 Fabric.js 运行过程中的临时数据（如纹理缓存、程序缓存），支持跨实例共享缓存资源，提升性能。 |
| `classRegistry` | 类注册表，存储 Fabric.js 所有核心类的映射（键为类名，值为类构造函数），支持动态注册自定义类（如自定义图形、画笔），便于框架识别和实例化。 |
| `config` | 全局配置对象，包含框架的默认配置（如默认画布背景色、默认滤镜后端、缓存尺寸限制），开发者可在初始化前修改此对象以全局调整框架行为。 |
| `iMatrix` | 单位矩阵常量，值为 `[1, 0, 0, 1, 0, 0]`，表示无变换（无平移、旋转、缩放、倾斜），用于变换矩阵计算的初始值或基准值。 |
| `runningAnimations` | 存储当前正在运行的动画集合，每个元素为动画上下文对象，支持跟踪和管理动画（如批量中止动画），确保动画系统的可控性。 |
| `version` | Fabric.js 的版本号字符串（如 `'5.3.0'`），用于标识当前使用的框架版本，便于版本兼容性判断和问题排查。 |


## 六、Functions（函数）
全局函数提供通用的工具能力，涵盖 SVG 解析、滤镜初始化、环境判断、样式解析等，可直接调用，无需实例化类。

| 名称 | 详细说明 |
|------|----------|
| `createCollectionMixin` | 创建“集合混入”（mixin）的函数，用于为类添加集合管理能力（如添加/删除子对象、遍历子对象），适用于自定义集合类（如扩展 `Group`）。 |
| `getCSSRules` | 从 CSS 样式表或样式文本中提取 CSS 规则的函数，支持过滤特定选择器的规则，用于解析与 Fabric 对象相关的 CSS 样式（如文本样式）。 |
| `getEnv` | 获取当前运行环境信息的函数，返回包含 `isBrowser`（是否为浏览器环境）、`isNode`（是否为 Node.js 环境）、`supportsWebGL`（是否支持 WebGL）等字段的对象，用于环境兼容性处理。 |
| `getFabricDocument` | 获取 Fabric.js 使用的文档对象（`Document`）的函数，默认返回全局 `document`，支持在特殊环境（如 iframe、Node.js 模拟环境）中自定义文档对象，确保框架兼容性。 |
| `getFabricWindow` | 获取 Fabric.js 使用的窗口对象（`Window`）的函数，默认返回全局 `window`，支持在特殊环境中自定义窗口对象，确保框架兼容性（如 iframe 中使用）。 |
| `getFilterBackend` | 获取当前使用的滤镜后端（`Canvas2dFilterBackend` 或 `WebGLFilterBackend`）的函数，用于获取当前滤镜渲染的后端实例，便于手动控制滤镜渲染行为。 |
| `initFilterBackend` | 初始化滤镜后端的函数，参数为后端类型（`'canvas2d'` 或 `'webgl'`），用于手动指定滤镜后端，覆盖全局配置中的默认后端，适用于需要灵活切换渲染方式的场景。 |
| `isPutImageFaster` | 判断 `putImageData` 方法是否比 `drawImage` 方法更快的函数，返回布尔值，用于框架内部优化图像渲染方式，选择性能更优的方法。 |
| `isWebGLPipelineState` | 判断对象是否为 `TWebGLPipelineState` 类型的函数，返回布尔值，用于 WebGL 渲染后端的类型检查，确保资源管理的正确性。 |
| `loadSVGFromString` | 从 SVG 字符串中加载并解析出 Fabric 对象的函数，参数为 SVG 字符串和可选的解析选项，返回包含解析后的 Fabric 对象数组的 Promise，用于 SVG 导入。 |
| `loadSVGFromURL` | 从 URL 加载 SVG 文件并解析为 Fabric 对象的函数，参数为 SVG URL 和可选的解析选项，返回包含解析后的 Fabric 对象数组的 Promise，支持跨域配置（`crossOrigin`）。 |
| `parseAttributes` | 解析 DOM 元素属性（如 SVG 元素的 `x`、`y`、`width`）并转换为 Fabric 对象属性的函数，用于 SVG 导入时将 DOM 属性映射为对象属性。 |
| `parseFontDeclaration` | 解析字体声明字符串（如 `'bold 16px Arial'`）的函数，返回包含 `fontWeight`、`fontSize`、`fontFamily` 等字段的对象，用于文本样式的解析。 |
| `parsePointsAttribute` | 解析 SVG 元素的 `points` 属性（如多边形、折线的顶点）的函数，将字符串（如 `'0,0 100,100 200,0'`）转换为 `Point` 数组，用于图形对象的顶点初始化。 |
| `parseStyleAttribute` | 解析 DOM 元素的 `style` 属性（如 `'fill:red; stroke:blue'`）的函数，返回包含样式键值对的对象，用于将 DOM 内联样式映射为 Fabric 对象的样式属性。 |
| `parseSVGDocument` | 从 SVG 文档对象（`SVGDocument`）中解析出 Fabric 对象的函数，参数为 SVG 文档和可选的解析选项，返回包含解析后的 Fabric 对象数组的 Promise，用于 SVG 文档的导入。 |
| `parseTransformAttribute` | 解析 DOM 元素的 `transform` 属性（如 `'translate(100, 200) rotate(45)'`）的函数，将其转换为 Fabric 变换矩阵（`TMat2D`），用于对象的初始变换设置。 |
| `setEnv` | 设置当前运行环境信息的函数，参数为包含环境字段（如 `isBrowser`、`supportsWebGL`）的对象，用于手动覆盖环境检测结果，适用于特殊环境（如测试环境、模拟环境）。 |
| `setFilterBackend` | 设置当前使用的滤镜后端的函数，参数为滤镜后端实例（`Canvas2dFilterBackend` 或 `WebGLFilterBackend`），用于手动替换滤镜后端，适用于高级渲染控制场景。 |
