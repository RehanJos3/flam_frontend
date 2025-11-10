import { useMemo } from 'react';

export function useVirtualization<T>(items: T[], containerHeight: number, rowHeight: number, scrollTop: number) {
	const { startIndex, endIndex, offsetTop } = useMemo(() => {
		const visibleCount = Math.ceil(containerHeight / rowHeight) + 2;
		const start = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
		const end = Math.min(items.length, start + visibleCount);
		const offset = start * rowHeight;
		return { startIndex: start, endIndex: end, offsetTop: offset };
	}, [containerHeight, rowHeight, scrollTop, items.length]);

	const visibleItems = useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex]);
	const totalHeight = items.length * rowHeight;

	return { visibleItems, startIndex, endIndex, offsetTop, totalHeight };
}



