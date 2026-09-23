# Active Context

- **Current Task:** Offline font-and-JS bundle (issue #7)
- **Phase:** QA - COMPLETE (PASS)
- **What Was Done:** Built to plan, steps 1–6.
    - Created: `scripts/build-offline-bundle.mjs`, `test/offline-bundle.test.mjs`.
    - Modified: `package.json` / `package-lock.json` (7 exact-pinned devDeps, `build:offline`, test list), `test/publish-contract.test.mjs` (zip exclusion), `.github/workflows/release-please.yaml` (build before publish, upload zip), `.github/workflows/reusable-docs-build.yml` (PR builds zip), `README.md` (Offline bundle section), `docs/service-manual.md` (Offline bundle fonts), `memory-bank/techContext.md`.
    - Output: `dist/nervouscsstem-offline.zip`, 33 entries (22 fonts, 6 OFL texts, css, js, LICENSE, README.md, manifest.json), ~414 KB; Python `zipfile -t` clean.
- **Build decisions not in creative docs:**
    - Tests use their own quote-aware `url()` regex instead of importing the generator's tokenizer, so a tokenizer bug cannot mask itself; `cssUrls` stays module-private.
    - Tarball-exclusion test proven non-vacuous by mutation (`files: ["dist"]` → test fails naming the zip), then reverted.
    - Failure tests also assert no zip is written.
- **Deviations:** None from the plan beyond preflight advisories already folded in.
- **Verification:** `npm test` 391/391 (18 new); `npm run docs:build` strict clean; `npm run lint` 10 errors, all pre-existing in `dist/nerv.css` compiled from untouched `src/`.
- **Next Step:** QA (subagent).
