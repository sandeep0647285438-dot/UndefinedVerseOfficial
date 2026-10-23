
/**
 * UNDEFINEDVERSEOFFICIAL
 * Novels section controller
 * File: assets/js/novels.js
 */

const NOVELS_SELECTOR = [
  '[data-work-title="novels"]',
  "#novels"
].join(", ");

export function initNovels() {
  const novelsElements = document.querySelectorAll(NOVELS_SELECTOR);

  if (!novelsElements.length) {
    return () => {};
  }

  const notice = document.querySelector("#development-notice");

  novelsElements.forEach((element) => {
    if (element.matches("a")) {
      element.setAttribute("href", "#development-notice");
    }

    element.dataset.catalogueStatus = "in-development";

    if (notice) {
      element.setAttribute("aria-controls", notice.id);
    }
  });

  return function destroyNovels() {
    novelsElements.forEach((element) => {
      delete element.dataset.catalogueStatus;
      element.removeAttribute("aria-controls");
    });
  };
}
