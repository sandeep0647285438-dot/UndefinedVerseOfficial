
/**
 * UNDEFINEDVERSEOFFICIAL
 * Navigation and page-path tests
 * File: tests/navigation.test.js
 *
 * Run from the repository root:
 * node --test tests/navigation.test.js
 */

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

const REQUIRED_PAGES = [
  "index.html",
  "404.html",
  "pages/manga.html",
  "pages/novels.html",
  "pages/codex.html",
  "pages/about.html",
  "pages/status.html"
];

function readPage(relativePath) {
  const fullPath = path.join(ROOT, relativePath);

  assert.ok(
    existsSync(fullPath),
    `Expected page to exist: ${relativePath}`
  );

  return readFileSync(fullPath, "utf8");
}

function getLocalTargets(html) {
  const targets = [];
  const linkPattern = /\b(?:href|src)\s*=\s*["']([^"'#]+)["']/gi;

  for (const match of html.matchAll(linkPattern)) {
    const target = match[1].trim();

    if (
      !target ||
      target.startsWith("//") ||
      /^[a-z][a-z\d+.-]*:/i.test(target)
    ) {
      continue;
    }

    const pathname = target.split(/[?#]/, 1)[0];

    if (pathname) {
      targets.push(pathname);
    }
  }

  return targets;
}

test("required HTML pages exist", () => {
  for (const page of REQUIRED_PAGES) {
    assert.ok(
      existsSync(path.join(ROOT, page)),
      `Missing required page: ${page}`
    );
  }
});

test("every main page has a document title", () => {
  for (const page of REQUIRED_PAGES) {
    const html = readPage(page);

    assert.match(
      html,
      /<title(?:\s[^>]*)?>[\s\S]*?<\/title>/i,
      `${page} should contain a title element`
    );
  }
});

test("every dedicated page has a main content landmark", () => {
  const pages = REQUIRED_PAGES.filter(
    (page) => page !== "404.html"
  );

  for (const page of pages) {
    const html = readPage(page);

    assert.match(
      html,
      /<main(?:\s|>)/i,
      `${page} should contain a main element`
    );
  }
});

test("local HTML and asset references resolve", () => {
  const htmlPages = REQUIRED_PAGES.filter(
    (page) => page.endsWith(".html")
  );

  const missing = [];

  for (const page of htmlPages) {
    const html = readPage(page);
    const pageDirectory = path.dirname(page);

    for (const target of getLocalTargets(html)) {
      const resolved = path.posix.normalize(
        path.posix.join(pageDirectory, target)
      );

      if (
        resolved === ".." ||
        resolved.startsWith("../") ||
        path.posix.isAbsolute(resolved)
      ) {
        missing.push(`${page} -> ${target} (outside project root)`);
        continue;
      }

      if (!existsSync(path.join(ROOT, resolved))) {
        missing.push(`${page} -> ${target}`);
      }
    }
  }

  assert.deepEqual(
    missing,
    [],
    `Broken local references:\n${missing.join("\n")}`
  );
});
