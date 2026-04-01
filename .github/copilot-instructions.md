# Copilot Instructions

## Project Context

This is a **learning project** for going from React to Angular, following the plan in `docs/Angular Learning Plan.md`. The app is a frontend for the [Open Library API](https://openlibrary.org). Suggestions should favor Angular-idiomatic patterns over familiar React equivalents, and prefer teaching the right way to do things over shortcuts.

## Commands

```bash
ng serve          # dev server at http://localhost:4200
ng build          # production build
ng test           # run all tests (Jasmine/Karma)
ng test --include="**/openlibrary.spec.ts"  # run a single test file
```

No lint command is configured.

## Architecture

```
src/app/
├── pages/            # route-level components (search, books, authors)
├── components/       # reusable components (book-card)
├── services/         # openlibrary.ts — all HTTP calls live here
├── app.config.ts     # DI bootstrap (provideHttpClient, provideRouter)
├── app.routes.ts     # route definitions
└── app.ts            # root component
```

**Routes:**
- `/` → `Search` (eager)
- `/books/:id` → `Books` (lazy via `loadComponent`)
- `/authors/:id` → `Authors` (lazy via `loadComponent`)

**Data flow:** Reactive form → `OpenLibrary` service → Open Library API → component display.

## Key Conventions

**Standalone-only** — no NgModules. Every component declares its own `imports` array.

**`inject()` over constructor injection:**
```typescript
// Do this
private http = inject(HttpClient);
// Not this
constructor(private http: HttpClient) {}
```

**Service naming** — the HTTP service is `OpenLibrary`, not `OpenLibraryService`. Domain-named, not role-named.

**Types live next to usage** — API response interfaces are defined in `services/openlibrary.ts` alongside the methods that use them.

**Plain CSS** — no SCSS, no Tailwind, no Angular Material. One `.css` file per component, co-located with `.ts`/`.html`/`.spec.ts`.

**No barrel files** — import directly from the file path (e.g., `'./pages/search/search'`).

**Selector prefix:** `app-` (e.g., `app-book-card`).

## API Notes

- **Base URL:** `https://openlibrary.org` (hardcoded in service — no environment files yet)
- **Rate limit:** 1 req/sec unauthenticated; 3/sec with a `User-Agent` header on `HttpClient` calls
- **Cover images:** `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg` (use `cover_i` from search results)
- **Author photos:** `https://covers.openlibrary.org/a/id/{photo_id}-M.jpg`
- **ID format:** Work and author IDs come back as `/works/OL27258W` and `/authors/OL23919A` — strip the prefix before passing to routes

## Planned but Not Yet Implemented

Per `docs/Open Library Frontend.md`, the following are intentional next steps, not oversights:

- `OnPush` change detection on all components
- Error state handling surfaced in the UI
- `takeUntilDestroyed()` on subscriptions
- `async` pipe usage in templates (instead of manual `.subscribe()` + assignment)
- At least one `computed()` signal
- A `/subjects/:subject` route as a fourth route
