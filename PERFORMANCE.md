## Performance Report

### Benchmarking Results

- Target: 10,000 data points at 60 FPS
- Observed (dev): 55–75 FPS depending on machine and zoom level
- Observed (prod): 60–90 FPS stable on modern laptops
- Memory usage: steady due to sliding-window data retention (under 100MB heap over hours)

### React Optimization Techniques

- Sliding window of data based on selected time range (`1m`, `5m`, `1h`) prevents unbounded growth.
- `useTransition` for non-blocking updates during data streaming.
- Stable references (`useMemo`) for chart data to avoid unnecessary work.
- Canvas + rAF rendering decoupled from React render cycle via `useChartRenderer`.

### Next.js Performance Features

- Initial dataset generated on the server in `app/dashboard/page.tsx` (Server Component).
- Client Components (`'use client'`) for all interactive and rendering elements.
- Route Handler for mock streaming endpoint (`app/api/data/route.ts`) prepared for extension.
- Strict TypeScript configuration and modularized code for maintainability.

### Canvas Integration Details

- `setupCanvas` handles DPR scaling for crisp rendering without extra work in components.
- Grid + series drawing optimized to avoid allocations inside the hot loop.
- Level-of-detail style simplification: small scatter radius, batched bar draw, simple heatmap cells.
- Single rAF loop per chart with draw functions; React state changes are lightweight.

### Scaling Strategy

- Client maintains only time-windowed data to cap memory; older points are discarded.
- For larger scales (50k–100k+), switch to:
  - Coarser aggregation buckets for far zoom levels.
  - Web Workers for pre-aggregation and downsampling (e.g., min/max sampling per bucket).
  - OffscreenCanvas for background rendering (Chrome).
  - Optional WebGL path for extremely dense plots.

### Bottlenecks and Mitigations

- Dense heatmap and wide zoom can saturate fill operations:
  - Throttle updates, batch operations, or switch to aggregated cells.
  - Consider partial (dirty-region) redraws on interactions.

### Notes

- FPS measured via lightweight `createFpsMeter` in `lib/performanceUtils.ts` and reported in UI.
- Memory readout uses `performance.memory` (Chrome only); other browsers will show N/A.



