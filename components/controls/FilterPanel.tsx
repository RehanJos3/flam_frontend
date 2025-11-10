'use client';
import { useDashboardData } from '../providers/DataProvider';

export default function FilterPanel() {
	const { filterCategory, setFilterCategory, zoom, setZoom, pan, setPan } = useDashboardData();
	return (
		<div className="panel">
			<h3>Controls</h3>
			<div className="toolbar">
				<label>
					Category:
					<select value={filterCategory} onChange={e => setFilterCategory(e.target.value as any)} style={{ marginLeft: 8 }}>
						<option value="all">All</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
						<option value="D">D</option>
					</select>
				</label>
				<label>
					Zoom:
					<input type="range" min={0.25} max={8} step={0.05} value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} style={{ marginLeft: 8, width: 160 }} />
					<span style={{ marginLeft: 8 }}>{zoom.toFixed(2)}x</span>
				</label>
				<label>
					Pan:
					<input type="range" min={-5000} max={5000} step={10} value={pan} onChange={e => setPan(parseFloat(e.target.value))} style={{ marginLeft: 8, width: 200 }} />
					<span style={{ marginLeft: 8 }}>{pan.toFixed(0)}px</span>
				</label>
			</div>
		</div>
	);
}



