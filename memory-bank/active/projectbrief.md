# Project Brief: Offline font-and-JS bundle

Source: [GitHub issue #7](https://github.com/Texarkanine/nervouscsstem/issues/7) "Offline font-and-JS bundle". The issue body is the authoritative spec, including its constraints and out-of-scope list.

## User Story

As a self-hoster applying this design system on a machine that cannot reach Google Fonts or jsDelivr, I want a downloadable bundle of `nerv.css`, `nerv.js`, and the fonts those files load, so a page can render the NERV look with no extra network after the bundle is on disk.

## Approved Restatement

Intent clarification was approved by the human operator (via the orchestrating agent) before this worker started:

> Build the optional offline artifact exactly as issue #7 describes: a zip holding `nerv.css` rewritten to local `@font-face` URLs, `nerv.js`, the six OFL families' font files that the CSS loads today, the AGPL `LICENSE`, each family's OFL text and copyright notice, and a provenance manifest (package + version, file hash, upstream OFL URL, copyright, generator version). The npm tarball is unchanged and CDN loading stays the default. Tests cover what a consumer would see break: no remote URLs left in the bundled CSS, every `url()` resolves to a file inside the zip, manifest hashes match the bytes, and license/notice files are present.
>
> Operator decisions:
> - Delivery: an npm script builds the zip; `.github/workflows/release-please.yaml` attaches it to the GitHub Release next to the existing `nerv.css` / `nerv.js` assets.
> - Font bytes come from pinned `@fontsource/*` devDependencies (npm-native, ships OFL files). Not opaque gstatic hashes.

## Requirements

- Zip contains: rewritten `nerv.css` (local `@font-face` URLs), `nerv.js`, the font files the CSS loads today (six OFL-1.1 families), AGPL `LICENSE`, each family's OFL text and copyright notice, provenance manifest.
- Manifest pins each font package + version, per-file hash, upstream OFL URL, copyright notice, generator version.
- Fonts stay OFL-1.1; CSS/JS stay AGPL-3.0-only. No relicensing. Reserved Font Names (`Plex`, `DSEG`) kept unmodified.
- npm tarball unchanged (`test/publish-contract.test.mjs`); zip must not leak into `npm pack`.
- CDN loading stays the default in `dist/nerv.css`.
- `.nerv-` prefix, no canvas/WebGL/image files, `prefers-reduced-motion` / `prefers-contrast` unchanged.
- Reproducible zip creation that does not assume a `zip` CLI.

## Out of Scope

- Vendoring fonts into the npm tarball.
- Loading Noto Serif JP or other CSS fallbacks with no `@font-face` `src` today.
- TDD of the release workflow YAML (policy/wiring, verified by review).
