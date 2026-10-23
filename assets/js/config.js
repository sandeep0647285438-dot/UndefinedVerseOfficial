
/**
 * UNDEFINEDVERSEOFFICIAL
 * Shared project configuration
 * File: assets/js/config.js
 */

export const UV_CONFIG = Object.freeze({
  name: "UndefinedVerseOfficial",

  // Keep this aligned with the deployed website's canonical URL.
  siteUrl: "https://undefinedverseofficial.pages.dev",

  selectors: Object.freeze({
    header: ".site-header",
    navigation: ".site-nav",
    navigationToggle: ".nav-toggle",
    background: ".cosmos",
    hero: ".hero",
    reveal: "[data-reveal]",
    currentYear: "[data-current-year]",
    developmentNotice: "#development-notice"
  }),

  breakpoints: Object.freeze({
    mobile: 760,
    smallMobile: 540,
    tablet: 1024
  }),

  motion: Object.freeze({
    scrollThreshold: 16,
    revealRootMargin: "0px 0px -48px 0px",
    revealThreshold: 0.12
  }),

  features: Object.freeze({
    smoothScroll: true,
    scrollReveal: true,
    backgroundEffects: true
  }),

  categories: Object.freeze([
    Object.freeze({
      id: "manga",
      label: "Manga",
      status: "in-development",
      target: "#development-notice"
    }),
    Object.freeze({
      id: "novels",
      label: "Novels",
      status: "in-development",
      target: "#development-notice"
    }),
    Object.freeze({
      id: "codex",
      label: "Codex",
      status: "in-development",
      target: "#development-notice"
    })
  ])
});

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
