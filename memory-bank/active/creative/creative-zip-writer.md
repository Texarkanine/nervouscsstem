# Decision: Zip Writer

## Context

The offline bundle is a zip built by an npm script on developer machines and on GitHub's `ubuntu-latest` runner in `release-please.yaml`. Tests must also read the zip back to check what a consumer receives.

Constraints:

- Do not assume a `zip` CLI exists; the build must be reproducible across machines.
- Same inputs must produce the same bytes (fixed timestamps, stable entry order), so the release asset is reproducible and a determinism test is possible.
- Node is the project's only build runtime for artifacts (`sass`, `node --test`); Python/uv is docs-only.
- Minimal dependency surface; devDependencies only (nothing enters the npm tarball).

## Options Evaluated

- **`fflate` devDependency**: `zipSync` to write with a fixed per-entry `mtime`, `unzipSync` in tests to read. MIT, zero dependencies, 0.8.3.
- **Hand-rolled zip in Node stdlib**: write STORE/DEFLATE local headers + central directory with `zlib.deflateRawSync` and `zlib.crc32` (Node ≥ 22.2), plus a hand-rolled reader for tests.
- **Shell out to `zip` / Python `zipfile`**: rely on a system tool.

## Analysis

| Criterion | fflate | Hand-rolled | System tool |
|---|---|---|---|
| Reproducible bytes | Yes, fixed `mtime`, sorted input | Yes, full control | `zip` embeds local mtimes/uid unless flags; Python OK but cross-runtime |
| Runs everywhere Node runs | Yes | Yes (Node ≥ 22.2 for `crc32`) | No guarantee (`zip` absent on some hosts; Python not a build dep) |
| Code we maintain | ~0 | ~70 lines of binary format (writer + reader) | Low, but shell glue |
| Independent verification in tests | Reader is a widely used library | Reader shares author and bugs with writer | Yes |
| Dependency cost | One zero-dep devDependency | None | Implicit environment dependency |

Key insights:

- A hand-rolled writer needs a hand-rolled reader for tests, so writer bugs could be mirrored by reader bugs and never show.
- fflate's default `mtime` is "now"; determinism requires passing a fixed date (≥ 1980, the DOS epoch).

## Decision

**Selected**: `fflate` as an exact-pinned devDependency.
**Rationale**: Reproducible, runs anywhere Node runs, no zip format code to maintain, and tests read the zip with a well-exercised library rather than our own parser.
**Tradeoff**: One more devDependency, in exchange for about 70 lines of binary-format code we don't have to write.

## Implementation Notes

- `zipSync(entries, { level: 9, mtime: new Date(1980, 0, 1, 12, 0, 0) })` with entries inserted in sorted path order. fflate encodes the DOS timestamp with local-time getters, so the date must be built from local fields: a UTC instant like `new Date('1980-01-01T00:00:00Z')` throws in UTC-5 (it is 1979 locally) and would give different bytes per timezone. PoC: identical SHA-256 under `TZ=UTC`, `America/Chicago`, `Asia/Tokyo`; Python `zipfile.testzip()` clean.
- Tests use `unzipSync(readFileSync(zipPath))`.
- Pin exact `"fflate": "0.8.3"`.
