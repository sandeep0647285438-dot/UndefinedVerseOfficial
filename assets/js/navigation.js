
/**
 * UNDEFINEDVERSEOFFICIAL
 * Navigation controller
 * File: assets/js/navigation.js
 */

export function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");

  if (!toggle || !navigation) {
    return () => {};
  }

  const header = document.querySelector(".site-header");
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

    if (!isOpen && restoreFocus) {
      toggle.focus();
    }
  }

  function handleToggle() {
    setOpen(!isOpen);
  }

  function handleNavigationClick(event) {
    const link = event.target.closest("a");

    if (link && navigation.contains(link)) {
      setOpen(false);
    }
  }

  function handleOutsideClick(event) {
    if (!isOpen) {
      return;
    }

    if (
      !toggle.contains(event.target) &&
      !navigation.contains(event.target)
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

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", handleBreakpointChange);
  } else {
    mobileQuery.addListener(handleBreakpointChange);
  }

  // Synchronize initial state with the HTML.
  setOpen(false);

  // Return a cleanup function for safe reinitialization.
  return function destroyNavigation() {
    toggle.removeEventListener("click", handleToggle);
    navigation.removeEventListener("click", handleNavigationClick);
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("keydown", handleKeydown);

    if (mobileQuery.removeEventListener) {
      mobileQuery.removeEventListener(
        "change",
        handleBreakpointChange
      );
    } else {
      mobileQuery.removeListener(handleBreakpointChange);
    }

    setOpen(false);
  };
}
