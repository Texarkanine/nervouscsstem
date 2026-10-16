---
task_id: offline-bundle
date: 2026-09-23
complexity_level: 3
---

# Reflection: Offline font-and-JS bundle

## Summary

Shipped `npm run build:offline`, which writes a byte-reproducible `nervouscsstem-offline.zip`. It holds `nerv.css` with local font URLs, `nerv.js`, the 22 font files the CSS loads (from exact-pinned fontsource packages), their OFL texts and upstream copyright notices, the AGPL LICENSE, and a hash manifest. The release workflow attaches it and PR CI builds it. QA passed; one QA advisory became a code fix.

## Requirements vs Outcome

Every requirement in the brief and issue #7 is delivered: rewritten CSS, JS, fonts the CSS loads today, both licenses, per-family notices, provenance manifest (package, version, sha256, upstream OFL URL, copyright, generator version), npm tarball unchanged, CDN default unchanged, no `zip` CLI.

Additions beyond the brief, each small and deliberate:

- Generated `README.md` in the zip, needed because fontsource's Plex LICENSE drops `Reserved Font Name "Plex"`; the README carries the upstream copyright lines.
- PR docs workflow builds the bundle (preflight advisory).
- The generator refuses Google Fonts version drift (QA advisory).

Nothing was descoped. `specimen.html` (preflight idea) was declined; the offline render check stays a manual operator step.

## Plan Accuracy

The plan's sequence and file list held exactly; no step was reordered or split. That is mostly because the fontsource probe ran before planning: byte-matching all 22 gstatic URLs and checking range equality turned what looked like design questions (Shippori subsetting, Antonio's shared URL) into facts before any plan was written.

Two plan claims were wrong, both caught by review rather than build:

- "Bundle builds before `npm publish`, so a failure cannot leave a half-published release." In fact release-please creates the GitHub Release before `publish-npm` runs (preflight).
- "When the CSS changes a font URL, the build fails." A same-range Google version bump passed silently (QA).

Challenges that materialized: fontsource `exports` hiding `files/*` (handled as planned); fflate's local-time DOS timestamps, which the PoC caught before build. Nothing surprised the build itself.

## Creative Phase Review

- **Zip writer (`fflate`)**: held up with no friction. The PoC in technology validation found the one real trap (a UTC `mtime` throws in UTC-5 and varies by timezone) before any production code existed.
- **Font resolution (derive by `unicode-range` equality)**: held up and was the right call. The whole mapping is ~40 lines plus six readable family rows, with glyph coverage correct by construction. Its blind spot was that range equality says nothing about *which upstream version* of the glyphs is shipped, which is exactly what QA found. The fix fit the design cleanly: fontsource's `metadata.json` already records the Google version.

## Build & QA Observations

Build was clean: every test went red for the right reason, then green on the first implementation pass. The tarball-exclusion test could never be red against a correct `files` whitelist, so it was proven non-vacuous by mutation instead (`files: ["dist"]` → fails naming the zip).

QA found no defects in behavior. Its one substantive finding was a false safety claim in the maintainer docs, which led to a real hardening of the generator. During QA the service-manual paragraph was rewritten in the working tree even though QA reported "no implementation edits"; the text was accurate after the fix, so it was kept, but the attribution gap is worth noting.

## Cross-Phase Analysis

- Pre-plan probe → plan and build: measuring fontsource against the live CSS up front removed the open questions and let the creative docs start from facts. This is why the build had no surprises.
- Technology-validation PoC → build: finding the fflate timezone trap in a 10-line PoC kept it from becoming a flaky determinism test later.
- Creative decision → QA finding: choosing range equality as the correctness criterion created the version-drift blind spot. Preflight didn't catch it because the plan stated the (wrong) failure guarantee as fact; QA caught it by reading the implementation against the docs claim.
- Preflight → build: the quote-aware `url()` advisory prevented a real bug; SVG data URIs in `nerv.css` contain `)` and `http://`, which a naive regex would have misread as remote fonts.

## Insights

### Technical

- fontsource `metadata.json` `version` is the upstream Google Fonts version (`v13`, `v22`), comparable to the `/vNN/` segment of a gstatic URL. It is the cheap way to prove a self-hosted font is the same release the CDN serves.
- Google serves variable fonts at one URL for every declared weight. Antonio's shared 400/700 URL looked like a bug and is correct; the matching package is `@fontsource-variable/*`.
- gstatic and fontsource WOFF2 bytes differ for the same upstream version (different encoders), so byte equality is the wrong provenance test for self-hosting; version + unicode-range equality is the right one.

### Process

- When a plan asserts a failure guarantee ("the build fails when X"), write the test for X in the plan. Both false claims in this task were guarantees nobody had turned into a test.
