**Goal:** Zero to dangerous on a greenfield app, fast.

---

## Context

- **Starting point:** Built something small, unconfident
- **Timeline:** Weeks (urgent)
- **Work:** Greenfield app — you're building it
- **Advantage:** React ~8/10 means component thinking is already there. The gap is Angular's machinery.

---

## Where the Learning Cost Actually Lives

- **Dependency Injection** — Central to everything, not peripheral like React context. Learn it early.
- **RxJS** — You'll hit Observables at the HTTP layer and router even with signals. Need a working mental model, not mastery.
- **Standalone vs NgModules** — Angular is mid-migration. Pick standalone from day one and stay consistent.
- **First-party opinions** — Forms, routing, HTTP client are all built-in and opinionated. Less choosing, more learning *the Angular way*.
- **Strict TypeScript** — Angular assumes strict mode. Not a problem given your background, but it's tighter than typical React projects.

---

## React → Angular Mental Model Map

| React | Angular |
|---|---|
| `useState` | `signal()` |
| `useEffect` | `effect()` or lifecycle hooks |
| `useContext` / prop drilling | DI + `inject()` |
| `useMemo` | `computed()` |
| Custom hook | Service |
| `fetch` + TanStack Query | `HttpClient` + `async` pipe (or `toSignal()`) |
| Dynamic imports / lazy routes | `loadComponent` / `loadChildren` in router |

---

## Phase 1 — Mental Model (Days 1–2)

Don't write code yet. Read to understand *why* Angular is shaped this way.

- [x] Read the [Angular overview](https://angular.dev/overview)
- [x] Read the [[Angular Overview — Debrief Questions]] *before* the overview to prime your reading
- [x] Answer the debrief questions without looking after

**Key question to answer for yourself:** How does data flow in Angular vs React? Props down/events up still holds, but DI changes the service layer entirely.

**Concepts to understand:**
- Components
- Templates
- Dependency Injection
- Services
- Change detection model

---

## Phase 2 — Standalone Component Fundamentals (Days 3–5)

Build small, throwaway things. Not the real app yet.
[[Open Library Frontend]]

- [ ] Standalone components: `@Component`, `imports: []`, no NgModules
- [ ] Template syntax: `@if`, `@for`, `[binding]`, `(event)`, `[(ngModel)]`
- [ ] `@Input()` / `@Output()` — props/callbacks analog
- [ ] A service injected via `inject()` (modern functional form, not constructor injection)

---

## Phase 3 — The Real Angular Stack (Days 6–10)

Build a small but complete vertical slice of your actual app.

- [ ] **Routing** — `provideRouter`, lazy-loaded routes, `RouterLink`, `ActivatedRoute` for params
- [ ] **HTTP** — `HttpClient` via `provideHttpClient`, Observable-returning methods, `async` pipe in templates
- [ ] **Reactive Forms** — `FormGroup`, `FormControl`, `Validators`. Ignore template-driven forms.
- [ ] **Signals** — `signal()`, `computed()`, `effect()`. Use for local component state.

---

## Phase 4 — Ship It (Week 3+)

Work on the real app. Walls you'll hit:

- Change detection edge cases → learn `OnPush`, use it
- RxJS confusion → keep a cheat sheet: `switchMap`, `takeUntilDestroyed`, `combineLatest`
- DI scope confusion → component-level vs root-level (cleaner with standalone, but it'll still bite you)

---

## Concrete First Move

1. Do Angular's official [interactive tutorial](https://angular.dev/tutorials/learn-angular) in one sitting — in-browser, no setup
2. Scaffold the real project: `ng new --standalone`
3. **Week 1 goal:** Real app routing skeleton + one data-fetching component working end to end