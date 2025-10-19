import { FabricObject, ActiveSelection, Gradient, Pattern, Text, Group, Canvas, Circle, FabricImage } from 'fabric'
import { Group as NativeGroup } from 'fabric'


export const isActiveSelection = (thing: unknown): thing is ActiveSelection => {
  return thing instanceof ActiveSelection
}

export const isCircle = (thing: unknown): thing is Circle => {
  return thing instanceof Circle
}

export const isImage = (thing: unknown): thing is FabricImage => {
  return thing instanceof FabricImage
}
  
export const isGroup = (thing?: unknown): thing is Group => {
  return thing instanceof Group
}
  
export const isCollection = (thing?: unknown): thing is Group | ActiveSelection | Canvas => {
  return !!thing && Array.isArray((thing as Group)._objects)
}

export const isNativeGroup = (thing?: unknown): thing is NativeGroup => {
  return thing instanceof NativeGroup
}
  
export const isGradient = (thing: unknown): thing is Gradient<'linear' | 'radial'> => {
  return thing instanceof Gradient
}
  
export const isPattern = (thing: unknown): thing is Pattern => {
  return thing instanceof Pattern
}

export const isTextObject = (thing?: FabricObject): thing is Text => {
  return !!thing && thing.isType('Text', 'IText', 'Textbox', 'ArcText')
}
  
// const isFiller = (filler: TFiller | string | null): filler is TFiller => {
//     return !!filler && (filler as TFiller).toLive !== undefined
// }
  
// const isSerializableFiller = (filler: TFiller | string | null): filler is TFiller => {
//     return !!filler && typeof (filler as TFiller).toObject === 'function'
// }
  
