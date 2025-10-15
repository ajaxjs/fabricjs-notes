# Group（组）类文档翻译
## 基本信息
- **定义位置**：src/shapes/Group.ts:82
- **作用**：在Fabric.js中，Group（组）类用于将多个FabricObject（Fabric对象）组合成一个单一的可操作单元，方便对多个对象进行统一的移动、旋转、缩放等操作，同时保持各对象间的相对位置和属性。


## 一、事件（Fires）
Group类会触发以下事件，可用于监听组内对象的变化及布局相关操作：
| 事件名称 | 触发场景 |
|----------|----------|
| `object:added` | 当有对象被添加到组中时触发 |
| `object:removed` | 当有对象从组中被移除时触发 |
| `layout:before` | 在组执行布局调整操作之前触发 |
| `layout:after` | 在组执行布局调整操作之后触发 |


## 二、继承关系（Extends）
Group类继承自以下结构，继承后拥有父结构的属性和方法：
```typescript
Collection<{
  (options?): FabricObject<GroupProps, SerializedGroupProps, GroupEvents>;
  cacheProperties: string[];
  colorProperties: string[];
  customProperties: string[];
  ownDefaults: Partial<TClassProperties<InteractiveFabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>>>;
  prototype: FabricObject<any, any, any>;
  stateProperties: string[];
  type: string;
  _fromObject: Promise<S>;
  createControls: { controls: Record<string, Control>; };
  fromObject: Promise<BaseFabricObject<Partial<ObjectProps>, SerializedObjectProps, ObjectEvents>>;
  getDefaults: Record<string, any>;
}, this> & FabricObject<GroupProps, SerializedGroupProps, GroupEvents, this>
```


## 三、继承此类的类（Extended by）
| 类名 | 说明 |
|------|------|
| `ActiveSelection` | 表示画布上当前被选中的对象集合，是Group类的扩展，专门用于处理用户选中的多个对象的交互逻辑 |


## 四、实现的接口（Implements）
| 接口名 | 说明 |
|--------|------|
| `GroupProps` | 定义了Group类的属性规范，Group类实现此接口以确保属性的完整性和一致性 |


## 五、构造函数（Constructors）
### 1. 构造函数定义
`new Group(objects?, options?): Group`  
- **定义位置**：src/shapes/Group.ts:137  
- **作用**：创建一个Group实例，用于组合多个Fabric对象并配置组的属性。

### 2. 参数说明
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `objects?` | `FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[]` | `[]` | 可选参数，传入要添加到组中的Fabric对象数组，数组中的每个元素都需符合FabricObject的类型规范 |
| `options?` | `Partial<GroupProps>` | `{}` | 可选参数，用于配置组的属性（如背景色、边框色等），参数对象的属性需符合GroupProps接口的规范，未传入的属性将使用默认值 |

### 3. 返回值
| 类型 | 说明 |
|------|------|
| `Group` | 创建的Group实例对象 |

### 4. 重写（Overrides）
重写了父类的构造函数：`createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>, ).constructor`


## 六、属性（Properties）
以下属性按“可选属性”和“必选属性”分类，部分属性继承自父类，已在“继承自”列标注。

### 1. 可选属性（Optional Properties）
| 属性名 | 类型 | 定义位置 | 继承自 | 说明 |
|--------|------|----------|--------|------|
| `__corner?` | `string` | src/shapes/Object/InteractiveObject.ts:105 | `createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>, ).__corner` | 用于记录鼠标移动过程中最后悬停的角点值，`0`表示无角点，也可能是`mt`（上中）、`ml`（左中）、`mtr`（右上旋转点）等值；该属性应视为只读，未选中的对象可能存在值不准确的情况，且不会自动清理 |
| `_scaling?` | `boolean` | src/shapes/Object/InteractiveObject.ts:134 | `createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>, )._scaling` | 由手势模块使用，用于在没有缩放变换时跟踪缩放操作的布尔值，属于边缘场景，在代码库中仅使用两次；可能是为解决性能问题添加，**不建议使用**，未来可能会被移除（可通过git blame查看添加原因） |
| `clipPath?` | `BaseFabricObject<Partial<ObjectProps>, SerializedObjectProps, ObjectEvents>` | src/shapes/Object/Object.ts:213 | `createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>, ).clipPath` | 用于定义裁剪区域的Fabric对象，该对象无描边（stroke）；在对象渲染时会使用此裁剪对象，上下文会放置在对象缓存画布（cacheCanvas）的中心；若希望裁剪对象的`0,0`坐标与组的中心对齐，可将裁剪对象的`originX`/`originY`设置为`center` |
| `clipPathId?` | `string` | src/shapes/Object/FabricObjectSVGExportMixin.ts:15 | `createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>, ).clipPathId` | 当对象作为SVG的裁剪路径（clippath）导出时，需要SVG内部的引用标识；该标识是Fabric命名空间下的临时唯一标识符（UID），暂存于此属性 |

### 2. 必选属性（Required Properties）
| 属性名 | 类型 | 默认值 | 定义位置 | 实现接口/继承自 | 说明 |
|--------|------|--------|----------|----------------|------|
| `_controlsVisibility` | `Record<string, boolean>` | - | src/shapes/Object/InteractiveObject.ts:112 | 继承自`createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>, )._controlsVisibility` | 用于存储对象各控制项可见性的映射表；在控制项（controls）引入时保留，以避免大幅破坏API兼容性，其优先级高于通用控制项可见性设置 |
| `_objects` | `FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[]` | `[]` | src/Collection.ts:21 | 继承自`createCollectionMixin(FabricObject<GroupProps, SerializedGroupProps, GroupEvents>, )._objects` | 用于存储组内对象的数组，**待优化**：需在构造函数中处理此属性 |
| `absolutePositioned` | `boolean` | `false` | src/shapes/Object/Object.ts:215 | 实现`GroupProps.absolutePositioned`，继承自`createCollectionMixin(...)` | 仅当对象用作`clipPath`（裁剪路径）时才有意义；若为`true`，裁剪路径的`top`（顶部坐标）和`left`（左侧坐标）将相对于画布，不受对象变换影响，仅对特定对象进行裁剪；**注意**：该功能处于测试阶段（beta），未来可能会变更或重命名，自2.4.0版本开始支持 |
| `aCoords` | `TCornerPoint` | - | src/shapes/Object/ObjectGeometry.ts:63 | 继承自`createCollectionMixin(...)` | 描述对象角点在场景坐标系中的位置，坐标由`left`、`top`、`width`、`height`、`scaleX`、`scaleY`、`skewX`、`skewY`、`angle`、`strokeWidth`推导得出；坐标不受视口变化影响，调用`setCoords`方法可更新坐标，也可通过特定方法计算坐标而不更新 |
| `angle` | `TDegree` | `0` | src/shapes/Object/ObjectGeometry.ts:581 | 实现`GroupProps.angle`，继承自`createCollectionMixin(...)` | 对象的旋转角度（单位：度） |
| `backgroundColor` | `string` | - | src/shapes/Object/Object.ts:202 | 实现`GroupProps.backgroundColor`，继承自`createCollectionMixin(...)` | 对象的背景色，支持CSS颜色格式（参考：https://www.w3.org/TR/css-color-3/） |
| `borderColor` | `string` | `rgb(178,204,255)` | src/shapes/Object/InteractiveObject.ts:74 | 实现`GroupProps.borderColor`，继承自`createCollectionMixin(...)` | 对象处于激活状态（选中）时，控制边框的颜色 |
| `borderDashArray` | `null` \| `number[]` | - | src/shapes/Object/InteractiveObject.ts:75 | 实现`GroupProps.borderDashArray`，继承自`createCollectionMixin(...)` | 定义对象边框的虚线样式数组（需`hasBorder`为`true`才生效），自1.6.2版本开始支持 |
| `borderOpacityWhenMoving` | `number` | `0.4` | src/shapes/Object/InteractiveObject.ts:76 | 实现`GroupProps.borderOpacityWhenMoving`，继承自`createCollectionMixin(...)` | 对象处于激活状态且正在移动时，控制边框的不透明度 |
| `borderScaleFactor` | `number` | `1` | src/shapes/Object/InteractiveObject.ts:77 | 实现`GroupProps.borderScaleFactor`，继承自`createCollectionMixin(...)` | 对象边框（选择框和控制项描边）的缩放因子；值越大，边框越粗；默认值为`1`，此时缩放因子等于边框和控制项的`strokeWidth`（描边宽度）；若需单独调整边框和控制项的描边宽度，需自定义控制项的渲染函数 |
| `centeredRotation` | `boolean` | - | src/shapes/Object/Object.ts:216 | 实现`GroupProps.centeredRotation`，继承自`createCollectionMixin(...)` | 若为`true`，对象将围绕自身中心旋转；若为`false`，将围绕`originX`和`originY`定义的原点旋转；**注意**：若画布的`centeredRotation`已设为`true`，则此属性在变换过程中会被忽略；对象的`rotate`方法始终优先使用此属性，而非画布的`centeredRotation`，自1.3.4版本开始支持 |
| `centeredScaling` | `boolean` | - | src/shapes/Object/Object.ts:217 | 实现`GroupProps.centeredScaling`，继承自`createCollectionMixin(...)` | 若为`true`，对象通过控制项进行缩放时，将以中心点作为变换原点，自1.3.4版本开始支持 |
| `controls` | `TControlSet` | - | src/shapes/Object/InteractiveObject.ts:118 | 继承自`createCollectionMixin(...)` | 存储对象的控制项集合，控制项默认由`default_controls.js`文件添加 |
| `cornerColor` | `string` | `rgb(178,204,255)` | src/shapes/Object/InteractiveObject.ts:68 | 实现`GroupProps.cornerColor`，继承自`createCollectionMixin(...)` | 对象处于激活状态（选中）时，控制角点的颜色 |
| `cornerDashArray` | `null` \| `number[]` | `null` | src/shapes/Object/InteractiveObject.ts:71 | 实现`GroupProps.cornerDashArray`，继承自`createCollectionMixin(...)` | 定义对象控制项的虚线样式数组（需`hasBorder`为`true`才生效），自1.6.2版本开始支持 |
| `cornerSize` | `number` | `13` | src/shapes/Object/InteractiveObject.ts:65 | 实现`GroupProps.cornerSize`，继承自`createCollectionMixin(...)` | 对象控制角点的大小（单位：像素） |
| `cornerStrokeColor` | `string` | `''`（空字符串） | src/shapes/Object/InteractiveObject.ts:69 | 实现`GroupProps.cornerStrokeColor`，继承自`createCollectionMixin(...)` | 当对象处于激活状态且`transparentCorners`（透明角点）为`false`时，控制角点的描边颜色，自1.6.2版本开始支持 |
| `cornerStyle` | `"circle"` \| `"rect"` | `'rect'` | src/shapes/Object/InteractiveObject.ts:70 | 实现`GroupProps.cornerStyle`，继承自`createCollectionMixin(...)` | 定义控制项的样式，可选值为`'rect'`（矩形）或`'circle'`（圆形）；**已废弃**：此API不再受支持，未来可能会被移除，将提供标准的控制项渲染方式及替代方案，自1.6.2版本开始支持 |
| `dirty` | `boolean` | `true` | src/shapes/Object/Object.ts:242 | 继承自`createCollectionMixin(...)` | 若设为`true`，对象的缓存将在下次渲染调用时重新生成，自1.7.0版本开始支持 |
| `evented` | `boolean` | - | src/shapes/Object/InteractiveObject.ts:82 | 实现`GroupProps.evented`，继承自`createCollectionMixin(...)` | 若设为`false`，对象不能作为事件目标，所有事件将穿透该对象传播，自1.3.4版本开始支持 |
| `excludeFromExport` | `boolean` | - | src/shapes/Object/Object.ts:209 | 实现`GroupProps.excludeFromExport`，继承自`createCollectionMixin(...)` | 若设为`true`，对象将不会以OBJECT/JSON格式导出，自1.6.3版本开始支持 |
| `fill` | `null` \| `string` \| `TFiller` | `rgb(0,0,0)` | src/shapes/Object/Object.ts:192 | 实现`GroupProps.fill`，继承自`createCollectionMixin(...)` | 对象填充色，支持CSS颜色格式（参考：https://www.w3.org/TR/css-color-3/） |
| `fillRule` | `CanvasFillRule` | `nonzero` | src/shapes/Object/Object.ts:193 | 实现`GroupProps.fillRule`，继承自`createCollectionMixin(...)` | 用于填充对象的填充规则，可选值为`nonzero`（非零环绕规则）和`evenodd`（奇偶环绕规则）；**向后兼容性说明**：在1.4.12版本之前，此属性用于设置`globalCompositeOperation`（全局合成操作），现需使用`globalCompositeOperation`属性替代 |
| `flipX` | `boolean` | `false` | src/shapes/Object/ObjectGeometry.ts:567 | 实现`GroupProps.flipX`，继承自`createCollectionMixin(...)` | 若设为`true`，对象将水平翻转渲染 |
| `flipY` | `boolean` | `false` | src/shapes/Object/ObjectGeometry.ts:568 | 实现`GroupProps.flipY`，继承自`createCollectionMixin(...)` | 若设为`true`，对象将垂直翻转渲染 |


## 补充说明
1. **类型别名说明**：文档中出现的`TDegree`（角度类型）、`TCornerPoint`（角点坐标类型）、`TControlSet`（控制项集合类型）、`TFiller`（填充类型）等均为Fabric.js内部定义的类型别名，用于规范属性的数据格式。
2. **接口依赖**：`GroupProps`（组属性接口）、`SerializedGroupProps`（组序列化属性接口）、`GroupEvents`（组事件接口）等接口定义了Group类的属性、序列化规则和事件规范，是理解Group类的重要前置知识。
3. **使用建议**：在使用Group类时，建议优先通过构造函数的`options`参数配置常用属性（如`backgroundColor`、`borderColor`），避免直接修改私有属性（如`_objects`、`_scaling`），以保证代码的兼容性和稳定性。