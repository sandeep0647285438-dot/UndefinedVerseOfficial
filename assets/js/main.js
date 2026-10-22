
const canvas = document.getElementById("cosmos");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let stars = [];
let galaxies = [];
let animationFrame;
let lastFrame = 0;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const starCount = Math.min(
    260,
    Math.floor((width * height) / 5000)
  );

  stars = Array.from({ length: starCount }, () => ({
    x: random(0, width),
    y: random(0, height),
    radius: random(0.4, 1.6),
    alpha: random(0.2, 0.9),
    speed: random(0.08, 0.35),
    phase: random(0, Math.PI * 2),
    tint: Math.random() > 0.7 ? 190 : 270
  }));

  galaxies = Array.from(
    { length: width < 600 ? 3 : 6 },
    () => ({
      x: random(0, width),
      y: random(0, height),
      size: random(9, 23),
      rotation: random(0, Math.PI * 2),
      speed: random(-0.0008, 0.0008),
      alpha: random(0.12, 0.32)
    })
  );
}

function drawStar(star, time) {
  const twinkle = reducedMotion
    ? 0.8
    : 0.55 + Math.sin(time * 0.001 + star.phase) * 0.4;

  ctx.beginPath();
  ctx.fillStyle = `hsla(${star.tint}, 90%, 88%, ${
    star.alpha * twinkle
  })`;
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fill();

  if (star.radius > 1.25 && star.alpha > 0.55) {
    ctx.strokeStyle = `rgba(205, 175, 255, ${twinkle * 0.25})`;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(star.x - 3, star.y);
    ctx.lineTo(star.x + 3, star.y);
    ctx.moveTo(star.x, star.y - 3);
    ctx.lineTo(star.x, star.y + 3);
    ctx.stroke();
  }

  if (!reducedMotion) {
    star.y += star.speed;

    if (star.y > height + 3) {
      star.y = -3;
      star.x = random(0, width);
    }
  }
}

function drawGalaxy(galaxy, time) {
  ctx.save();
  ctx.translate(galaxy.x, galaxy.y);
  ctx.rotate(
    galaxy.rotation + (reducedMotion ? 0 : time * galaxy.speed)
  );

  ctx.globalAlpha = galaxy.alpha;

  const glow = ctx.createRadialGradient(
    0, 0, 0,
    0, 0, galaxy.size * 1.8
  );

  glow.addColorStop(0, "rgba(211, 174, 255, 0.65)");
  glow.addColorStop(0.35, "rgba(151, 86, 255, 0.3)");
  glow.addColorStop(1, "rgba(100, 42, 180, 0)");

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(
    0, 0,
    galaxy.size * 1.8,
    galaxy.size * 0.65,
    0, 0, Math.PI * 2
  );
  ctx.fill();

  ctx.strokeStyle = "rgba(200, 163, 255, 0.7)";
  ctx.lineWidth = 0.7;

  for (let arm = 0; arm < 2; arm++) {
    ctx.beginPath();

    for (let i = 0; i <= 50; i++) {
      const progress = i / 50;
      const angle = progress * Math.PI * 2.5 +
        arm * Math.PI;

      const radius = progress * galaxy.size;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.45;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  }

  ctx.fillStyle = "rgba(246, 229, 255, 0.85)";
  ctx.beginPath();
  ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawCosmos(time = 0) {
  if (reducedMotion) time = 0;

  // Limit the animation workload on slower phones.
  if (!reducedMotion && time - lastFrame < 32) {
    animationFrame = requestAnimationFrame(drawCosmos);
    return;
  }

  lastFrame = time;

  ctx.clearRect(0, 0, width, height);

  galaxies.forEach(galaxy => drawGalaxy(galaxy, time));
  stars.forEach(star => drawStar(star, time));

  if (!reducedMotion) {
    animationFrame = requestAnimationFrame(drawCosmos);
  }
}

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  drawCosmos();
});

resizeCanvas();
drawCosmos();

document.getElementById("year").textContent =
  new Date().getFullYear();
