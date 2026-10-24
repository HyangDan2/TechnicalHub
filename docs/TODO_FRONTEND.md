# Front-end engineer TODO

**Status:** planned; no implementation is claimed. Each item has one accountable owner: Front-end engineer.

## Work items

| ID | Priority | Task and output | Depends on | Acceptance criteria | Status |
| --- | --- | --- | --- | --- | --- |
| FE-01 | P0 | Confirm page information architecture and interaction states; record approved wireframe or component outline. | Product decisions in `ARCHITECTURE.md` | Header, search, filters, project results, evidence/detail presentation, loading, empty, and error states are defined. | Planned |
| FE-02 | P0 | Implement semantic page shell, responsive layout, and shared styles. | FE-01; Git admin provides repository skeleton | Landmark structure and heading order are valid; narrow and wide layouts have no unintended overflow; focus is visible; reduced motion is respected. | Planned |
| FE-03 | P0 | Implement safe catalog loading and project card rendering. | BE-01 catalog contract; BE-02 renderer-facing fixture | Published records render; strings are inserted as text; missing/failed catalog state has a clear recovery message. | Planned |
| FE-04 | P0 | Implement technology/category filters and project search. | BE-01 field names and taxonomy; FE-03 | Search and filters combine predictably, show the result count and active state, and can be reset; empty results are explained. | Planned |
| FE-05 | P1 | Implement project detail/evidence presentation and outbound links. | Architecture decision on detail page vs panel; BE-01 evidence/public-source contract | Project identity, stack categories, evidence basis/date, and repository link are visible; outbound links use validated HTTPS destinations. | Planned |
| FE-06 | P1 | Add keyboard, screen-size, text expansion, and browser behavior coverage. | FE-02–FE-05; BE-04 test fixtures | Browser tests cover keyboard operation, visible focus, representative widths, long labels, reduced motion, filter combinations, and load failure. | Planned |
| FE-07 | P1 | Review final production build visually and fix UI defects. | BE-05 build output; GIT-02 CI preview/check path | Review screenshots at representative desktop and mobile widths; report actual browser and viewport; no unreviewed visual defect remains. | Planned |

## Front-end boundaries

- Consume the catalog contract from Back-end; do not invent fields in the UI.
- Do not hardcode project cards or technology names in markup.
- Do not add runtime calls to GitHub, package registries, or project sites to populate the interface.
- Keep site UI claims aligned with evidence fields; do not display unknown values as confirmed facts.
- Coordinate interface changes through the catalog contract, not simultaneous untracked assumptions.

## Handoff

Front-end is ready for integration when FE-02 through FE-06 meet their acceptance criteria, required browser checks pass, and any remaining limitations are recorded. FE-07 requires a built production artifact and should be completed before release sign-off.

