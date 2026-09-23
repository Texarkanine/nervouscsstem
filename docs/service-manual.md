# Service manual

Scratch notes for things this repo must not forget. This is not the design-system spec. Spec lives in [`visual-language/design-language.md`](visual-language/design-language.md), [`visual-language/atomic-elements.md`](visual-language/atomic-elements.md), and [`visual-language/radar.md`](visual-language/radar.md) (radar timing). Radar usage is the catalog. Add a section here when a future milestone would otherwise re-learn it the hard way.

## Screenshot library vs skill install

The Evangelion stills are in Git LFS. They are not ordinary git blobs.

```mermaid
graph TD
    classDef repo fill:#e1f5fe,stroke:#01579b;
    classDef lfs fill:#fff3e0,stroke:#ef6c00;
    classDef skill fill:#e8f5e9,stroke:#2e7d32;

    Md["docs markdown"]:::repo --> Site["ProperDocs site"]
    Img["docs/img PNG library"]:::lfs --> Lfs["Git LFS repo only"]
    Plan["planning/selected-ref-images"]:::lfs --> Lfs
    Skill["skills/nerv SKILL.md placeholder"]:::skill
    Img -.->|"do not copy"] Skill
    Plan -.->|"do not copy"] Skill
    Md -.->|"do not copy yet"] Skill
```

[`.gitattributes`](https://github.com/Texarkanine/nervouscsstem/blob/main/.gitattributes) is the control surface:

- `docs/img/**` — every file under that tree is LFS. Today that is 163 PNGs referenced from the taxonomy docs. Treat the directory as the Library of Screenshots.
- `planning/selected-ref-images/*.png` — three planning stills, also LFS.

Do not add a repo-wide `*.png` LFS rule. A global glob would turn a tiny PNG we *do* want inside the skill into a 130-byte pointer, and the installer would get a broken image.

Do not put a file meant to travel with the skill under `docs/img/` or `planning/selected-ref-images/`. Give skill-shipped media a different path that is **not** in `.gitattributes`. Until that path exists, do not invent one in a drive-by; M5 owns the split.

[`visual-language/design-language.md`](visual-language/design-language.md) and [`visual-language/atomic-elements.md`](visual-language/atomic-elements.md) inline stills via `../img/…`. The catalog lives only under `docs/` so those stills can stay Git LFS. `skills/nerv/` is a placeholder `SKILL.md` until a later pass promotes selected pages into the skill as ordinary blobs — not LFS, and not a second copy of this tree.

After clone: `git lfs install` once per machine, `git lfs pull` if the stills are missing.

## Authoring source of truth

`docs/` is the only documentation tree. ProperDocs builds from it. Do not copy it into `skills/nerv/`. When the catalog is mature enough to ship in the skill, promote selected pages — do not invent a lockstep copy.

## Catalog live examples

Material pages must not call `NERV.init()`. That method injects viewport-fixed scanlines on `body` and runs every sub-initializer against the document. Islands opt in with `data-nerv-init`; `docs-init.js` calls the matching `NERV.init*(island)` on that element only. Standalone swatch boards may call `NERV.init()` — they are a NERV viewport.

That rule is authoring, not catalog copy. User-facing pages teach `NERV.init()` vs scoped `init*(container)`. Do not explain Material, `docs-init.js`, or `data-nerv-init` in catalog prose. Live demo markup may still carry `data-nerv-init` so this site can initialize fragments.

## Offline bundle fonts

`npm run build:offline` writes `dist/nervouscsstem-offline.zip`, the GitHub Release asset for self-hosters with no network. [`scripts/build-offline-bundle.mjs`](https://github.com/Texarkanine/nervouscsstem/blob/main/scripts/build-offline-bundle.mjs) reads the compiled `dist/nerv.css` and swaps each remote font URL for a file from an exact-pinned `@fontsource*` devDependency. It picks the file whose fontsource `unicode.json` subset equals the face's `unicode-range`. jsDelivr fontsource URLs (DSEG7) name their file and version directly. `NERV Mixed` and `NERV Cartouche` reuse the Barlow and Antonio files for the same URL.

Antonio is the variable font on Google Fonts, so one file serving both 400 and 700 is correct. Its package is `@fontsource-variable/antonio`, not `@fontsource/antonio`.

When `src/_typography.scss` changes a font URL, a `unicode-range`, or adds a face, the bundle build fails and names the URL it cannot map. PR CI builds the bundle, so this shows up before merge. To fix it:

- Bump the matching `@fontsource*` pin to a version whose subsets match, or add a row to `FONT_FAMILIES` for a new family, with the verbatim copyright line from its upstream OFL.txt.
- For DSEG7, keep the version in the CSS URL and the devDependency pin identical.
- Do not commit gstatic font hashes or font files to the repo.

The fontsource Plex `LICENSE` omits `Reserved Font Name "Plex"`. The zip's generated `README.md` and `manifest.json` carry the upstream copyright line that states it.
