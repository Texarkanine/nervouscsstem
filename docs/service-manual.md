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

That rule is authoring, not catalog copy. User-facing pages teach `NERV.init()` vs scoped `init*(container)`. Do not explain Material, `docs-init.js`, or `data-nerv-init` in catalog prose.

### Island fences

Write each live example once, as an `html` fence with the `island` option. At build time it renders as the live `.nerv-docs-island` followed by the highlighted copy of the same body, so the demo and its recipe cannot drift. Island chrome goes in fence options, never in the body:

~~~markdown
```html island init="bar-meters"
<div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
<script>
  NERV.initBarMeters(document.querySelector('.nerv-bar-meter').parentElement);
</script>
```
~~~

- `init="<kind>"` puts `data-nerv-init="<kind>"` on the island; `docs-init.js` runs that scoped init. The kinds are the ones `docs-init.js` handles.
- `state="<name>"` adds `nerv-state-<name>` to the island so the example shows that alert-cascade tint.
- `<script>` elements stay in the copy and are removed from the island. The recipe's script must `querySelector` a class present in the body (use `.parentElement` when the init looks up descendants).
- CSS examples need no options and paint with JavaScript off.
- An unknown option, a missing or malformed value (values are `[a-z][a-z0-9-]*`), or `init` / `state` without `island` fails the build.
- A plain `html` fence (no `island`) is copy only. Scanlines is written that way: it is a viewport overlay, so it never goes in an island.

The formatter is `scripts/nervouscsstem_docs/island_fence.py`, registered as a superfences custom fence in `properdocs.yml`. `uv sync --group docs` installs it editable. Its tests: `uv run python -m unittest discover -s test -v`.
