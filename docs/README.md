# TechnicalHub documentation

**Status:** planning baseline. These documents define the proposed product, architecture, and engineering work. They do not claim that the site, tooling, CI, or deployment have been implemented.

## Documents

- [Architecture](ARCHITECTURE.md): product shape, components, data ownership, and boundaries.
- [Harness guide](HARNESS_GUIDE.md): repeatable project onboarding, validation, build, browser checks, and release evidence.
- [Front-end TODO](TODO_FRONTEND.md): user interface and accessibility work.
- [Back-end TODO](TODO_BACKEND.md): catalog contract and data validation tooling. In this static-site proposal, this role does not imply a server API.
- [Git administrator TODO](TODO_GIT_ADMIN.md): repository workflow, CI, deployment, and release controls.
- [Changelog](CHANGELOG.md): dated record of documentation and later product changes.

## Working rules

1. Treat the architecture and harness guide as the current planning baseline. Record approved changes in the changelog and update affected TODOs.
2. Keep work items individually owned, traceable by ID, and verifiable against their acceptance criteria.
3. Do not claim implementation, test, or deployment success until repository evidence exists.
4. Resolve repository identity, public URL, hosting, initial project list, and any real sample data before implementation depends on them. Do not invent these values.

