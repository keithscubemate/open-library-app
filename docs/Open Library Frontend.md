# Angular Phase 2 Project — Open Library Frontend

A toy frontend for the [Open Library API](https://openlibrary.org/developers/api). No auth, no key, rich enough data to hit every Angular concept that matters.

**API base URL:** `https://openlibrary.org`
**Docs:** https://openlibrary.org/developers/api

---

## Useful Endpoints

| What | URL |
|---|---|
| Search books | `GET /search.json?q={query}&page={n}` |
| Book detail | `GET /works/{id}.json` |
| Author detail | `GET /authors/{id}.json` |
| Books by subject | `GET /subjects/{subject}.json` |
| Cover image | `https://covers.openlibrary.org/b/id/{cover_id}-M.jpg` |
| Author photo | `https://covers.openlibrary.org/a/id/{photo_id}-M.jpg` |

---

## App Structure

Three routes, one shared service:

```
/                  → Search page (search input + results grid)
/books/:id         → Book detail page
/authors/:id       → Author detail page
```

---

## Implementation Plan

### Step 1 — Scaffold & Routing
- `ng new open-library-app --standalone --routing`
- Generate three components: `SearchComponent`, `BookDetailComponent`, `AuthorDetailComponent`
- Wire up routes in `app.routes.ts` with `provideRouter`
- Add `RouterLink` and `RouterOutlet` to the shell
- **Lazy load** `BookDetailComponent` and `AuthorDetailComponent` with `loadComponent`

**You're done when:** Navigating to `/`, `/books/foo`, `/authors/bar` renders the right component.

### Step 2 — HTTP Service
- Generate `OpenLibraryService` — no `providedIn` arg, provide it at root in `app.config.ts`
- Add `provideHttpClient()` to app config
- Implement methods:
  - `search(query: string, page: number): Observable<SearchResponse>`
  - `getBook(id: string): Observable<Book>`
  - `getAuthor(id: string): Observable<Author>`
- Define TypeScript interfaces for the response shapes

**You're done when:** You can call `service.search('dune')` from a component and log results.

### Step 3 — Search Page
- Reactive form with a single search input + submit (`FormControl`, `Validators.required`)
- On submit: call service, display results with `@for`, cover images from the covers URL
- Loading state via a `signal<boolean>` 
- Pagination: previous/next buttons that update a `page` signal and re-fetch
- Each result links to `/books/:id`

**You're done when:** You can search, see a grid of results with covers, and paginate.

### Step 4 — Book Detail Page
- Read `:id` from route with `inject(ActivatedRoute)`
- Fetch book on init, display title, description, subjects, cover
- Link author names to `/authors/:id`
- Handle missing cover gracefully (fallback placeholder)

**You're done when:** Clicking a book from search navigates to a detail page with real data.

### Step 5 — Author Detail Page
- Same pattern as book detail
- Display author name, bio, photo
- List of works (from `/authors/:id/works.json`) linking back to book detail

**You're done when:** The full loop works — search → book → author → back.

### Step 6 — Polish (if time)
- `OnPush` change detection on all components
- Error state handling (API down, 404) surfaced in the UI
- Subject browsing: a `/subjects/:subject` route as a bonus fourth route
- `takeUntilDestroyed()` on all subscriptions

---

## Markers of Success

### Routing
- [ ] Three routes render the correct component
- [ ] Lazy loading confirmed in network tab (separate chunk per route)
- [ ] `RouterLink` navigation works without full page reload
- [ ] Route params extracted correctly with `ActivatedRoute`

### HTTP & Services
- [ ] `HttpClient` calls made from a service, not directly from components
- [ ] Response shapes modeled as TypeScript interfaces
- [ ] `async` pipe used in at least one template (no manual `.subscribe()` + assignment)
- [ ] Loading and error states handled explicitly

### Forms
- [ ] Search input built with `ReactiveFormsModule` (`FormControl` / `FormGroup`)
- [ ] Submit disabled or guarded when input is invalid
- [ ] Form value drives the HTTP call, not a raw DOM read

### Signals & Reactivity
- [ ] Local UI state (loading, page number) modeled as `signal()`
- [ ] At least one `computed()` derived from a signal
- [ ] No raw class properties for state that changes

### DI & Architecture
- [ ] All HTTP logic lives in `OpenLibraryService`, not in components
- [ ] Service injected with `inject()`, not constructor injection
- [ ] Components are thin: they call the service and bind the result

### The Gut Check
- [ ] Could you add a fourth route (`/subjects/:subject`) in under 20 minutes?
- [ ] Could you add a second service without touching existing code?
- [ ] Does the app feel like *Angular*, not like React patterns stapled onto Angular syntax?

---

## Notes

- The search API returns `cover_i` (a cover ID integer) on each work doc. Cover URL is `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`
- Work IDs come back as `/works/OL27258W` — strip the `/works/` prefix before passing to the detail route
- Author IDs come back as `/authors/OL23919A` — same deal
- The API is rate-limited to 1 req/sec unauthenticated. Add a `User-Agent` header to the `HttpClient` calls to get 3/sec