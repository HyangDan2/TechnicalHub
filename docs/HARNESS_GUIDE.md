# TechnicalHub harness guide

**Current implemented commands:** `npm run validate`, `npm run build`, and `npm run dev`. Build validates the JSON catalog and Markdown profile metadata, then uses pinned Eleventy to generate the hub catalog and profile routes into `dist/`.
**Not yet implemented:** automated unit/browser test commands, unified `npm run verify`, external link checking, and hosted acceptance checks for profile routes.

## Target command contract

| Command | Target behavior |
| --- | --- |
| npm ci | Install exact dependencies from the lockfile using the pinned Node runtime. |
| npm run validate | Validate the generated catalog contract and Markdown profile fields, unique slugs, categories, URLs, status, required technology roles, and article content. |
| npm test | Run deterministic tests without network access for validation, draft visibility, route generation, and listing data. |
| npm run build | Validate and generate the clean static site into dist with Eleventy; no private repository access. |
| npm run test:e2e | Check home and profile behavior in a browser at representative desktop/mobile widths. |
| npm run verify | Run validation, unit tests, clean build, then browser checks in a defined order. |
| npm run dev | Serve the local generated site, including nested profile routes and the /TechnicalHub/ base path. |
| npm run check:links | Optional external URL checks, separate from deterministic local verification. |
| npm run verify:hosted | After release, verify the public home page, Face Landmark Tracker profile route, assets, and internal navigation. |

The Face Landmark Tracker profile builds locally. Profile detail pages use the EDPilot0001 editorial visual reference, while the hub landing page retains the TechnicalHub/Hub style. The latest profile edits have not yet been deployed to Pages; local build success is not hosted acceptance.

## Adding or updating a profile

1. Read this guide, the architecture, and role TODOs.
2. Confirm the maintainer-approved public disclosure brief. Do not assume private repository contents or its URL may be published.
3. Inspect project facts only with authorized access. Keep private inspection notes outside the public repository.
4. Create or update one stable Markdown profile. Keep the home summary and detail article in the same file.
5. Include only approved claims, public-safe images, and references. Do not run project scripts or install project dependencies as a normal research step.
6. Run implemented local validation/build; after the profile harness exists, run npm run verify.
7. Inspect generated output for private source URLs, unapproved copy/assets, and drafts.
8. After deployment, verify the home card and nested profile URL; report the deployed revision and check scope.

## Visual implementation rules

- Keep the hub landing page styled by `css/styles.css` and preserve its current dark Hub appearance.
- Keep technology detail pages styled by `css/profile.css` only. Match the EDPilot0001 reference through its light ivory/green palette, editorial typography, restrained separators, and monospaced labels.
- Do not import EDPilot0001 code, scripts, content, or image assets. Recreate only the approved visual language within TechnicalHub's profile template.
- For any profile CSS or template change, inspect both the home page and a nested profile at desktop and mobile widths. Ensure the profile stylesheet loads at the nested GitHub Pages route.

## Privacy and evidence boundaries

The GitHub Pages site is public. A private TechnicalHub source repository would not make its published Pages output private. Treat every generated file, page source, asset, workflow artifact, and log as public.

The public site workflow must build only from approved public TechnicalHub content. It must not check out the private implementation source or use a token to fetch it. A successful HTTP response is not proof that technical claims are accurate.

## Release and verification status

The existing workflow builds and publishes dist on main. PR validation-only CI and hosted acceptance for the newly added profile route are planned. Record actual build and deployment evidence in the changelog or QA notes; do not describe planned checks as passed.
