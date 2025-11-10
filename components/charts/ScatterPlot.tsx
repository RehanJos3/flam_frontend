'use client';
import { useMemo, useRef } from 'react';
import { useChartRenderer } from '../../hooks/useChartRenderer';
import { drawScatter } from '../../lib/canvasUtils';
import { DataPoint } from '../../lib/types';

export default function ScatterPlot({ data, color, zoom, pan }: { data: DataPoint[]; color: string; zoom: number; pan: number }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stableData = useMemo(() => data, [data]);
	useChartRenderer(canvasRef, (ctx, w, h) => {
		drawScatter(ctx, stableData, color, w, h, zoom, pan);
	});
	return <div className="canvasWrap"><canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} /></div>;
}



