# Technology Profile and Card Authoring Guide

This guide is the standard workflow for adding or updating a technology profile and its TechnicalHub home-page card. A single Markdown profile drives both outputs: Eleventy creates the card data and the internal detail route from the same source file.

## 1. Confirm the public brief

Before writing, record the maintainer-approved public title, summary, categories, technical facts, technology roles, images/diagrams, references, limitations, and disclosure boundaries. A private project may be described without publishing its source code or repository URL. Do not publish internal code names, private URLs, credentials, source excerpts, logs, or unapproved screenshots. Keep private research notes outside this repository.

The GitHub Pages site is public. Review all text and media as if anyone could download them. Do not check out private implementation source in the site build or add credentials that let the public workflow fetch it.

## 2. Create the profile source

Create one file at `content/profiles/<slug>.md`. Use the same lowercase kebab-case value for the filename, `id`, and `slug`. Keep the card summary in front matter and the long-form introduction in the Markdown body; do not duplicate profile records in `js/app.js`, `data/catalog.json.njk`, or generated HTML.

Use only the fields accepted by `schema/profile-frontmatter.schema.json` and `scripts/validate.mjs`:

```yaml
---
id: example-technology
slug: example-technology
title: Example Technology
summary: One concise, public-safe sentence describing the project.
thumbnail: assets/profiles/example-technology-demo.png
thumbnailAlt: Example Technology interface showing its main analysis view.
socialPreview: assets/profiles/example-technology-social.png
socialPreviewAlt: Example Technology project preview featuring its interface and project name.
categories:
  - SW
status: draft
updatedAt: "YYYY-MM-DD"
technologies:
  - name: Example Runtime
    version: "1.0"
    role: Runs the application and coordinates its main processing flow.
references: []
---

## Overview

Describe the purpose, inputs, outputs, and intended use using approved facts.

## Architecture

Explain the public-facing architecture and link approved local diagrams where useful.

## Privacy and limitations

State what remains private and avoid unsupported performance or safety claims.
```

Replace all example values. Use only approved categories: `HW`, `SW`, `AI`, `Data`, `ML`, `DL`, `Utility`, or `Etc`. Versions must be current, supported, and approved. References must be public HTTPS URLs. Use an empty list when no public reference is approved. Keep `status: draft` until the content and assets pass review; only `published` profiles generate a public card and route.

## 3. Add public assets

Put approved images and diagrams under `assets/profiles/` with descriptive, stable filenames. Reference them from the Markdown body with paths relative to that file, for example:

```markdown
![Public architecture overview](../../assets/profiles/example-technology-architecture.svg)
```

Every published profile must define `thumbnail`/`thumbnailAlt` and `socialPreview`/`socialPreviewAlt` in its front matter. The card thumbnail is relative to the site root and must point to a local file under `assets/profiles/`; the hub displays it above the card text. The social preview must be a project-specific PNG named `<slug>-social.png` under `assets/profiles/`, exactly 1200×630 pixels, with useful alternative text.

The site branding assets live in `assets/branding/`: `favicon.svg` is the browser icon and `share.png` is the 1200×630 Open Graph/Twitter preview image for the TechnicalHub home page. Keep this home preview unchanged when adding a project. Each profile detail page uses only its own `socialPreview` for Open Graph and Twitter link previews; do not reuse the shared hub image or include other profiles in a project's preview. Compose the project title and approved project-specific screenshot or artwork, without private repository material, source code, or unrelated project cards.

Use only assets created for public release or explicitly approved for it. Diagrams must show only the abstraction level approved for publication. Do not include source screenshots containing private names, paths, tokens, or unrelated personal data.

## 4. Card and detail-page behavior

The build derives the card's title, summary, thumbnail, thumbnail alternative text, categories, update date, and destination from the profile front matter. The thumbnail appears above the card text, following the GameHub card pattern. The entire card is a single link, including the image, title, summary, category tags, date, and background. Keep the arrow as a visual cue; do not make it a separate control or nest another link inside the card.

The home page and all published profile pages must have a favicon, canonical URL, page description, Open Graph title/description/URL/image metadata, and a large-image Twitter card declaration. The home document uses `assets/branding/share.png`; the profile layout resolves each page's `socialPreview` and `socialPreviewAlt` from that profile's Markdown front matter. Keep metadata in the source HTML/layout rather than generated output.

Profile cards use the existing dark TechnicalHub/Hub home-page style. Detail pages use the light editorial style inspired by EDPilot0001, implemented only in TechnicalHub's `_includes/layouts/profile.njk` and `css/profile.css`. Keep the styles isolated: do not load the Hub stylesheet on detail pages, and do not change the Hub theme to style a profile. EDPilot0001 is a visual reference only; do not copy its code, content, scripts, or assets.

Every child profile detail page must include a visible `← Back to TechnicalHub` return link targeting `../../#projects`. From `/TechnicalHub/technologies/<slug>/`, this resolves to `/TechnicalHub/#projects`. The top-right hub menu uses the concise label `← TechHub` and the same destination. The TechnicalHub brand links to the hub root (`../../`). Keep `Web-HQ` as a separate parent-site link; it is not the profile return destination.

The public detail route is `/TechnicalHub/technologies/<slug>/`. Internal card links must use the generated profile route and work both locally and under the GitHub Pages base path. Profiles linking to an external repository are outside this profile-card contract and require an approved public repository URL.

## 5. Validate and review locally

From the repository root, run:

```sh
npm ci
npm run validate
npm run build
npm run dev
```

Open the home page at `http://localhost:4174/` and check the following:

- The published profile appears exactly once with the approved thumbnail, title, short summary, category tags, and update date; verify the thumbnail loads and its alt text is present.
- Clicking different parts of the card (title, summary, tags/date, and open card area) navigates to the same internal profile route. Keyboard focus and Enter activate the whole card.
- Search and category filtering continue to include or exclude the card correctly.
- The detail page shows the approved article and assets, uses the EDPilot0001-inspired light style, and returns to the TechnicalHub home page.
- The child page's visible `← Back to TechnicalHub` link resolves to `/TechnicalHub/#projects` and returns successfully; verify it does not point to Web-HQ or another profile.
- The top-right `← TechHub` menu link also resolves to `/TechnicalHub/#projects`.
- The home page still uses the Hub style. At narrow and wide viewport sizes, neither page has clipped text, horizontal overflow, broken links, or unreadable media.
- The favicon loads from the home and nested profile route. Home and profile pages expose canonical, Open Graph, and Twitter preview metadata. The home uses the shared 1200×630 image; each profile uses a different project-only 1200×630 preview and matching alternative text.
- A draft or unavailable profile produces neither a public card nor a detail route.

Inspect the generated `dist/` output. Confirm the profile route, CSS, card thumbnail, project-specific social preview, branding assets, social metadata, and catalog data are present; confirm drafts and private source details are absent. The validator checks the data contract and local assets, including the social preview dimensions, but a person must approve claims, disclosure, and assets.

## 6. Publish and verify

After content review and local checks pass, commit the profile source, approved assets, and any necessary documentation or template changes. Push to `main` only through the agreed repository workflow. A push starts the GitHub Pages workflow, which builds and deploys `dist/`.

Wait for both the build and deploy jobs to succeed. Then verify the deployed home page, the exact nested profile route, its CSS and media, and the full-card link behavior. Record the commit, workflow run, hosted route, and verification result in `docs/CHANGELOG.md`. Do not report deployment based only on a local build or a successful push.

## Change checklist

- [ ] Public brief and disclosure boundary approved.
- [ ] One Markdown source file with valid, unique ID and slug, plus a local card thumbnail and a distinct project-only 1200×630 social preview with alternative text.
- [ ] Card summary and detail article are consistent and non-duplicated.
- [ ] All claims, versions, references, images, and diagrams are public-safe and approved.
- [ ] Internal names, private URLs, credentials, source code, and unapproved evidence are absent.
- [ ] `npm run validate` and `npm run build` pass.
- [ ] Full-card pointer and keyboard navigation, filters, thumbnail, favicon, home share preview, distinct per-profile social previews/metadata, detail page, and responsive layouts are reviewed locally.
- [ ] `dist/` contains only the intended public card, route, and assets.
- [ ] GitHub Pages build and deploy succeed; hosted pages and links are checked.
- [ ] `docs/CHANGELOG.md` records the deployed revision and evidence.

## Related references

- [Public profile contract](PROFILE_CONTRACT.md)
- [Architecture](ARCHITECTURE.md)
- [Harness guide](HARNESS_GUIDE.md)
- [Front-end TODO](TODO_FRONTEND.md)
- [Back-end TODO](TODO_BACKEND.md)
- [Git administrator TODO](TODO_GIT_ADMIN.md)
