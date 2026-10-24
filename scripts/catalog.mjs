import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const categories = ['HW', 'SW', 'AI', 'Data', 'ML', 'DL', 'Utility', 'Etc'];
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export async function loadCatalog(file = path.join(root, 'data/catalog.json')) {
  return JSON.parse(await readFile(file, 'utf8'));
}

export function validateCatalog(catalog) {
  const errors = [];
  const fail = (where, message) => errors.push(`${where}: ${message}`);
  if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog)) return ['$: expected object'];
  if (catalog.schemaVersion !== 1) fail('$.schemaVersion', 'must equal 1');
  if (!Array.isArray(catalog.projects)) fail('$.projects', 'expected array');
  for (const key of Object.keys(catalog)) if (!['schemaVersion', 'projects'].includes(key)) fail(`$.${key}`, 'unknown field');
  if (!Array.isArray(catalog.projects)) return errors;
  const ids = new Set();
  const repos = new Set();
  catalog.projects.forEach((p, i) => {
    const at = `$.projects[${i}]`;
    if (!p || typeof p !== 'object' || Array.isArray(p)) { fail(at, 'expected object'); return; }
    for (const key of Object.keys(p)) if (!['id', 'name', 'repositoryUrl', 'categories', 'inspectedAt'].includes(key)) fail(`${at}.${key}`, 'unknown field');
    for (const key of ['id', 'name', 'repositoryUrl', 'categories', 'inspectedAt']) if (!(key in p)) fail(`${at}.${key}`, 'required field missing');
    if (typeof p.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id)) fail(`${at}.id`, 'expected lowercase kebab-case ID');
    else if (ids.has(p.id)) fail(`${at}.id`, `duplicate ID ${p.id}`); else ids.add(p.id);
    if (typeof p.name !== 'string' || !p.name.trim()) fail(`${at}.name`, 'must be a non-empty string');
    if (typeof p.repositoryUrl !== 'string') fail(`${at}.repositoryUrl`, 'must be a string');
    else {
      try {
        const url = new URL(p.repositoryUrl);
        if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) fail(`${at}.repositoryUrl`, 'must be HTTPS without credentials, query, or fragment');
        const normalized = `${url.hostname.toLowerCase()}${url.pathname.replace(/\/$/, '').toLowerCase()}`;
        if (repos.has(normalized)) fail(`${at}.repositoryUrl`, 'duplicate normalized repository URL'); else repos.add(normalized);
      } catch { fail(`${at}.repositoryUrl`, 'invalid URL'); }
    }
    if (!Array.isArray(p.categories) || p.categories.length === 0) fail(`${at}.categories`, 'must be a non-empty array');
    else {
      const seen = new Set();
      p.categories.forEach((category, j) => {
        if (!categories.includes(category)) fail(`${at}.categories[${j}]`, `must be one of ${categories.join(', ')}`);
        if (seen.has(category)) fail(`${at}.categories[${j}]`, 'duplicate category');
        seen.add(category);
      });
    }
    if (typeof p.inspectedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(p.inspectedAt) || Number.isNaN(Date.parse(`${p.inspectedAt}T00:00:00Z`)) || new Date(`${p.inspectedAt}T00:00:00Z`).toISOString().slice(0, 10) !== p.inspectedAt) fail(`${at}.inspectedAt`, 'expected a real YYYY-MM-DD date');
  });
  return errors;
}
