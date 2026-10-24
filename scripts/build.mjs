import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCatalog } from './catalog.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(await readFile(path.join(root, 'data/catalog.json'), 'utf8'));
const errors = validateCatalog(catalog);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
const out = path.join(root, 'dist');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, 'index.html'), path.join(out, 'index.html'));
await cp(path.join(root, 'css'), path.join(out, 'css'), { recursive: true });
await cp(path.join(root, 'js'), path.join(out, 'js'), { recursive: true });
await mkdir(path.join(out, 'data'), { recursive: true });
await writeFile(path.join(out, 'data/catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);
console.log('Built static site in dist/.');
