
/**
 * UNDEFINEDVERSEOFFICIAL
 * Basic accessibility tests
 * File: tests/accessibility.test.js
 *
 * Run from the repository root:
 * node --test tests/accessibility.test.js
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

const PAGES = [
  "index.html",
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
    `Missing page: ${relativePath}`
  );

  return readFileSync(fullPath, "utf8");
}

function getTagAttributes(html, tagName) {
  const pattern = new RegExp(
    `<${tagName}\\b([^>]*)>`,
    "i"
  );

  return html.match(pattern)?.[1] ?? null;
}

test("pages declare a document language", () => {
  for (const page of PAGES) {
    const html = readPage(page);
    const attributes = getTagAttributes(html, "html");

    assert.ok(attributes, `${page} needs an html element`);

    assert.match(
      attributes,
      /\blang\s*=\s*["'][a-z]{2,3}(?:-[A-Za-z0-9-]+)?["']/i,
      `${page} should declare its language`
    );
  }
});

test("pages include responsive viewport metadata", () => {
  for (const page of PAGES) {
    const html = readPage(page);

    assert.match(
      html,
      /<meta\b[^>]*name\s*=\s*["']viewport["'][^>]*>/i,
      `${page} should include viewport metadata`
    );
  }
});

test("pages include a main content landmark", () => {
  for (const page of PAGES) {
    const html = readPage(page);

    assert.match(
      html,
      /<main(?:\s|>)/i,
      `${page} should include a main element`
    );
  }
});

test("pages provide a skip link", () => {
  for (const page of PAGES) {
    const html = readPage(page);

    assert.match(
      html,
      /<a\b[^>]*class\s*=\s*["'][^"']*\bskip-link\b[^"']*["'][^>]*>/i,
      `${page} should provide a skip link`
    );
  }
});

test("skip links point to an existing main landmark", () => {
  for (const page of PAGES) {
    const html = readPage(page);

    const skipLink = html.match(
      /<a\b[^>]*class\s*=\s*["'][^"']*\bskip-link\b[^"']*["'][^>]*>/i
    );

    assert.ok(skipLink, `${page} is missing its skip link`);

    const href = skipLink[0].match(
      /\bhref\s*=\s*["']#([^"']+)["']/i
    );

    assert.ok(
      href,
      `${page} skip link should point to an element ID`
    );

    const escapedId = href[1].replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    assert.match(
      html,
      new RegExp(
        `<main\\b[^>]*\\bid\\s*=\\s*["']${escapedId}["']`,
        "i"
      ),
      `${page} skip link target must be the main element`
    );
  }
});

test("pages have non-empty title elements", () => {
  for (const page of PAGES) {
    const html = readPage(page);
    const title = html.match(
      /<title\b[^>]*>([\s\S]*?)<\/title>/i
    );

    assert.ok(title, `${page} is missing its title element`);

    assert.ok(
      title[1].replace(/<[^>]*>/g, "").trim().length > 0,
      `${page} should have a non-empty title`
    );
  }
});
