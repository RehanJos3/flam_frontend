## Performance Dashboard (Next.js 14 + TypeScript)

High-performance real-time dashboard rendering 10k+ points at 60 FPS using a Canvas + React hybrid. No chart libraries used.

### Setup

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000/dashboard`.

### Features

- Multiple charts: Line, Bar, Scatter, Heatmap (Canvas-rendered)
- Real-time updates (simulated 100ms)
- Interactive controls: category filter, zoom, pan, time range selection
- Data aggregation via sliding window (`1m`, `5m`, `1h`)
- Virtualized data table for large datasets
- Responsive layout (desktop/tablet/mobile)
- Performance monitor: FPS and memory usage

### Performance Testing

- Open Chrome DevTools performance profiler to verify FPS stability.
- Increase zoom/pan and change time ranges to stress the renderer.
- The app uses a sliding time window to prevent memory growth (>10k points default).

### Next.js Optimizations

- App Router with Server Component for initial dataset (`app/dashboard/page.tsx`)
- Client Components for interactive charts and controls
- Route Handler under `app/api/data/route.ts` for mock API usage
- Strict mode enabled; TypeScript everywhere for maintainability

### Browser Compatibility

- Optimized for latest Chromium-based browsers (for `performance.memory` readout).
- Works on Firefox and Safari, with `Memory: N/A` displayed if unsupported.

### Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # start production server
npm run lint    # lint
```

### Screenshots

- Include screenshots of the dashboard with all charts, the performance monitor showing 60 FPS, and the data table. (Add to `public/` and embed here if needed.)



