
/**
 * UNDEFINEDVERSEOFFICIAL
 * Main application controller
 * File: assets/js/main.js
 *
 * Navigation module disabled.
 * Other independent modules remain connected.
 */

import { initBackground } from "./background.js";
import { initMotion } from "./motion.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initCatalogue } from "./catalogue.js";
import { initManga } from "./manga.js";
import { initNovels } from "./novels.js";
import { initNotices } from "./notices.js";
import { initModals } from "./modal.js";
import { initAccessibility } from "./accessibility.js";
import { initPerformance } from "./performance.js";
import { initUtilities } from "./utilities.js";

function startUndefinedVerse() {
  "use strict";

  const modules = [
    ["Accessibility", initAccessibility],
    ["Background", initBackground],
    ["Motion", initMotion],
    ["Scroll reveal", initScrollReveal],
    ["Catalogue", initCatalogue],
    ["Manga", initManga],
    ["Novels", initNovels],
    ["Notices", initNotices],
    ["Modals", initModals],
    ["Performance", initPerformance],
    ["Utilities", initUtilities]
  ];

  const cleanupFunctions = [];

  for (const [name, initialize] of modules) {
    try {
      const cleanup = initialize();

      if (typeof cleanup === "function") {
        cleanupFunctions.push(cleanup);
      }
    } catch (error) {
      console.error(
        `[UndefinedVerse] ${name} module failed to initialize.`,
        error
      );
    }
  }

  window.UVApp = Object.freeze({
    destroy() {
      for (const cleanup of cleanupFunctions.reverse()) {
        try {
          cleanup();
        } catch (error) {
          console.error(
            "[UndefinedVerse] Module cleanup failed.",
            error
          );
        }
      }

      delete window.UVApp;
    }
  });

  document.documentElement.classList.add("uv-ready");
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    startUndefinedVerse,
    { once: true }
  );
} else {
  startUndefinedVerse();
}
