# Progress

Build a new CSS-first `.nerv-` sine-wave graph component (issue #8): one or more scrolling sine waves in a box, each with amplitude, wavelength, temporal frequency, phase offset, and a design-system color; points that ride on the line; a vertical variant; speed tied to `--nerv-animation-speed`; reduced-motion and high-contrast handling; catalog docs with a demo composed from existing chrome components.

**Complexity:** Level 3

## 2026-09-23 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Recorded the operator-approved restatement in `projectbrief.md`.
    - Classified the task as Level 3.
* Decisions made
    - Level 3, not Level 2: new component plus an unresolved rendering design (mask vs. alternatives, `sin()` point tracking, `@property` animation) that needs a creative phase and browser proof. Not Level 4: one component family, no architectural change to the layer system.

## 2026-09-23 - CREATIVE - COMPLETE

* Work completed
    - Explored rendering/point tracking (algorithm) and the consumer API (UI/UX); both resolved with high confidence.
    - Proved the technique in a throwaway Playwright harness (`/tmp/nerv-wave-proto`, Chromium 1243 + Firefox 1543): worst point-vs-stroke error 0.45px / 0.97px; identical frames in both engines.
* Decisions made
    - One registered `--nerv-wave-t` clock per wave drives both the SVG-mask stroke and the `sin()` point offset.
    - Unitless-fraction API; phase in turns; ambiance default color, data-color modifiers; `-vertical` on graph, `-reverse` on wave.
* Insights
    - `filter` applies before `mask`, so the glow must sit on the masked element's parent.
    - Frequency 0 freezes cleanly (duration clamps to max float); negative frequency resolves to 0s, so direction needs a modifier.
    - `display: none` restarts CSS animations; sample paused frames with `visibility` instead.

## 2026-09-23 - PLAN - COMPLETE

* Work completed
    - Full L3 plan in `tasks.md`: 18 behaviors, 5 implementation steps, pinned clock diagram.
* Decisions made
    - Ref fixture: one section in `ref/ref-patterns.html` beside radar (manual QA surface without Material chrome).
    - Docs page lives under heavies; no JavaScript page (no hook). Reference still added to `docs/img/` (LFS).
    - New test file `test/wave-graph.test.mjs`, with geometry tests that evaluate the shipped Bézier paths numerically.

## 2026-09-23 - PREFLIGHT - COMPLETE

* Result: `PASS WITH ADVISORY` (first line of `.preflight-status`). No plan edits.
* Findings
    - TDD encoding, conventions, dependency impact, conflicts, and completeness all pass. Grid marks and reticles compose on the graph box as planned.
    - Advisory: the reference still is already in the repo as `docs/img/3RBI9q8.png`. Use a PNG copy named `docs/img/wave-graph.png`, not the planned `.jpg`.
    - Advisory (low): steps 1.3 and 2.3 overlap; test file placement departs from per-layer grouping; the timing rationale has no visual-language page.
    - Radical idea (advisory): an alert-cascade `--nerv-wave-desync` phase term, so synced waves fan apart under warning and critical.

## 2026-09-23 - PREFLIGHT - COMPLETE (PASS WITH ADVISORY)

* Decisions made (operator gate, pre-authorized)
    - Use library still `docs/img/3RBI9q8.png` as `docs/img/wave-graph.png`; keep separate test file; link existing waveform docs; defer alert "desync" token to a follow-up.

## 2026-09-23 - BUILD - COMPLETE

* Work completed
    - `_wave-graph.scss`, token, forward, 19-test suite, catalog page, ref fixture section (commit `badf035`).
    - Full suite 392/392, strict docs build green, lint clean for new rules (10 pre-existing errors elsewhere).
    - Browser verification of built CSS in Chromium and Firefox: ≤0.56px perpendicular point-to-stroke distance, exact periods, reduced motion exact.
* Decisions made
    - Defaults on the graph box (inherit) instead of per wave, so shared settings are written once.
    - Portrait default ratio for the vertical variant; 6px mask floor; 3.5 contrast stroke.
* Insights
    - Cross-axis error overstates visual error on steep slopes; perpendicular distance is the honest "on the line" metric. Firefox snaps mask position to device pixels (≤0.5px along travel).
    - The geometry tests (evaluating the shipped Bézier path) guard the real failure mode—points drifting off the line—better than shape assertions.
