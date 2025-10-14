# DropdownMenu 组件

## 组件概述

DropdownMenu 是一个灵活的下拉菜单组件，支持多级嵌套菜单、快捷键显示、禁用状态以及分组显示。它基于 Vue 3 实现，使用 TypeScript 提供类型安全，并支持自定义触发器内容。

## 导出组件

```typescript
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import type { TDropdownMenuItems, TDropdownMenu, TDropdownMenuItem } from '@/components/qxt-vue/dropdown-menu/type'
```

## 类型定义

### TDropdownMenuItem

参数请参考：https://www.shadcn-vue.com/docs/components/dropdown-menu.html

```typescript
export type TDropdownMenuItem = {
    label: string;           // 菜单项标签文本
    shortcut?: string;       // 快捷键显示文本
    submenu?: TDropdownMenu; // 子菜单配置
    onClick?: (e: Event) => void; // 点击事件处理函数
    disabled?: boolean;      // 是否禁用当前菜单项
    [key: string]: any;      // 允许传递其他自定义属性
}
```

### TDropdownMenuItems

```typescript
export type TDropdownMenuItems = TDropdownMenuItem[]
```

### TDropdownMenu

```typescript
export type TDropdownMenu = {
    label?: string;           // 菜单标签（用于子菜单，支持slot=label）
    items: TDropdownMenuItems | TDropdownMenuItems[]; // 菜单项列表
}
```

## 使用示例

### 基础用法

```vue
<template>
    <DropdownMenu :items="menu" label="My Account">
        <button>Open Menu</button>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import type { TDropdownMenuItems } from '@/components/qxt-vue/dropdown-menu/type'

function onClick(e: Event) {
    console.log('menu click', e);
}

const menu: TDropdownMenuItems = [
    { label: 'Billing', shortcut: '⇧⌘P', onClick },
    { label: 'Team', shortcut: '⌘T', onClick },
    { label: 'Subscription', disabled: true, onClick }
]
</script>
```

### 多级嵌套菜单

```vue
<template>
    <DropdownMenu :items="menu">
        <button>Open Menu with Submenus</button>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import type { TDropdownMenuItems } from '@/components/qxt-vue/dropdown-menu/type'

function onClick(e: Event) {
    console.log('menu click', e);
}

const menu: TDropdownMenuItems = [
    { label: 'Billing', shortcut: '⇧⌘P', onClick },
    { 
        label: 'Team', 
        shortcut: '⌘T',
        submenu: {
            label: 'Team Management',
            items: [
                { label: 'Add Member', shortcut: '⌘A', onClick },
                { label: 'Manage Roles', shortcut: '⌘R', onClick }
            ]
        } 
    },
    { 
        label: 'Advanced',
        submenu: {
            items: [
                { 
                    label: 'Settings',
                    submenu: {
                        items: [
                            { label: 'General', onClick },
                            { label: 'Security', onClick }
                        ]
                    }
                }
            ]
        }
    }
]
</script>
```

### 使用插槽自定义标签

```vue
<template>
    <DropdownMenu :items="menu">
        <template #label>
            <span class="font-bold text-primary">Custom Label</span>
        </template>
        <button class="px-4 py-2 bg-primary text-white rounded">Custom Trigger</button>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import type { TDropdownMenuItems } from '@/components/qxt-vue/dropdown-menu/type'

const menu: TDropdownMenuItems = [
    { label: 'Item 1', onClick: () => console.log('Item 1 clicked') },
    { label: 'Item 2', onClick: () => console.log('Item 2 clicked') }
]
</script>
```

## 组件说明

### DropdownMenu

主下拉菜单容器组件，负责整体菜单的显示和控制。

#### 属性

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|-------|------|-----|--------|------|
| items | `TDropdownMenuItem[]` | 是 | - | 菜单项列表 |
| label | `string` | 否 | - | 菜单标题标签 |

#### 插槽

| 插槽名 | 说明 |
|-------|------|
| default | 菜单触发器内容，通常是按钮或其他可点击元素 |
| label | 自定义菜单标题内容 |

### DropdownMenuGroup

菜单项分组组件，用于将相关菜单项组织在一起。

#### 属性

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|-------|------|-----|--------|------|
| items | `TDropdownMenuItems \| TDropdownMenuItems[]` | 是 | - | 一组或多组菜单项 |

### DropdownMenuItem

单个菜单项组件，展示菜单项文本、快捷键，并处理点击事件。

#### 属性

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|-------|------|-----|--------|------|
| label | `string` | 是 | - | 菜单项文本 |
| shortcut | `string` | 否 | - | 快捷键显示文本 |
| onClick | `(e: Event) => void` | 否 | - | 点击事件处理函数 |
| disabled | `boolean` | 否 | false | 是否禁用当前菜单项 |
| submenu | `TDropdownMenu` | 否 | - | 子菜单配置 |

### DropdownMenuSub

子菜单组件，用于展示嵌套菜单。

#### 属性

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|-------|------|-----|--------|------|
| label | `string` | 否 | - | 子菜单触发器文本 |
| items | `TDropdownMenuItems \| TDropdownMenuItems[]` | 是 | - | 子菜单的菜单项列表 |

## 实际应用案例

以下是基于实际项目中的使用示例：

```vue
<script setup lang="ts">
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import type { TDropdownMenuItems } from '@/components/qxt-vue/dropdown-menu/type'

function onClick(e: Event) {
    console.log('menu click', e);
}

const menu: TDropdownMenuItems = [
    { label: 'Billing', shortcut: '⇧⌘P', onClick },
    { label: 'Team', shortcut: '⌘T', onClick },
    { label: 'Subscription', disabled: true, onClick },
    {
        label: 'Max Team',
        shortcut: '⌘T',
        submenu: {
            label: 'Max Team',
            items: [
                { label: 'Max Team 1', shortcut: '⌘T', onClick },
                { label: 'Max Team 2', shortcut: '⌘T', onClick },
                {
                    label: 'Max Team 3', shortcut: '⌘T',
                    submenu: {
                        label: 'Max Team 3',
                        items: [
                            { label: 'Max Team 3-1', shortcut: '⌘T', onClick },
                            { label: 'Max Team 3-2', shortcut: '⌘T', onClick },
                        ]
                    }
                },
                { label: 'Max Team 4', shortcut: '⌘T', onClick },
            ]
        }
    },
]
</script>

<template>
    <div class="p-4">
        <DropdownMenu :items="menu" label="My Account">
            <button>Open</button>
        </DropdownMenu>
    </div>
</template>
```

## 注意事项

1. 组件基于 Vue 3 的 Composition API 实现，请确保您的项目环境支持 Vue 3
2. 支持任意深度的嵌套子菜单，但为了用户体验，建议不要超过3级
3. 可以通过添加 `disabled: true` 属性禁用特定菜单项
4. 快捷键显示仅为视觉提示，实际快捷键功能需要另外实现
5. 所有组件都支持通过扩展 `[key: string]: any` 传递自定义属性