
/*
 * UndefinedVerseOfficial (UV)
 * Cosmic Background Engine
 * Features: dense stars, spiral galaxies, colorful nebulae,
 * twinkling lights, responsive canvas, and mobile navigation.
 */

(() => {
  "use strict";

  // ==========================================
  // 1. CANVAS SETUP
  // ==========================================

  const canvas = document.getElementById("cosmos");

  if (!canvas) {
    console.error('UV: Canvas with id="cosmos" was not found.');
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let stars = [];
  let animationId = null;
  let lastFrameTime = 0;

  // Draw the static galaxies on a separate canvas.
  const spaceCanvas = document.createElement("canvas");
  const spaceCtx = spaceCanvas.getContext("2d");

  if (!spaceCtx) return;

  const random = (min, max) =>
    Math.random() * (max - min) + min;

  // ==========================================
  // 2. DEEP SPACE BACKGROUND
  // ==========================================

  function drawBackground() {
    const background = ctx.createRadialGradient(
      width * 0.5,
      height * 0.42,
      0,
      width * 0.5,
      height * 0.42,
      Math.max(width, height) * 0.8
    );

    background.addColorStop(0, "#100b28");
    background.addColorStop(0.45, "#080619");
    background.addColorStop(1, "#020108");

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }

  // ==========================================
  // 3. COLORFUL NEBULAE
  // ==========================================

  function drawNebula(x, y, radius, color) {
    const glow = spaceCtx.createRadialGradient(
      x, y, 0,
      x, y, radius
    );

    glow.addColorStop(0, color);
    glow.addColorStop(0.28, color);
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");

    spaceCtx.fillStyle = glow;
    spaceCtx.beginPath();
    spaceCtx.arc(x, y, radius, 0, Math.PI * 2);
    spaceCtx.fill();
  }

  // ==========================================
  // 4. SPIRAL GALAXY GENERATOR
  // ==========================================

  function drawGalaxy(config) {
    const {
      x, y, rx, ry, rotation, arms, color
    } = config;

    spaceCtx.save();
    spaceCtx.translate(x, y);
    spaceCtx.rotate(rotation);

    // Large diffuse halo.
    const halo = spaceCtx.createRadialGradient(
      0, 0, rx * 0.05,
      0, 0, rx * 1.3
    );

    halo.addColorStop(0, "rgba(214, 192, 255, 0.20)");
    halo.addColorStop(0.35, "rgba(118, 83, 255, 0.10)");
    halo.addColorStop(1, "rgba(0, 0, 0, 0)");

    spaceCtx.fillStyle = halo;
    spaceCtx.beginPath();
    spaceCtx.ellipse(0, 0, rx * 1.3, ry * 2.0, 0, 0, Math.PI * 2);
    spaceCtx.fill();

    // Bright galactic core.
    const core = spaceCtx.createRadialGradient(
      0, 0, 0,
      0, 0, Math.max(rx, ry) * 0.5
    );

    core.addColorStop(0, "rgba(255, 248, 230, 0.98)");
    core.addColorStop(0.12, color);
    core.addColorStop(0.4, "rgba(169, 112, 255, 0.35)");
    core.addColorStop(1, "rgba(0, 0, 0, 0)");

    spaceCtx.fillStyle = core;
    spaceCtx.beginPath();
    spaceCtx.arc(0, 0, Math.max(rx, ry) * 0.5, 0, Math.PI * 2);
    spaceCtx.fill();

    // Hundreds of luminous particles form spiral arms.
    const particleCount = Math.min(
      1500,
      Math.max(450, Math.floor(rx * 4))
    );

    for (let i = 0; i < particleCount; i++) {
      const arm = i % arms;

      const progress = Math.random();
      const angle =
        arm * (Math.PI * 2 / arms) +
        progress * Math.PI * 4.5 +
        random(-0.3, 0.3);

      const distance = 0.04 + progress * 0.96;
      const spread = (0.018 + progress * 0.09) * rx;

      const px =
        Math.cos(angle) * distance * rx +
        random(-spread, spread);

      const py =
        Math.sin(angle) * distance * ry +
        random(-spread, spread);

      const particleRadius = random(0.35, 1.5);
      const brightness = random(0.3, 0.95);

      spaceCtx.globalAlpha = brightness;
      spaceCtx.fillStyle =
        Math.random() > 0.72 ? "#c6d9ff" : color;

      spaceCtx.beginPath();
      spaceCtx.arc(px, py, particleRadius, 0, Math.PI * 2);
      spaceCtx.fill();
    }

    // Delicate spiral filaments.
    spaceCtx.globalAlpha = 0.18;
    spaceCtx.strokeStyle = color;
    spaceCtx.lineWidth = Math.max(0.5, rx * 0.003);

    for (let arm = 0; arm < arms; arm++) {
      spaceCtx.beginPath();

      for (let step = 0; step <= 160; step++) {
        const progress = step / 160;

        const angle =
          arm * (Math.PI * 2 / arms) +
          progress * Math.PI * 4.5;

        const distance = 0.04 + progress * 0.96;
        const px = Math.cos(angle) * distance * rx;
        const py = Math.sin(angle) * distance * ry;

        if (step === 0) {
          spaceCtx.moveTo(px, py);
        } else {
          spaceCtx.lineTo(px, py);
        }
      }

      spaceCtx.stroke();
    }

    spaceCtx.restore();
    spaceCtx.globalAlpha = 1;
  }

  // ==========================================
  // 5. BUILD THE ENTIRE COSMIC SCENE
  // ==========================================

  function buildCosmos() {
    spaceCanvas.width = Math.ceil(width * pixelRatio);
    spaceCanvas.height = Math.ceil(height * pixelRatio);

    spaceCtx.setTransform(
      pixelRatio, 0, 0, pixelRatio, 0, 0
    );

    spaceCtx.clearRect(0, 0, width, height);

    const smallestSide = Math.min(width, height);
    const mobile = width < 650;

    // Nebula clouds: purple, blue, pink and golden light.
    const nebulae = [
      {
        x: width * 0.12,
        y: height * 0.24,
        size: smallestSide * 0.28,
        color: "rgba(117, 49, 255, 0.15)"
      },
      {
        x: width * 0.84,
        y: height * 0.30,
        size: smallestSide * 0.30,
        color: "rgba(38, 105, 255, 0.16)"
      },
      {
        x: width * 0.48,
        y: height * 0.75,
        size: smallestSide * 0.32,
        color: "rgba(225, 48, 190, 0.13)"
      },
      {
        x: width * 0.94,
        y: height * 0.77,
        size: smallestSide * 0.20,
        color: "rgba(255, 132, 69, 0.11)"
      },
      {
        x: width * 0.05,
        y: height * 0.68,
        size: smallestSide * 0.20,
        color: "rgba(65, 95, 255, 0.15)"
      }
    ];

    for (const cloud of nebulae) {
      drawNebula(
        cloud.x,
        cloud.y,
        cloud.size,
        cloud.color
      );
    }

    // Noticeable galaxies spread across the screen.
    const galaxies = [
      {
        x: width * 0.15,
        y: height * 0.22,
        rx: smallestSide * (mobile ? 0.17 : 0.20),
        ry: smallestSide * (mobile ? 0.065 : 0.078),
        rotation: -0.5,
        arms: 3,
        color: "#c19aff"
      },
      {
        x: width * 0.85,
        y: height * 0.32,
        rx: smallestSide * (mobile ? 0.18 : 0.25),
        ry: smallestSide * (mobile ? 0.075 : 0.10),
        rotation: 0.45,
        arms: 4,
        color: "#82a7ff"
      },
      {
        x: width * 0.12,
        y: height * 0.76,
        rx: smallestSide * 0.11,
        ry: smallestSide * 0.045,
        rotation: 0.3,
        arms: 3,
        color: "#ff92d9"
      },
      {
        x: width * 0.78,
        y: height * 0.83,
        rx: smallestSide * 0.13,
        ry: smallestSide * 0.05,
        rotation: -0.55,
        arms: 3,
        color: "#9b86ff"
      }
    ];

    for (const galaxy of galaxies) {
      drawGalaxy(galaxy);
    }

    // Small distant galaxies scattered in the background.
    for (let i = 0; i < 12; i++) {
      const x = random(0, width);
      const y = random(0, height);
      const radius = random(2, 6);

      spaceCtx.save();
      spaceCtx.translate(x, y);
      spaceCtx.rotate(random(-1, 1));

      spaceCtx.strokeStyle =
        Math.random() > 0.5
          ? "rgba(174, 144, 255, 0.55)"
          : "rgba(108, 169, 255, 0.55)";

      spaceCtx.lineWidth = 0.8;
      spaceCtx.beginPath();
      spaceCtx.ellipse(
        0, 0, radius * 1.8, radius * 0.65,
        0, 0, Math.PI * 2
      );
      spaceCtx.stroke();

      spaceCtx.restore();
    }
  }

  // ==========================================
  // 6. DENSE STARFIELD
  // ==========================================

  function createStar() {
    const size = Math.random();

    return {
      x: random(0, width),
      y: random(0, height),
      radius: size > 0.985
        ? random(1.5, 2.2)
        : size > 0.8
          ? random(0.8, 1.35)
          : random(0.3, 0.8),
      alpha: random(0.3, 1),
      phase: random(0, Math.PI * 2),
      speed: random(0.5, 2),
      twinkle: Math.random() > 0.3,
      color: Math.random() > 0.92
        ? "#b9caff"
        : Math.random() > 0.92
          ? "#e0baff"
          : "#ffffff"
    };
  }

  function buildStars() {
    const count = Math.min(
      1100,
      Math.max(350, Math.floor(width * height / 850))
    );

    stars = Array.from(
      { length: count },
      createStar
    );
  }

  function drawStars(time, staticFrame) {
    for (const star of stars) {
      const twinkle =
        star.twinkle &&
        !staticFrame &&
        !reducedMotion.matches
          ? 0.55 + 0.45 * Math.sin(
              time * 0.001 * star.speed + star.phase
            )
          : 0.9;

      ctx.globalAlpha = star.alpha * twinkle;
      ctx.fillStyle = star.color;

      ctx.beginPath();
      ctx.arc(
        star.x,
        star.y,
        star.radius,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // A delicate cross-shaped sparkle for brighter stars.
      if (star.radius > 1.5) {
        ctx.globalAlpha = star.alpha * twinkle * 0.6;
        ctx.strokeStyle = star.color;
        ctx.lineWidth = 0.65;

        ctx.beginPath();
        ctx.moveTo(star.x - 4, star.y);
        ctx.lineTo(star.x + 4, star.y);
        ctx.moveTo(star.x, star.y - 4);
        ctx.lineTo(star.x, star.y + 4);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
  }

  // ==========================================
  // 7. RENDERING AND ANIMATION
  // ==========================================

  function render(time, staticFrame = false) {
    animationId = null;

    if (!staticFrame && time - lastFrameTime < 30) {
      animationId = requestAnimationFrame(render);
      return;
    }

    lastFrameTime = time;

    drawBackground();

    // Draw pre-rendered nebulae and galaxies.
    ctx.drawImage(
      spaceCanvas,
      0, 0,
      spaceCanvas.width,
      spaceCanvas.height,
      0, 0,
      width, height
    );

    // Stars appear over the entire cosmic scene.
    drawStars(time, staticFrame);

    if (!staticFrame && !reducedMotion.matches) {
      animationId = requestAnimationFrame(render);
    }
  }

  function stopAnimation() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function startAnimation() {
    stopAnimation();

    if (document.hidden) return;

    if (reducedMotion.matches) {
      render(performance.now(), true);
    } else {
      animationId = requestAnimationFrame(render);
    }
  }

  // ==========================================
  // 8. RESPONSIVE RESIZING
  // ==========================================

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      1.5
    );

    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(
      pixelRatio, 0, 0, pixelRatio, 0, 0
    );

    buildStars();
    buildCosmos();
    startAnimation();
  }

  window.addEventListener("resize", resize, {
    passive: true
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener("change", startAnimation);
  }

  // ==========================================
  // 9. MOBILE NAVIGATION
  // ==========================================

  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // ==========================================
  // 10. AUTOMATIC FOOTER YEAR
  // ==========================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 11. START UV
  // ==========================================

  resize();

  console.log(
    "UndefinedVerseOfficial: Cosmic background initialized."
  );
})();
