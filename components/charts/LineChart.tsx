'use client';
import { useMemo, useRef } from 'react';
import { useChartRenderer } from '../../hooks/useChartRenderer';
import { drawLineSeries } from '../../lib/canvasUtils';
import { DataPoint } from '../../lib/types';

export default function LineChart({ data, color, zoom, pan }: { data: DataPoint[]; color: string; zoom: number; pan: number }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stableData = useMemo(() => data, [data]);
	useChartRenderer(canvasRef, (ctx, w, h) => {
		drawLineSeries(ctx, stableData, color, w, h, zoom, pan);
	});
	return <div className="canvasWrap"><canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} /></div>;
}



