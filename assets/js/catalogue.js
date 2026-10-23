
/**
 * UNDEFINEDVERSEOFFICIAL
 * Catalogue data loader
 * File: assets/js/catalogue.js
 */

import { UV_CONFIG } from "./config.js";

const DATA_FILES = Object.freeze({
  manga: "./assets/data/manga.json",
  novels: "./assets/data/novels.json",
  chapters: "./assets/data/chapters.json",
  siteContent: "./assets/data/site-content.json"
});

const cache = new Map();

async function loadJSON(path) {
  if (cache.has(path)) {
    return cache.get(path);
  }

  const request = fetch(path, {
    headers: { Accept: "application/json" }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Unable to load ${path}: HTTP ${response.status}`
      );
    }

    return response.json();
  });

  cache.set(path, request);

  try {
    return await request;
  } catch (error) {
    cache.delete(path);
    throw error;
  }
}

export async function loadCatalogue(type) {
  if (!Object.hasOwn(DATA_FILES, type)) {
    throw new Error(`Unknown UndefinedVerse data type: ${type}`);
  }

  return loadJSON(DATA_FILES[type]);
}

export async function initCatalogue() {
  const links = document.querySelectorAll("[data-work-title]");

  links.forEach((link) => {
    const type = link.dataset.workTitle?.toLowerCase();

    const category = UV_CONFIG.categories.find(
      (item) => item.id === type
    );

    if (!category) {
      return;
    }

    link.href = category.target;
    link.dataset.catalogueStatus = category.status;

    const notice = document.querySelector(
      UV_CONFIG.selectors.developmentNotice
    );

    if (notice) {
      link.setAttribute("aria-controls", notice.id);
    }
  });

  /*
   * Load catalogue data on demand.
   * No fictional titles are generated or displayed.
   */

  document.addEventListener("uv:load-catalogue", async (event) => {
    const type = event.detail?.type;

    try {
      const data = await loadCatalogue(type);

      document.dispatchEvent(
        new CustomEvent("uv:catalogue-loaded", {
          detail: { type, data }
        })
      );
    } catch (error) {
      console.error("[UndefinedVerse] Catalogue loading failed.", error);

      document.dispatchEvent(
        new CustomEvent("uv:catalogue-error", {
          detail: { type, message: error.message }
        })
      );
    }
  });

  return function destroyCatalogue() {
    // Catalogue event handling is intentionally lightweight.
    // The main page can continue to show its development notice.
  };
}
