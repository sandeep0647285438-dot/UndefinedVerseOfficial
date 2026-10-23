
/**
 * UNDEFINEDVERSEOFFICIAL
 * Manga section controller
 * File: assets/js/manga.js
 */

const MANGA_SELECTOR = [
  '[data-work-title="manga"]',
  "#manga"
].join(", ");

export function initManga() {
  const mangaElements = document.querySelectorAll(MANGA_SELECTOR);

  if (!mangaElements.length) {
    return () => {};
  }

  const notice = document.querySelector("#development-notice");

  mangaElements.forEach((element) => {
    if (element.matches("a")) {
      element.setAttribute("href", "#development-notice");
    }

    element.dataset.catalogueStatus = "in-development";

    if (notice) {
      element.setAttribute("aria-controls", notice.id);
    }
  });

  return function destroyManga() {
    mangaElements.forEach((element) => {
      delete element.dataset.catalogueStatus;
      element.removeAttribute("aria-controls");
    });
  };
}
