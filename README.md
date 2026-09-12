# nervouscsstem

NERV Design System — a pure-CSS design system (with a small optional JS helper) inspired by Neon Genesis Evangelion operational consoles.

License: [AGPL-3.0](LICENSE).

## Install

```bash
npm i nervouscsstem
```

The published files are `dist/nerv.css` and `dist/nerv.js`.

## CDN

Replace `<version>` with a published tag (for example `0.1.0`):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nervouscsstem@<version>/dist/nerv.css">
<script src="https://cdn.jsdelivr.net/npm/nervouscsstem@<version>/dist/nerv.js"></script>
```

Those URLs are [jsDelivr’s npm CDN](https://www.jsdelivr.com/documentation#id-npm). This package does not run its own file host.

## Documentation

Authoring source of truth is [`docs/`](docs/). Do not treat this README as the design-system spec. Operator notes that must not be forgotten (Git LFS vs skill install, and similar) live in [`docs/service-manual.md`](docs/service-manual.md).

## Releases

GitHub Releases (and the matching npm version) are created by merging the [release-please](https://github.com/googleapis/release-please) pull request on `main`. Do not hand-tag.
