# Progress

Build an optional offline zip (issue #7): `nerv.css` rewritten to local `@font-face` URLs, `nerv.js`, the six OFL families' font files taken from pinned `@fontsource/*` devDependencies, AGPL `LICENSE`, per-family OFL text and copyright notices, and a provenance manifest. An npm script builds it; the release workflow attaches it to the GitHub Release. The npm tarball and CDN default stay unchanged.

**Complexity:** Level 3

## 2026-09-23 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Recorded the operator-approved restatement in `projectbrief.md` (Step 5 pre-approved).
    - Probed fontsource tarballs against the 22 remote URLs in `dist/nerv.css`.
* Decisions made
    - Level 3: multi-component feature with design choices, no architectural change.
* Insights
    - Antonio on gstatic is the variable font: bytes equal `@fontsource-variable/antonio` `wght` files, so the CSS sharing one URL for 400 and 700 is correct, not a bug.
    - DSEG7 5.2.5 and VT323 bytes are identical to fontsource. Barlow Condensed (v13), IBM Plex Mono (v20), Shippori Mincho B1 (v24) are the same upstream Google versions with different WOFF2 encodings.
    - Every CSS `unicode-range` equals exactly one fontsource `unicode.json` subset; Shippori's 12 files are subsets `[110]`–`[119]` plus `latin` and `latin-ext`.
    - fontsource `LICENSE` files carry the full OFL text and copyright lines, but the Plex one omits `Reserved Font Name "Plex"` that upstream google/fonts OFL.txt states.

## 2026-09-23 - CREATIVE - COMPLETE

* Work completed
    - `creative-zip-writer.md`: `fflate` exact-pinned devDependency (high confidence).
    - `creative-font-resolution.md`: derive face-to-file mapping from the CSS by `unicode-range` equality (high confidence).
* Insights
    - fflate encodes DOS timestamps with local-time getters; a UTC `mtime` throws in UTC-5 and would vary by timezone. `new Date(1980, 0, 1, 12)` gives identical bytes in every TZ (PoC).

## 2026-09-23 - PLAN - COMPLETE

* Work completed
    - Full Level 3 plan in `tasks.md`: 6 implementation steps, 18 behaviors (B1–B11, E1–E6, P1).
* Decisions made
    - Shippori: pin the 12 subsets the CSS loads, not the full family.
    - Antonio: follow the CSS; one variable file serves 400 and 700.
    - DSEG7 pinned at 5.2.5 to match the CSS URL.
    - Plex RFN: verbatim fontsource LICENSE plus verbatim upstream copyright lines in generated README + manifest.
    - Zip name unversioned (`nervouscsstem-offline.zip`), single top folder, version in manifest.
    - Bundle builds before `npm publish` in the release job.

## 2026-09-23 - PREFLIGHT - COMPLETE

* Result: `PASS WITH ADVISORY` (first line of `.preflight-status`). No plan edits.
* Advisories
    - `dist/nerv.css` data-URI SVGs contain `)` and `http://` inside quoted `url()` values; generator and tests need quote-aware `url()` tokenizing.
    - DSEG7 face has no `unicode-range`; only non-jsDelivr faces go through range matching.
    - release-please creates the GitHub Release before `publish-npm`, so a bundle failure still leaves a release with no assets. Consider `npm run build:offline` in PR CI.
    - Innovation: generated `specimen.html` in the zip for one-click offline QA.
* Decisions made (worker, at the operator gate)
    - Advisories 1–2 folded into the build step; advisory 3: corrected the ordering claim and added a bundle build to the PR docs workflow; advisory 4 (`specimen.html`) declined as scope creep and left as a manual QA item.

## 2026-09-23 - BUILD - COMPLETE

* Work completed
    - Generator, 17 bundle tests, 1 tarball-exclusion test, release + PR workflow wiring, README and service-manual docs, techContext.
    - `npm test` 391/391; strict docs build clean; lint unchanged from base (10 pre-existing errors in compiled CSS).
* Decisions made
    - Tests carry an independent quote-aware `url()` regex.
    - Tarball test verified by mutation, not only by passing.
* Insights
    - The zip is ~414 KB for 22 fonts; Shippori's 10 CJK slices dominate.

## 2026-09-23 - QA - COMPLETE

* Result: `PASS` (first line of `.qa-validation-status`). No implementation edits.
* Verified
    - All 6 plan steps and all 18 planned behaviors are implemented and tested; invariants hold; hardcoded copyright lines match the fontsource LICENSE texts; `npm test` 391/391; lint unchanged (10 pre-existing errors in compiled CSS).
* Advisories
    - `docs/service-manual.md` claims any font URL change fails the bundle build. A gstatic version bump with unchanged `unicode-range`s passes and silently keeps the pinned fontsource version. Reword.
    - The CLI `--out` flag is unplanned and unused.
    - Manual offline render check of the extracted zip is still open for the operator.

## 2026-09-23 - POST-QA FIX - COMPLETE

* Work completed
    - Advisory 1 fixed in code, not only prose: the generator now fails when a gstatic URL's `/vNN/` differs from the pinned package's `metadata.json` `version` (fontsource records the Google Fonts version it was built from; all five gstatic families match today). New failure test written first and seen red.
    - Service manual lists the exact failure conditions (text arrived in the working tree during QA; kept because it matches the new check).
    - Advisory 2: removed the unused `--out` CLI flag.
* Insights
    - fontsource `metadata.json` `version` is the upstream Google Fonts version (`v13`, `v22`, …); DSEG7 (`type: other`) carries its own upstream version and is pinned through its jsDelivr URL instead.

## 2026-09-23 - REFLECT - COMPLETE

* Work completed
    - `reflection/reflection-offline-bundle.md`.
    - Reconciled persistent files: `techContext.md` updated (version-drift rule, trimmed to pointers); `systemPatterns.md`, `productContext.md` skipped.
* Insights
    - Both false claims in this task were failure guarantees stated in the plan without a test; the pre-plan probe and the tech-validation PoC are why the build itself had no surprises.

## 2026-09-23 - OFFLINE RENDER CHECK - PASS

* Work completed
    - Operator-requested manual-QA gap closed in headless Chromium (Playwright, scratch package under /tmp; harness not committed). Page over `file://` linking the extracted zip's `nerv.css` / `nerv.js`, every non-`file:` request aborted.
    - 0 requests attempted to any http(s) host. All six families plus `NERV Mixed` / `NERV Cartouche`: every face used reports `loaded`, none `error`, `document.fonts.check()` true at the weight used. 12 faces stayed `unloaded` (subsets the sample text doesn't need). Screenshot shows real glyphs.
    - PR #17 body "How I know it works" updated. No product change.
* Insights
    - `document.fonts.check()` must use the weight actually rendered: `.nerv-cartouche` is 700, so checking at the default 400 reports false for a face that correctly never loaded.
