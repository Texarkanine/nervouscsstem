---
task_id: cartouche
date: 2026-03-25
complexity_level: 2
---

# Reflection: Status Cartouche Element

## Summary

Built `.nerv-cartouche` — a flex (default) and fixed variant status framing device with auto-generated color variants and JP/EN bilingual font support. All 14 behaviors verified, full suite green (286 tests), built to plan with zero deviations.

## Requirements vs Outcome

All requirements delivered exactly as specified:
- Flex cartouche sizes to content with slightly-compressed font
- Fixed cartouche stretches text to fill via JS-computed `scaleX`/`scaleY`
- Semantic color variants from `$nerv-colors`
- Mixed JP/EN via `NERV Mixed` font stack
- Demo on ref-foundation.html below glow line
- Added `--nerv-cartouche-radius` (preflight innovation) for rounded vs sharp shape

No requirements dropped or reinterpreted. The `--nerv-cartouche-radius` addition was the only scope expansion, folded in during preflight as a zero-cost innovation.

## Plan Accuracy

The plan was accurate — 13 steps executed in order, no reordering or splitting needed. File list was correct. The identified challenge (fixed variant needing JS orchestration) was the actual challenge, and the mitigation (follow existing `initBarMeters` pattern) worked on the first try.

Preflight correctly caught the font-weight 600→400 issue before it could waste a build cycle. This is exactly the kind of error preflight is designed to find.

## Build & QA Observations

Build was clean — zero iteration needed. TDD red→green was a single pass. QA caught 3 trivial issues: a duplicate `display` property from rapid editing, a missing entry in the nerv.scss header comment, and unused variables in JS. All were mechanical cleanup, not design issues.

## Insights

### Technical

- The `NERV Mixed` composite font-face approach (unicode-range splitting Latin to Barlow, CJK fallthrough to Shippori) is an elegant pattern worth reusing. Any future component needing bilingual text should use this font stack rather than applying `.nerv-type-mixed` as a utility class — embedding the font-family directly in the component means consumers don't need to remember to compose two classes.

### Process

- Nothing notable — clean execution that followed established patterns without friction.

### Million-Dollar Question

If cartouches had been a foundational assumption from the start, the `NERV Mixed` font-face would likely have been declared as a CSS custom property (`--nerv-font-mixed`) in `_tokens.scss` alongside the color tokens, rather than requiring each component to hardcode the font stack. This would make the font-family DRY across any future component that needs bilingual support. Not worth retrofitting now (only one consumer), but worth considering if a second bilingual component arrives.
