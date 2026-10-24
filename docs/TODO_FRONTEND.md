# Front-end engineer TODO

**Status:** first pass aligned to the parent GameHub visual system; mobile and interaction acceptance checks remain.

Product decisions are recorded in [Architecture](ARCHITECTURE.md): Korean UI, empty initial catalog, categories `HW`, `SW`, `AI`, `Data`, `ML`, `DL`, `Utility`, `Etc`, confirmed information only, direct project repository links, and inspection date only.

## Work items

| ID | Priority | Task and output | Depends on | Acceptance criteria | Status |
| --- | --- | --- | --- | --- | --- |
| FE-01 | P0 | Define page structure and interaction states. | Product decisions in `ARCHITECTURE.md` | Search, category filters, project results, loading, empty, and error states are defined; project links open repositories directly. | Complete |
| FE-02 | P0 | Implement semantic page shell, responsive layout, and shared styles aligned with parent GameHub. | FE-01; source tree | Korean landmarks and heading order; narrow and wide layouts; visible focus; reduced-motion support; matching dark/lime palette, typography, shell width, hero and collection rhythm, controls, and footer. | Implemented; desktop visual reviewed; mobile review pending |
| FE-03 | P0 | Load and safely render project links from the catalog. | Catalog contract in `data/catalog.json` | Project names are text; links are HTTPS from validated catalog; loading, empty, and failure states are presented. | Implemented; empty state visually confirmed |
| FE-04 | P0 | Implement project search and category filters. | Catalog category vocabulary | Search and category combine; result count, selected state, and reset work; no-result state is clear. | Implemented; interaction acceptance pending |
| FE-05 | P1 | Implement project detail/evidence presentation. | Product decision | Not in first release: only direct project links, categories, and inspection date are displayed. | Dropped by product decision |
| FE-06 | P1 | Check keyboard, viewport, text expansion, and browser behavior. | FE-02–FE-04 | Browser checks cover keyboard/focus, representative widths, long labels, reduced motion, filters, and load failure. | Planned |
| FE-07 | P1 | Review production build visually and fix UI defects against GameHub. | FE-02–FE-06; production artifact | Review desktop and mobile screenshots; record browser and viewport; fix observed defects. | Desktop reviewed in in-app browser at 1280px; mobile and interaction review pending |
| FE-08 | P1 | Connect TechnicalHub and Web-HQ in both directions. | Web-HQ source and TechnicalHub Pages deployment | TechnicalHub's upper-right link opens Web-HQ; Web-HQ lists TechnicalHub; verify both directions on deployed URLs. | Source links implemented; TechnicalHub is live at `https://hyangdan2.github.io/TechnicalHub/`; verify the parent-page link separately |

## Boundaries

- Keep project records in the catalog; do not hardcode project cards or call external APIs at runtime.
- Display no detail or evidence page in the first release.
- TechnicalHub deploys through GitHub Pages; the parent Web-HQ page is maintained separately.
- Web-HQ is `https://hyangdan2.github.io/`; its hub directory should link to TechnicalHub, and TechnicalHub should provide a same-tab Web-HQ return link.
- Treat the parent GameHub source at `../GameHub` as the visual reference; preserve its dark background, lime accent, typography, content width, header/hero/collection hierarchy, card borders, responsive behavior, and reduced-motion conventions while adapting arcade-specific content to project discovery.

## Handoff

Front-end handoff requires FE-02 through FE-06 acceptance checks and a record of remaining limitations. FE-07 is required before release sign-off.
