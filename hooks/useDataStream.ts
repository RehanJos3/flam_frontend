import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DataPoint, TimeRangeKey } from '../lib/types';
import { generatePoint } from '../lib/dataGenerator';

const RANGE_TO_MS: Record<TimeRangeKey, number> = {
	'1m': 60_000,
	'5m': 5 * 60_000,
	'1h': 60 * 60_000
};

export function useDataStream(initial: DataPoint[], timeRange: TimeRangeKey) {
	const [data, setData] = useState<DataPoint[]>(initial);
	// Keep updates simple in prod to avoid concurrent rendering pitfalls
	const prevRef = useRef<DataPoint | undefined>(initial.at(-1));
	const intervalRef = useRef<number | null>(null);
	const stepMs = 100;

	const windowMs = useMemo(() => RANGE_TO_MS[timeRange], [timeRange]);

	const tick = useCallback(() => {
		const last = prevRef.current;
		const t = (last?.timestamp ?? Date.now()) + stepMs;
		const next = generatePoint(last, t);
		prevRef.current = next;
		setData(prev => {
			const nextArr = [...prev, next];
			// sliding window by time range
			const cutoff = t - windowMs;
			let idx = 0;
			while (idx < nextArr.length && nextArr[idx].timestamp < cutoff) idx++;
			return idx > 0 ? nextArr.slice(idx) : nextArr;
		});
	}, [stepMs, windowMs]);

	useEffect(() => {
		// reset window when timeRange changes
		const last = data.at(-1);
		if (last) {
			prevRef.current = last;
			setData(prev => {
				const cutoff = last.timestamp - windowMs;
				let idx = 0;
				while (idx < prev.length && prev[idx].timestamp < cutoff) idx++;
				return idx > 0 ? prev.slice(idx) : prev;
			});
		}
	}, [timeRange, windowMs]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		intervalRef.current = window.setInterval(tick, stepMs);
		return () => {
			if (intervalRef.current) window.clearInterval(intervalRef.current);
		};
	}, [tick]);

	return { data, isPending: false };
}



