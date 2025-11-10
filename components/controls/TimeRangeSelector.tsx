'use client';
import { useDashboardData } from '../providers/DataProvider';
import { TimeRangeKey } from '../../lib/types';

export default function TimeRangeSelector() {
	const { timeRange, setTimeRange } = useDashboardData();
	const ranges: TimeRangeKey[] = ['1m', '5m', '1h'];
	return (
		<div className="panel">
			<h3>Time Range</h3>
			<div className="row">
				{ranges.map(r => (
					<button key={r} onClick={() => setTimeRange(r)} style={{ borderColor: timeRange === r ? '#22d3ee' : undefined }}>
						{r}
					</button>
				))}
			</div>
		</div>
	);
}



