# Back-end engineer TODO

**Scope:** static-content pipeline, Markdown metadata, page generation, and validation. TechnicalHub has no runtime server; it is currently plain HTML/CSS/JavaScript backed by a JSON catalog.

| ID | Priority | Task and output | Depends on | Acceptance criteria | Status |
| --- | --- | --- | --- | --- | --- |
| BE-01 | P0 | Define profile front matter and route contract while retaining the current approved category vocabulary. | Maintainer content brief DEC-01 | Contract covers stable ID/slug, title, summary, categories, status, update date, technologies and roles, article body, optional public references, and omission of private source URLs. | Done |
| BE-02 | P0 | Add a pinned Eleventy static build using Markdown profiles and the existing hub page/assets. | BE-01 | Build produces the home page and nested profile routes from shared templates, supports the /TechnicalHub/ base path, and keeps runtime behavior static. | Done; local build succeeds |
| BE-03 | P0 | Generate hub listing/search data from the same Markdown profiles used for detail pages. | BE-01–BE-02 | No manually duplicated project metadata; current home filters/search consume generated data or card metadata; drafts are omitted from dist. | Done; generated catalog uses profile front matter |
| BE-04 | P0 | Implement profile validation and publication checks. | BE-01 | Missing fields, invalid status/category/URL, duplicate slug, empty published article, missing local asset, and placeholder content fail with actionable errors. | Core checks implemented; automated tests remain planned |
| BE-05 | P0 | Author the Face Landmark Tracker Markdown profile from owner-approved facts and assets. | DEC-01 | Profile explains purpose, approved architecture, technology roles, update date, and limits; no source code or private repository link is published. | Implemented and deployed |
| BE-06 | P1 | Add deterministic unit tests and a complete local verification command. | BE-02–BE-04 | Tests cover metadata validation, draft exclusion, route generation, safe optional links, and generated listing data; verify runs without network access. | Planned |
| BE-07 | P1 | Keep local preview, link checking, and hosted acceptance separate. | BE-02; GIT-03 | Dev serves nested routes; external link checking is separate; hosted check verifies home/detail routes after deployment. | Planned |

## Data and privacy rules

- Markdown profiles are the editable source of truth; generated HTML/listing data are build outputs.
- Do not fetch or check out private source code from the public-site workflow.
- Do not put private source URLs, internal evidence, credentials, code excerpts, or unapproved diagrams in the public repository.
- For a private source, omit its repository link. If approved, state only that the source is private.

## Current implementation

- `schema/profile-frontmatter.schema.json` and `docs/PROFILE_CONTRACT.md` define the profile metadata and public-content boundary.
- `docs/PROFILE_CARD_GUIDE.md` is the standard workflow for adding a profile and its generated full-card home link.
- Eleventy is pinned in `package.json` and `package-lock.json`; `eleventy.config.js` builds a clean static output while passing through the current home page, assets, and catalog.
- The Face Landmark Tracker profile, shared English layout, generated catalog entry, profile route, and core profile validation are implemented and deployed. Automated browser regression tests remain planned.
- The profile template links only to `css/profile.css`, which implements the EDPilot0001 editorial visual reference; the home page continues to use the Hub stylesheet. Keep route-relative profile asset paths valid at `/TechnicalHub/technologies/<slug>/`.
