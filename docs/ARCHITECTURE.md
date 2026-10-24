# TechnicalHub architecture

**Status:** Catalog contract, validation, static build, and GitHub Pages deployment are implemented.

## Purpose and scope

TechnicalHub is a Korean-language directory that provides links to verified software projects. It does not provide project detail pages, public submissions, a runtime API, database, package registry, or dependency scanner. The initial catalog is intentionally empty because no project URLs have been supplied.

The canonical repository is `https://github.com/hyangdan2/TechnicalHub`. The owner authorized GitHub Pages hosting at `https://hyangdan2.github.io/TechnicalHub/`; the parent page `https://github.com/hyangdan2` remains maintained separately.

Navigation connects TechnicalHub and Web-HQ in both directions: TechnicalHub's upper-right `Web-HQ` link targets `https://hyangdan2.github.io/`, and Web-HQ's hub directory links to `https://hyangdan2.github.io/TechnicalHub/`.

## Data contract

`data/catalog.json` is the source of truth. Its root has `schemaVersion: 1` and a `projects` array. Each project has a stable kebab-case `id`, display `name`, HTTPS `repositoryUrl`, one or more `categories`, and the `inspectedAt` date (`YYYY-MM-DD`). Only verified information belongs in the catalog. The approved categories are `HW`, `SW`, `AI`, `Data`, `ML`, `DL`, `Utility`, and `Etc`.

Example record (illustrative only):

```json
{
  "id": "example-project",
  "name": "Example Project",
  "repositoryUrl": "https://github.com/OWNER/REPOSITORY",
  "categories": ["SW"],
  "inspectedAt": "YYYY-MM-DD"
}
```

IDs and normalized repository URLs must be unique. Repository URLs cannot contain credentials, query strings, or fragments. No project records are shipped until real URLs are provided and inspected.

## Components and commands

- `schema/catalog.schema.json`: machine-readable record shape.
- `scripts/catalog.mjs`: deterministic validation helpers.
- `scripts/validate.mjs`: `npm run validate` entry point.
- `scripts/build.mjs`: `npm run build`; validates first, recreates `dist/`, writes the Korean link page and public catalog.
- `scripts/dev.mjs`: `npm run dev`; serves the built site at `http://localhost:4174` by default (`PORT` can override it).

The static page renders catalog values as text and links directly to project repositories. There are no runtime network requests except loading the local catalog. The build contains no evidence notes, drafts, or project execution.

## Out of scope

GitHub Pages deployment publishes the generated `dist/` directory through Actions. Hosted acceptance checks and the parent GitHub page remain follow-up work. Do not add a server or external link checker without a separate implementation decision. See [the harness guide](HARNESS_GUIDE.md) and [back-end TODO](TODO_BACKEND.md).
