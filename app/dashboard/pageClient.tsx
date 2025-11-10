'use client';
import { useDashboardData } from '../../components/providers/DataProvider';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import ScatterPlot from '../../components/charts/ScatterPlot';
import Heatmap from '../../components/charts/Heatmap';
import FilterPanel from '../../components/controls/FilterPanel';
import TimeRangeSelector from '../../components/controls/TimeRangeSelector';
import PerformanceMonitor from '../../components/ui/PerformanceMonitor';
import DataTable from '../../components/ui/DataTable';

export default function DashboardClient() {
	const { data, zoom, pan, configs } = useDashboardData();
	return (
		<>
			<h1 style={{ margin: 0, fontSize: 20, marginBottom: 12 }}>Performance-Critical Data Visualization Dashboard</h1>
			<div className="grid">
				<div className="panel">
					<h3>Line Chart</h3>
					<LineChart data={data} color={configs[0].color} zoom={zoom} pan={pan} />
				</div>
				<div className="panel">
					<h3>Bar Chart</h3>
					<BarChart data={data} color={configs[1].color} zoom={zoom} pan={pan} />
				</div>
				<div className="panel">
					<h3>Scatter Plot</h3>
					<ScatterPlot data={data} color={configs[2].color} zoom={zoom} pan={pan} />
				</div>
				<div className="panel">
					<h3>Heatmap</h3>
					<Heatmap data={data} zoom={zoom} pan={pan} />
				</div>
			</div>
			<div className="spacer" />
			<div className="grid">
				<FilterPanel />
				<TimeRangeSelector />
			</div>
			<div className="spacer" />
			<div className="grid">
				<PerformanceMonitor />
				<DataTable data={data} />
			</div>
		</>
	);
}



