'use client';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';

export default function PerformanceMonitor() {
	const metrics = usePerformanceMonitor();
	return (
		<div className="panel">
			<h3>Performance</h3>
			<div className="metrics">
				<div><strong>FPS:</strong> {metrics.fps}</div>
				<div><strong>Memory:</strong> {metrics.memoryUsageMB ? `${metrics.memoryUsageMB} MB` : 'N/A'}</div>
			</div>
		</div>
	);
}



