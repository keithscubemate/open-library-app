# RxJS Pipe Operator Ordering

Operators execute top to bottom — each receives what the previous emitted.

## Recommended Order

```typescript
this.http.get<T>(url)
  .pipe(
    takeUntilDestroyed(this.destroyRef), // 1. cancel first — no point running anything if destroyed
    retry({ count: 2, delay: 1000 }),    // 2. retry on error before any transformation
    tap(res => this.cache.set(id, res)), // 3. side effects on the raw response
    switchMap(res => nextRequest(res)),  // 4. chain dependent requests
    map(res => transform(res)),          // 5. transform the shape
    finalize(() => this.loading.set(false)) // 6. always runs last, success or error
  )
```

## Operator Reference

| Operator | What it does |
|---|---|
| `takeUntilDestroyed` | Cancels the subscription when the component is destroyed |
| `retry` | Re-subscribes N times on error, with optional delay |
| `tap` | Side effect (logging, setting signals, caching) — passes value through unchanged |
| `switchMap` | Replaces the stream with a new Observable (dependent request) |
| `map` | Transforms the emitted value into a new shape |
| `finalize` | Runs a callback on complete *or* error — like `finally` |

## Key Gotchas

- `finalize` after `switchMap` waits for the whole chain — before `switchMap` fires when only the first request completes
- `takeUntilDestroyed` before everything means the whole pipe tears down cleanly
- `retry` before `tap`/`map` means it retries on the raw HTTP layer, not after transformation
