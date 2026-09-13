import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SKILL_DIR = join(ROOT, 'skills', 'nerv');
const SKILL_MD = join(SKILL_DIR, 'SKILL.md');
const DOCS_DIR = join(ROOT, 'docs');
const SKILL_DOCS = join(SKILL_DIR, 'docs');
const LFS_POINTER_PREFIX = 'version https://git-lfs.github.com/spec/v1';

/**
 * Parse YAML frontmatter from a SKILL.md. Nested `metadata.version` is read
 * as a string; a top-level `version` key is ignored.
 *
 * @param {string} text
 * @returns {{ name?: string, description?: string, metadata: { version?: string } }}
 */
function parseSkillFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, 'SKILL.md must start with YAML frontmatter');
  const yaml = match[1];
  const name = yaml.match(/^name:\s*(.+)$/m)?.[1].trim();
  const description = yaml.match(/^description:\s*(.+)$/m)?.[1].trim();
  const versionMatch = yaml.match(/^[ \t]+version:\s*"([^"]+)"/m);
  return {
    name,
    description,
    metadata: { version: versionMatch?.[1] },
  };
}

/**
 * Recursively list files under `dir` as paths relative to `dir`.
 *
 * @param {string} dir
 * @returns {string[]}
 */
function listFiles(dir) {
  if (!existsSync(dir)) {
    return [];
  }
  /** @type {string[]} */
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFiles(abs).map((rel) => join(entry.name, rel)));
    } else {
      out.push(entry.name);
    }
  }
  return out;
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function markdownDocs(dir) {
  return listFiles(dir)
    .filter((rel) => rel.endsWith('.md'))
    .sort();
}

/**
 * Parse `npm pack --dry-run --json` into packed paths.
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

describe('skill install contract', () => {
  it('has a discoverable skills/nerv/SKILL.md with name matching the directory and a non-empty description', () => {
    assert.ok(existsSync(SKILL_MD), 'skills/nerv/SKILL.md must exist');
    const fm = parseSkillFrontmatter(readFileSync(SKILL_MD, 'utf8'));
    assert.equal(fm.name, 'nerv');
    assert.equal(fm.name, dirname(SKILL_MD).split(sep).at(-1));
    assert.ok(fm.description && fm.description.length > 0, 'description must be non-empty');
  });

  it('locks SKILL.md metadata.version to package.json version', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
    const fm = parseSkillFrontmatter(readFileSync(SKILL_MD, 'utf8'));
    assert.equal(typeof fm.metadata.version, 'string');
    assert.equal(fm.metadata.version, pkg.version);
  });

  it('copies every docs markdown file into skills/nerv/docs at the same relative path', () => {
    const docs = markdownDocs(DOCS_DIR).filter((rel) => rel !== 'reading.md');
    assert.ok(docs.length > 0, 'docs/ must contain markdown');
    for (const rel of docs) {
      const source = join(DOCS_DIR, rel);
      const copy = join(SKILL_DOCS, rel);
      assert.ok(existsSync(copy), `missing skill copy of docs/${rel.replaceAll('\\', '/')}`);
      assert.equal(
        readFileSync(copy, 'utf8'),
        readFileSync(source, 'utf8'),
        `skills/nerv/docs/${rel.replaceAll('\\', '/')} must match docs/${rel.replaceAll('\\', '/')}`,
      );
    }
  });

  it('does not ship the screenshot library or Git LFS pointer files in the skill', () => {
    const skillFiles = listFiles(SKILL_DIR);
    for (const rel of skillFiles) {
      const parts = rel.split(sep);
      assert.ok(!parts.includes('img'), `skill must not contain an img path: ${rel}`);
      const abs = join(SKILL_DIR, rel);
      if (statSync(abs).isFile()) {
        const start = readFileSync(abs, 'utf8').slice(0, LFS_POINTER_PREFIX.length);
        assert.notEqual(start, LFS_POINTER_PREFIX, `skill must not contain an LFS pointer: ${rel}`);
      }
    }
  });

  it('does not include skills/ in the npm pack', () => {
    const files = packedPaths();
    const leaked = files.filter((path) => path === 'skills' || path.startsWith('skills/'));
    assert.deepEqual(leaked, [], 'npm pack must not include the skill directory');
  });
});
