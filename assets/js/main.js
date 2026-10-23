
/**
 * UNDEFINEDVERSEOFFICIAL
 * Main JavaScript
 * File: assets/js/main.js
 *
 * Lightweight navigation and page interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  /*
   * Mobile navigation
   */

  if (navToggle && siteNav) {
    const closeMenu = ({ restoreFocus = false } = {}) => {
      siteNav.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");

      if (restoreFocus) {
        navToggle.focus();
      }
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        siteNav.classList.add("is-open");
        navToggle.classList.add("is-active");
        navToggle.setAttribute("aria-expanded", "true");
      }
    });

    siteNav.addEventListener("click", (event) => {
      const link = event.target.closest("a");

      if (link) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        navToggle.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu({ restoreFocus: true });
      }
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNavigation =
        siteNav.contains(event.target) ||
        navToggle.contains(event.target);

      if (
        !clickedInsideNavigation &&
        navToggle.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
      }
    });

    const mobileBreakpoint = window.matchMedia("(max-width: 760px)");

    const handleBreakpointChange = (event) => {
      if (!event.matches) {
        closeMenu();
      }
    };

    if (mobileBreakpoint.addEventListener) {
      mobileBreakpoint.addEventListener(
        "change",
        handleBreakpointChange
      );
    } else {
      mobileBreakpoint.addListener(handleBreakpointChange);
    }
  }

  /*
   * Header scroll state
   */

  if (header) {
    const updateHeader = () => {
      header.classList.toggle(
        "is-scrolled",
        window.scrollY > 16
      );
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
      passive: true
    });
  }

  /*
   * Smooth scrolling for same-page links.
   * Native anchor behavior remains available if reduced motion
   * is enabled or smooth scrolling is unsupported.
   */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');

    if (!link) {
      return;
    }

    const href = link.getAttribute("href");

    if (!href || href === "#") {
      return;
    }

    let target;

    try {
      target = document.querySelector(
        `#${CSS.escape(decodeURIComponent(href.slice(1)))}`
      );
    } catch {
      return;
    }

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start"
    });

    if (!target.hasAttribute("tabindex") && target !== document.body) {
      target.setAttribute("tabindex", "-1");
    }

    if (target instanceof HTMLElement) {
      target.focus({ preventScroll: true });
    }

    if (window.location.hash !== href) {
      history.replaceState(null, "", href);
    }
  });

  /*
   * Footer year
   */

  const yearElement = document.querySelector("[data-current-year]");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
});
