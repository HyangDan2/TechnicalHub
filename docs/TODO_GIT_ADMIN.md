# Git administrator TODO

**Current state:** repository hyangdan2/TechnicalHub is deployed to GitHub Pages at https://hyangdan2.github.io/TechnicalHub/. The Pages workflow currently builds and deploys dist from main.

| ID | Priority | Task and output | Depends on | Acceptance criteria | Status |
| --- | --- | --- | --- | --- | --- |
| GIT-01 | P0 | Add pull-request validation/build CI without deployment. | BE-02 command interface | PR workflow runs lockfile install, validation, and production build; PR runs have no Pages deploy permissions. | Planned |
| GIT-02 | P0 | Pin and lock the Eleventy toolchain and align local/CI Node versions. | BE-02 package manifest | Lockfile records dependencies; clean install and build work locally and in CI; no private-source credential is configured. | Planned |
| GIT-03 | P0 | Verify nested-route deployment and hosted acceptance for home and Face Landmark Tracker pages. | BE-02–BE-04; FE-02; GIT-01 | Only dist is deployed; /TechnicalHub/ and /TechnicalHub/technologies/face-landmark-tracker/ work with assets and navigation. | Done; deployment and hosted routes verified |
| GIT-04 | P1 | Document release evidence and rollback. | GIT-01–GIT-03 | Docs identify revision, verification evidence, failure diagnosis, revert procedure, and post-rollback hosted check. | Planned |
| GIT-05 | P1 | Review Actions permissions, action versions, and deployment protection. | Existing Pages workflow | Build is read-only; deploy permissions are scoped to Pages/OIDC; only the approved branch deploys; action versions are reviewed. | Planned |
| GIT-06 | P1 | Verify style assets in the built Pages artifact. | FE-02; BE-02 | Generated home page references the Hub stylesheet; nested profile route references the profile-only stylesheet; both stylesheets and profile media resolve under `/TechnicalHub/`. | Done; deployed stylesheet and media paths verified |

## Boundaries

- Do not grant the public TechnicalHub workflow access to the private Face Landmark Tracker repository.
- Do not add a personal access token or other private-source credential.
- Do not publish drafts or files outside the generated dist artifact.
- GitHub Pages is public; repository visibility does not make the published page private. Keep the artifact limited to reviewed public content.
- Do not copy EDPilot0001 source files into the artifact. The profile stylesheet is implemented within TechnicalHub; only its visual direction is referenced.
