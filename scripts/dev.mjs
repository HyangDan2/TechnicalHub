import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
if (!existsSync(root)) { console.error('Run npm run build first.'); process.exit(1); }
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };
const port = Number(process.env.PORT || 4174);
http.createServer((req, res) => {
  let requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (requested === '/TechnicalHub') requested = '/';
  else if (requested.startsWith('/TechnicalHub/')) requested = requested.slice('/TechnicalHub'.length);
  const target = requested === '/' ? path.join(root, 'index.html') : path.resolve(root, `.${requested}`);
  if (!target.startsWith(`${root}${path.sep}`) && target !== path.join(root, 'index.html')) { res.writeHead(403).end(); return; }
  const file = existsSync(target) && statSync(target).isDirectory() ? path.join(target, 'index.html') : target;
  if (!existsSync(file)) { res.writeHead(404).end('Not found'); return; }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`TechnicalHub preview: http://localhost:${port}`));
