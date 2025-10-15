---
editUrl: false
next: false
prev: false
title: "ActiveSelection"
---

定义于：[src/shapes/ActiveSelection.ts:36](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/ActiveSelection.ts#L36)

被 Canvas 用于管理选择操作。

## 示例

```ts
class MyActiveSelection extends ActiveSelection {
  ...
}

// 重写默认的 `ActiveSelection` 类
classRegistry.setClass(MyActiveSelection)
```

## 继承

- [`Group`](/api/classes/group/)

## 构造函数

### 构造函数

> **new ActiveSelection**(`objects`, `options`): `ActiveSelection`

定义于：[src/shapes/ActiveSelection.ts:60](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/ActiveSelection.ts#L60)

#### 参数

##### objects

[`FabricObject`](/api/classes/fabricobject/)\<`Partial`\<[`FabricObjectProps`](/api/interfaces/fabricobjectprops/)\>, [`SerializedObjectProps`](/api/interfaces/serializedobjectprops/), [`ObjectEvents`](/api/interfaces/objectevents/)\>[] = `[]`

##### options

`Partial`\<[`ActiveSelectionOptions`](/api/interfaces/activeselectionoptions/)\> = `{}`

#### 返回值

`ActiveSelection`

#### 重写

[`Group`](/api/classes/group/).[`constructor`](/api/classes/group/#constructor)

## 属性

### \_\_corner?

> `optional` **\_\_corner**: `string`

定义于：[src/shapes/Object/InteractiveObject.ts:105](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L105)

在鼠标移动过程中保存最后悬停的角的值。
0 表示没有角，或者是 'mt'、'ml'、'mtr' 等。
它应该是私有的，但将其用作只读属性没有危害。
它不会自动清除。未选中的对象可能有错误的值

#### 继承自

[`Group`](/api/classes/group/).[`__corner`](/api/classes/group/#__corner)

***

### \_controlsVisibility

> **\_controlsVisibility**: `Record`\<`string`, `boolean`\>

定义于：[src/shapes/Object/InteractiveObject.ts:112](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L112)

此对象的控制可见性映射。
引入控件时保留此属性是为了不过度破坏 API
它优先于通用控件可见性

#### 继承自

[`Group`](/api/classes/group/).[`_controlsVisibility`](/api/classes/group/#_controlsvisibility)

***

### \_objects

> **\_objects**: [`FabricObject`](/api/classes/fabricobject/)\<`Partial`\<[`FabricObjectProps`](/api/interfaces/fabricobjectprops/)\>, [`SerializedObjectProps`](/api/interfaces/serializedobjectprops/), [`ObjectEvents`](/api/interfaces/objectevents/)\>[] = `[]`

定义于：[src/Collection.ts:21](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/Collection.ts#L21)

#### 待办

也需要在构造函数中处理

#### 继承自

[`Group`](/api/classes/group/).[`_objects`](/api/classes/group/#_objects)

***

### \_scaling?

> `optional` **\_scaling**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:134](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L134)

手势模块使用的布尔值，用于在没有缩放变换的情况下跟踪缩放操作。
这是一个边缘情况，在整个代码库中仅使用了两次。
可能是为了跟踪一些性能问题而添加的

#### 待办

使用 git blame 调查添加原因
不要使用它。我们将尝试移除它

#### 继承自

[`Group`](/api/classes/group/).[`_scaling`](/api/classes/group/#_scaling)

***

### absolutePositioned

> **absolutePositioned**: `boolean`

定义于：[src/shapes/Object/Object.ts:215](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L215)

仅当对象用作 clipPath 时才有意义。
如果为 true，clipPath 的 top 和 left 将相对于画布，并且不会受对象变换的影响。这将使 clipPath 相对于画布，但仅裁剪特定对象。
警告：这是测试版，此功能可能会更改或重命名。
自 2.4.0 起

#### 默认值

```ts
false
```

#### 继承自

[`Group`](/api/classes/group/).[`absolutePositioned`](/api/classes/group/#absolutepositioned)

***

### aCoords

> **aCoords**: [`TCornerPoint`](/api/type-aliases/tcornerpoint/)

定义于：[src/shapes/Object/ObjectGeometry.ts:63](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L63)

描述对象角在场景坐标中的位置。
坐标源自以下内容：
left、top、width、height、scaleX、scaleY、skewX、skewY、angle、strokeWidth。
坐标不依赖于视口变化。
坐标通过 [setCoords](/api/classes/activeselection/#setcoords) 更新。
您可以使用 [()](/api/classes/activeselection/#calcacoords) 计算它们而不更新

#### 继承自

[`Group`](/api/classes/group/).[`aCoords`](/api/classes/group/#acoords)

***

### angle

> **angle**: [`TDegree`](/api/type-aliases/tdegree/)

定义于：[src/shapes/Object/ObjectGeometry.ts:581](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L581)

对象的旋转角度（以度为单位）

#### 默认值

```ts
0
```

#### 继承自

[`Group`](/api/classes/group/).[`angle`](/api/classes/group/#angle)

***

### backgroundColor

> **backgroundColor**: `string`

定义于：[src/shapes/Object/Object.ts:202](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L202)

对象的背景颜色。
接受 css 颜色 https://www.w3.org/TR/css-color-3/

#### 继承自

[`Group`](/api/classes/group/).[`backgroundColor`](/api/classes/group/#backgroundcolor)

***

### borderColor

> **borderColor**: `string`

定义于：[src/shapes/Object/InteractiveObject.ts:74](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L74)

对象控制边框的颜色（当它处于活动状态时）

#### 默认值

```ts
rgb(178,204,255)
```

#### 继承自

[`Group`](/api/classes/group/).[`borderColor`](/api/classes/group/#bordercolor)

***

### borderDashArray

> **borderDashArray**: `null` \| `number`[]

定义于：[src/shapes/Object/InteractiveObject.ts:75](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L75)

指定对象边框虚线模式的数组（hasBorder 必须为 true）

#### 自版本

1.6.2

#### 继承自

[`Group`](/api/classes/group/).[`borderDashArray`](/api/classes/group/#borderdasharray)

***

### borderOpacityWhenMoving

> **borderOpacityWhenMoving**: `number`

定义于：[src/shapes/Object/InteractiveObject.ts:76](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L76)

对象处于活动状态且移动时，其控制边框的不透明度

#### 默认值

```ts
0.4
```

#### 继承自

[`Group`](/api/classes/group/).[`borderOpacityWhenMoving`](/api/classes/group/#borderopacitywhenmoving)

***

### borderScaleFactor

> **borderScaleFactor**: `number`

定义于：[src/shapes/Object/InteractiveObject.ts:77](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L77)

对象边框（选择框和控件描边）的缩放因子。
数值越大，边框越粗
边框默认值为 1，因此此缩放值等于边框和控件的 strokeWidth。
如果需要将边框与控件 strokeWidth 分开
您需要为控件编写自己的渲染函数

#### 默认值

```ts
1
```

#### 继承自

[`Group`](/api/classes/group/).[`borderScaleFactor`](/api/classes/group/#borderscalefactor)

***

### centeredRotation

> **centeredRotation**: `boolean`

定义于：[src/shapes/Object/Object.ts:216](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L216)

当为 `true` 时，对象将绕其中心旋转。
当为 `false` 时，将围绕 originX 和 originY 定义的原点旋转。
如果画布已将 centeredRotation 设置为 `true`，则此属性的值在变换期间将被忽略
对象方法 `rotate` 将始终考虑此属性，而从不考虑画布的属性。

#### 自版本

1.3.4

#### 继承自

[`Group`](/api/classes/group/).[`centeredRotation`](/api/classes/group/#centeredrotation)

***

### centeredScaling

> **centeredScaling**: `boolean`

定义于：[src/shapes/Object/Object.ts:217](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L217)

当为 true 时，此对象在通过控件缩放时将使用中心点作为变换原点。

#### 自版本

1.3.4

#### 继承自

[`Group`](/api/classes/group/).[`centeredScaling`](/api/classes/group/#centeredscaling)

***

### clipPath?

> `optional` **clipPath**: [`BaseFabricObject`](/api/classes/basefabricobject/)\<`Partial`\<`ObjectProps`\>, [`SerializedObjectProps`](/api/interfaces/serializedobjectprops/), [`ObjectEvents`](/api/interfaces/objectevents/)\>

定义于：[src/shapes/Object/Object.ts:213](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L213)

一个 fabricObject，如果没有描边，则用它们的形状定义一个裁剪区域。填充为黑色
当对象已渲染时使用 clipPath 对象，并且上下文放置在对象 cacheCanvas 的中心。
如果希望 clipPath 的 0,0 与对象中心对齐，请将 clipPath.originX/Y 设置为 'center'

#### 继承自

[`Group`](/api/classes/group/).[`clipPath`](/api/classes/group/#clippath)

***

### clipPathId?

> `optional` **clipPathId**: `string`

定义于：[src/shapes/Object/FabricObjectSVGExportMixin.ts:15](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/FabricObjectSVGExportMixin.ts#L15)

当对象作为 SVG 的 clippath 导出时，需要 SVG 内部的引用。
此引用是 fabric 命名空间中的 UID，临时存储在此处。

#### 继承自

[`Group`](/api/classes/group/).[`clipPathId`](/api/classes/group/#clippathid)

***

### controls

> **controls**: `TControlSet`

定义于：[src/shapes/Object/InteractiveObject.ts:118](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L118)

保存对象的控件。
控件由 default_controls.js 添加

#### 继承自

[`Group`](/api/classes/group/).[`controls`](/api/classes/group/#controls)

***

### cornerColor

> **cornerColor**: `string`

定义于：[src/shapes/Object/InteractiveObject.ts:68](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L68)

对象控制角的颜色（当它处于活动状态时）

#### 默认值

```ts
rgb(178,204,255)
```

#### 继承自

[`Group`](/api/classes/group/).[`cornerColor`](/api/classes/group/#cornercolor)

***

### cornerDashArray

> **cornerDashArray**: `null` \| `number`[]

定义于：[src/shapes/Object/InteractiveObject.ts:71](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L71)

指定对象控件虚线模式的数组（hasBorder 必须为 true）

#### 自版本

1.6.2

#### 默认值

```ts
null
```

#### 继承自

[`Group`](/api/classes/group/).[`cornerDashArray`](/api/classes/group/#cornerdasharray)

***

### cornerSize

> **cornerSize**: `number`

定义于：[src/shapes/Object/InteractiveObject.ts:65](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L65)

对象控制角的大小（以像素为单位）

#### 默认值

```ts
13
```

#### 继承自

[`Group`](/api/classes/group/).[`cornerSize`](/api/classes/group/#cornersize)

***

### cornerStrokeColor

> **cornerStrokeColor**: `string`

定义于：[src/shapes/Object/InteractiveObject.ts:69](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L69)

对象控制角的颜色（当它处于活动状态且 transparentCorners 为 false 时）

#### 自版本

1.6.2

#### 默认值

```ts
''
```

#### 继承自

[`Group`](/api/classes/group/).[`cornerStrokeColor`](/api/classes/group/#cornerstrokecolor)

***

### ~~cornerStyle~~

> **cornerStyle**: `"circle"` \| `"rect"`

定义于：[src/shapes/Object/InteractiveObject.ts:70](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L70)

指定控件的样式，'rect' 或 'circle'
已弃用。将来会有标准的控件渲染
您可以通过控件 API 提供的替代方案之一进行替换

:::caution[已弃用]
此 API 不再受支持，可能在未来版本中移除。
:::

#### 自版本

1.6.2

#### 默认值

```ts
'rect'
```

#### 继承自

[`Group`](/api/classes/group/).[`cornerStyle`](/api/classes/group/#cornerstyle)

***

### dirty

> **dirty**: `boolean`

定义于：[src/shapes/Object/Object.ts:242](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L242)

当设置为 `true` 时，对象的缓存将在下一次渲染调用时重新渲染。
自 1.7.0 起

#### 默认值

```ts
true
```

#### 继承自

[`Group`](/api/classes/group/).[`dirty`](/api/classes/group/#dirty)

***

### evented

> **evented**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:82](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L82)

当设置为 `false` 时，对象不能成为事件的目标。所有事件都通过它传播。在 v1.3.4 中引入

#### 继承自

[`Group`](/api/classes/group/).[`evented`](/api/classes/group/#evented)

***

### excludeFromExport

> **excludeFromExport**: `boolean`

定义于：[src/shapes/Object/Object.ts:209](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L209)

当为 `true` 时，对象不会在 OBJECT/JSON 中导出

#### 自版本

1.6.3

#### 继承自

[`Group`](/api/classes/group/).[`excludeFromExport`](/api/classes/group/#excludefromexport)

***

### fill

> **fill**: `null` \| `string` \| [`TFiller`](/api/type-aliases/tfiller/)

定义于：[src/shapes/Object/Object.ts:192](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L192)

对象填充的颜色
接受 css 颜色 https://www.w3.org/TR/css-color-3/

#### 默认值

```ts
rgb(0,0,0)
```

#### 继承自

[`Group`](/api/classes/group/).[`fill`](/api/classes/group/#fill)

***

### fillRule

> **fillRule**: `CanvasFillRule`

定义于：[src/shapes/Object/Object.ts:193](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L193)

用于填充对象的填充规则
接受的值为 nonzero、evenodd
<b>向后不兼容说明：</b> 此属性在 v1.4.12 之前用于设置 globalCompositeOperation（请改用 `globalCompositeOperation`）

#### 默认值

```ts
nonzero
```

#### 继承自

[`Group`](/api/classes/group/).[`fillRule`](/api/classes/group/#fillrule)

***

### flipX

> **flipX**: `boolean`

定义于：[src/shapes/Object/ObjectGeometry.ts:567](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L567)

当为 true 时，对象被渲染为水平翻转

#### 默认值

```ts
false
```

#### 继承自

[`Group`](/api/classes/group/).[`flipX`](/api/classes/group/#flipx)

***

### flipY

> **flipY**: `boolean`

定义于：[src/shapes/Object/ObjectGeometry.ts:568](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L568)

当为 true 时，对象被渲染为垂直翻转

#### 默认值

```ts
false
```

#### 继承自

[`Group`](/api/classes/group/).[`flipY`](/api/classes/group/#flipy)

***

### globalCompositeOperation

> **globalCompositeOperation**: `GlobalCompositeOperation`

定义于：[src/shapes/Object/Object.ts:201](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L201)

用于画布 globalCompositeOperation 的合成规则

#### 继承自

[`Group`](/api/classes/group/).[`globalCompositeOperation`](/api/classes/group/#globalcompositeoperation)

***

### hasBorders

> **hasBorders**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:78](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L78)

当设置为 `false` 时，不渲染对象的控制边框

#### 继承自

[`Group`](/api/classes/group/).[`hasBorders`](/api/classes/group/#hasborders)

***

### hasControls

> **hasControls**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:72](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L72)

当设置为 `false` 时，不显示对象的控件，也不能用于操作对象

#### 默认值

```ts
true
```

#### 继承自

[`Group`](/api/classes/group/).[`hasControls`](/api/classes/group/#hascontrols)

***

### height

> **height**: `number`

定义于：[src/shapes/Object/ObjectGeometry.ts:566](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L566)

对象高度

#### 继承自

[`Group`](/api/classes/group/).[`height`](/api/classes/group/#height)

***

### hoverCursor

> **hoverCursor**: `null` \| `string`

定义于：[src/shapes/Object/InteractiveObject.ts:86](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L86)

在画布上悬停此对象时使用的默认光标值

#### 默认值

```ts
null
```

#### 继承自

[`Group`](/api/classes/group/).[`hoverCursor`](/api/classes/group/#hovercursor)

***

### includeDefaultValues

> **includeDefaultValues**: `boolean`

定义于：[src/shapes/Object/Object.ts:208](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L208)

当为 `false` 时，对象的默认值不包含在其序列化中

#### 继承自

[`Group`](/api/classes/group/).[`includeDefaultValues`](/api/classes/group/#includedefaultvalues)

***

### ~~interactive~~

> **interactive**: `boolean`

定义于：[src/shapes/Group.ts:106](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Group.ts#L106)

用于允许定位组内的对象。
如果要选择组内的对象，请设置为 true。
**需要**将 `subTargetCheck` 设置为 true
这不会被移除，但会慢慢被 setInteractive 方法取代，该方法将负责启用 subTargetCheck 和必要的对象事件。
与组交互性相关的内容太多，不能仅通过代码中的布尔值来评估

:::caution[已弃用]
此 API 不再受支持，可能在未来版本中移除。
:::

#### 继承自

[`Group`](/api/classes/group/).[`interactive`](/api/classes/group/#interactive)

***

### inverted

> **inverted**: `boolean`

定义于：[src/shapes/Object/Object.ts:214](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L214)

仅当对象用作 clipPath 时才有意义。
如果为 true，clipPath 将使对象裁剪到 clipPath 的外部
自 2.4.0 起

#### 默认值

```ts
false
```

#### 继承自

[`Group`](/api/classes/group/).[`inverted`](/api/classes/group/#inverted)

***

### isMoving?

> `optional` **isMoving**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:124](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L124)

内部布尔值，用于向代码发出信号，表明对象是移动操作的一部分。

#### 继承自

[`Group`](/api/classes/group/).[`isMoving`](/api/classes/group/#ismoving)

***

### layoutManager

> **layoutManager**: `ActiveSelectionLayoutManager`

定义于：[src/shapes/ActiveSelection.ts:49](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/ActiveSelection.ts#L49)

ActiveSelection 需要使用 ActiveSelectionLayoutManager，否则交互式组上的选择可能会被破坏

#### 重写

[`Group`](/api/classes/group/).[`layoutManager`](/api/classes/group/#layoutmanager)

***

### left

> **left**: `number`

定义于：[src/shapes/Object/ObjectGeometry.ts:564](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L564)

对象的左位置。
请注意，默认情况下它是相对于对象左侧的。
您可以通过设置 originX 来更改此设置

#### 默认值

```ts
0
```

#### 继承自

[`Group`](/api/classes/group/).[`left`](/api/classes/group/#left)

***

### lockMovementX

> **lockMovementX**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:56](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L56)

当为 `true` 时，对象水平移动被锁定

#### 继承自

[`Group`](/api/classes/group/).[`lockMovementX`](/api/classes/group/#lockmovementx)

***

### lockMovementY

> **lockMovementY**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:57](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L57)

当为 `true` 时，对象垂直移动被锁定

#### 继承自

[`Group`](/api/classes/group/).[`lockMovementY`](/api/classes/group/#lockmovementy)

***

### lockRotation

> **lockRotation**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:58](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L58)

当为 `true` 时，对象旋转被锁定

#### 继承自

[`Group`](/api/classes/group/).[`lockRotation`](/api/classes/group/#lockrotation)

***

### lockScalingFlip

> **lockScalingFlip**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:63](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L63)

当为 `true` 时，对象不能通过缩放到负值来翻转

#### 继承自

[`Group`](/api/classes/group/).[`lockScalingFlip`](/api/classes/group/#lockscalingflip)

***

### lockScalingX

> **lockScalingX**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:59](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L59)

当为 `true` 时，对象水平缩放被锁定

#### 继承自

[`Group`](/api/classes/group/).[`lockScalingX`](/api/classes/group/#lockscalingx)

***

### lockScalingY

> **lockScalingY**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:60](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L60)

当为 `true` 时，对象垂直缩放被锁定

#### 继承自

[`Group`](/api/classes/group/).[`lockScalingY`](/api/classes/group/#lockscalingy)

***

### lockSkewingX

> **lockSkewingX**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:61](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L61)

当为 `true` 时，对象水平倾斜被锁定

#### 继承自

[`Group`](/api/classes/group/).[`lockSkewingX`](/api/classes/group/#lockskewingx)

***

### lockSkewingY

> **lockSkewingY**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:62](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L62)

当为 `true` 时，对象垂直倾斜被锁定

#### 继承自

[`Group`](/api/classes/group/).[`lockSkewingY`](/api/classes/group/#lockskewingy)

***

### matrixCache?

> `optional` **matrixCache**: `TMatrixCache`

定义于：[src/shapes/Object/ObjectGeometry.ts:73](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L73)

对象完整变换矩阵的存储缓存

#### 继承自

[`Group`](/api/classes/group/).[`matrixCache`](/api/classes/group/#matrixcache)

***

### minScaleLimit

> **minScaleLimit**: `number`

定义于：[src/shapes/Object/Object.ts:187](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L187)

对象允许的最小缩放值

#### 默认值

```ts
0
```

#### 继承自

[`Group`](/api/classes/group/).[`minScaleLimit`](/api/classes/group/#minscalelimit)

***

### moveCursor

> **moveCursor**: `null` \| `string`

定义于：[src/shapes/Object/InteractiveObject.ts:87](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L87)

在画布上移动此对象时使用的默认光标值

#### 默认值

```ts
null
```

#### 继承自

[`Group`](/api/classes/group/).[`moveCursor`](/api/classes/group/#movecursor)

***

### multiSelectionStacking

> **multiSelectionStacking**: [`MultiSelectionStacking`](/api/type-aliases/multiselectionstacking/)

定义于：[src/shapes/ActiveSelection.ts:58](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/ActiveSelection.ts#L58)

控制在多选事件期间如何添加选中的对象
- `canvas-stacking` 将选中的对象添加到活动选择中，同时尊重画布对象的堆叠顺序
- `selection-order` 将选中的对象添加到堆栈顶部，这意味着堆栈按对象被选中的顺序排列

#### 默认值

`canvas-stacking`

***

### noScaleCache

> **noScaleCache**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:51](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L51)

当为 `true` 时，在缩放期间缓存不会更新。如果缩放过大，图像会变得模糊，并且会在缩放结束时以正确的细节重新绘制。
此设置取决于性能和应用程序。
默认为 true
自 1.7.0 起

#### 默认值

```ts
true
```

#### 继承自

[`Group`](/api/classes/group/).[`noScaleCache`](/api/classes/group/#noscalecache)

***

### objectCaching

> **objectCaching**: `boolean`

定义于：[src/shapes/Object/Object.ts:211](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L211)

当为 `true` 时，对象缓存在额外的画布上。
当为 `false` 时，除非必要（clipPath），否则不缓存对象
默认为 true

#### 自版本

1.7.0

#### 默认值

```ts
true
```

#### 继承自

[`Group`](/api/classes/group/).[`objectCaching`](/api/classes/group/#objectcaching)

***

### oCoords

> **oCoords**: `Record`\<`string`, `TOCoord`\>

定义于：[src/shapes/Object/InteractiveObject.ts:95](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L95)

对象控件在视口坐标中的位置
由 [Control#positionHandler](/api/classes/control/#positionhandler) 和 [Control#calcCornerCoords](/api/classes/control/#calccornercoords) 计算，取决于 [padding](/api/classes/fabricobject/#padding)。
`corner/touchCorner` 描述形成角的交互区域的 4 个点。
用于绘制和定位控件。

#### 继承自

[`Group`](/api/classes/group/).[`oCoords`](/api/classes/group/#ocoords)

***

### opacity

> **opacity**: `number`

定义于：[src/shapes/Object/Object.ts:189](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L189)

对象的不透明度

#### 默认值

```ts
1
```

#### 继承自

[`Group`](/api/classes/group/).[`opacity`](/api/classes/group/#opacity)

***

### ~~originX~~

> **originX**: [`TOriginX`](/api/type-aliases/toriginx/)

定义于：[src/shapes/Object/ObjectGeometry.ts:576](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L576)

:::caution[已弃用]
请在新项目中使用 'center' 作为值
:::

#### 继承自

[`Group`](/api/classes/group/).[`originX`](/api/classes/group/#originx)

***

### ~~originY~~

> **originY**: [`TOriginY`](/api/type-aliases/toriginy/)

定义于：[src/shapes/Object/ObjectGeometry.ts:580](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L580)

:::caution[已弃用]
请在新项目中使用 'center' 作为值
:::

#### 继承自

[`Group`](/api/classes/group/).[`originY`](/api/classes/group/#originy)

***

### ownMatrixCache?

> `optional` **ownMatrixCache**: `TMatrixCache`

定义于：[src/shapes/Object/ObjectGeometry.ts:68](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L68)

对象变换矩阵的存储缓存

#### 继承自

[`Group`](/api/classes/group/).[`ownMatrixCache`](/api/classes/group/#ownmatrixcache)

***

### padding

> **padding**: `number`

定义于：[src/shapes/Object/ObjectGeometry.ts:53](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L53)

对象与其控制边框之间的内边距（以像素为单位）

#### 默认值

```ts
0
```

#### 继承自

[`Group`](/api/classes/group/).[`padding`](/api/classes/group/#padding)

***

### paintFirst

> **paintFirst**: `"fill"` \| `"stroke"`

定义于：[src/shapes/Object/Object.ts:191](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L191)

确定先绘制填充还是描边（"fill" 或 "stroke" 之一）

#### 继承自

[`Group`](/api/classes/group/).[`paintFirst`](/api/classes/group/#paintfirst)

***

### parent?

> `optional` **parent**: [`Group`](/api/classes/group/)

定义于：[src/shapes/Object/Object.ts:1602](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L1602)

对象父级的引用
用于当对象已添加到 ActiveSelection 时保留原始父级引用，因此丢失了 `group` 引用

#### 继承自

[`Group`](/api/classes/group/).[`parent`](/api/classes/group/#parent)

***

### perPixelTargetFind

> **perPixelTargetFind**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:83](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L83)

当设置为 `true` 时，对象在画布上是基于像素来“找到”的，而不是根据边界框

#### 继承自

[`Group`](/api/classes/group/).[`perPixelTargetFind`](/api/classes/group/#perpixeltargetfind)

***

### scaleX

> **scaleX**: `number`

定义于：[src/shapes/Object/ObjectGeometry.ts:569](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L569)

对象缩放因子（水平）

#### 默认值

```ts
1
```

#### 继承自

[`Group`](/api/classes/group/).[`scaleX`](/api/classes/group/#scalex)

***

### scaleY

> **scaleY**: `number`

定义于：[src/shapes/Object/ObjectGeometry.ts:570](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L570)

对象缩放因子（垂直）

#### 默认值

```ts
1
```

#### 继承自

[`Group`](/api/classes/group/).[`scaleY`](/api/classes/group/#scaley)

***

### selectable

> **selectable**: `boolean`

定义于：[src/shapes/Object/InteractiveObject.ts:81](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L81)

当设置为 `false` 时，对象不能被选中进行修改（使用基于点按或基于组的选择）。但事件仍然会在其上触发。

#### 继承自

[`Group`](/api/classes/group/).[`selectable`](/api/classes/group/#selectable)

***

### ~~selectionBackgroundColor~~

> **selectionBackgroundColor**: `string`

定义于：[src/shapes/Object/InteractiveObject.ts:79](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L79)

对象的选择背景颜色。对象处于活动状态时其后面的有色层。与 globalCompositeOperation 方法不能很好地混合。

:::caution[已弃用]
此 API 不再受支持，可能在未来版本中移除。
:::

#### 继承自

[`Group`](/api/classes/group/).[`selectionBackgroundColor`](/api/classes/group/#selectionbackgroundcolor)

***

### shadow

> **shadow**: `null` \| [`Shadow`](/api/classes/shadow/)

定义于：[src/shapes/Object/Object.ts:204](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L204)

表示此形状阴影的 Shadow 对象

#### 默认值

```ts
null
```

#### 继承自

[`Group`](/api/classes/group/).[`shadow`](/api/classes/group/#shadow)

***

### skewX

> **skewX**: `number`

定义于：[src/shapes/Object/ObjectGeometry.ts:571](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L571)

对象 x 轴的倾斜角度（以度为单位）

#### 默认值

```ts
0
```

#### 继承自

[`Group`](/api/classes/group/).[`skewX`](/api/classes/group/#skewx)

***

### skewY

> **skewY**: `number`

定义于：[src/shapes/Object/ObjectGeometry.ts:572](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/ObjectGeometry.ts#L572)

对象 y 轴的倾斜角度（以度为单位）

#### 默认值

```ts
0
```

#### 继承自

[`Group`](/api/classes/group/).[`skewY`](/api/classes/group/#skewy)

***

### snapAngle?

> `optional` **snapAngle**: [`TDegree`](/api/type-aliases/tdegree/)

定义于：[src/shapes/Object/InteractiveObject.ts:53](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L53)

对象旋转时将锁定到的角度。

#### 继承自

[`Group`](/api/classes/group/).[`snapAngle`](/api/classes/group/#snapangle)

***

### snapThreshold?

> `optional` **snapThreshold**: [`TDegree`](/api/type-aliases/tdegree/)

定义于：[src/shapes/Object/InteractiveObject.ts:54](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/InteractiveObject.ts#L54)

与当前捕捉角度的角度差，在该角度差内应该发生捕捉。
当未定义时，snapThreshold 将默认为 snapAngle。

#### 继承自

[`Group`](/api/classes/group/).[`snapThreshold`](/api/classes/group/#snapthreshold)

***

### stroke

> **stroke**: `null` \| `string` \| [`TFiller`](/api/type-aliases/tfiller/)

定义于：[src/shapes/Object/Object.ts:194](https://github.com/fabricjs/fabric.js/blob/9a792f4b7b8031f02ec7ea4ce8c99f810e45cfec/src/shapes/Object/Object.ts#L194)

当定义时，对象通过描边渲染，此属性指定其颜色
接受 css 颜色 https://www.w3.org/TR/css-color-3/

#### 默认值

```ts
null
```

#### 继承自

[`Group`](/api/classes/group/).[`stroke`](/api/classes/group/#stroke)

***

### strokeDashArray

> **strokeDashArray**: `null` \| `number`[]
```