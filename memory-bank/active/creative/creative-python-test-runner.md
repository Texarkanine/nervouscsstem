# Decision: Python Test Runner

## Requirements & Constraints

- Formatter behavior gets unit tests. Tests need `markdown` + `pymdownx`, which live in the `docs` dependency group.
- `npm test` is `node --test` with an explicit file list; no new CI jobs.
- Least new machinery.

## Options Evaluated

- **A. stdlib `unittest`**, `test/test_island_fence.py`, run with `uv run python -m unittest discover -s test -v`.
- **B. `pytest`** in a new `test` dependency group.
- **C. Drive Python from a `node --test` file** via `child_process`.

## Analysis

- A adds no dependency; `discover -s test` only matches `test*.py`, so the `.mjs` files are ignored. The `docs` group already provides `markdown` and `pymdownx`.
- B adds a dependency and relock for nicer asserts we do not need.
- C couples two runners and makes `npm test` require uv.

## Decision

### Choice Pre-Mortem

- `unittest discover -s test` might try to import `.mjs` files or fail on the missing `__init__.py`: **checked by stdlib semantics** — default pattern is `test*.py`; top-level start dirs are inserted on `sys.path`.

**Selected**: A. Documented in `memory-bank/techContext.md`; not wired into CI (operator: no new CI jobs).
**Tradeoff**: Python tests do not run in PR CI; the strict docs build in CI is the integration gate.
