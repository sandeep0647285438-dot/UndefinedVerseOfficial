
/**
 * UNDEFINEDVERSEOFFICIAL
 * Development notices and status messages
 * File: assets/js/notices.js
 */

export function initNotices() {
  const notice = document.querySelector("#development-notice");

  if (!notice) {
    return () => {};
  }

  // Preserve the authored notice text and its existing visual design.
  notice.setAttribute("aria-label", "Website development notice");

  const statusElements = document.querySelectorAll(
    "[data-development-status]"
  );

  statusElements.forEach((element) => {
    element.setAttribute("aria-live", "polite");
    element.setAttribute("aria-atomic", "true");
  });

  return function destroyNotices() {
    notice.removeAttribute("aria-label");

    statusElements.forEach((element) => {
      element.removeAttribute("aria-live");
      element.removeAttribute("aria-atomic");
    });
  };
}
