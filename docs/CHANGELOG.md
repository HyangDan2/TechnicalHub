# Changelog

This file records meaningful, dated changes to TechnicalHub documentation and product behavior. Planned work is not reported as implemented behavior.

## 2026-10-24

- Added the initial TechnicalHub documentation set: architecture proposal, harness guide, documentation index, and separate Front-end, Back-end, and Git administrator TODO lists.
- Initially proposed a static, catalog-driven site. Product decisions and implementation are recorded in the entries below.

- Implemented the empty project catalog contract, approved category vocabulary, deterministic validation, and static Korean project-link build. Hosting remains owned by another engineer.
- Confirmed `https://github.com/hyangdan2/TechnicalHub` as the canonical repository; the initial project list is empty, only verified information is publishable, and the parent page and hosting are assigned to another engineer.
- Replaced TechnicalHub's upper-right GitHub repository link with a Web-HQ return link and added a TechnicalHub card to the Web-HQ directory. Source-level navigation is bidirectional; hosted verification remains pending while the TechnicalHub Pages URL returns 404.
- 2026-10-24: Pushed the static site to `main`, enabled GitHub Pages, and verified the public project page. Follow-up deployment workflow publishes only `dist/` through Actions.
