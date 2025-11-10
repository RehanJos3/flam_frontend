import { DataPoint } from './types';

export function setupCanvas(canvas: HTMLCanvasElement) {
	const dpr = Math.max(1, window.devicePixelRatio || 1);
	const rect = canvas.getBoundingClientRect();
	canvas.width = Math.floor(rect.width * dpr);
	canvas.height = Math.floor(rect.height * dpr);
	const ctx = canvas.getContext('2d')!;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	return { ctx, width: rect.width, height: rect.height };
}

export function clearCanvas(ctx: CanvasRenderingContext2D, width: number, height: number) {
	ctx.fillStyle = '#0b0f17';
	ctx.fillRect(0, 0, width, height);
}

export function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
	ctx.strokeStyle = '#1f2937';
	ctx.lineWidth = 1;
	ctx.beginPath();
	for (let x = 0; x < width; x += 64) {
		ctx.moveTo(x + 0.5, 0);
		ctx.lineTo(x + 0.5, height);
	}
	for (let y = 0; y < height; y += 48) {
		ctx.moveTo(0, y + 0.5);
		ctx.lineTo(width, y + 0.5);
	}
	ctx.stroke();
}

export function drawLineSeries(ctx: CanvasRenderingContext2D, data: DataPoint[], color: string, width: number, height: number, zoom: number, pan: number) {
	if (data.length < 2) return;
	const minT = data[0].timestamp;
	const maxT = data[data.length - 1].timestamp;
	const span = maxT - minT || 1;
	const scaleX = (t: number) => ((t - minT) / span) * width * zoom + pan;
	const scaleY = (v: number) => height - (v / 100) * height;
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	ctx.beginPath();
	let started = false;
	for (let i = 0; i < data.length; i++) {
		const p = data[i];
		const x = scaleX(p.timestamp);
		const y = scaleY(p.value);
		if (!started) {
			ctx.moveTo(x, y);
			started = true;
		} else {
			ctx.lineTo(x, y);
		}
	}
	ctx.stroke();
}

export function drawBars(ctx: CanvasRenderingContext2D, data: DataPoint[], color: string, width: number, height: number, zoom: number, pan: number) {
	if (data.length === 0) return;
	const minT = data[0].timestamp;
	const maxT = data[data.length - 1].timestamp;
	const span = maxT - minT || 1;
	const scaleX = (t: number) => ((t - minT) / span) * width * zoom + pan;
	const scaleY = (v: number) => height - (v / 100) * height;
	const barW = Math.max(1, (width / data.length) * zoom);
	ctx.fillStyle = color;
	for (let i = 0; i < data.length; i++) {
		const p = data[i];
		const x = scaleX(p.timestamp) - barW / 2;
		const y = scaleY(p.value);
		ctx.fillRect(x, y, barW, height - y);
	}
}

export function drawScatter(ctx: CanvasRenderingContext2D, data: DataPoint[], color: string, width: number, height: number, zoom: number, pan: number) {
	if (data.length === 0) return;
	const minT = data[0].timestamp;
	const maxT = data[data.length - 1].timestamp;
	const span = maxT - minT || 1;
	const scaleX = (t: number) => ((t - minT) / span) * width * zoom + pan;
	const scaleY = (v: number) => height - (v / 100) * height;
	ctx.fillStyle = color;
	for (let i = 0; i < data.length; i++) {
		const p = data[i];
		const x = scaleX(p.timestamp);
		const y = scaleY(p.value);
		ctx.beginPath();
		ctx.arc(x, y, 2, 0, Math.PI * 2);
		ctx.fill();
	}
}

export function drawHeatmap(ctx: CanvasRenderingContext2D, data: DataPoint[], width: number, height: number, zoom: number, pan: number) {
	if (data.length === 0) return;
	const minT = data[0].timestamp;
	const maxT = data[data.length - 1].timestamp;
	const span = maxT - minT || 1;
	const scaleX = (t: number) => ((t - minT) / span) * width * zoom + pan;
	const scaleY = (v: number) => height - (v / 100) * height;
	const cellW = Math.max(1, (width / Math.sqrt(data.length)) * 0.75);
	const cellH = Math.max(1, (height / 50));
	for (let i = 0; i < data.length; i++) {
		const p = data[i];
		const x = scaleX(p.timestamp);
		const y = scaleY(p.value);
		const intensity = p.value / 100;
		const r = Math.floor(34 + 190 * intensity);
		const g = Math.floor(211 - 120 * intensity);
		const b = Math.floor(238 - 200 * intensity);
		ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
		ctx.fillRect(x - cellW / 2, y - cellH / 2, cellW, cellH);
	}
}



