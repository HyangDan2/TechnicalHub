# Changelog

This file records meaningful, dated changes to TechnicalHub documentation and product behavior. Planned work is not reported as implemented behavior.

## 2026-10-25

- Updated technology profile detail pages to use an isolated light editorial style based on EDPilot0001, while preserving the dark TechnicalHub/Hub design on the home page.
- Updated the architecture, harness, profile contract, documentation index, integrated TODO, and Front-end, Back-end, and Git administrator guides to describe the hub/detail style boundary and its validation requirements.
- Kept the profile layout and CSS self-contained in TechnicalHub; no EDPilot0001 code, scripts, content, or assets are reused.

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
