# NERV design system

Authoring source of truth is this `docs/` tree. The published site is [GitHub Pages](https://texarkanine.github.io/nervouscsstem/).

## Visual language

Catalog of the Evangelion FUI, from stills.

- [Visual language](visual-language/index.md) — design language, atomic elements, radar timing

## CSS

Tokens, type, glow, and motion classes. CSS only.

- [CSS](css/index.md) — tokens, type, glow
- [Effects](css/effects.md) — scanlines, flicker, blink, glitch

## JavaScript

- [JavaScript](js/index.md) — scoped `NERV.init*` and `setState`. Do not call `NERV.init()` from a docs page.

## Components

Live examples: name, still when one exists, island, then spec plus HTML.

- [Components](components/index.md)

Released pages load CSS and JS from the npm CDN. A local serve or build uses `dist/` and errors if those files are missing.

## Service manual

[Repo notes that must not be forgotten](service-manual.md)
