
/**
 * UNDEFINEDVERSEOFFICIAL
 * Motion preferences and helpers
 * File: assets/js/motion.js
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function getMotionBehavior() {
  return prefersReducedMotion() ? "auto" : "smooth";
}

export function initMotion() {
  const root = document.documentElement;
  const query = window.matchMedia(REDUCED_MOTION_QUERY);

  function updateMotionPreference(event) {
    root.classList.toggle(
      "prefers-reduced-motion",
      event.matches
    );

    root.dataset.motion = event.matches ? "reduced" : "full";
  }

  updateMotionPreference(query);

  if (query.addEventListener) {
    query.addEventListener("change", updateMotionPreference);
  } else {
    query.addListener(updateMotionPreference);
  }

  return function destroyMotion() {
    if (query.removeEventListener) {
      query.removeEventListener("change", updateMotionPreference);
    } else {
      query.removeListener(updateMotionPreference);
    }

    root.classList.remove("prefers-reduced-motion");
    delete root.dataset.motion;
  };
}

export function animateOnce(
  element,
  keyframes,
  options = {}
) {
  if (!(element instanceof Element)) {
    return null;
  }

  if (
    prefersReducedMotion() ||
    typeof element.animate !== "function"
  ) {
    return null;
  }

  return element.animate(keyframes, {
    duration: 350,
    easing: "ease-out",
    fill: "both",
    ...options
  });
}
