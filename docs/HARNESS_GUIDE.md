# TechnicalHub harness guide

## Commands

| Command | Behavior |
| --- | --- |
| `npm run validate` | Validate catalog shape, unique IDs and repositories, safe HTTPS URLs, allowed categories, and inspection dates. No network access. |
| `npm run build` | Validate, clear and recreate `dist/`, then emit the static Korean project-link page and catalog. |
| `npm run dev` | Build and serve `dist/` at `http://localhost:4174` by default; set `PORT` to override. |

## Catalog maintenance

Only add a project after inspecting its repository and confirming the information being published. The first release publishes project links and categories only. Record the inspection date in the catalog, use the stable project ID when updating an existing repository, and never add inferred claims. The catalog begins empty and remains empty until verified project URLs are supplied.

Run `npm run validate` before `npm run build`. Review the diff for incorrect URLs, duplicate repositories, category mistakes, and unsupported entries. The validator is deterministic and does not contact project repositories.

## Ownership boundary

The canonical repository is `https://github.com/hyangdan2/TechnicalHub`. Another engineer owns hosting, publishing, the parent page `https://github.com/hyangdan2`, CI, and hosted acceptance checks. Do not infer or configure a Pages URL or publishing workflow here.
