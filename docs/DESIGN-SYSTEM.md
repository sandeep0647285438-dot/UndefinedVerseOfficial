
# UndefinedVerseOfficial — Design System

## 1. Visual direction

The visual identity is dark, restrained, atmospheric, and readable.

The website should feel like a carefully designed digital space, not a flashy template. Avoid excessive gradients, oversized glowing text, distracting effects, and theatrical dialogue.

## 2. Color palette

Use the existing CSS custom properties in `assets/css/tokens.css` as the source of truth.

The intended palette is:

- Background: near-black and matte charcoal.
- Surface: slightly lighter charcoal.
- Primary text: bone-white.
- Secondary text: muted grey.
- Accent: restrained cold violet.
- Borders: subtle grey-violet with low contrast.

Do not introduce unrelated accent colors without a clear reason.

## 3. Typography

Typography should prioritize readability and hierarchy.

- Headings: clear, deliberate, and moderately spaced.
- Body text: comfortable line height and readable line length.
- Labels: small, restrained, and used sparingly.
- Navigation: concise and easy to scan.

Use system font stacks unless a specific self-hosted font provides a meaningful improvement.

## 4. Background

Build the cosmic atmosphere primarily with CSS.

Preferred effects include:

- Layered radial gradients.
- Very subtle star-like points.
- Soft ambient violet light.
- Dark translucent surfaces.
- Restrained movement.

Avoid heavy animation, excessive blur, and effects that reduce text contrast.

## 5. Layout

- Use consistent spacing and alignment.
- Keep content widths comfortable for reading.
- Use responsive layouts for mobile, tablet, and desktop.
- Keep navigation predictable across pages.
- Do not add empty cards or fictional catalogue items to fill space.

## 6. Logo and icons

The SVG files in `assets/icons/` provide the brand mark, complete logo, browser favicon, and reusable interface symbols.

Use the complete logo where space allows and the compact mark in smaller areas.

Icons should be simple, consistent, and decorative only when they do not add useful meaning. Provide accessible names for interactive controls.

## 7. Motion

Motion should be subtle and purposeful.

- Support `prefers-reduced-motion`.
- Avoid forced parallax or distracting continuous movement.
- Ensure navigation and content remain usable if animation is disabled.

## 8. Accessibility

- Maintain sufficient text contrast.
- Preserve visible keyboard focus.
- Use semantic HTML and meaningful headings.
- Provide labels for interactive controls.
- Do not communicate important states through color alone.
- Respect reduced-motion preferences.

## 9. Consistency

The homepage and all dedicated pages should share the same visual language.

When changing a design token or shared component, consider its effect across the entire website rather than styling one page in isolation.
