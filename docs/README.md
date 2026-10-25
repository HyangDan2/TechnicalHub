# TechnicalHub documentation

TechnicalHub is deployed as a static site. Its published Face Landmark Tracker profile and full-surface linked home card are generated from Markdown using Eleventy. The Hub landing page keeps its dark TechnicalHub/Hub design; detail pages use the EDPilot0001 editorial visual reference through a separate TechnicalHub stylesheet. This documentation set distinguishes the current deployed behavior from pending work.

## Documents

- Architecture: current state, target static architecture, and private-source publication boundary.
- Profile contract: approved Markdown front matter and public-content rules.
- [Profile card authoring guide](PROFILE_CARD_GUIDE.md): standard workflow for the public brief, Markdown source, assets, card/detail behavior, local review, and deployment acceptance.
- Visual architecture: the hub/detail style boundary and implementation constraints are documented in Architecture and the Profile Card Authoring Guide.
- Harness guide: current and planned commands and the profile publication workflow.
- Integrated implementation TODO: cross-role work order and release gate for the Face Landmark Tracker profile.
- Front-end TODO: home card, profile layout, accessibility, and visual review.
- Back-end TODO: Markdown contract, Eleventy generation, validation, and profile authoring.
- Git administrator TODO: PR checks, deployment validation, permissions, and rollback evidence.
- Changelog: dated record of implemented changes and approved plans.

## Working rules

1. Keep the private implementation repository separate from public TechnicalHub content and build automation.
2. Publish only maintainer-approved facts and assets.
3. Do not mark a planned TODO complete without a reviewable artifact and evidence.
4. Keep docs, commands, and deployment workflow synchronized.
