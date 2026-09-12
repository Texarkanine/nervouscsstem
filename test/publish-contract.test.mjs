import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const PACKAGE_JSON = resolve(ROOT, 'package.json');

/**
 * Parse `npm pack --dry-run --json` into the list of paths that would be in the tarball.
 * npm prints a JSON array of pack results; each entry has a `files` array of `{ path }`.
 *
 * @returns {string[]}
 */
function packedPaths() {
  const raw = execSync('npm pack --dry-run --json', {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  const parsed = JSON.parse(raw);
  const entry = Array.isArray(parsed) ? parsed[0] : parsed;
  return (entry.files ?? []).map((file) => file.path);
}

describe('npm publish contract', () => {
  let pkg;
  let files;

  before(() => {
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
    execSync('npm run build:min', { cwd: ROOT, stdio: 'pipe' });
    pkg = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8'));
    files = packedPaths();
  });

  it('includes dist/nerv.css and dist/nerv.js in the pack after build', () => {
    assert.ok(files.includes('dist/nerv.css'), 'tarball must include dist/nerv.css');
    assert.ok(files.includes('dist/nerv.js'), 'tarball must include dist/nerv.js');
  });

  it('does not include extra dist artifacts such as nerv.min.css', () => {
    assert.ok(
      !files.includes('dist/nerv.min.css'),
      'files must list only dist/nerv.css and dist/nerv.js, not dist/nerv.min.css',
    );
  });

  it('is not marked private', () => {
    assert.notEqual(pkg.private, true, 'package.json must not set private: true');
  });

  it('repository.url names the public GitHub repo', () => {
    assert.equal(typeof pkg.repository?.url, 'string');
    assert.match(
      pkg.repository.url,
      /github\.com\/Texarkanine\/nervouscsstem/,
      'repository.url must contain github.com/Texarkanine/nervouscsstem',
    );
  });
});
