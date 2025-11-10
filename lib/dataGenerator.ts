import { DataPoint } from './types';

const categories = ['A', 'B', 'C', 'D'];

export function generatePoint(prev: DataPoint | undefined, t: number): DataPoint {
	const base = prev ? prev.value : 50 + Math.random() * 10;
	const drift = (Math.random() - 0.5) * 2.5;
	const value = Math.max(0, Math.min(100, base + drift));
	return {
		timestamp: t,
		value,
		category: categories[Math.floor(Math.random() * categories.length)]
	};
}

export function generateBatch(startTs: number, count: number, stepMs: number, seed?: DataPoint): DataPoint[] {
	const out: DataPoint[] = [];
	let prev = seed;
	for (let i = 0; i < count; i++) {
		const t = startTs + i * stepMs;
		const p = generatePoint(prev, t);
		out.push(p);
		prev = p;
	}
	return out;
}

export async function generateInitialDataset(totalPoints = 10000, stepMs = 100): Promise<DataPoint[]> {
	const now = Date.now() - totalPoints * stepMs;
	return generateBatch(now, totalPoints, stepMs);
}



