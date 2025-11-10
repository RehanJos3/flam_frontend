'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DataPoint } from '../../lib/types';
import { useVirtualization } from '../../hooks/useVirtualization';

export default function DataTable({ data }: { data: DataPoint[] }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [height, setHeight] = useState(320);
	const rowHeight = 28;

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const ro = new ResizeObserver(() => setHeight(el.clientHeight));
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const items = useMemo(
		() =>
			data.map(d => ({
				ts: new Date(d.timestamp).toLocaleTimeString(),
				value: d.value.toFixed(2),
				category: d.category
			})),
		[data]
	);

	const { visibleItems, startIndex, offsetTop, totalHeight } = useVirtualization(items, height, rowHeight, scrollTop);

	return (
		<div className="panel">
			<h3>Data Table (Virtualized)</h3>
			<div
				className="table"
				ref={containerRef}
				onScroll={e => setScrollTop((e.target as HTMLDivElement).scrollTop)}
			>
				<div className="tableRow header">
					<div>Timestamp</div>
					<div>Value</div>
					<div>Category</div>
					<div>Index</div>
				</div>
				<div style={{ height: totalHeight, position: 'relative' }}>
					<div style={{ position: 'absolute', top: offsetTop, left: 0, right: 0 }}>
						{visibleItems.map((r, i) => (
							<div key={i + startIndex} className="tableRow" style={{ height: rowHeight }}>
								<div>{r.ts}</div>
								<div>{r.value}</div>
								<div>{r.category}</div>
								<div>{i + startIndex}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}



