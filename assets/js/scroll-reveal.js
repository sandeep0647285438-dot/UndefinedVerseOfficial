
/**
 * UNDEFINEDVERSEOFFICIAL
 * Scroll reveal controller
 * File: assets/js/scroll-reveal.js
 */

import { UV_CONFIG, prefersReducedMotion } from "./config.js";

export function initScrollReveal() {
  const elements = document.querySelectorAll(
    UV_CONFIG.selectors.reveal
  );

  if (!elements.length) {
    return () => {};
  }

  // Keep content visible when motion is reduced or unsupported.
  if (
    prefersReducedMotion() ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach((element) => {
      element.classList.add("is-revealed");
    });

    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-revealed");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: UV_CONFIG.motion.revealRootMargin,
      threshold: UV_CONFIG.motion.revealThreshold
    }
  );

  elements.forEach((element) => {
    element.classList.add("will-reveal");
    observer.observe(element);
  });

  return function destroyScrollReveal() {
    observer.disconnect();

    elements.forEach((element) => {
      element.classList.remove("will-reveal", "is-revealed");
    });
  };
}
