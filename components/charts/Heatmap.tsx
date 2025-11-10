'use client';
import { useMemo, useRef } from 'react';
import { useChartRenderer } from '../../hooks/useChartRenderer';
import { drawHeatmap } from '../../lib/canvasUtils';
import { DataPoint } from '../../lib/types';

export default function Heatmap({ data, zoom, pan }: { data: DataPoint[]; zoom: number; pan: number }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stableData = useMemo(() => data, [data]);
	useChartRenderer(canvasRef, (ctx, w, h) => {
		drawHeatmap(ctx, stableData, w, h, zoom, pan);
	});
	return <div className="canvasWrap"><canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} /></div>;
}



