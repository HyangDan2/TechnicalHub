# Changelog

This file records meaningful, dated changes to TechnicalHub documentation and product behavior. Planned work is not reported as implemented behavior.

## 2026-11-13 — AGPilot0005 and AGPilot0006 technical profiles

- Added the `agent-core-platform` profile for HD2Lab Agent Core Platform (AGCore), AGPilot0005: a standalone agent runtime on FastAPI and LangGraph with a tool registry and dispatcher, context budgeting, SSE execution tracing, and a bundled web demo console. Sections cover the runtime architecture, core features, the demo console, the REST/SSE contract, and the privacy and isolation boundary.
- Added the `document-intelligence-service` profile for HD2Lab Document Intelligence Service (DocIntel), AGPilot0006: streaming ingestion, PDF/DOCX/PPTX parsing into a document tree, token-aware chunking with a strict 1,500-token ceiling, page and slide rendering with asset extraction, FTS5 search, and the query API contract, including the PyMuPDF AGPL v3 isolation note.
- Added six public assets under `assets/profiles/`: two 1200×630 social previews (`agent-core-platform-social.png`, `document-intelligence-service-social.png`), two 960×540 card thumbnails (`agent-core-platform-demo.png`, `document-intelligence-service-demo.png`), and two SVG architecture diagrams. The previews and thumbnails use the HD2Lab dark palette (`#101110`, `#ff824f`, `#1b1d19`) and the dual-skew mark; the demo images are renderings of the console and inspector layouts, not captures of a live session with real credentials.
- Technology versions follow the projects' own dependency pins and constraints (FastAPI 0.162 and LangGraph 1.2 in AGCore; FastAPI 0.115+ and Pydantic 2.9+ in DocIntel) rather than earlier draft numbers.
- Published as PR #3 (squash commit `4c31559`); [Pages run 43268051886](https://github.com/HyangDan2/TechnicalHub/actions/runs/43268051886) succeeded. Verified the hosted hub returns 200 with four cards, both profile routes return 200, and the two social previews, both card thumbnails, both architecture diagrams, and `data/catalog.json` return 200.
- `npm run validate` reports `Catalog and 4 profile(s) are valid.`; `npm run build` writes both `technologies/agent-core-platform/` and `technologies/document-intelligence-service/` routes plus their catalog entries. Reviewed the hub and both profile routes in Chromium at 1280 px and 390 px: four cards render with thumbnails and alt text, both detail pages load their diagrams and images, and the console and inspector renderings stay legible.

## 2026-11-10 — English interface

- Localized the hub interface to English: page title and meta/OG/Twitter description, skip link, header navigation ("Browse Projects"), hero copy and CTA ("Find Projects ↓"), collection heading and note, search placeholder and accessible label, reset button, filter-group and results labels, loading, empty, error, and count messages, card caption ("Profile Screen"), date subtitles ("Updated …" / "Inspected …"), and actions ("View Profile ↗" / "Open Repo ↗" with descriptive `aria-label`s).
- Search lower-casing now uses the `en` locale instead of `ko`.
- Profile content and GitHub metadata are unchanged.

## 2026-11-10 — HD2Lab brand alignment

- Aligned TechnicalHub with the HD2Lab brand: signature orange `--accent: #ff824f` on `#101110`, the dual-skew `.mark` in the header, `HD2Lab` / `TechnicalHub` wordmark, and ApplicationHub · GameHub · Web-HQ links in the global navigation.
- Synced the standard HD2Lab favicon set (`favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, `favicon.ico`) and regenerated the 1200×630 `assets/branding/share.png`.
- Replaced the simple `project-card-item` list card with the GameHub card spec: 16:9 `card-image` with caption, category kicker plus index, title, profile-update subtitle, summary, technology `meta-pill` stack, and an `action-link`. A single real link plus its overlay keeps whole-card navigation and keyboard activation.
- Added the profile technology names to the generated `data/catalog.json` and validated them, so the cards show a stack (Python, PySide6, OpenCV, MediaPipe …) instead of repeating the category chips.
- Rebranded the light profile pages: `.mark` header, `HD2Lab / TechnicalHub` brand, ApplicationHub · GameHub · Web-HQ menu, and a warm accent for the title period and footer.
- Verified `npm run validate` and `npm run build` locally, then reviewed the hub and profile pages in Chromium at 390, 768, and 1440 px (no horizontal overflow). Merge and Pages deployment remain pending.

## 2026-10-25

- Added the General Purpose Video/Image Mixer profile with the generic UML component diagram and a runtime capture using two still-image sources in Zig-zag mode; the private source and repository link are omitted.
- Published the profile in commit `deb89ab`; [Pages run 40149097366](https://github.com/HyangDan2/TechnicalHub/actions/runs/40149097366) succeeded. Verified the hosted card catalog, [profile page](https://hyangdan2.github.io/TechnicalHub/technologies/general-purpose-video-image-mixer/), and both profile assets returned successfully.
- Added GameHub-style profile-card thumbnails, a TechnicalHub SVG favicon, a 1200×630 social preview image, and canonical/Open Graph/Twitter metadata on the hub and profile routes.
- Published the branding and thumbnail update in commit `735eadc`; [Pages run 40175460773](https://github.com/HyangDan2/TechnicalHub/actions/runs/40175460773) succeeded. Verified the hosted home page, both profile routes, catalog thumbnails, favicon, social preview image, and profile demo images returned successfully.
- Added project-specific 1200×630 social preview images for each published profile. Profile Open Graph and Twitter metadata now use only that profile's image; the TechnicalHub home page keeps the shared hub preview. Updated profile authoring, architecture, contract, and harness guidance, and validate unique local preview assets and dimensions.
- Published the profile-specific preview update in commit `9b66018`; [Pages run 40178567595](https://github.com/HyangDan2/TechnicalHub/actions/runs/40178567595) succeeded. Verified the hosted home and both detail pages return 200, the home retains `assets/branding/share.png`, and each profile's Open Graph/Twitter image is its own 1200×630 PNG returning 200.
- Shortened the child profile header's hub return menu to `← TechHub` and aligned the profile authoring, contract, and harness guidance with the shared `/TechnicalHub/#projects` destination.
- Updated technology profile detail pages to use an isolated light editorial style based on EDPilot0001, while preserving the dark TechnicalHub/Hub design on the home page.
- Updated the architecture, harness, profile contract, documentation index, integrated TODO, and Front-end, Back-end, and Git administrator guides to describe the hub/detail style boundary and its validation requirements.
- Kept the profile layout and CSS self-contained in TechnicalHub; no EDPilot0001 code, scripts, content, or assets are reused.
- Made the full project card a single link so clicking its title, summary, tags, date, or card background opens the destination; kept the arrow as a visual cue.
- Added `PROFILE_CARD_GUIDE.md` as the standard workflow for profile briefs, Markdown metadata, public assets, whole-card navigation, TechnicalHub return navigation, visual review, and Pages publication; linked it from the contract, harness, architecture, and docs index.

## 2026-10-24

- Added the initial TechnicalHub documentation set: architecture proposal, harness guide, documentation index, and separate Front-end, Back-end, and Git administrator TODO lists.
- Initially proposed a static, catalog-driven site. Product decisions and implementation are recorded in the entries below.

- Implemented the empty project catalog contract, approved category vocabulary, deterministic validation, and static Korean project-link build. Hosting remains owned by another engineer.
- Confirmed `https://github.com/hyangdan2/TechnicalHub` as the canonical repository; the initial project list is empty, only verified information is publishable, and the parent page and hosting are assigned to another engineer.
- Replaced TechnicalHub's upper-right GitHub repository link with a Web-HQ return link and added a TechnicalHub card to the Web-HQ directory. Source-level navigation is bidirectional; hosted verification remains pending while the TechnicalHub Pages URL returns 404.
- 2026-10-24: Pushed the static site to `main`, enabled GitHub Pages, and verified the public project page. The Pages Actions workflow validates and builds before deploying only `dist/`; its first run succeeded.
- Corrected the Face Landmark Tracker component diagram: the Head Pose to Overlay route is continuous, arrowheads appear only at connector destinations, ISP-enabled and ISP-disabled paths are explicit, and the Local Settings source route enters Source Selection vertically from below.
- Added the English Face Landmark Tracker profile with the approved UML diagram and DMS warning capture; generated its home card and nested route from profile metadata, including a short searchable-card summary.
- Cleaned generated output before builds and explicitly copied public assets so removed profile pages cannot remain in `dist/` and nested image paths resolve correctly; added the SVG MIME type to the local preview server.


## 2026-10-24 — Initial profile implementation plan

- Recorded the approved next increment: author public-safe Markdown profile content, generate hub and detail pages with Eleventy, and keep private implementation source out of the public workflow.
- Added an integrated implementation TODO and revised the Front-end, Back-end, and Git administrator work lists to reflect the deployed site and remaining implementation.
- Added an initial draft profile, shared detail layout, generated hub card data, profile metadata validation, and nested-route preview support. The local Eleventy build passed.
- Updated the local preview server to serve both root paths and the GitHub Pages `/TechnicalHub/` base path; manually confirmed the home and nested profile route return expected HTML.
- The profile was subsequently renamed to Face Landmark Tracker. Its public material contains no source repository link or code. The local production build succeeded; browser regression tests, PR-only checks, and deployment remain separate. These local profile edits have not been pushed or deployed.
