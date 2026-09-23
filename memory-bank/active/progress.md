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
