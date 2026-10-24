
# UndefinedVerseOfficial — Testing Checklist

Use this checklist after significant website changes and before publishing major updates.

## 1. Homepage

- [ ] Homepage loads successfully.
- [ ] Logo displays correctly.
- [ ] Main heading and page content are readable.
- [ ] Cosmic background effects render without obscuring text.
- [ ] No unwanted placeholder content appears.
- [ ] Footer links work.

## 2. Navigation

- [ ] Desktop navigation links work.
- [ ] Mobile navigation opens and closes correctly.
- [ ] Navigation buttons have accessible names.
- [ ] The current page is identifiable where appropriate.
- [ ] Keyboard users can reach interactive elements.
- [ ] Focus remains visible during navigation.
- [ ] No links point to missing pages.

## 3. Dedicated pages

- [ ] `pages/manga.html` opens directly.
- [ ] `pages/novels.html` opens directly.
- [ ] `pages/codex.html` opens directly.
- [ ] `pages/about.html` opens directly.
- [ ] `pages/status.html` opens directly.
- [ ] Each page uses the shared design consistently.
- [ ] Each page has a meaningful title and main heading.
- [ ] All relative asset paths resolve correctly.

## 4. Manga and Novels

- [ ] Unfinished sections are clearly marked as in development.
- [ ] No fabricated titles or chapter listings appear.
- [ ] Catalogue links behave as intended.
- [ ] Missing or invalid data does not break the page.
- [ ] Development notices remain accessible.

## 5. JavaScript and data

- [ ] No JavaScript errors appear in the browser console.
- [ ] JavaScript modules load successfully.
- [ ] JSON files contain valid JSON.
- [ ] Failed data requests are handled gracefully.
- [ ] Event listeners do not cause repeated actions.
- [ ] Interactive features work with mouse, touch, and keyboard where applicable.

## 6. Accessibility

- [ ] HTML declares the correct document language.
- [ ] A skip link allows users to bypass repeated navigation.
- [ ] Heading levels follow a sensible hierarchy.
- [ ] Images and meaningful icons have appropriate accessible text.
- [ ] Decorative icons do not create unnecessary screen-reader output.
- [ ] Form controls, if present, have labels.
- [ ] Keyboard focus is visible.
- [ ] Text contrast is sufficient.
- [ ] Reduced-motion preferences are respected.
- [ ] Content remains usable when animations are disabled.

## 7. Responsive layout

- [ ] Layout works on a narrow mobile screen.
- [ ] Layout works on tablet and desktop widths.
- [ ] No unexpected horizontal scrolling occurs.
- [ ] Text does not overlap buttons or icons.
- [ ] Navigation remains usable on touch screens.
- [ ] Content spacing remains consistent.

## 8. Assets and metadata

- [ ] SVG logos and icons load correctly.
- [ ] Favicon appears in the browser.
- [ ] Manifest paths resolve correctly.
- [ ] `robots.txt` loads.
- [ ] `sitemap.xml` contains valid public page URLs.
- [ ] Metadata reflects the actual website.

## 9. Deployment

- [ ] Latest deployment completes successfully.
- [ ] Deployed content matches the intended commit.
- [ ] Direct page URLs work.
- [ ] Unknown routes show the 404 page.
- [ ] No required assets return 404 errors.
- [ ] Final checks are performed on the deployed site.

## 10. Test record

For each significant release, record:

- Date tested:
- Commit:
- Pages checked:
- Issues found:
- Issues fixed:
- Deployment status:

Do not mark a check as complete until it has actually been tested.
