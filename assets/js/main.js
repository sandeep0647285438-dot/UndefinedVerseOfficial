
/* ========================================
   UndefinedVerseofficial (UV)
   Main JavaScript
======================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Keep the footer year current.
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Smoothly navigate to sections on the same page.
  const sectionLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  sectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      history.replaceState(null, "", targetId);
    });
  });

  // Mark the current page's navigation link.
  const currentPath = window.location.pathname.replace(
    /\/+$/,
    ""
  );

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const linkUrl = new URL(link.href, window.location.origin);

    const linkPath = linkUrl.pathname.replace(/\/+$/, "");

    link.classList.toggle(
      "active",
      linkPath === currentPath
    );
  });
});
