# Angular Overview — Debrief Questions

**Read these before reading the overview.** They prime your attention so you're reading with intent, not passively absorbing.

After the session, answer each question without looking. Anything that feels slippery = re-read that section before moving on.

---

## Component Model

- What is a standalone component, and what does the `imports` array on `@Component` do?

A component is a way to modularize your code and UI into parts that can be reused, tested, and all the other good software stuff. These components are put together to make a webpage. `imports` allows you to insert components into others.

- How does Angular know what to render — what's the relationship between a component's selector, template, and where it appears in the DOM?

Each component defines a template and a selector. As angular is rendering your app, components render there template as html and check their imports for components matching their selectors--this props down the component tree. It appears in the dom where it is in the template; e.g. the root component gets rendered in some:

```html
<html>
<head>
	<!-- ... -->
</head>
<body>
	<!-- ... -->
	<app-root></app-root>
</body>
</html>
```

All children components render recursively.

- What's the difference between `[property]`, `(event)`, and `[(ngModel)]` syntactically and semantically?

These are all ways to bind data in angular:
- `[property]`: input binding data -> component
 - `(event)` : output binding component -> data/event
 - `[(ngModel)]` : 2-way binding data <-> component

---

## Change Detection

- How does Angular know when to re-render a component? What triggers it?

By default, Angular checks every component in the tree to try and detect a change. This runs after any and all async events (clicks, HTTP response, timers)

- What is `OnPush` and why would you use it?

OnPush opts components out of the aforementioned sweep and only rechecks itself after an @Input dep or a signal changes.

---

## Dependency Injection

- What is a service, and why does Angular use DI instead of just importing a class directly?

Component for non ui code. DI implies lifetime controls as well. While you could do the same thing by hand in raw TS--the DI prescribes.

- What does `providedIn: 'root'` mean, and what are the implications for instance lifetime?

This means it is available for all components in the app for the lifetime of the application.

- What's the difference between providing a service at the root level vs. the component level?

to scope to a component don't use `providedIn` and just use `providers` in component.

Scoping
- root -> all components get same instance -> react root provider for one shopping cart
- component -> all components get one instance -> react nested provider for session based shopping cart

---

## Reactivity

- What is a `signal`, and how is it different from a plain class property?

It doesn't rely on angulars compiler or change detector. You "tell" it when to update with `sig.set()`.

- What does `computed()` give you that a getter doesn't?

It hooks into the same machinery that signal does and keeps the property in step with the signal.

- When does `effect()` run, and what should you be cautious about putting in one?

it is `$effect()`

---

## The Bigger Picture

- What problem does Angular's opinionated structure solve that React deliberately leaves open?

It prescribes standard and convention. React let's your make your app as complicated or as simple as you need it to be. This can allow for short term or early game gains in speed, but this can also hamstring you when you hit critical mass. Angular's prescriptiveness ensures you steady albeit slow progress.

- What is the Angular CLI's role — what does it own that you don't have to think about?

All the mess that happens in non-standard `package.json`. While it suffers from double definition problems. `ng <whatever>` covers _and standardizes_ so much of what `npm run <whatever>` tries to.

---

## After Answering

- Confident on all → mental model is solid, move to [[Angular Learning Plan]] Phase 2
- Slippery on any → re-read that section specifically, then re-answer