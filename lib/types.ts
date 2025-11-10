export type ChartType = 'line' | 'bar' | 'scatter' | 'heatmap';

export interface DataPoint {
	timestamp: number;
	value: number;
	category: string;
	metadata?: Record<string, unknown>;
}

export interface ChartConfig {
	type: ChartType;
	dataKey: 'value';
	color: string;
	visible: boolean;
}

export type TimeRangeKey = '1m' | '5m' | '1h';

export interface PerformanceMetrics {
	fps: number;
	memoryUsageMB?: number;
	renderTimeMs?: number;
	dataProcessingTimeMs?: number;
}

export interface DashboardState {
	data: DataPoint[];
	filterCategory: string | 'all';
	timeRange: TimeRangeKey;
	zoom: number; // scale factor
	pan: number; // pixels
}



