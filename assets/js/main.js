
(() => {
  "use strict";

  const canvas = document.getElementById("cosmos");
  const ctx = canvas?.getContext("2d", { alpha: false });

  if (!canvas || !ctx) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let width = 0;
  let height = 0;
  let dpr = 1;
  let stars = [];
  let galaxyLayer = document.createElement("canvas");
  let galaxyCtx = galaxyLayer.getContext("2d");
  let animationId = 0;
  let lastFrame = 0;

  const rand = (min, max) => Math.random() * (max - min) + min;

  function makeStar() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: rand(0.35, 1.7),
      alpha: rand(0.25, 0.95),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.4, 1.8),
      color: Math.random() < 0.17
        ? (Math.random() < 0.5 ? "#b6caff" : "#dcbaff")
        : "#ffffff",
      twinkle: Math.random() > 0.35
    };
  }

  function drawBackground() {
    const gradient = ctx.createRadialGradient(
      width * 0.52, height * 0.43, 0,
      width * 0.52, height * 0.43,
      Math.max(width, height) * 0.82
    );

    gradient.addColorStop(0, "#100a27");
    gradient.addColorStop(0.52, "#080619");
    gradient.addColorStop(1, "#03020a");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  // Soft, irregular nebula clouds behind the spiral arms.
  function drawNebula(x, y, radius, color) {
    const glow = galaxyCtx.createRadialGradient(
      x, y, radius * 0.04,
      x, y, radius
    );

    glow.addColorStop(0, color);
    glow.addColorStop(0.3, color.replace("ALPHA", "0.12"));
    glow.addColorStop(1, "rgba(0,0,0,0)");

    galaxyCtx.fillStyle = glow;
    galaxyCtx.beginPath();
    galaxyCtx.arc(x, y, radius, 0, Math.PI * 2);
    galaxyCtx.fill();
  }

  // A real mathematical spiral-arm layout, stylized for a cosmic scene.
  function drawGalaxy(config) {
    const { x, y, rx, ry, rotation, arms, color } = config;

    galaxyCtx.save();
    galaxyCtx.translate(x, y);
    galaxyCtx.rotate(rotation);

    // Wide halo around the galaxy.
    const halo = galaxyCtx.createRadialGradient(0, 0, 0, 0, 0, rx * 1.4);
    halo.addColorStop(0, "rgba(188,150,255,0.18)");
    halo.addColorStop(0.35, "rgba(107,83,255,0.09)");
    halo.addColorStop(1, "rgba(0,0,0,0)");

    galaxyCtx.fillStyle = halo;
    galaxyCtx.beginPath();
    galaxyCtx.ellipse(0, 0, rx * 1.4, ry * 1.8, 0, 0, Math.PI * 2);
    galaxyCtx.fill();

    // Bright central stellar bulge.
    const core = galaxyCtx.createRadialGradient(
      0, 0, 0, 0, 0, Math.max(rx, ry) * 0.46
    );

    core.addColorStop(0, "rgba(255,247,224,0.98)");
    core.addColorStop(0.09, color);
    core.addColorStop(0.38, "rgba(177,124,255,0.28)");
    core.addColorStop(1, "rgba(0,0,0,0)");

    galaxyCtx.fillStyle = core;
    galaxyCtx.beginPath();
    galaxyCtx.arc(0, 0, Math.max(rx, ry) * 0.46, 0, Math.PI * 2);
    galaxyCtx.fill();

    const particleCount = Math.round(
      Math.min(1550, Math.max(520, rx * 4.1))
    );

    // Scatter stars along curved spiral arms.
    for (let i = 0; i < particleCount; i++) {
      const arm = i % arms;
      const progress = Math.random();
      const angle = arm * (Math.PI * 2 / arms)
        + progress * Math.PI * 4.5
        + rand(-0.3, 0.3);

      const distance = 0.055 + progress * 0.95;
      const scatter = (0.025 + progress * 0.085) * rx;

      const px = Math.cos(angle) * distance * rx
        + rand(-scatter, scatter);
      const py = Math.sin(angle) * distance * ry
        + rand(-scatter, scatter);

      const particleSize = rand(0.35, 1.45)
        * (1.1 - progress * 0.25);

      const brightness = rand(0.28, 0.95);

      galaxyCtx.globalAlpha = brightness;
      galaxyCtx.fillStyle = Math.random() > 0.73
        ? "#c8d8ff"
        : color;

      galaxyCtx.beginPath();
      galaxyCtx.arc(px, py, particleSize, 0, Math.PI * 2);
      galaxyCtx.fill();
    }

    // Fine luminous threads following the arms.
    galaxyCtx.globalAlpha = 0.16;
    galaxyCtx.strokeStyle = color;
    galaxyCtx.lineWidth = Math.max(0.6, rx * 0.003);

    for (let arm = 0; arm < arms; arm++) {
      galaxyCtx.beginPath();

      for (let step = 0; step <= 150; step++) {
        const progress = step / 150;
        const angle = arm * (Math.PI * 2 / arms)
          + progress * Math.PI * 4.5;
        const distance = 0.055 + progress * 0.95;

        const px = Math.cos(angle) * distance * rx;
        const py = Math.sin(angle) * distance * ry;

        if (step === 0) galaxyCtx.moveTo(px, py);
        else galaxyCtx.lineTo(px, py);
      }

      galaxyCtx.stroke();
    }

    galaxyCtx.restore();
    galaxyCtx.globalAlpha = 1;
  }

  function buildGalaxyLayer() {
    galaxyLayer.width = Math.ceil(width * dpr);
    galaxyLayer.height = Math.ceil(height * dpr);

    galaxyCtx = galaxyLayer.getContext("2d");
    galaxyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    galaxyCtx.clearRect(0, 0, width, height);

    // Colored clouds create depth behind the galaxies.
    const clouds = [
      [0.13, 0.23, 0.23, "rgba(122,58,255,ALPHA)"],
      [0.83, 0.31, 0.25, "rgba(42,103,255,ALPHA)"],
      [0.52, 0.75, 0.25, "rgba(212,61,203,ALPHA)"],
      [0.94, 0.76, 0.17, "rgba(81,65,255,ALPHA)"],
      [0.06, 0.68, 0.17, "rgba(239,70,179,ALPHA)"]
    ];

    for (const [nx, ny, scale, color] of clouds) {
      drawNebula(
        nx * width,
        ny * height,
        Math.min(width, height) * scale,
        color
      );
    }

    // Galaxies are deliberately distributed around the screen,
    // leaving the center open for website text.
    const mobile = width < 650;
    const smallSide = Math.min(width, height);

    const galaxyConfigs = [
      {
        x: width * 0.15,
        y: height * (mobile ? 0.20 : 0.24),
        rx: smallSide * (mobile ? 0.15 : 0.20),
        ry: smallSide * (mobile ? 0.055 : 0.075),
        rotation: -0.55,
        arms: 3,
        color: "#bc8cff"
      },
      {
        x: width * 0.86,
        y: height * (mobile ? 0.34 : 0.31),
        rx: smallSide * (mobile ? 0.17 : 0.24),
        ry: smallSide * (mobile ? 0.075 : 0.095),
        rotation: 0.42,
        arms: 4,
        color: "#729aff"
      },
      {
        x: width * 0.12,
        y: height * 0.77,
        rx: smallSide * 0.105,
        ry: smallSide * 0.043,
        rotation: 0.3,
        arms: 3,
        color: "#ff83d4"
      },
      {
        x: width * 0.77,
        y: height * 0.82,
        rx: smallSide * 0.12,
        ry: smallSide * 0.05,
        rotation: -0.5,
        arms: 3,
        color: "#8a7cff"
      }
    ];

    for (const galaxy of galaxyConfigs) {
      drawGalaxy(galaxy);
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Increase star density on large screens without
    // creating an excessive amount of animation work.
    const starCount = Math.min(
      950,
      Math.max(260, Math.floor(width * height / 1250))
    );

    stars = Array.from({ length: starCount }, makeStar);

    drawBackground();
    buildGalaxyLayer();
    render(performance.now(), true);
  }

  function render(time, still = false) {
    drawBackground();

    // The galaxy art is static between resizes; only stars twinkle.
    ctx.drawImage(galaxyLayer, 0, 0, width, height);

    for (const star of stars) {
      const twinkle = star.twinkle && !still && !reducedMotion.matches
        ? 0.65 + 0.35 * Math.sin(
            time * 0.001 * star.speed + star.phase
          )
        : 0.9;

      ctx.globalAlpha = star.alpha * twinkle;
      ctx.fillStyle = star.color;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      // Occasional subtle four-point glints.
      if (star.radius > 1.35) {
        ctx.strokeStyle = star.color;
        ctx.globalAlpha = star.alpha * twinkle * 0.45;
        ctx.lineWidth = 0.6;

        ctx.beginPath();
        ctx.moveTo(star.x - 3.2, star.y);
        ctx.lineTo(star.x + 3.2, star.y);
        ctx.moveTo(star.x, star.y - 3.2);
        ctx.lineTo(star.x, star.y + 3.2);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;

    if (!still && !reducedMotion.matches) {
      animationId = requestAnimationFrame(render);
    }
  }

  function startAnimation() {
    cancelAnimationFrame(animationId);
    animationId = 0;
    render(performance.now());
  }

  window.addEventListener("resize", resize, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
      animationId = 0;
    } else {
      startAnimation();
    }
  });

  reducedMotion.addEventListener?.("change", startAnimation);

  // Mobile navigation.
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  menuToggle?.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navigation?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  // Keep the footer year current.
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Initial render.
  resize();
})();
