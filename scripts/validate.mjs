import { loadCatalog, validateCatalog } from './catalog.mjs';
try {
  const errors = validateCatalog(await loadCatalog());
  if (errors.length) { console.error(errors.map(e => `✗ ${e}`).join('\n')); process.exitCode = 1; }
  else console.log('Catalog is valid.');
} catch (error) { console.error(`Catalog validation failed: ${error.message}`); process.exitCode = 1; }
