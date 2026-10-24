
# UndefinedVerseOfficial — Architecture

## 1. Overview

UndefinedVerseOfficial is a static website hosted on Cloudflare Pages.

The project uses HTML for page structure, CSS for presentation, JavaScript modules for interactive behavior, JSON for structured content, and SVG for vector branding and interface icons.

## 2. Project structure

- `index.html` — homepage.
- `404.html` — not-found page.
- `pages/` — dedicated website pages.
- `components/` — reusable HTML fragments.
- `assets/css/` — design tokens, layout, typography, effects, responsive styles, and accessibility.
- `assets/js/` — navigation, motion, notices, catalogue loading, accessibility, and utility modules.
- `assets/data/` — structured content for Manga, Novels, chapters, and site configuration.
- `assets/icons/` — SVG brand assets and interface icon symbols.
- `assets/images/` — optional image assets, if needed in the future.
- `assets/fonts/` — optional self-hosted font files, if needed.
- `docs/` — project documentation.
- `tests/` — manual and automated checks.

## 3. Rendering model

The website is served as static files.

Each HTML page loads its required stylesheets and JavaScript modules. Browser-side JavaScript handles interactive features without requiring a server-side application.

JSON files provide structured data. Content must not be invented to fill empty catalogues.

## 4. Component strategy

Files in `components/` are reusable HTML fragments.

Static hosting does not automatically insert these fragments into pages. They must be included in page markup or loaded through an explicit client-side integration mechanism.

When integrating components, preserve accessible navigation, correct relative paths, and graceful behavior if a component cannot load.

## 5. Content rules

- Manga and Novels remain in development until genuine works are ready.
- The Codex must contain established project material rather than invented claims presented as fact.
- Unavailable features must be identified honestly.
- No catalogue entries should be fabricated merely to make a page look populated.

## 6. Design principles

- Dark, restrained cosmic visual identity.
- Matte black and charcoal foundations.
- Silver and bone-white typography.
- Restrained violet accents.
- CSS-generated atmospheric effects where practical.
- Responsive layouts and accessible interactions.
- Reduced-motion support and lightweight delivery.

## 7. Deployment

Cloudflare Pages publishes the repository's static files.

Changes committed to the configured deployment branch can trigger a new deployment. The deployed site should be checked after meaningful changes.

## 8. Maintenance

- Keep paths consistent with the repository structure.
- Avoid duplicate event listeners and unnecessary dependencies.
- Handle failed JSON requests gracefully.
- Test navigation, accessibility, mobile layouts, and direct page URLs.
- Update this document when the architecture materially changes.
