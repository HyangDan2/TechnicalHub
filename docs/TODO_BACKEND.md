# Back-end engineer TODO

**Status:** planned; no implementation is claimed. In the proposed static architecture, “Back-end” owns catalog/data contracts and build-time tooling; it does not imply a runtime server or API.

## Work items

| ID | Priority | Task and output | Depends on | Acceptance criteria | Status |
| --- | --- | --- | --- | --- | --- |
| BE-01 | P0 | Finalize catalog model, technology taxonomy, status values, and evidence vocabulary. | Product decisions in `ARCHITECTURE.md` | `technologies`, `projects`, references, inspected revision/date, evidence type, and status are specified with examples that are clearly non-production placeholders. | Planned |
| BE-02 | P0 | Implement JSON schema and deterministic catalog validator. | BE-01 | Invalid shape, duplicate IDs/repos, unsafe URLs, bad taxonomy references, and missing published evidence fail with actionable messages. | Planned |
| BE-03 | P0 | Create initial catalog only from user-approved real project URLs and write evidence notes. | BE-01; maintainer supplies project sources | Each published claim cites inspected files/docs at an exact commit; unsupported fields are omitted or marked unknown; no invented entries. | Blocked on source list |
| BE-04 | P0 | Implement pure catalog operations used by UI and unit tests. | BE-01 | Published visibility, normalization, search/filter predicates, and safe URL policy have deterministic tests and no network dependency. | Planned |
| BE-05 | P0 | Implement clean static build and public catalog transformation. | BE-02; repository layout from GIT-01 | Build validates first, clears and recreates `dist/`, copies only deployable files, preserves project subpath support, and never includes placeholders or drafts in public results. | Planned |
| BE-06 | P1 | Implement local preview and bounded external link checker. | GIT-01; canonical base path when known | Preview serves the site at documented path; link checker has timeout/retry bounds, redirect reporting, and cannot affect deterministic verification. | Planned |
| BE-07 | P1 | Implement hosted acceptance check after host and public URL are confirmed. | BE-05; GIT-03; hosting decision | Check reports page/catalog/assets and representative repository links against configured URL; failure identifies phase and does not mutate catalog. | Blocked on hosting decision |
| BE-08 | P1 | Document data refresh and repeat-onboarding rules. | BE-01–BE-03 | Repeated repository requests update the stable entry; inspected revision/date are refreshed; changes to schema update examples, validator, UI fixtures, and tests together. | Planned |

## Back-end boundaries

- Keep the catalog the single source of truth; do not duplicate records in UI markup.
- Separate public display fields from evidence and maintenance notes where appropriate.
- Do not call project code or install dependencies as a normal inspection step.
- Do not add a database, API, or server without an approved architecture change.
- Keep live network checks separate from local deterministic verification.

## Handoff

Front-end can integrate once BE-01 is approved and BE-02 defines a stable contract and fixture. Release integration requires BE-05. BE-07 remains pending until repository identity, host, and public URL are confirmed.

