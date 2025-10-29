// 选择器选项项
export type OptionItem = {
    type?: 'label' | 'item',
    label: string,
    value: string,
}
// 选择器选项
export type SelectOptions = {
    label: string,
    options: OptionItem[],
    class?: string,
}