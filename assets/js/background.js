
/**
 * UNDEFINEDVERSEOFFICIAL
 * Cosmic background controller
 * File: assets/js/background.js
 */

import { prefersReducedMotion } from "./config.js";

export function initBackground() {
  const background = document.querySelector(".cosmos");

  if (!background) {
    return () => {};
  }

  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let reducedMotion = prefersReducedMotion();

  function updateMotionPreference(event) {
    reducedMotion = event.matches;

    background.classList.toggle(
      "cosmos--reduced-motion",
      reducedMotion
    );
  }

  function handleVisibilityChange() {
    background.classList.toggle(
      "cosmos--paused",
      document.hidden
    );
  }

  reducedMotionQuery.addEventListener?.(
    "change",
    updateMotionPreference
  );

  document.addEventListener(
    "visibilitychange",
    handleVisibilityChange
  );

  background.classList.toggle(
    "cosmos--reduced-motion",
    reducedMotion
  );

  handleVisibilityChange();

  return function destroyBackground() {
    reducedMotionQuery.removeEventListener?.(
      "change",
      updateMotionPreference
    );

    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    background.classList.remove(
      "cosmos--reduced-motion",
      "cosmos--paused"
    );
  };
}
