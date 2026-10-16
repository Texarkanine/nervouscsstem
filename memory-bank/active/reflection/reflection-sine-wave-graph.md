---
task_id: sine-wave-graph
date: 2026-09-23
complexity_level: 3
---

# Reflection: Sine Wave Sync Graph with Plotted Points

## Summary

Shipped `.nerv-wave-graph`, a CSS-only heavy: scrolling sine traces with per-wave amplitude, wavelength, frequency, phase, and data color, points that ride their trace, a vertical variant, and cascade-driven speed. It succeeded: points stay within 0.56px (perpendicular) of their stroke in Chromium and Firefox, and QA passed after one documentation/fallback rework.

## Requirements vs Outcome

Every requirement in the brief is met. Additions within scope: defaults inherit from the box (one declaration configures every wave), `.nerv-wave-reverse` for direction (needed because a negative frequency cannot encode it), a ref fixture, and an `@supports` guard added in rework. Nothing was dropped. Safari was not tested (WebKit cannot run on this host); the floor is stated from documentation and flagged for manual QA.

## Plan Accuracy

Sequence, file list, and scope held. The plan's expected challenges (data-URI escaping, stylelint on modern CSS, Bézier parsing in tests) turned out to be non-events. The surprise came from outside the plan: browser support *below* the floor. The plan reasoned about what the floor needs, not what a sub-floor browser paints, and QA caught that the stroke layer becomes a solid block where only the prefixed mask exists.

## Creative Phase Review

- **Rendering (one registered clock, SVG mask stroke, `sin()` points):** held up exactly. The prototype's path string reappeared byte-for-byte in the build, and the built CSS matched the prototype's accuracy. Proving it in two real engines before planning removed the biggest risk in the task.
- **API (unitless fractions, phase in turns):** held up. One refinement during build (defaults on the box rather than the wave) fell out of the glow mixin needing a resolved `--nerv-wave-color`; it improved the API instead of fighting it.
- An unknown that should have been flagged: graceful degradation below the floor. It was treated as "older browsers show still traces" without checking each missing feature separately.

## Build & QA Observations

Build was smooth: the tests went red for the right reasons, then green on the first compile. Iteration went into the measurement harness, not the component: `display: none` restarted CSS animations and invalidated samples, and cross-axis error overstated visual error on steep slopes (Firefox pixel-snaps mask position). QA's first run found two real issues: a stale color-family list in `colors.md`, and a wrong fallback claim that hid a real visual failure. The rework fixed the behavior (an `@supports` gate with a test) instead of just rewording.

## Cross-Phase Analysis

- Creative's browser proof → build had no rendering surprises, and QA could check the math by hand against a known-good reference.
- Creative's degradation sentence, never exercised → carried into the docs → QA FAIL. The one untested claim in the creative doc was the one that failed.
- Preflight pointed the plan at the existing library still `3RBI9q8.png` instead of an unsourced JPEG, which also linked the page to the existing design-language entry for NGE-1 00:19:59.

## Insights

### Technical

- `filter` applies before `mask`: a glow on a masked element is cut away by its own mask. Put the filter on the parent (recorded in SumMem).
- A single registered `@property` number animated 0→1 can act as a shared clock for several derived geometries (mask offset, `sin()` positions). Consumers cannot drift apart, and `animation: none` gives an exact static pose for free. It is reusable for any future "things that must stay on a moving curve" component.
- For an animation that spans one full period, an unregistered clock degrades gracefully: the discrete 0↔1 flip is visually identical. Checking what each missing feature paints is what exposed the one that doesn't degrade (unprefixed `mask`).
- For "is the dot on the line", measure perpendicular distance, not cross-axis distance. On steep slopes, sub-pixel snapping along the travel axis multiplies into large, visually meaningless cross-axis errors.

### Process

- When a component's value is visual, a pixel-measuring harness (Playwright, both engines, paused animations) during creative gives stronger evidence than any static test. Keep it outside the repo so the repo gains no browser dependency.
- When writing a support floor, list each required feature and state what the component paints without it. That habit would have turned this QA failure into a plan item.
