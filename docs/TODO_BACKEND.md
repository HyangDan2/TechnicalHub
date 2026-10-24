# Back-end engineer TODO

**Status:** initial catalog contract, deterministic validation, and static build implemented. Hosting remains owned by another engineer.

## Work items

| ID | Priority | Task and output | Depends on | Acceptance criteria | Status |
| --- | --- | --- | --- | --- | --- |
| BE-01 | P0 | Define catalog model and category vocabulary. | Product decisions | Schema and empty catalog use the approved fields and categories. | Done |
| BE-02 | P0 | Implement JSON schema and deterministic catalog validator. | BE-01 | Invalid shape, duplicate IDs/repos, unsafe URLs, bad categories, and invalid dates fail with actionable errors. | Done |
| BE-03 | P0 | Populate catalog from approved real project URLs. | Maintainer supplies project sources | Only verified entries are included; currently no sources and catalog remains empty. | Waiting for project URLs |
| BE-04 | P0 | Implement catalog validation operations. | BE-01 | Validation is deterministic and has no network dependency. | Done |
| BE-05 | P0 | Implement clean static build. | BE-02 | Build validates first, recreates `dist/`, and emits only the public project-link page and catalog. | Done |
| BE-06 | P1 | Implement local preview and bounded external link checker. | BE-05 | Preview exists; external link checker remains a follow-up and is separate from deterministic verification. | Partial |
| BE-07 | P1 | Implement hosted acceptance check. | Hosting details from hosting owner | Check page/catalog/assets and sample project links. | Out of scope for this owner |
| BE-08 | P1 | Document catalog refresh rules. | BE-01–BE-03 | Repeated repository requests update stable entries and inspection date. | In progress |

## Catalog contract

`data/catalog.json` contains a version and an initially empty `projects` array. Each verified project has a stable kebab-case ID, Korean display name, HTTPS repository URL, one or more approved categories (`HW`, `SW`, `AI`, `Data`, `ML`, `DL`, `Utility`, `Etc`), and `inspectedAt` date. No project descriptions or detail pages are part of the first release. Only verified information is included.

## Boundaries

- Do not add a database, API, server, or deployment workflow without an approved architecture change.
- Hosting and the parent page `https://github.com/hyangdan2` are owned by another engineer. This repository is `https://github.com/hyangdan2/TechnicalHub`.
- Keep external network checks separate from local deterministic verification.

## Commands

- `npm run validate`: validate the catalog locally.
- `npm run build`: validate and recreate the static site in `dist/`.
- `npm run dev`: build, then serve the output at `http://localhost:4174` by default (`PORT` can override it).
