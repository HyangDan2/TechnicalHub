import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { loadCatalog, validateCatalog, categories } from './catalog.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const catalogErrors = validateCatalog(await loadCatalog());
failures.push(...catalogErrors.map(error => 'data/catalog.json: ' + error));

const profileDir = path.join(root, 'content/profiles');
const names = await readdir(profileDir).catch(() => []);
const profileFiles = names.filter(name => name.endsWith('.md'));
const ids = new Set();
const slugs = new Set();
const required = ['id', 'slug', 'title', 'summary', 'categories', 'status', 'updatedAt', 'technologies', 'references'];
const allowed = new Set(required);
const validDate = value =>
  typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(value + 'T00:00:00Z')) &&
  new Date(value + 'T00:00:00Z').toISOString().slice(0, 10) === value;

for (const name of profileFiles) {
  const file = path.join(profileDir, name);
  const label = 'content/profiles/' + name;
  let parsed;
  try {
    parsed = matter(await readFile(file, 'utf8'));
  } catch (error) {
    failures.push(label + ': cannot parse front matter (' + error.message + ')');
    continue;
  }
  const data = parsed.data;
  const fail = message => failures.push(label + ': ' + message);

  for (const key of required) if (!(key in data)) fail('missing required field "' + key + '"');
  for (const key of Object.keys(data)) if (!allowed.has(key)) fail('unknown front matter field "' + key + '"');

  if (typeof data.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.id)) fail('id must be lowercase kebab-case');
  else if (ids.has(data.id)) fail('duplicate id "' + data.id + '"');
  else ids.add(data.id);

  if (typeof data.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) fail('slug must be lowercase kebab-case');
  else if (slugs.has(data.slug)) fail('duplicate slug "' + data.slug + '"');
  else slugs.add(data.slug);

  for (const field of ['title', 'summary']) {
    if (typeof data[field] !== 'string' || !data[field].trim()) fail(field + ' must be a non-empty string');
  }
  if (!Array.isArray(data.categories) || !data.categories.length || data.categories.some(value => !categories.includes(value))) {
    fail('categories must be a non-empty list of ' + categories.join(', '));
  } else if (new Set(data.categories).size !== data.categories.length) fail('categories cannot contain duplicates');

  if (!['draft', 'published', 'unavailable'].includes(data.status)) fail('status must be draft, published, or unavailable');
  if (!validDate(data.updatedAt)) fail('updatedAt must be a real YYYY-MM-DD date');

  if (!Array.isArray(data.technologies)) fail('technologies must be an array');
  else data.technologies.forEach((item, index) => {
    if (!item || typeof item.name !== 'string' || !item.name.trim() || typeof item.role !== 'string' || !item.role.trim()) {
      fail('technologies[' + index + '] must have non-empty name and role');
    }
    if (item && Object.keys(item).some(key => !['name', 'role', 'version'].includes(key))) {
      fail('technologies[' + index + '] has an unknown field');
    }
    if (item && item.version !== undefined && (typeof item.version !== 'string' || !item.version.trim())) {
      fail('technologies[' + index + '].version must be a non-empty string');
    }
  });

  if (!Array.isArray(data.references)) fail('references must be an array');
  else data.references.forEach((item, index) => {
    if (!item || typeof item.title !== 'string' || !item.title.trim() || typeof item.url !== 'string') {
      fail('references[' + index + '] must have a title and URL');
      return;
    }
    try {
      const url = new URL(item.url);
      if (url.protocol !== 'https:' || url.username || url.password) fail('references[' + index + '].url must be HTTPS without credentials');
    } catch {
      fail('references[' + index + '].url is invalid');
    }
    if (Object.keys(item).some(key => !['title', 'url'].includes(key))) fail('references[' + index + '] has an unknown field');
  });

  if (data.status === 'published' && !parsed.content.trim()) fail('published profile article body must not be empty');
  if (/REPLACE_WITH|example\.invalid|INSERT_PUBLIC/i.test(parsed.content)) fail('article contains placeholder text');
}

if (failures.length) {
  console.error(failures.map(error => '✗ ' + error).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Catalog and ' + profileFiles.length + ' profile(s) are valid.');
}
