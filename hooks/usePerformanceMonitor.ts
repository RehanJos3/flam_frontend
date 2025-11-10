import { useEffect, useRef, useState } from 'react';
import { createFpsMeter, getApproxMemoryMB } from '../lib/performanceUtils';
import { PerformanceMetrics } from '../lib/types';

export function usePerformanceMonitor() {
	const [metrics, setMetrics] = useState<PerformanceMetrics>({ fps: 0, memoryUsageMB: getApproxMemoryMB() });
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const fpsMeter = createFpsMeter(60);
		const loop = () => {
			const fps = fpsMeter.tick();
			setMetrics(prev => ({ ...prev, fps, memoryUsageMB: getApproxMemoryMB() }));
			rafRef.current = requestAnimationFrame(loop);
		};
		rafRef.current = requestAnimationFrame(loop);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return metrics;
}



