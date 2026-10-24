
# UndefinedVerseOfficial — Deployment Guide

## 1. Overview

UndefinedVerseOfficial is a static website hosted on Cloudflare Pages.

The repository contains HTML, CSS, JavaScript modules, JSON data, and SVG assets. No server-side application is required for the current architecture.

## 2. Repository requirements

Before deploying, confirm that the repository contains:

- `index.html` — homepage.
- `404.html` — not-found page.
- `robots.txt` — crawler instructions.
- `sitemap.xml` — sitemap.
- `manifest.webmanifest` — web app metadata.
- `assets/` — stylesheets, scripts, data, and icons.
- `pages/` — dedicated website pages.

Keep file and directory names consistent with references in the HTML, CSS, JavaScript, and JSON files.

## 3. Cloudflare Pages settings

For a repository deployed as a plain static website:

- Connect the correct Git repository.
- Select the branch intended for deployment.
- Leave the build command empty if no build process is configured.
- Set the build output directory to the directory containing the site's published files. For this repository, that is the project root (`/` or `.` according to the dashboard's accepted format).
- Save the configuration and deploy.

If a build system is introduced later, update these settings to match that system.

## 4. Publishing changes

1. Open the repository on GitHub.
2. Edit or add the intended file.
3. Review the changes.
4. Commit the changes to the configured deployment branch.
5. Open Cloudflare Pages and check the deployment status.
6. Visit the deployed website after the deployment completes.

A successful GitHub commit does not, by itself, prove that the deployment succeeded.

## 5. Post-deployment checks

After meaningful updates, verify:

- The homepage loads.
- Dedicated pages open directly.
- Navigation links lead to the correct destinations.
- CSS files and SVG icons load.
- JavaScript modules load without console errors.
- JSON requests succeed when used.
- The development notices accurately describe unfinished sections.
- The site works on a mobile screen.
- The 404 page appears for unknown paths.
- The browser does not report mixed-content or missing-resource errors.

## 6. Common problems

### A page displays without styling

Check the stylesheet paths and confirm that the files exist at those locations.

### An SVG displays as text

Check that the SVG is saved as a `.svg` file rather than pasted into an HTML or Markdown document. Open the SVG file directly to verify its rendering.

### JavaScript fails to load

Check the browser console, module import paths, capitalization, and file extensions. JavaScript modules should be tested through a web server rather than by opening HTML through a `file://` URL.

### JSON data fails to load

Confirm that the JSON is valid and that the requested path matches the deployed file location.

### The deployment is unsuccessful

Review the deployment logs and the current Pages configuration. Correct the reported issue before retrying.

### The deployed site still shows old content

Check the latest deployment's commit and status. Confirm that the intended branch and files were published before investigating browser caching.

## 7. Security and privacy

- Never commit passwords, API keys, private tokens, or other secrets.
- Do not put private information in public JSON files.
- Review third-party scripts before adding them.
- Keep permissions and repository access appropriate for the project.

## 8. Maintenance

Repeat the post-deployment checks after major changes to page structure, navigation, shared styles, or JavaScript modules.

Keep this guide updated whenever the deployment configuration changes.
