
/**
 * UNDEFINEDVERSEOFFICIAL
 * Performance and resource management
 * File: assets/js/performance.js
 */

export function initPerformance() {
  const root = document.documentElement;

  let pageIsVisible = !document.hidden;

  function updateVisibility() {
    pageIsVisible = !document.hidden;

    root.classList.toggle(
      "uv-page-hidden",
      !pageIsVisible
    );

    document.dispatchEvent(
      new CustomEvent("uv:visibilitychange", {
        detail: { visible: pageIsVisible }
      })
    );
  }

  document.addEventListener(
    "visibilitychange",
    updateVisibility
  );

  updateVisibility();

  return function destroyPerformance() {
    document.removeEventListener(
      "visibilitychange",
      updateVisibility
    );

    root.classList.remove("uv-page-hidden");
  };
}
