# Service manual

Scratch notes for things this repo must not forget. This is not the design-system spec. Spec lives in [`design-language.md`](design-language.md), [`atomic-elements.md`](atomic-elements.md), and [`radar.md`](radar.md). Add a section here when a future milestone would otherwise re-learn it the hard way.

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
    Md --> Skill["npx skills install"]
    Img -.->|"do not copy"] Skill
    Plan -.->|"do not copy"] Skill
```

[`.gitattributes`](../.gitattributes) is the control surface:

- `docs/img/**` — every file under that tree is LFS. Today that is 163 PNGs referenced from the taxonomy docs. Treat the directory as the Library of Screenshots.
- `planning/selected-ref-images/*.png` — three planning stills, also LFS.

Do not add a repo-wide `*.png` LFS rule. A global glob would turn a tiny PNG we *do* want inside the skill into a 130-byte pointer, and the installer would get a broken image.

Do not put a file meant to travel with the skill under `docs/img/` or `planning/selected-ref-images/`. Give skill-shipped media a different path that is **not** in `.gitattributes`. Until that path exists, do not invent one in a drive-by; M5 owns the split.

[`design-language.md`](design-language.md) and [`atomic-elements.md`](atomic-elements.md) inline almost every still via `img/…`. Copying `docs/` wholesale into a skill would either ship the whole library or ship LFS pointer files that do not render. That is the SLOBAC split: repo-only docs (the stills, and any page that is only a gallery of them) stay in this git tree; the skill gets prose plus, at most, a couple of deliberately chosen images from a non-LFS path.

After clone: `git lfs install` once per machine, `git lfs pull` if the stills are missing.

## Authoring source of truth

`docs/` stays the editor-facing tree. The skill may carry a copy or a build-time inclusion. Do not relocate this directory into the skill.
