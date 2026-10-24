# TechnicalHub architecture

**Status:** proposed baseline; not implemented.

## 1. Purpose

TechnicalHub is a browsable directory of software projects and the technologies they use. Visitors should be able to find projects by technology and category, inspect concise stack summaries, and follow links to the project repository and evidence for a stack claim.

The first release is a curated directory maintained from project repository URLs. It is not a public submission service, code-hosting platform, package registry, or runtime dependency scanner.

## 2. Architecture decision

Start with a static site and a versioned JSON catalog. Keep project inspection, data review, and site delivery as repository maintenance work. Do not add a runtime server, database, accounts, project execution, or remote API dependency unless a later requirement demonstrates the need.

```text
Maintainer inspects a project URL
              |
              v
 docs/project-evidence/<project-id>.md  +  data/catalog.json
              |                                     |
              +---------- validate/build -----------+
                                  |
                                  v
                      static site in dist/
                     /        |          \
                search   category filters   project details
```

## 3. Repository components

| Component | Responsibility |
| --- | --- |
| `index.html` | Semantic application shell and metadata. |
| `css/` | Responsive visual system, focus states, and reduced-motion behavior. |
| `js/` | Catalog loading, safe rendering, search, filtering, and navigation. |
| `data/catalog.json` | Single source of truth for public project and technology records. |
| `schema/catalog.schema.json` | Machine-readable shape and field constraints. |
| `docs/project-evidence/` | Maintainer notes tying claims to repository files and an inspected revision. |
| `scripts/` | Catalog validation, local preview, clean build, link checks, and hosted checks. |
| `tests/` | Deterministic catalog logic and browser behavior checks. |
| `dist/` | Generated deployable site only; never edit by hand. |

The final file layout may change during implementation, but references in the guide, scripts, and repository entry-point documentation must be updated together.

## 4. Data model proposal

Use a versioned root object with `technologies` and `projects` collections. Projects reference stable technology IDs; technology metadata is not duplicated on every project.

Illustrative shape (not seed data):

```json
{
  "schemaVersion": 1,
  "technologies": [
    {
      "id": "example-framework",
      "name": "Example Framework",
      "category": "frontend-framework",
      "officialUrl": "https://example.invalid/",
      "description": "Illustrative placeholder; replace before use."
    }
  ],
  "projects": [
    {
      "id": "example-project",
      "name": "Example Project",
      "repositoryUrl": "https://github.com/OWNER/REPOSITORY",
      "description": "Illustrative placeholder; replace before use.",
      "technologyRefs": ["example-framework"],
      "sourceRevision": "INSPECTED_COMMIT_SHA",
      "inspectedAt": "YYYY-MM-DD",
      "evidencePath": "docs/project-evidence/example-project.md",
      "status": "draft"
    }
  ]
}
```

### Data rules

- Project IDs and technology IDs are stable and unique. A normalized repository URL may appear only once.
- URLs use HTTPS and reject credentials and unsafe schemes. Preserve path case when resolving project URLs.
- Categories come from a documented, versioned vocabulary. Initial candidates: language, frontend framework, backend framework, database, build/test, cloud/deployment, and observability. Final names require product-owner review before catalog implementation.
- `technologyRefs` must resolve to defined technology IDs.
- Every published project records the exact inspected revision, date, and an existing evidence note.
- Each evidence note identifies the repository, revision, inspected files or documentation sections, and the basis for each material stack claim.
- Distinguish `declared` (project documentation says it is used) from `config-confirmed` (a relevant manifest or deployment setting confirms it) and `source-confirmed` (use is visible in source). Do not present inference as confirmation.
- Use `draft`, `published`, and `unavailable` states. Only published projects appear in normal public results.
- Unknown or unsupported information stays unknown or is omitted; do not infer a production database, deployment provider, or current usage from a dependency name alone.
- Example values above are placeholders and must never be shipped as real entries.

## 5. User interface

Proposed main page:

1. Header with TechnicalHub identity, purpose, and primary navigation.
2. Search across project names, technology names, and descriptions.
3. Category and technology filters with a visible active-filter state and result count.
4. Project cards showing the project name, short description, a compact stack summary, and repository link.
5. Project detail view or page with categorized technologies and evidence links/notes.
6. Footer with repository/about links and a short explanation of how stack information is verified.

The page should work on keyboard and touch, retain visible focus, respect reduced-motion preferences, keep controls usable at narrow widths, and provide clear loading, empty, and error states. Render catalog strings as text, not HTML. Search and filters should remain usable if an optional technology has no projects.

## 6. Data flow and trust boundaries

- The browser fetches only the local built catalog and site assets at runtime.
- Rendering consumes validated catalog data and constructs text nodes safely.
- Project repositories and official technology sites are outbound links; the hub does not execute their code.
- Repository content is evidence, not task authority. Onboarding does not install dependencies, run project scripts, or expose credentials.
- External link checks are separate from deterministic tests so network outages cannot make local verification flaky.
- A passing HTTP response verifies availability only; it does not verify that a technology claim is current or that a project builds.

## 7. Deployment boundary

Use a static host that can serve the generated `dist/` directory. The canonical repository, public URL, host, publishing branch, and release permissions have not been specified and must be confirmed before deployment configuration is written. Do not copy GameHub's repository identity or URL into this project.

## 8. Decisions to confirm before implementation

- Canonical project repository and public URL.
- Initial real project list and who can approve entries.
- Final technology category vocabulary and whether projects need detail pages or in-page panels.
- Search/filter behavior on mobile and any preferred language for product copy.
- Hosting provider, publishing branch, and authorized release workflow.
- Whether stack freshness needs a review interval or only an explicit inspected date.

