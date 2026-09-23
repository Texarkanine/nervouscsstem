> [!WARNING]  
> 🚧 This is a half-baked project under active development at major version 0. It's possible nothing works, or that none of it works well. Accept the risks or come back later!

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

## Offline bundle

`nerv.css` loads its fonts from Google Fonts and jsDelivr. For a machine that cannot reach them, each [GitHub Release](https://github.com/Texarkanine/nervouscsstem/releases) has `nervouscsstem-offline.zip` ([latest](https://github.com/Texarkanine/nervouscsstem/releases/latest/download/nervouscsstem-offline.zip)). It holds `nerv.css` rewritten to load bundled fonts from `fonts/`, `nerv.js`, and the font files. Unzip it next to your page:

```html
<link rel="stylesheet" href="nervouscsstem-offline/nerv.css">
<script src="nervouscsstem-offline/nerv.js"></script>
```

The CSS and JS are AGPL-3.0; the fonts stay under the SIL Open Font License 1.1. The zip carries both licenses, every font's copyright notice, and a `manifest.json` with the font package versions and file hashes. To build it from a checkout: `npm ci && npm run build:offline` (writes `dist/nervouscsstem-offline.zip`).

## Agent skill

```bash
npx skills add Texarkanine/nervouscsstem
```

That installs a placeholder skill. It does not carry a docs tree. Usage catalog, stills, and live examples live on the documentation site.

## Documentation

The published site is <https://texarkanine.github.io/nervouscsstem/>. Catalog pages carry live examples (preview, spec, then the same HTML in a copyable fence).

Authoring source of truth is [`docs/`](docs/). Do not treat this README as the design-system spec. Operator notes that must not be forgotten (Git LFS vs skill install, and similar) live in [`docs/service-manual.md`](docs/service-manual.md).

## Releases

GitHub Releases (and the matching npm version) are created by merging the [release-please](https://github.com/googleapis/release-please) pull request on `main`. Do not hand-tag.
