# Algorithm Decision: Font Resolution

## Problem

Input: compiled `dist/nerv.css` with 26 `@font-face` blocks and 22 distinct remote URLs (gstatic and jsDelivr), plus installed `@fontsource/*` packages. Output: a map from each remote URL to one file inside a pinned fontsource package, and a rewritten CSS whose `url()`s point at `fonts/<file>`.

Correct means:

- Every remote URL in the CSS is replaced; none left.
- Each face gets a file whose glyph coverage equals the `unicode-range` the face declares, so the browser never picks a file for a character it does not contain.
- Everything else in the CSS is byte-identical, so the bundle looks exactly like the CDN version.
- A CSS change that adds or moves a font must fail the build loudly, not silently ship a broken zip.

Probe facts (see `progress.md`): every non-alias face's `unicode-range` equals exactly one subset in the family's fontsource `unicode.json`; Antonio is the variable font (`@fontsource-variable/antonio`, weight token `wght`); DSEG7 is already a jsDelivr fontsource URL naming its package, version, and file; `NERV Mixed` / `NERV Cartouche` reuse Barlow and Antonio Latin URLs with a wider `unicode-range`.

## Options Evaluated

- **Explicit URL table**: hardcode 22 `remoteUrl → { package, file }` rows.
- **Derive from the CSS**: per face, look up the family's package, match `unicode-range` against that package's `unicode.json` to get the subset, build the fontsource filename from `id-subset-weight-style.ext`; parse jsDelivr fontsource URLs directly; alias faces resolve by URL reuse.
- **Regenerate faces from fontsource CSS**: discard our `@font-face` blocks and emit fontsource's own.

## Analysis

| Criterion | URL table | Derive | Regenerate |
|---|---|---|---|
| Correctness | Coverage depends on hand-typed rows being right | Coverage correct by construction (range equality) | Changes our CSS (Shippori pruning, aliases lost) |
| Simplicity | Simple code, 22 rows of opaque hashes | ~40 lines of logic, 6 family rows | Large divergence |
| Follows CSS on updates | Every URL change needs a row edit | Follows automatically when fontsource has the same subset; fails loudly otherwise | n/a |
| Maintainability | Opaque gstatic hashes in repo, what the issue warns against | Family table is readable metadata | n/a |

Key insights:

- Range equality is itself the correctness proof for glyph coverage; a URL table would need a separate check to achieve the same guarantee.
- Alias faces must not be matched by range (their range is wider than the file); resolving them through the URL map built from primary faces is exact because the URLs are identical.
- Variable fonts need the `wght` weight token regardless of the declared `font-weight`, which is why Antonio's 400 and 700 resolve to one file, matching the CDN.

## Decision

**Selected**: Derive from the CSS.
**Rationale**: Glyph coverage is guaranteed by construction, the repo holds six readable family rows instead of 22 opaque hashes, and unmappable CSS fails the build.
**Tradeoff**: A little more logic than a lookup table, and it depends on fontsource's file naming convention (`<id>-<subset>-<weight>-<style>.<ext>`), which is checked by an existence test on every resolved file.

## Implementation Notes

- Family table (`FONT_FAMILIES` in `scripts/build-offline-bundle.mjs`): `family`, `package`, `variable`, `oflUrl`, `copyright` (verbatim upstream OFL line), `reservedFontNames`.
- Alias families: `NERV Mixed`, `NERV Cartouche`; their URLs must already be resolved by a primary face, else throw.
- jsDelivr URL `…/npm/<pkg>@<ver>/files/<file>`: package must equal the family's package and `<ver>` must equal the installed version, else throw. So DSEG7 is pinned at 5.2.5 to match the CSS.
- Package dir is `node_modules/<pkg>` (fontsource `exports` does not expose `files/*` or `package.json` to `require.resolve`).
- After rewriting, any `url()` that is not `data:` or relative, or any `@import`, throws.
