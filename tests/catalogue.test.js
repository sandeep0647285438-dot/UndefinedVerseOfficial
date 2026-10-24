
/**
 * UNDEFINEDVERSEOFFICIAL
 * Catalogue data validation tests
 * File: tests/catalogue.test.js
 *
 * Run from the repository root:
 * node --test tests/catalogue.test.js
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

const DATA_DIRECTORY = path.join(ROOT, "assets", "data");

const DATA_FILES = [
  "manga.json",
  "novels.json",
  "chapters.json",
  "site-content.json"
];

function loadJSON(filename) {
  const filePath = path.join(DATA_DIRECTORY, filename);

  assert.ok(
    existsSync(filePath),
    `Missing data file: assets/data/${filename}`
  );

  const source = readFileSync(filePath, "utf8");

  try {
    return JSON.parse(source);
  } catch (error) {
    assert.fail(
      `Invalid JSON in ${filename}: ${error.message}`
    );
  }
}

test("all required JSON data files exist", () => {
  for (const filename of DATA_FILES) {
    assert.ok(
      existsSync(path.join(DATA_DIRECTORY, filename)),
      `Expected assets/data/${filename} to exist`
    );
  }
});

test("all required JSON files contain valid JSON", () => {
  for (const filename of DATA_FILES) {
    assert.doesNotThrow(
      () => loadJSON(filename),
      `${filename} should contain valid JSON`
    );
  }
});

test("Manga catalogue uses a valid JSON root", () => {
  const data = loadJSON("manga.json");

  assert.ok(
    data !== null && typeof data === "object",
    "Manga data should be an object or array"
  );
});

test("Novels catalogue uses a valid JSON root", () => {
  const data = loadJSON("novels.json");

  assert.ok(
    data !== null && typeof data === "object",
    "Novels data should be an object or array"
  );
});

test("chapters data uses a valid JSON root", () => {
  const data = loadJSON("chapters.json");

  assert.ok(
    data !== null && typeof data === "object",
    "Chapters data should be an object or array"
  );
});

test("site content uses a valid JSON root", () => {
  const data = loadJSON("site-content.json");

  assert.ok(
    data !== null &&
      typeof data === "object" &&
      !Array.isArray(data),
    "Site content should be a JSON object"
  );
});

test("catalogues do not contain duplicate IDs when entries have IDs", () => {
  for (const filename of ["manga.json", "novels.json"]) {
    const data = loadJSON(filename);
    const entries = Array.isArray(data)
      ? data
      : Array.isArray(data.items)
        ? data.items
        : Array.isArray(data.works)
          ? data.works
          : [];

    const ids = entries
      .filter(
        (entry) =>
          entry &&
          typeof entry === "object" &&
          typeof entry.id === "string" &&
          entry.id.trim() !== ""
      )
      .map((entry) => entry.id);

    assert.equal(
      new Set(ids).size,
      ids.length,
      `${filename} contains duplicate entry IDs`
    );
  }
});
