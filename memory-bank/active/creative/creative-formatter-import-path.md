# Architecture Decision: Formatter Import Path

## Requirements & Constraints

- `properdocs.yml` resolves `!!python/name:<module>.<attr>` at YAML parse time. The module must be importable by `uv run properdocs build --strict` locally and by `.github/workflows/reusable-docs-build.yml` (and the CDN build in `release-please.yaml`) from a clean checkout.
- Ranked: (1) works with the existing CI steps unchanged, (2) works for `npm run docs:serve` / `docs:build` without extra env, (3) least new machinery.
- Out of scope: new CI jobs; changing how docs deps are declared beyond what import needs.

Evidence: a probe config with a module in the working directory failed: `cannot find module 'probe_mod'`. The cwd is not on `sys.path` for the `properdocs` console script.

## Components

`pyproject.toml` (virtual uv project, `docs` dependency group) → `uv sync --group docs [--frozen]` → `.venv` → `properdocs` → YAML loader → formatter module.

## Options Evaluated

- **A. Editable install of the root docs project**: add `[build-system]` with `uv_build` and `module-root = "scripts"`; `uv sync` installs `scripts/nervouscsstem_docs/` editable via a `.pth`.
- **B. `PYTHONPATH=scripts`**: set in npm scripts and every workflow step that runs properdocs.
- **C. ProperDocs `hooks:` file that injects the fence in `on_config`**: loads by path, but registration would leave `properdocs.yml`'s `custom_fences` list.

## Analysis

| Criterion | A editable | B PYTHONPATH | C hook injection |
|-----------|-----------|--------------|------------------|
| CI unchanged | yes (`uv sync --frozen` installs project) | no (3 workflow steps + npm) | yes |
| Local serve/build | yes | only through npm scripts | yes |
| Registered next to Mermaid | yes | yes | no (violates approved intent) |
| New machinery | build-system table, 1-line lock diff | env var in 4+ places | hook module + config mutation |
| Reversibility | trivial | trivial | trivial |

Key insights:
- C contradicts the approved intent ("registered in `properdocs.yml` next to the existing Mermaid custom fence").
- B scatters an env var across every invocation site and breaks bare `uv run properdocs serve`.

## Decision

### Choice Pre-Mortem

- `uv sync --group docs --frozen` might not install the project editable, or the lock might go stale: **checked** — PoC in a scratch copy: relock with `uv lock --no-config --default-index https://pypi.org/simple` changed exactly one line (`source = { virtual = "." }` → `source = { editable = "." }`); fresh `.venv` via `--frozen` installed `nervouscsstem_docs.pth`; `properdocs build --strict` imported `nervouscsstem_docs.island_fence` and rendered.
- `module-root = "scripts"` might collide with the existing `scripts/*.mjs`: **checked** — uv_build only packages `scripts/nervouscsstem_docs/`; the `.mjs` files are untouched and never imported.
- CI's newer uv might reject `uv_build>=0.8.22,<0.9`: **checked by construction** — it is a PEP 517 build requirement fetched from PyPI when the frontend's bundled backend does not match; any uv frontend can build with it.

**Selected**: A — editable install, package `nervouscsstem_docs` under `scripts/`.
**Rationale**: zero CI edits, works for every local invocation, keeps registration in `properdocs.yml`.
**Tradeoff**: the docs project stops being "virtual"; a build backend is fetched at sync time.
