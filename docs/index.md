# NERV design system

Authoring source of truth is this `docs/` tree. The published site is [GitHub Pages](https://texarkanine.github.io/nervouscsstem/).

## Visual language

Catalog of the Evangelion FUI, from stills.

- [Design language](design-language.md)
- [Atomic elements](atomic-elements.md)
- [Radar](radar.md)

## Using

Live examples on the page: preview, then spec, then code. Released pages load CSS and JS from the npm CDN. A local serve or build uses `dist/` and errors if those files are missing.

- [CSS](css.md) — tokens and type, CSS only
- [Panels](components/panels.md) — CSS-only component islands
- [Bar meters](components/bar-meters.md) — scoped `NERV.initBarMeters`

This is the pattern, not a page for every component.

## Service manual

[Repo notes that must not be forgotten](service-manual.md)
