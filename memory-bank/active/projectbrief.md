# Project Brief

## User Story

As a web developer using the NERV design system, I want a canonical usage catalog on the documentation site so I can learn what each element is, how to mark it up, and which major styling interactions (color, fill, outline, glow) it supports, without opening `ref/*.html`.

## Use-Case(s)

### Use-Case 1

I open the docs site, pick a component (or a family of variants), and see: the name, a relevant NGE still when one exists, a live example island, then spec plus HTML. Filler content is present so empty shells are visible. Variants of one component share a page; surrounding sample content stays constant.

### Use-Case 2

After reading a catalog page in isolation, I want a swatch board of major combinations for visual inspiration. That board is the existing standalone HTML for foundation, lists, tables, forms, and effects, hosted on the docs site and linked from the bottom of the matching catalog page. It is not shipped in the installable skill.

### Use-Case 3

I browse the site by directory: visual language, CSS, JS, and components are separate folders. Section homes are `README.md` or `index.md`. There is no hand-written `nav:` tree in `properdocs.yml`.

## Requirements

1. As described in [issue #9](https://github.com/Texarkanine/nervouscsstem/issues/9): the documentation site teaches every system capability that today lives only in `ref/*.html`.
2. Continue the live-example pattern already used on Using pages (preview island, then spec, then HTML). Do not call `NERV.init()` from docs chrome; scoped `NERV` methods inside islands only.
3. Variants of one component share a page. Non-component example content is held constant across those variants. Empty components get invented filler.
4. Introduce each component without color / fill / outline / glow where possible. At the bottom, show those modifiers with **one example per modifier class**, not every value.
5. Canonical “what this is and how to use it,” plus major styling interactions. Not suggested-serving compositions (panels / patterns / components / alert-cascade reference pages are the anti-pattern for catalog pages).
6. Where an existing `docs/img/` still illustrates a component: rename the file so the name names that component; place it in the section as name/variant → NGE still → example island → spec + HTML → extra detail only if needed. Update existing taxonomy links after rename.
7. Remove the explicit `nav:` tree from `properdocs.yml`. Directory hierarchy drives navigation. CSS docs and JS docs live in separate folders. awesome-pages / `.pages` only when ordering cannot come from the tree. Section home pages are `README.md` or `index.md`.
8. Host the five swatch-board HTML pages (`ref-foundation.html`, `ref-lists.html`, `ref-tables.html`, `ref-forms.html`, `ref-effects.html`) on the documentation site as visual-inspiration boards. Link each from the bottom of the matching catalog page. Keep them out of the installable skill. GitHub Pages will serve the HTML (dump into `site/` via Actions if ProperDocs will not serve plain HTML itself).
9. New catalog markdown in `docs/` must stay in lockstep with `skills/nerv/docs/` (existing skill copy-identity, skipping `docs/reading.md`). Swatch-board HTML is repo/Pages only.

## Constraints

1. Do not publish `ref-panels.html`, `ref-patterns.html`, `ref-components.html`, or `ref-alert-cascade.html` as swatch boards.
2. Do not build equivalent idea boards for remaining components in this ticket.
3. Motion-class rename (flicker / pulse) is out of scope. Investigation is [issue #12](https://github.com/Texarkanine/nervouscsstem/issues/12). Document current class names.
4. Screenshot library stays Git LFS under `docs/img/**`. Do not copy stills or swatch HTML into `skills/nerv/`.
5. No image files in the CSS product, no canvas, `.nerv-` prefix, `prefers-reduced-motion` / `prefers-contrast` unchanged.
6. `docs/reading.md` is research bibliography; skill copy-identity already skips it.

## Acceptance Criteria

1. A reader can learn every capability currently demonstrated by `ref/*.html` from the documentation site without opening those files as the teaching surface.
2. Catalog pages follow the agreed grain (variants together, constant filler, modifiers last as classes).
3. Matching NGE stills that illustrate a documented component are renamed and linked in the agreed section order; taxonomy pages that pointed at the old filenames still resolve.
4. Site navigation comes from the `docs/` directory tree, not `properdocs.yml` `nav:`. CSS and JS documentation are in separate folders.
5. The five swatch boards are reachable from the matching catalog pages on GitHub Pages and are absent from the skill install.
6. `skills/nerv/docs/**/*.md` matches `docs/**/*.md` except `reading.md`, as today.
