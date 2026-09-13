# Current Task: Canonical usage guide

**Complexity:** Level 3

* Task ID: canonical-usage-guide
* Type: documentation feature

## Component Analysis (in progress)

### Affected Components
- `docs/` markdown tree: catalog pages, section homes, moves of existing Using and visual-language files
- `properdocs.yml`: drop `nav:`; add inferred-nav features (`navigation.indexes`); `not_in_nav` for boards and `reading.md`
- `skills/nerv/docs/`: copy-identity for every new/moved markdown except `reading.md`
- `docs/img/` LFS stills: rename those that illustrate a catalogued component; retarget taxonomy links
- `ref/*.html`: five swatch boards copied/adapted onto the site; four servings stay unpublished
- Docs asset dirs `docs/stylesheets/` and `docs/javascripts/`: gitignore currently ignores the whole directories, so `docs-init.js` / `docs-islands.css` are untracked
- `scripts/resolve-docs-assets.mjs` and `test/docs-assets.test.mjs`: dual-load of `nerv.css` / `nerv.js`
- `test/skill-contract.test.mjs`: markdown lockstep
- `.github/workflows/release-please.yaml` `publish-pages`: publishes `site/`
- `docs/javascripts/docs-init.js`: extend `data-nerv-init` kinds as JS catalog islands need them
- `src/` / `dist/`: no CSS/JS product change (motion rename is issue #12)

### Cross-Module Dependencies
- Catalog markdown → skill copies (byte-identical `.md`)
- Catalog islands → `docs-init.js` scoped `NERV.*` (never `NERV.init()` on Material chrome)
- Catalog pages → `docs/img/` stills (LFS rename + relative links)
- Swatch HTML → `docs/stylesheets/nerv.css` and `docs/javascripts/nerv.js` (resolved at serve/build; not Material `extra_css`)
- `publish-pages` uploads whatever `properdocs build` put in `site/`

### Boundary Changes
- Public docs URL tree changes (file moves)
- Skill install markdown tree changes in lockstep
- Screenshot filenames in `docs/img/` change; taxonomy pages must keep resolving
- No CSS class rename (issue #12)

## Open Questions

- [x] **Docs tree and catalog map** → Resolved: layered folders (`visual-language`, `css`, `js`, `components`), `index.md` section homes, one root `.pages` for sidebar order, `not_in_nav` for `reading.md`. Catalog inventory and gitignore split in `memory-bank/active/creative/creative-docs-tree.md`.
- [ ] **Swatch board publication** — How the five standalone HTML files get onto GitHub Pages with working `nerv.css` / `nerv.js`, stay out of Material nav and the skill, and relate to `ref/` fixtures.
  - Why ambiguous: ProperDocs/MkDocs may copy extra HTML as-is, or we post-copy into `site/` in Actions; asset URLs today point at `../dist/nerv.css`; some boards call `NERV.init()`.
  - Constraints: boards are repo/Pages only, not the skill; foundation, lists, tables, forms, effects only; GitHub Pages serving HTML is the success criterion; do not wrap boards in Material chrome.
