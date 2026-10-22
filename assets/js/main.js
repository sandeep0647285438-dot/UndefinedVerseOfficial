
const canvas = document.getElementById("cosmos");
const ctx = canvas.getContext("2d", { alpha: true });

let width = 0;
let height = 0;
let stars = [];
let galaxies = [];
let frame = 0;
let lastFrame = 0;

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function createGalaxy(big = false) {
  return {
    x: rand(-0.05, 1.05),
    y: rand(0.04, 0.96),
    size: big ? rand(65, 115) : rand(18, 38),
    rotation: rand(0, Math.PI * 2),
    speed: rand(-0.00012, 0.00012),
    arms: Math.random() > 0.5 ? 2 : 3,
    hue: Math.random() > 0.72 ? 225 : rand(258, 282),
    alpha: big ? rand(0.19, 0.35) : rand(0.12, 0.25)
  };
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(
    170,
    Math.max(65, Math.floor(width * height / 6500))
  );

  stars = Array.from({ length: count }, () => ({
    x: rand(0, width),
    y: rand(0, height),
    r: rand(0.35, 1.35),
    phase: rand(0, Math.PI * 2),
    speed: rand(0.04, 0.22),
    alpha: rand(0.25, 0.9),
    hue: Math.random() > 0.7 ? 225 : 270
  }));

  const countGalaxies = width < 600 ? 5 : 8;

  galaxies = Array.from({ length: countGalaxies }, (_, i) =>
    createGalaxy(i < (width < 600 ? 2 : 3))
  );
}

function drawStar(star, time) {
  const pulse = reduceMotion
    ? 0.8
    : 0.65 + Math.sin(time * 0.001 + star.phase) * 0.35;

  ctx.fillStyle =
    `hsla(${star.hue}, 90%, 88%, ${star.alpha * pulse})`;

  ctx.beginPath();
  ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
  ctx.fill();

  if (star.r > 1.05) {
    ctx.strokeStyle = `rgba(207, 179, 255, ${pulse * 0.25})`;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(star.x - 3, star.y);
    ctx.lineTo(star.x + 3, star.y);
    ctx.moveTo(star.x, star.y - 3);
    ctx.lineTo(star.x, star.y + 3);
    ctx.stroke();
  }

  if (!reduceMotion) {
    star.y += star.speed;

    if (star.y > height + 2) {
      star.y = -2;
      star.x = rand(0, width);
    }
  }
}

function drawGalaxy(g, time) {
  const x = g.x * width;
  const y = g.y * height;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(g.rotation + (reduceMotion ? 0 : time * g.speed));
  ctx.globalAlpha = g.alpha;

  // Soft galactic glow.
  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, g.size * 1.8);
  glow.addColorStop(0, `hsla(${g.hue}, 95%, 78%, 0.52)`);
  glow.addColorStop(0.22, `hsla(${g.hue}, 90%, 65%, 0.23)`);
  glow.addColorStop(1, `hsla(${g.hue}, 90%, 45%, 0)`);

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(0, 0, g.size * 1.8, g.size * 0.85, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spiral arms made from many small points.
  for (let arm = 0; arm < g.arms; arm++) {
    for (let i = 0; i < 115; i++) {
      const t = i / 115;
      const angle =
        t * Math.PI * 4.2 + (arm * Math.PI * 2) / g.arms;

      const radius = 2 + t * g.size;
      const scatter = (Math.random() - 0.5) * 2.8;

      const px = Math.cos(angle) * radius + scatter;
      const py = Math.sin(angle) * radius * 0.43 + scatter;

      const pointSize = (1 - t) * 1.15 + 0.15;
      const opacity = (1 - t * 0.6) * 0.8;

      ctx.fillStyle =
        `hsla(${g.hue + rand(-8, 8)}, 90%, ${rand(65, 92)}%, ${opacity})`;

      ctx.beginPath();
      ctx.arc(px, py, pointSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Bright centre and a delicate outer halo.
  ctx.fillStyle = `hsla(${g.hue}, 100%, 94%, 0.9)`;
  ctx.beginPath();
  ctx.arc(0, 0, g.size > 60 ? 2.4 : 1.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function draw(time = 0) {
  if (!reduceMotion && time - lastFrame < 40) {
    frame = requestAnimationFrame(draw);
    return;
  }

  lastFrame = time;
  ctx.clearRect(0, 0, width, height);

  galaxies.forEach(g => drawGalaxy(g, time));
  stars.forEach(star => drawStar(star, time));

  if (!reduceMotion) {
    frame = requestAnimationFrame(draw);
  }
}

function restartCanvas() {
  cancelAnimationFrame(frame);
  resize();
  draw();
}

window.addEventListener("resize", restartCanvas);

resize();
draw();

// Change the demonstration dialogue when the button is tapped.
const dialogueSets = [
  [
    ["THE EXPLORER", "What lies beyond the edge of everything we know?"],
    ["THE UNKNOWN", "Perhaps the things we haven't dared to imagine yet."]
  ],
  [
    ["THE DREAMER", "Do you think every star has a story?"],
    ["THE OBSERVER", "Maybe. We just haven't learned how to listen."]
  ],
  [
    ["THE SEEKER", "What makes a world worth discovering?"],
    ["THE GUIDE", "The possibility that it might change you."]
  ]
];

let dialogueIndex = 0;

const changeButton = document.getElementById("changeDialogue");

if (changeButton) {
  changeButton.addEventListener("click", () => {
    dialogueIndex = (dialogueIndex + 1) % dialogueSets.length;

    const speeches = document.querySelectorAll(".speech");

    speeches.forEach((speech, i) => {
      const [speaker, words] = dialogueSets[dialogueIndex][i];
      speech.querySelector(".speaker").textContent = speaker;
      speech.querySelector("p").textContent = words;
    });
  });
}

document.getElementById("year").textContent =
  new Date().getFullYear();
