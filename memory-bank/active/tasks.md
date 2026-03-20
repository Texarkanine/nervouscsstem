# Task: M8 — Radar pulse (sweep-synced pulse/fade)

* Task ID: nerv-m8-radar-pulse
* Complexity: Level 2
* Type: Simple enhancement (radar subsystem + optional JS sync)

Extend the existing concentric radar (`.nerv-radar`, `.nerv-radar-sweep`) so child or adjacent “blip” elements can pulse/fade in phase with the sweep rotation. Add a **documented** way for external scripts to read or subscribe to sweep phase so UI outside the CSS can stay aligned.

**Feasibility (locked for build):**

- **CSS layer:** Use the same timing function as the sweep: `calc(var(--nerv-radar-duration) / var(--nerv-animation-speed))` so any new `@keyframes` stay period-matched. For blips at **known** angular positions, expose a custom property (e.g. `--nerv-radar-pulse-delay`) converted to `animation-delay` so peaks align with sweep passage (document the convention in SCSS comments).
- **JS layer (only if required for acceptance):** If arbitrary positions or external consumers need a single source of truth, add `NERV.initRadarSweepSync(radarEl)` (or similar) that uses the Web Animations API on the sweep element’s rotation animation to write a normalized phase (0–1) to a data attribute or `--nerv-radar-sweep-phase` on the radar root. No drawing — orchestration only, matching `systemPatterns.md`.

## Test Plan (TDD)

### Behaviors to Verify

- [Radar pulse class exists]: compiled CSS contains a new `.nerv-` radar-related pulse/blip selector scoped under or adjacent to `.nerv-radar` (exact name TBD in build) → pattern is present and prefixed.
- [Pulse shares sweep period]: new animation duration uses the same `calc(var(--nerv-radar-duration) / var(--nerv-animation-speed))` pattern as `.nerv-radar-sweep` → string match in compiled CSS near the new rule.
- [Reduced motion]: `prefers-reduced-motion: reduce` disables the new pulse animation (or sets opacity to a static readable state) → reduced-motion block mentions the new selector or shares a parent rule that zeroes animation.
- [Contrast]: if pulse relies on low-opacity fades, `prefers-contrast: more` increases visibility (opacity/border/glow) → block exists and references new selectors or inherited radar context.
- [Regression]: existing radar tests (behaviors 19–25 in `patterns.test.mjs`) still pass — sweep, keyframes, duration token, reduced motion for sweep unchanged in meaning.
- [JS API — conditional]: if a `NERV.*` sync API is shipped → `test/patterns.test.mjs` (or parallel describe) asserts exported function name and `typeof === 'function'` alongside existing `NERV.init` checks; if pure CSS only → skip API test but add one extra CSS contract test instead.

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/patterns.test.mjs` (radar + nerv.js API); `test/components.test.mjs` only if a cross-cutting selector assertion fits better there
- Conventions: `describe`/`it`, load compiled `dist/nerv.css` via existing helper pattern in `patterns.test.mjs`
- New test files: none planned

## Implementation Plan

1. **Spike / ref demo layout (optional TDD aid)**  
   - Files: `ref/ref-patterns.html`  
   - Changes: Add a small radar subsection with 2–3 sample blips using the new classes (can land after CSS exists in same PR).

2. **Failing CSS contract tests**  
   - Files: `test/patterns.test.mjs`  
   - Changes: Add `it(...)` cases for pulse selector presence, period `calc`, and reduced-motion branch; run tests — new tests fail until CSS exists.

3. **SCSS — pulse/blip layer**  
   - Files: `src/_radar.scss`, optionally `src/_tokens.scss` (only if a dedicated `--nerv-radar-pulse-*` token is clearer than reusing duration)  
   - Changes: Document tokens in file header; add keyframes (e.g. `nerv-radar-pulse`) and class(es) for blips; use `animation-delay: var(--nerv-radar-pulse-delay, 0s)`; nest under `.nerv-radar` where possible for specificity; mirror `prefers-reduced-motion` and `prefers-contrast: more` patterns used elsewhere in the repo.

4. **JS sync (branch)**  
   - Files: `src/nerv.js`  
   - Changes: If acceptance needs external phase: implement WAAPI-based sync helper, call from `init()` only when matching `[data-nerv-radar-sync]` or explicit init (prefer opt-in to avoid unexpected rAF on every page). Update module header comment.  
   - If investigation during build proves CSS-only sufficient: delete this step from execution and record rationale in `progress.md`.

5. **Conditional API tests**  
   - Files: `test/patterns.test.mjs`  
   - Changes: Assert new export(s) if step 4 shipped.

6. **Ref page polish + verification**  
   - Files: `ref/ref-patterns.html`  
   - Changes: Final demo copy; ensure radar section still matches “patterns page” scope.  
   - Run: `npm run build`, `npm run lint` / stylelint per `package.json`, full `node --test`.

## Technology Validation

No new technology — validation not required. Web Animations API is browser built-in; if used, note graceful no-op when `getAnimations` is unavailable (keep static CSS pulse).

## Dependencies

- Existing tokens: `--nerv-radar-duration`, `--nerv-animation-speed`, `--nerv-primary-rgb`
- Compiled CSS output consumed by tests

## Challenges & Mitigations

- **Arbitrary blip angles vs pure CSS:** Mitigation — document `--nerv-radar-pulse-delay` convention; offer JS phase publisher for dynamic UIs.
- **Multiple sweeps on one page:** Mitigation — scope sync helper per radar root element; CSS uses nearest `.nerv-radar` ancestor.
- **WAAPI / browser gaps:** Mitigation — feature-detect; fall back to CSS-only periodic pulse without phase lock.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [x] Build
- [x] QA
