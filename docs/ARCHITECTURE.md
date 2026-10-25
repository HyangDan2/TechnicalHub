# TechnicalHub architecture

**Current state:** deployed static directory with a Markdown/Eleventy profile pipeline. The Face Landmark Tracker card and detail route are published; later profile additions follow the [Profile Card Authoring Guide](PROFILE_CARD_GUIDE.md).

## Purpose

TechnicalHub is a directory of software projects and their technologies. The home page supports category filters and name search. Public technical introductions use generated internal profile routes. Face Landmark Tracker is the first profile; its implementation source remains private.

Canonical repository: https://github.com/hyangdan2/TechnicalHub
Public site: https://hyangdan2.github.io/TechnicalHub/
The parent Web-HQ page is maintained separately.

## Visual architecture

TechnicalHub has two intentionally different visual contexts. The hub landing page uses the existing dark TechnicalHub/Hub design system for project discovery, filters, and search. Technology profile detail pages use the light editorial visual language of the neighboring EDPilot0001 site: warm ivory background, deep green text, teal accents, restrained borders, and monospaced section labels. This is a visual reference only; profile pages remain part of TechnicalHub and do not import EDPilot0001 source code, scripts, content, or assets.

Keep the distinction isolated in the profile layout and `css/profile.css`. Do not load the hub stylesheet on profile routes or change the hub stylesheet to achieve profile-specific styling. Verify both a hub page and a profile route whenever shared templates or CSS are changed.

## Target architecture

Keep the site static. One Markdown profile is the editable source for both its home card and detail page. Eleventy generates static HTML and any local listing/search data at build time. Neither visitors' browsers nor the public build workflow need to query GitHub or access a private repository.

    Maintainer approves public claims and assets
                         |
                         v
    content/profiles/face-landmark-tracker.md
               /                    \
       shared home template       profile template
               \                    /
                Eleventy build -> dist/
                              |
                              v
                 GitHub Pages public site

Profile route: /TechnicalHub/technologies/face-landmark-tracker/.

## Content contract

Use Markdown front matter for fields needed by the hub and detail template:

- Stable ID and slug.
- Title, short summary, approved categories, status (draft, published, unavailable), and updated date.
- Technology names and their roles in the project. Include versions only when approved and supported.
- Optional public source/reference URLs.
- Markdown body for the public article.

The private source URL is not required. For Face Landmark Tracker, omit it from content, generated HTML, JSON, page metadata, and workflow logs. The profile may state that the implementation source is private. Keep the current category vocabulary (HW, SW, AI, Data, ML, DL, Utility, Etc.) unless an explicit taxonomy change is approved.

Markdown profiles are the editable source of truth. Generated HTML, listing/search data, and dist are build outputs and must not be manually edited. Draft profiles must not generate public pages or cards.

The standard profile-creation, card-interaction, review, and publication workflow is maintained in [the Technology Profile and Card Authoring Guide](PROFILE_CARD_GUIDE.md).

## Privacy and publication boundary

GitHub Pages content is public even if the source repository for the site is private. Publish only reviewed text and assets approved for disclosure. Do not copy code, credentials, internal URLs, private diagrams, logs, or internal evidence notes into the TechnicalHub repository or deployment artifact.

The public Pages workflow must not check out the private implementation repository, use a private-repository token, or fetch private data. A maintainer may inspect the private project through authorized access and then write an approved public summary. The profile can explain technical ideas without exposing implementation source.

References: [GitHub Pages site visibility](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Implementation components

- Existing index.html, css/, and js/: passed through Eleventy while preserving the current home design and behavior.
- `_includes/layouts/profile.njk` and `css/profile.css`: profile-only presentation based on EDPilot0001's editorial style; the home page continues using the Hub design system.
- content/profiles/*.md: reviewed profile sources.
- Eleventy configuration/templates: validate and render home cards and profile routes.
- Validation/tests: enforce front matter, unique routes, allowed categories, publication status, and local asset references.
- .github/workflows/pages.yml: build/check changes and publish only generated dist from the approved branch.
- dist/: clean generated output, not source.

## Non-goals

No runtime server, database, accounts, public submission form, GitHub API integration, automatic private-repository sync, source-code hosting, or dependency scanner is part of this increment.
