
/**
 * UNDEFINEDVERSEOFFICIAL
 * Navigation controller
 * File: assets/js/navigation.js
 */

export function initNavigation() {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");
  const header = document.querySelector(".site-header");

  if (!toggle || !navigation) {
    console.error(
      "[UndefinedVerse] Navigation could not initialize.",
      {
        toggleFound: Boolean(toggle),
        navigationFound: Boolean(navigation)
      }
    );

    return () => {};
  }

  const mobileQuery = window.matchMedia("(max-width: 760px)");
  let isOpen = false;

  function setOpen(nextState, restoreFocus = false) {
    isOpen = Boolean(nextState);

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    toggle.classList.toggle("is-active", isOpen);
    navigation.classList.toggle("is-open", isOpen);

    if (header) {
      header.classList.toggle("menu-is-open", isOpen);
    }

    if (restoreFocus) {
      toggle.focus();
    }
  }

  function handleToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    setOpen(!isOpen);
  }

  function handleNavigationClick(event) {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest("a");

    if (link && navigation.contains(link)) {
      setOpen(false);
    }
  }

  function handleOutsideClick(event) {
    if (!isOpen) {
      return;
    }

    const target = event.target;

    if (
      target instanceof Node &&
      !toggle.contains(target) &&
      !navigation.contains(target)
    ) {
      setOpen(false);
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape" && isOpen) {
      setOpen(false, true);
    }
  }

  function handleBreakpointChange(event) {
    if (!event.matches) {
      setOpen(false);
    }
  }

  toggle.addEventListener("click", handleToggle);
  navigation.addEventListener("click", handleNavigationClick);
  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("keydown", handleKeydown);

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", handleBreakpointChange);
  } else {
    mobileQuery.addListener(handleBreakpointChange);
  }

  setOpen(false);

  return function destroyNavigation() {
    toggle.removeEventListener("click", handleToggle);
    navigation.removeEventListener("click", handleNavigationClick);
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("keydown", handleKeydown);

    if (typeof mobileQuery.removeEventListener === "function") {
      mobileQuery.removeEventListener("change", handleBreakpointChange);
    } else {
      mobileQuery.removeListener(handleBreakpointChange);
    }

    setOpen(false);
  };
}
