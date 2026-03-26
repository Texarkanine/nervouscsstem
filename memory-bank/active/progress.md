# Progress — Cartouche typeface — Antonio

Switch cartouches to Antonio with Shippori fallback for Japanese glyphs.

**Complexity:** Level 2

## Phase log

- Complexity analysis complete — Level 2 (simple enhancement: typography update).
- Plan complete — see `tasks.md`.
- Preflight complete — `.preflight-status` PASS.
- Build complete — 296/296 tests pass, font swap + vertical centering correction.
- QA complete — PASS, all requirements met, no issues.
- Reflect complete — key insight: Range.getBoundingClientRect measures line-box not ink; Canvas TextMetrics required for glyph-aware centering.
