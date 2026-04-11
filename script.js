const snippets = {
  api: {
    label: "API",
    description: "Typed route result modeling for field operations routing and ETA calculation.",
    code: `type DailyRouteResult = {
  ordered_jobs: OrderedRouteJob[];
  legs: RouteLeg[];
  total_distance: number;
  total_time: number;
};`,
  },
  ui: {
    label: "UI",
    description: "Component structure that keeps presentation clean while still feeling productized.",
    code: `function ProjectCard({ title, stack, summary }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{summary}</p>
      <footer>{stack.join(" • ")}</footer>
    </article>
  );
}`,
  },
  data: {
    label: "Data",
    description: "Rust-side state transitions for turning frame-by-frame movement into useful stages.",
    code: `if (matches!(current_stage, ShotStage::Load)
  && wrist_velocity <= thresholds.set_point_velocity_threshold) {
  current_stage = ShotStage::SetPoint;
}`,
  },
};

const terminalMessages = [
  "loading jumpshot trainer case study",
  "mounting tadester ops systems snapshot",
  "warming up portfolio interaction layer",
  "animating signal field and packet runner",
  "ready for recruiters, founders, and engineers",
];

const bgCanvas = document.querySelector("#bg-canvas");
const snippetContent = document.querySelector("#snippet-content");
const snippetTabs = document.querySelectorAll(".snippet-tab");
const projectToggles = document.querySelectorAll(".project-toggle");
const terminalLog = document.querySelector("#terminal-log");
const glowRange = document.querySelector("#glow-range");
const gridRange = document.querySelector("#grid-range");
const speedRange = document.querySelector("#speed-range");
const revealTargets = document.querySelectorAll(".project-card, .contact-card, .proof-card, .gallery-card, .architecture-card, .game-showcase-card, .game-info-card, .game-controls-card, .resume-nav, .resume-stage");
const resumeLinks = document.querySelectorAll(".resume-link");
const snippetCaption = document.querySelector("#snippet-caption");
const topbar = document.querySelector(".topbar");
const headshotImage = document.querySelector(".headshot-image");
const headshotFrame = document.querySelector(".headshot-frame");
const galleryImages = document.querySelectorAll(".gallery-image");
const resumeTabs = document.querySelectorAll(".resume-tab");
const resumePanels = document.querySelectorAll(".resume-panel");
const gameBoard = document.querySelector("#game-board");
const playerDot = document.querySelector("#player-dot");
const gameStart = document.querySelector("#game-start");
const gameReset = document.querySelector("#game-reset");
const gameScore = document.querySelector("#game-score");
const gameBest = document.querySelector("#game-best");

const backgroundState = {
  particles: [],
  speed: 0.42,
};

const gameState = {
  running: false,
  x: 40,
  y: 120,
  boardWidth: 320,
  boardHeight: 260,
  score: 0,
  best: 0,
  obstacles: [],
  pickups: [],
  frame: 0,
  rafId: null,
};

function setSnippet(key) {
  if (!snippetContent) return;
  const snippet = snippets[key];
  snippetContent.textContent = snippet.code;

  if (snippetCaption) {
    snippetCaption.innerHTML = `<span>${snippet.label}</span><strong>${snippet.description}</strong>`;
  }

  snippetTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.snippet === key);
  });
}

snippetTabs.forEach((tab) => {
  tab.addEventListener("click", () => setSnippet(tab.dataset.snippet));
});

projectToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`#${button.dataset.target}`);
    if (!target) return;

    target.hidden = !target.hidden;
    button.textContent = target.hidden ? "Reveal System Snapshot" : "Hide System Snapshot";
  });
});

function appendTerminalLine(message, delay) {
  window.setTimeout(() => {
    if (!terminalLog) return;

    const line = document.createElement("p");
    line.className = "terminal-line";
    line.innerHTML = `<span>ktr@portfolio</span>:~$ ${message}`;
    terminalLog.appendChild(line);
  }, delay);
}

function bindRangeControl(input, variable, divisor = 100) {
  if (!input) return;

  const applyValue = () => {
    document.documentElement.style.setProperty(variable, Number(input.value) / divisor);
  };

  input.addEventListener("input", applyValue);
  applyValue();
}

function setupHeadshotFallback() {
  if (!headshotImage || !headshotFrame) return;

  headshotImage.addEventListener("load", () => {
    headshotFrame.classList.add("has-image");
  });

  headshotImage.addEventListener("error", () => {
    headshotImage.remove();
  });
}

function setupGalleryFallbacks() {
  galleryImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("is-missing");
      image.parentElement?.classList.add("is-empty");
    });
  });
}

function setupResumeWalkthrough() {
  if (!resumeTabs.length || !resumePanels.length) return;

  resumeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const panelKey = tab.dataset.resumePanel;

      resumeTabs.forEach((item) => item.classList.toggle("active", item === tab));
      resumePanels.forEach((panel) => {
        const isActive = panel.id === `resume-panel-${panelKey}`;
        panel.hidden = !isActive;
        panel.classList.toggle("active", isActive);
      });
    });
  });
}

function syncScrollState() {
  if (!topbar) return;

  const isScrolled = window.scrollY > 24;
  document.body.classList.toggle("scrolled", isScrolled);
}

function setupBackgroundCanvas() {
  if (!(bgCanvas instanceof HTMLCanvasElement)) return;

  const context = bgCanvas.getContext("2d");
  if (!context) return;

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth * window.devicePixelRatio;
    bgCanvas.height = window.innerHeight * window.devicePixelRatio;
    bgCanvas.style.width = `${window.innerWidth}px`;
    bgCanvas.style.height = `${window.innerHeight}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

    backgroundState.particles = Array.from({ length: Math.min(70, Math.floor(window.innerWidth / 18)) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2.4 + 0.8,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      hue: Math.random() > 0.5 ? "119, 166, 255" : "240, 90, 107",
    }));
  }

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    backgroundState.particles.forEach((particle, index) => {
      particle.x += particle.vx * (backgroundState.speed * 2 + 0.2);
      particle.y += particle.vy * (backgroundState.speed * 2 + 0.2);

      if (particle.x < -20) particle.x = window.innerWidth + 20;
      if (particle.x > window.innerWidth + 20) particle.x = -20;
      if (particle.y < -20) particle.y = window.innerHeight + 20;
      if (particle.y > window.innerHeight + 20) particle.y = -20;

      context.beginPath();
      context.fillStyle = `rgba(${particle.hue}, 0.55)`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();

      for (let otherIndex = index + 1; otherIndex < backgroundState.particles.length; otherIndex += 1) {
        const other = backgroundState.particles[otherIndex];
        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 110) continue;

        context.strokeStyle = `rgba(119, 166, 255, ${0.08 - distance / 1800})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }
    });

    window.requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();
  window.addEventListener("resize", resizeCanvas);
}

function updateGameHud() {
  if (gameScore) gameScore.textContent = `Score: ${gameState.score}`;
  if (gameBest) gameBest.textContent = `Best: ${gameState.best}`;
}

function setPlayerPosition() {
  if (!playerDot) return;
  playerDot.style.left = `${gameState.x}px`;
  playerDot.style.top = `${gameState.y}px`;
}

function resetGame() {
  if (!(gameBoard instanceof HTMLElement)) return;

  if (gameState.rafId) {
    window.cancelAnimationFrame(gameState.rafId);
    gameState.rafId = null;
  }

  gameState.boardWidth = gameBoard.clientWidth;
  gameState.boardHeight = gameBoard.clientHeight;
  gameState.x = 40;
  gameState.y = Math.max(20, gameState.boardHeight / 2 - 9);
  gameState.score = 0;
  gameState.frame = 0;
  gameState.obstacles.forEach((obstacle) => obstacle.element.remove());
  gameState.pickups.forEach((pickup) => pickup.element.remove());
  gameState.obstacles = [];
  gameState.pickups = [];
  updateGameHud();
  setPlayerPosition();
  if (gameStart) gameStart.textContent = "Start Game";
}

function endGame() {
  gameState.running = false;
  if (gameStart) gameStart.textContent = "Restart Game";
  if (gameState.rafId) {
    window.cancelAnimationFrame(gameState.rafId);
    gameState.rafId = null;
  }
}

function spawnObstacle() {
  if (!(gameBoard instanceof HTMLElement)) return;

  const obstacle = document.createElement("div");
  obstacle.className = "obstacle-dot";
  const data = {
    x: gameState.boardWidth + 20,
    y: Math.random() * Math.max(40, gameState.boardHeight - 30),
    size: 14 + Math.random() * 18,
    speed: 2.8 + Math.random() * 2.2,
    element: obstacle,
  };

  obstacle.style.width = `${data.size}px`;
  obstacle.style.height = `${data.size}px`;
  gameBoard.appendChild(obstacle);
  gameState.obstacles.push(data);
}

function spawnPickup() {
  if (!(gameBoard instanceof HTMLElement)) return;

  const pickup = document.createElement("div");
  pickup.className = "pickup-orb";
  const data = {
    x: gameState.boardWidth + 20,
    y: Math.random() * Math.max(40, gameState.boardHeight - 30),
    size: 14,
    speed: 3.2,
    element: pickup,
  };

  gameBoard.appendChild(pickup);
  gameState.pickups.push(data);
}

function tickGame() {
  if (!gameState.running) return;

  gameState.frame += 1;
  gameState.score += 1;
  gameState.best = Math.max(gameState.best, gameState.score);
  updateGameHud();

  if (gameState.frame % 45 === 0) {
    spawnObstacle();
  }
  if (gameState.frame % 120 === 0) {
    spawnPickup();
  }

  gameState.obstacles = gameState.obstacles.filter((obstacle) => {
    obstacle.x -= obstacle.speed;
    obstacle.element.style.left = `${obstacle.x}px`;
    obstacle.element.style.top = `${obstacle.y}px`;

    const dx = obstacle.x - gameState.x;
    const dy = obstacle.y - gameState.y;
    const distance = Math.hypot(dx, dy);

    if (distance < obstacle.size / 2 + 9) {
      endGame();
    }

    if (obstacle.x < -40) {
      obstacle.element.remove();
      return false;
    }

    return true;
  });

  gameState.pickups = gameState.pickups.filter((pickup) => {
    pickup.x -= pickup.speed;
    pickup.element.style.left = `${pickup.x}px`;
    pickup.element.style.top = `${pickup.y}px`;

    const dx = pickup.x - gameState.x;
    const dy = pickup.y - gameState.y;
    const distance = Math.hypot(dx, dy);

    if (distance < pickup.size / 2 + 16) {
      gameState.score += 45;
      pickup.element.remove();
      return false;
    }

    if (pickup.x < -30) {
      pickup.element.remove();
      return false;
    }

    return true;
  });

  if (!gameState.running) return;
  gameState.rafId = window.requestAnimationFrame(tickGame);
}

function setupGame() {
  if (!(gameBoard instanceof HTMLElement) || !(playerDot instanceof HTMLElement) || !(gameStart instanceof HTMLElement)) {
    return;
  }

  resetGame();

  const movePlayer = (event) => {
    if (!gameState.running) return;

    const step = 18;
    if (event.key === "ArrowUp") gameState.y -= step;
    if (event.key === "ArrowDown") gameState.y += step;
    if (event.key === "ArrowLeft") gameState.x -= step;
    if (event.key === "ArrowRight") gameState.x += step;

    gameState.x = Math.max(8, Math.min(gameState.boardWidth - 26, gameState.x));
    gameState.y = Math.max(8, Math.min(gameState.boardHeight - 26, gameState.y));
    setPlayerPosition();
  };

  window.addEventListener("keydown", movePlayer);

  gameBoard.addEventListener("mousemove", (event) => {
    if (!gameState.running) return;

    const bounds = gameBoard.getBoundingClientRect();
    gameState.x = Math.max(8, Math.min(bounds.width - 26, event.clientX - bounds.left - 9));
    gameState.y = Math.max(8, Math.min(bounds.height - 26, event.clientY - bounds.top - 9));
    setPlayerPosition();
  });

  gameStart.addEventListener("click", () => {
    resetGame();
    gameState.running = true;
    gameStart.textContent = "Running...";
    gameBoard.focus();
    tickGame();
  });

  gameReset?.addEventListener("click", () => {
    endGame();
    resetGame();
  });
}

function setupReveals() {
  if (!("IntersectionObserver" in window)) return;

  revealTargets.forEach((element) => {
    element.setAttribute("data-reveal", "");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

async function validateResumeLinks() {
  const isHttp = window.location.protocol.startsWith("http");

  if (!isHttp) {
    return;
  }

  await Promise.all(
    Array.from(resumeLinks).map(async (link) => {
      try {
        const response = await fetch(link.dataset.fileLink, { method: "HEAD" });
        if (!response.ok) {
          link.classList.add("is-disabled");
        }
      } catch (error) {
        link.classList.add("is-disabled");
      }
    })
  );
}

setSnippet("api");
setupReveals();
validateResumeLinks();
syncScrollState();
setupHeadshotFallback();
setupGalleryFallbacks();
setupResumeWalkthrough();
setupBackgroundCanvas();
setupGame();

terminalMessages.forEach((message, index) => {
  appendTerminalLine(message, 350 * index);
});

bindRangeControl(glowRange, "--glow-strength");
bindRangeControl(gridRange, "--grid-strength");
bindRangeControl(speedRange, "--bg-motion");
if (speedRange) {
  speedRange.addEventListener("input", () => {
    backgroundState.speed = Number(speedRange.value) / 100;
  });
  backgroundState.speed = Number(speedRange.value) / 100;
}
window.addEventListener("scroll", syncScrollState, { passive: true });
