
/**
 * UNDEFINEDVERSEOFFICIAL
 * Shared website configuration
 * File: assets/js/config.js
 */

export const UV_CONFIG = Object.freeze({
  site: Object.freeze({
    name: "UndefinedVerseOfficial",
    shortName: "UV",
    url: "https://undefinedverseofficial.pages.dev",
    themeColor: "#08080b"
  }),

  selectors: Object.freeze({
    navigation: "#primary-navigation",
    navigationToggle: ".nav-toggle",
    developmentNotice: "#development-notice",
    catalogueLink: "[data-work-title]",
    currentYear: "[data-current-year]"
  }),

  categories: Object.freeze([
    Object.freeze({
      id: "manga",
      label: "Manga",
      status: "in-development",
      target: "/pages/manga.html"
    }),
    Object.freeze({
      id: "novels",
      label: "Novels",
      status: "in-development",
      target: "/pages/novels.html"
    }),
    Object.freeze({
      id: "codex",
      label: "Codex",
      status: "in-development",
      target: "/pages/codex.html"
    }),
    Object.freeze({
      id: "about",
      label: "About",
      status: "available",
      target: "/pages/about.html"
    }),
    Object.freeze({
      id: "status",
      label: "Status",
      status: "available",
      target: "/pages/status.html"
    })
  ]),

  motion: Object.freeze({
    defaultDuration: 220,
    revealThreshold: 0.12
  }),

  accessibility: Object.freeze({
    reducedMotionQuery: "(prefers-reduced-motion: reduce)",
    focusableElements: [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(", ")
  })
});
