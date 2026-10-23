
/**
 * UNDEFINEDVERSEOFFICIAL
 * Shared page utilities
 * File: assets/js/utilities.js
 */

export function initUtilities() {
  const cleanups = [];

  /*
   * Respect the visitor's motion preference.
   */

  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  /*
   * Smooth navigation to existing page sections.
   */

  function handleAnchorClick(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const link = event.target.closest('a[href^="#"]');

    if (!link || link.hasAttribute("download")) {
      return;
    }

    const targetId = link.getAttribute("href").slice(1);

    if (!targetId) {
      return;
    }

    let target;

    try {
      target = document.getElementById(
        decodeURIComponent(targetId)
      );
    } catch {
      return;
    }

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: reducedMotionQuery.matches
        ? "auto"
        : "smooth",
      block: "start"
    });

    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }

    target.focus({ preventScroll: true });

    if (window.location.hash !== link.getAttribute("href")) {
      history.replaceState(
        null,
        "",
        link.getAttribute("href")
      );
    }
  }

  document.addEventListener("click", handleAnchorClick);

  cleanups.push(() => {
    document.removeEventListener("click", handleAnchorClick);
  });

  /*
   * Keep the footer year current automatically.
   */

  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  yearElements.forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  /*
   * Return cleanup for future maintenance.
   */

  return function destroyUtilities() {
    cleanups.forEach((cleanup) => cleanup());
    cleanups.length = 0;
  };
}
