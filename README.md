# TechnicalHub

TechnicalHub is a directory of reviewed software project technology profiles. The first profile, Face Landmark Tracker, introduces a private desktop application through approved technical copy, an architecture diagram, and a demonstration capture. The implementation source remains private and is not linked from the profile.

## Local commands

- `npm run validate` — validate the catalog without network access.
- `npm run build` — create the static site in `dist/`.
- `npm run dev` — build and preview at `http://localhost:4174` by default (`PORT` can override it).

Live site: [hyangdan2.github.io/TechnicalHub](https://hyangdan2.github.io/TechnicalHub/). The Face Landmark Tracker profile source is [content/profiles/face-landmark-tracker.md](content/profiles/face-landmark-tracker.md); the local generated profile route is `/TechnicalHub/technologies/face-landmark-tracker/`. Publishing the latest local edits to GitHub Pages remains a separate release step. The parent GitHub page is maintained separately. See [documentation](docs/README.md), the [architecture](docs/ARCHITECTURE.md), and the [implementation TODO](docs/IMPLEMENTATION_TODO.md).
