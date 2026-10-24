# Git administrator TODO

**Status:** repository initialized and GitHub Pages deployment is live. CI/review conventions and hosted acceptance checks remain. Each item has one accountable owner: Git administrator.

## Work items

| ID | Priority | Task and output | Depends on | Acceptance criteria | Status |
| --- | --- | --- | --- | --- | --- |
| GIT-01 | P0 | Confirm repository identity and initialize/organize the agreed source tree, ignore rules, and entry-point instructions. | Owner confirms canonical repository | Repository identity is recorded; generated outputs and local dependencies are ignored; docs and root instructions point to current guides and commands. | Done; `main` initialized and pushed; root README and ignore rules committed. |
| GIT-02 | P0 | Define branch, pull-request, review, and merge conventions; add CI for deterministic verification. | GIT-01; BE-02 and BE-04 command interfaces | Proposed changes trigger the documented checks; pull requests do not deploy; CI uses the committed lockfile and least required permissions. | Planned |
| GIT-03 | P1 | Confirm static host and configure protected deployment workflow. | Hosting and public URL confirmed; BE-05 | Only successful builds publish; only `dist/` is uploaded; credentials are not embedded; overlapping releases are controlled; hosted URL is verified. | In progress; Pages enabled at `https://hyangdan2.github.io/TechnicalHub/`; Actions workflow added to publish only `dist/`; switch Pages source to Actions and verify final run. |
| GIT-04 | P1 | Define release evidence, rollback, and incident notes in operations documentation. | GIT-03 | Procedure names the release revision, verification evidence, failure phase, rollback path, and hosted recheck. | Planned |
| GIT-05 | P1 | Integrate front-end browser checks and hosted acceptance into the appropriate workflow. | FE-06; BE-07; host decision | Browser tests run against the production build; hosted checks run only when configured and do not convert network failures into local test failures. | Planned |
| GIT-06 | P2 | Review dependency/runtime maintenance and CI action versions at implementation time. | GIT-01; CI established | Runtime/dependencies are pinned or locked according to the chosen tooling; upgrades are reviewed and the harness guide is updated with actual commands. | Planned |

## Git administrator boundaries

- Do not assume GameHub's repository name, Pages URL, branch, or deployment permissions apply to TechnicalHub.
- Publish only after the owner confirms the canonical repository, host, URL, and release workflow. The owner authorized GitHub Pages for this repository at `https://hyangdan2.github.io/TechnicalHub/`.
- Do not add secrets or personal access tokens to the repository.
- Keep CI checks read-only where possible and scope deploy permissions to the deployment job.
- Keep generated artifacts out of source control unless the chosen host specifically requires otherwise.

## Handoff

Engineering can work against the repository after GIT-01. Release readiness requires GIT-02, the production build and browser checks, and GIT-03 through GIT-05. Never report a deployment as complete based on CI artifact creation alone.

