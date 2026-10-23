
/**
 * UNDEFINEDVERSEOFFICIAL
 * Catalogue and category navigation
 * File: assets/js/catalogue.js
 */

import { UV_CONFIG } from "./config.js";

const SUPPORTED_CATEGORIES = new Set(
  UV_CONFIG.categories.map((category) => category.id)
);

export function initCatalogue() {
  const categoryLinks = document.querySelectorAll(
    "[data-work-title]"
  );

  const developmentNotice = document.querySelector(
    UV_CONFIG.selectors.developmentNotice
  );

  categoryLinks.forEach((link) => {
    const categoryId = link.dataset.workTitle?.trim().toLowerCase();

    if (!categoryId || !SUPPORTED_CATEGORIES.has(categoryId)) {
      return;
    }

    const category = UV_CONFIG.categories.find(
      (item) => item.id === categoryId
    );

    if (!category) {
      return;
    }

    // Keep unfinished categories directed to the shared notice.
    link.setAttribute("href", category.target);
    link.dataset.status = category.status;

    if (developmentNotice) {
      link.setAttribute(
        "aria-describedby",
        developmentNotice.id
      );
    }
  });

  return function destroyCatalogue() {
    categoryLinks.forEach((link) => {
      delete link.dataset.status;
    });
  };
}
