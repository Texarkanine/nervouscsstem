# Task: Frameless picker modifier (issue #3 rework)

* Task ID: issue-3-custom-select
* Complexity: Level 2
* Type: simple enhancement (rework from PR #19 review)

Add `.nerv-select-frameless`: inside the base-select `@supports` block, the open picker loses its border, frame glow and padding, so option boxes read as a bare list, like a `.nerv-list` on the page. The framed picker stays the default.

## Decisions

- **Name `.nerv-select-frameless`.** `.nerv-list` has no frame concept: a list host is always bare. `.nerv-list-contained` means the parent item's fill wraps nested children, which is a fill mode, not a frame toggle. Reusing it would invert its meaning. `frameless` names exactly what the human asked to remove.
- **Padding 0.** Options touch the picker edge, so the list edge is the option boxes themselves.
- **Gap fill `var(--nerv-bg)`, opaque.** The picker keeps `background: var(--nerv-bg)`, so the 0.2em gaps between boxes (and the clipped corners of hex/arrow shapes) show the page's own background color and never page content (no-transparency rule). Under `.nerv-state-critical` that color is red-deep, matching the page.
- **High contrast regains a border.** Under `prefers-contrast: more` a frameless picker gets `calc(var(--nerv-border-width) + 1px) solid var(--nerv-form-color)`, with no glow. Repo convention (systemPatterns): contrast mode increases border widths and relies on borders, not glow, for element distinction. The frame is the popup's only delimiter from the page, and a contrast user has asked for maximal distinction over aesthetics.
- **Option states unchanged:** ▶ checkmark, hover/focus fill (plain options), inset ring (colored options) already live on the option, not the frame.
- **Examples using frameless (screenshot verdicts):** frameless on ref rows rect alert, hex alert, solid+arrow, arrow-reverse, and the docs colored example; framed kept on plain markup and plain under `.nerv-state-critical` (plain options float without a delimiter). A new framed alert-level select (`#cs-alert-framed`) stays as the default comparator.

## Test Plan (TDD)

### Behaviors to Verify

- F1: `.nerv-select-frameless::picker(select)` inside the base-select block → `border: none`, `box-shadow: none`, `padding: 0`, and an opaque `background: var(--nerv-bg)`.
- F2: The frameless picker rule comes after the base `.nerv-select::picker(select)` rule at equal specificity → frameless wins (source-order check).
- F3: Inside the block's `prefers-contrast: more` rule → `.nerv-select-frameless::picker(select)` sets a `border` of `calc(var(--nerv-border-width) + 1px) solid var(--nerv-form-color)`.
- Regression (existing): B3 containment, B4 fallback byte-identity, B5 `.nerv-` scoping keep passing with the new selectors.
- Visual (Playwright, not unit): frameless hover/focus/▶ visible; gaps opaque over page content.

### Test Infrastructure

- Framework: `node:test` + `node:assert/strict` over compiled `dist/nerv.css`
- Test location: `test/components.test.mjs`, in the existing `Customizable select (base-select)` describe (helpers `supportsBlocks`, `enhanced`)
- New test files: none

## Implementation Plan

### 1. Frameless modifier in `_form.scss` — executable

- Files: `src/_form.scss`, `test/components.test.mjs`

1. Stub tests: add empty `it` cases F1–F3 to the customizable-select describe.
2. Stub interface: add a comment-only placeholder for `.nerv-select-frameless` after the base picker rule, and a line in the file header's customizable-select class list.
3. Write tests and run red: F1–F3 assertions; F1–F3 fail and all others pass.
4. Write code and run green: add the `.nerv-select-frameless::picker(select)` rule (border none, box-shadow none, padding 0, background var(--nerv-bg)) after the base picker rule, and the contrast override inside the nested `prefers-contrast` block. Run `npm test` and `npm run lint`.

### 2. Fixture and screenshots decide the examples — prose/policy

- Files: `ref/ref-forms.html`
- No tests: visual fixture

1. Add a framed vs frameless side-by-side row (same alert-level options).
2. Screenshot framed and frameless open in rect, hex, solid and arrow-reverse, plus plain, in Chromium. Apply `.nerv-select-frameless` to each colored row where it looks better, and record the verdict per example.

### 3. Docs — prose/policy

- Files: `docs/components/css/structure/forms.md`
- No tests: prose/policy artifact

1. Add `.nerv-select-frameless` to the class table and say when to use it. Apply it to the colored-options island and fence if step 2 says so. Mention the contrast border.
2. `npm run docs:build`.

### 4. PR screenshots — prose/policy

- No tests: evidence artifacts

1. New shots: framed vs frameless side by side, frameless alert open (rect and hex), frameless hover/focus, frameless high contrast. Refresh existing shots whose fixture changed.
2. Push to `pr-assets/pr-19/` via /tmp/pr-assets-19, curl-verify each URL, update the PR body Screenshots section.

## Technology Validation

No new technology - validation not required.

## Dependencies

- Existing `@supports (appearance: base-select)` block and its nested `prefers-contrast` rule in `src/_form.scss`
- Playwright scratch at /tmp/pw-issue3; pr-assets clone at /tmp/pr-assets-19

## Challenges & Mitigations

- Source order: the base picker rule and the frameless rule have equal specificity (0,1,1). F2 locks the frameless rule after the base rule.
- The contrast base rule sets only `border-width`; with frameless `border: none` the style is `none`, so width alone would not bring a border back. The frameless contrast rule sets the full `border` shorthand.
- Hex/arrow corners show `--nerv-bg` behind the clipped points: on non-void page panels this reads as a dark rectangle. Accepted; transparency is forbidden, and the opaque color matches the default page background.

## Pre-Mortem

- The human still sees "an outline" because hover/focus rings or the ▶ read as a frame: the screenshots are reviewed specifically for this, and ring width stays 2px on the option only.
- Frameless makes plain unfilled options float with no delimiter: the plain select stays framed, and the docs say to use frameless with filled options.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Pre-Mortem complete
- [x] Preflight
- [x] Build
- [x] QA - FAIL (plan step 4: PR screenshots not published; rerun Build for step 4 only)
- [x] Build step 4 (QA fix)
- [x] QA rerun - PASS (all 15 PR images live, frameless subsection in PR body, 388/388)
