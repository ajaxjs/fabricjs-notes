/**
 * 布局网格容器，实现瀑布流效果
 * @param container 网格容器元素或选择器字符串
 * @returns 无返回值
 */
export const layoutMasonry = (container: HTMLElement | string): void => {
    // ---------- 1. 容器获取 ----------
    if (typeof container === 'string') {
        container = document.querySelector(container) as HTMLElement;
    }
    if (!container) {
        console.error('container not found');
        return;
    }
    // ---------- 2. 读取布局信息 ----------
    const style = getComputedStyle(container);
    const gap = parseFloat(style.columnGap) || 0;               // 列间距（px）
    const colWidths = style.gridTemplateColumns
        .split(' ')
        .map(w => parseFloat(w));                            // 每列宽度（px）
    const colCount = colWidths.length;
    const pl = parseFloat(style.paddingLeft) || 0;
    const pt = parseFloat(style.paddingTop) || 0;
    if (colCount === 0) return;

    // ---------- 3. 子项 & 列高 ----------
    const items = Array.from(container.children) as HTMLElement[];
    const colHeight = new Array(colCount).fill(0);              // 每列累计高度

    // ---------- 4. 核心排版 ----------
    items.forEach(item => {
        const img = item.querySelector('img');
        const height = img?.offsetHeight || 0;

        const top = Math.min(...colHeight) + pt;
        const minHeightCol = colHeight.indexOf(top);
        const left = pl + colWidths.slice(0, minHeightCol).reduce((a, b) => a + b, 0) + gap * minHeightCol;
        const width = colWidths[minHeightCol];
        item.style.position = 'absolute';
        item.style.left = `${left}px`;
        item.style.top = `${top}px`;
        item.style.width = `${width}px`;
        item.style.height = `${height}px`;
        if (!height) {
            img?.addEventListener('load', () => layoutMasonry(container), { once: true })
        }
        // 4.4 更新列高
        colHeight[minHeightCol] += height + gap;
    })
    container.style.position = 'relative';
    container.style.height = `${Math.max(...colHeight)}px`;
}