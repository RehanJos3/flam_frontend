'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ChartConfig, DashboardState, DataPoint, TimeRangeKey } from '../../lib/types';
import { useDataStream } from '../../hooks/useDataStream';

interface DataContextValue extends DashboardState {
	setFilterCategory: (c: string | 'all') => void;
	setTimeRange: (r: TimeRangeKey) => void;
	setZoom: (z: number) => void;
	setPan: (p: number) => void;
	configs: ChartConfig[];
}

const DataContext = createContext<DataContextValue | null>(null);

export function useDashboardData() {
	const ctx = useContext(DataContext);
	if (!ctx) throw new Error('useDashboardData must be used within DataProvider');
	return ctx;
}

export default function DataProvider({ initialData, children }: { initialData: DataPoint[]; children: React.ReactNode }) {
	const [filterCategory, setFilterCategory] = useState<string | 'all'>('all');
	const [timeRange, setTimeRange] = useState<TimeRangeKey>('1m');
	const [zoom, setZoom] = useState(1);
	const [pan, setPan] = useState(0);

	const { data } = useDataStream(initialData, timeRange);

	const filtered = useMemo(() => {
		if (filterCategory === 'all') return data;
		return data.filter(d => d.category === filterCategory);
	}, [data, filterCategory]);

	const configs: ChartConfig[] = useMemo(
		() => [
			{ type: 'line', dataKey: 'value', color: '#22d3ee', visible: true },
			{ type: 'bar', dataKey: 'value', color: '#a78bfa', visible: true },
			{ type: 'scatter', dataKey: 'value', color: '#34d399', visible: true },
			{ type: 'heatmap', dataKey: 'value', color: '#f472b6', visible: true }
		],
		[]
	);

	const setZoomClamped = useCallback((z: number) => setZoom(Math.max(0.25, Math.min(8, z))), []);
	const setPanClamped = useCallback((p: number) => setPan(Math.max(-5000, Math.min(5000, p))), []);

	const value = useMemo<DataContextValue>(
		() => ({
			data: filtered,
			filterCategory,
			timeRange,
			zoom,
			pan,
			setFilterCategory,
			setTimeRange,
			setZoom: setZoomClamped,
			setPan: setPanClamped,
			configs
		}),
		[filtered, filterCategory, timeRange, zoom, pan, setZoomClamped, setPanClamped, configs]
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}


