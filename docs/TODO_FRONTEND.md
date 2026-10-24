# Front-end engineer TODO

**Scope:** add profile detail pages to TechnicalHub while preserving the existing Hub design on the home page. Technology profile details use the EDPilot0001 editorial visual reference, isolated from the home-page stylesheet. The home page, category filters, search, and static catalog rendering are implemented.

| ID | Priority | Task and output | Depends on | Acceptance criteria | Status |
| --- | --- | --- | --- | --- | --- |
| FE-01 | P0 | Add the Face Landmark Tracker home profile card with an internal profile link. | BE-01 profile route/metadata contract | The entire card is one accessible link to the same-site profile; title, summary, categories, and update date are visible, with no private repository link. | Implemented; build and local browser check pending |
| FE-02 | P0 | Create the shared Face Landmark Tracker detail-page layout and public profile using the EDPilot0001 editorial style. | BE-01; BE-02 generated route | Page has English content, warm ivory background, green/teal palette, monospaced labels, article, technology roles, approved diagram and demonstration image, update date, and a clear return-to-hub link. Profile styling is isolated from Hub styles. | Implemented locally; visual verification pending |
| FE-03 | P0 | Adapt category/search behavior and empty states to the profile-card model. | FE-01; BE-01 | Existing search and filters continue to work; cards route internally; drafts are not shown; empty and no-results states remain distinct. | Planned |
| FE-04 | P1 | Add accessible content and responsive detail-page behavior. | FE-02 | Semantic headings, keyboard navigation, visible focus, useful diagram alternatives, 360/390/768/1440px layout checks, text expansion, and reduced motion are verified. | Planned |
| FE-05 | P1 | Review generated production pages and relative paths. | BE-03; GIT-03 | Home keeps the dark Hub style; profile uses EDPilot0001's light editorial style; both work under /TechnicalHub/ with correct CSS, images, and navigation at desktop/mobile widths. | Local build and image paths verified; refreshed visual review and hosted route pending |

## Boundaries

- Keep the private source repository URL out of rendered HTML, generated data, metadata, and outbound links.
- Use only public copy and assets reviewed by the maintainer.
- Do not duplicate article content in JavaScript or the home-page card.
- Preserve the Hub style on the landing page and the EDPilot0001 editorial style on profile detail pages. Keep the two style systems isolated.
- Preserve existing TechnicalHub/Web-HQ navigation. EDPilot0001 is a visual reference only; do not reuse its source code, copy, scripts, or assets.
