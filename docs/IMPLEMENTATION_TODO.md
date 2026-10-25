# TechnicalHub Face Landmark Tracker implementation TODO

**Goal:** add the first public technical profile for Face Landmark Tracker to the existing TechnicalHub, with its source project remaining private.

**Current site:** https://hyangdan2.github.io/TechnicalHub/
**Proposed profile route:** /TechnicalHub/technologies/face-landmark-tracker/
**Status:** English profile content, the full-card home link, and the profile detail route are deployed. The detail layout follows the EDPilot0001 editorial visual reference while the hub keeps its dark Hub style. The reusable workflow is in `docs/PROFILE_CARD_GUIDE.md`; broader responsive and automated browser checks remain follow-up work.

## Work board

| ID | Owner | Priority | Work | Depends on | Acceptance / completion evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| DEC-01 | Maintainer | P0 | Approve the public disclosure boundary and Face Landmark Tracker article facts, stack names/roles, version details, diagram/image, limitations, and wording about source privacy. | None | User authorized an English public overview, approved project naming and architecture terminology, and requested the demonstration capture; no source URL or code is included. | Approved scope reflected in local profile |
| BE-01 | Back-end | P0 | Define Markdown profile metadata and route contract, retaining the current category vocabulary. | DEC-01 | Contract covers stable ID/slug, title, summary, categories, status, update date, stack names/roles, article body, and optional public references; private repository URL is not required. | Done |
| BE-02 | Back-end | P0 | Add Eleventy static generation and migrate the existing home page/assets into shared templates. | BE-01 | Build generates the home page and nested profile route, supports the GitHub Pages base path, and preserves the existing visual/interaction behavior. | Done; local build succeeds |
| BE-03 | Back-end | P0 | Create the Face Landmark Tracker Markdown profile and generate hub listing/search data from the same content source. | BE-01–BE-02; DEC-01 | One editable profile drives both detail and home card; no manually duplicated project record; draft content is absent from dist output. | Done; profile and hub catalog generated locally |
| BE-04 | Back-end | P0 | Add profile validation and deterministic tests. | BE-01 | Invalid metadata, duplicate slug, missing article, invalid category/status/URL, or missing local asset fails clearly; draft profiles are excluded. | Core validation implemented; automated regression tests remain planned |
| FE-01 | Front-end | P0 | Add the Face Landmark Tracker card with a short summary and internal profile link. | BE-01; BE-03 | Entire card is one accessible link; title, summary, categories, and update date are visible, with no private repository link. | Deployed; local and hosted link structure verified |
| FE-02 | Front-end | P0 | Implement the English profile layout in the EDPilot0001 editorial visual style, keeping the home page on the Hub style. | BE-02–BE-03 | Purpose, architecture diagram, technology roles, demonstration image, limitations, update date, and return navigation render clearly; profile CSS is isolated and EDPilot0001 source/assets are not copied. | Deployed; hosted route and media verified |
| FE-03 | Front-end | P1 | Verify search/filter and accessibility across home and detail routes. | FE-01–FE-02; BE-04 | Search/filter, keyboard use, visible focus, nested-route assets, 360/390/768/1440px layouts, long text, and reduced motion are checked. | Planned |
| GIT-01 | Git administrator | P0 | Add pull-request validation/build CI without deployment. | BE-02 command interface | PR workflow uses the lockfile and deterministic checks; PR runs cannot deploy Pages. | Planned |
| GIT-02 | Git administrator | P0 | Lock Eleventy dependencies and align local/CI Node versions. | BE-02 package manifest | Lockfile is committed; clean install and build work locally and in CI; no private-source credential is configured. | Planned |
| GIT-03 | Git administrator | P0 | Deploy and verify the nested profile route on GitHub Pages. | FE-02; BE-02–BE-04; GIT-01 | Only dist is deployed; home and profile URLs, styles, images, and navigation work on the hosted site. | Done; deployment and hosted route verified |
| GIT-04 | Git administrator | P1 | Record release evidence and rollback steps. | GIT-03 | Record the revision, workflow run, hosted URLs, style asset checks, limitations, recovery procedure, and post-rollback verification. | Planned |

## Dependency order

1. Maintainer approves public claims and assets (DEC-01).
2. Back-end defines the profile fields and route contract (BE-01).
3. Back-end and Git administrator establish Eleventy, path handling, and locked build tooling (BE-02, GIT-02).
4. Back-end creates the profile source and generated listing data; Front-end links and renders the profile (BE-03, FE-01, FE-02).
5. Back-end, Front-end, and Git administrator verify content, browser behavior, and pull-request checks (BE-04, FE-03, GIT-01).
6. Git administrator deploys and verifies the home and nested profile routes (GIT-03–GIT-04).

Build tooling and a local draft can be created before final review. Deployment waits for exact copy review and hosted acceptance.

## Release gate

Do not publish until the profile content is approved, deterministic verification passes, the build contains no private source URL or unapproved material, and the deployed home card and nested profile route have been checked.
