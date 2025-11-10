import { useCallback, useEffect, useRef } from 'react';
import { setupCanvas, clearCanvas, drawGrid } from '../lib/canvasUtils';

export function useChartRenderer(
	canvasRef: React.RefObject<HTMLCanvasElement>,
	render: (ctx: CanvasRenderingContext2D, width: number, height: number) => void
) {
	const rafRef = useRef<number | null>(null);

	const loop = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const { ctx, width, height } = setupCanvas(canvas);
		clearCanvas(ctx, width, height);
		drawGrid(ctx, width, height);
		render(ctx, width, height);
		rafRef.current = requestAnimationFrame(loop);
	}, [canvasRef, render]);

	useEffect(() => {
		rafRef.current = requestAnimationFrame(loop);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [loop]);
}



