export function createFpsMeter(sampleSize = 60) {
	let last = performance.now();
	const frames: number[] = [];
	let fps = 0;

	return {
		tick() {
			const now = performance.now();
			const delta = now - last;
			last = now;
			const frameFps = 1000 / (delta || 1);
			frames.push(frameFps);
			if (frames.length > sampleSize) frames.shift();
			fps = Math.round(frames.reduce((a, b) => a + b, 0) / frames.length);
			return fps;
		},
		get() {
			return fps;
		}
	};
}

export function getApproxMemoryMB(): number | undefined {
	// Chrome only
	// @ts-ignore
	if (performance && performance.memory) {
		// @ts-ignore
		return Math.round((performance.memory.usedJSHeapSize / 1024 / 1024) * 10) / 10;
	}
	return undefined;
}



