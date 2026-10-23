
/**
 * UNDEFINEDVERSEOFFICIAL
 * Accessibility controller
 * File: assets/js/accessibility.js
 */

export function initAccessibility() {
  const root = document.documentElement;
  const motionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function updateMotionPreference(event) {
    root.classList.toggle(
      "uv-reduced-motion",
      event.matches
    );
  }

  function handleAnchorKeydown(event) {
    // Native links and buttons already support keyboard activation.
    // This handler intentionally adds no custom activation behavior.
    if (event.key !== "Tab") {
      return;
    }

    root.classList.add("uv-keyboard-navigation");
  }

  function handlePointerDown() {
    root.classList.remove("uv-keyboard-navigation");
  }

  updateMotionPreference(motionQuery);

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", updateMotionPreference);
  } else {
    motionQuery.addListener(updateMotionPreference);
  }

  document.addEventListener("keydown", handleAnchorKeydown);
  document.addEventListener("pointerdown", handlePointerDown, {
    passive: true
  });

  return function destroyAccessibility() {
    if (motionQuery.removeEventListener) {
      motionQuery.removeEventListener(
        "change",
        updateMotionPreference
      );
    } else {
      motionQuery.removeListener(updateMotionPreference);
    }

    document.removeEventListener("keydown", handleAnchorKeydown);
    document.removeEventListener("pointerdown", handlePointerDown);

    root.classList.remove(
      "uv-reduced-motion",
      "uv-keyboard-navigation"
    );
  };
}
