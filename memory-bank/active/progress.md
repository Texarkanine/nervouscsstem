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
