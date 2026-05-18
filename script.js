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
const galleryLightbox = document.querySelector("#gallery-lightbox");
const galleryLightboxImage = document.querySelector("#gallery-lightbox-image");
const galleryLightboxClose = document.querySelector("#gallery-lightbox-close");
const galleryLightboxPrev = document.querySelector("#gallery-lightbox-prev");
const galleryLightboxNext = document.querySelector("#gallery-lightbox-next");
const mobileSectionTabs = document.querySelectorAll(".mobile-section-tab");
const mobileSectionTargets = document.querySelectorAll("[data-mobile-group]");
const worldScene = document.querySelector("#world-scene");
const worldNodes = document.querySelectorAll("[data-world-destination]");
const solarStage = document.querySelector("#solar-stage");
const planets = document.querySelectorAll("[data-planet]");
const cardRoom = document.querySelector("#card-room");
const cardRoomMenu = document.querySelector("#card-room-menu");
const cardRoomTable = document.querySelector("#card-room-table");
const cardRoomMode = document.querySelector("#card-room-mode");
const cardRoomMessage = document.querySelector("#card-room-message");
const cardRoomChips = document.querySelector("#card-room-chips");
const dealerHand = document.querySelector("#dealer-hand");
const communityHand = document.querySelector("#community-hand");
const playerHand = document.querySelector("#player-hand");
const cardRoomDeal = document.querySelector("#card-room-deal");
const cardRoomHit = document.querySelector("#card-room-hit");
const cardRoomStand = document.querySelector("#card-room-stand");
const cardRoomDraw = document.querySelector("#card-room-draw");
const cardRoomMenuButton = document.querySelector("#card-room-menu-button");
const orbitalBoard = document.querySelector("#orbital-drift");
const driftProbe = document.querySelector("#drift-probe");
const driftPickup = document.querySelector("#drift-pickup");
const orbitalScore = document.querySelector("#orbital-score");
const orbitalBest = document.querySelector("#orbital-best");
const orbitalStart = document.querySelector("#orbital-start");
const orbitalReset = document.querySelector("#orbital-reset");
const backgroundState = {
  particles: [],
  speed: speedRange ? Number(speedRange.value) / 100 : 0.42,
};
const gameState = {
  running: false,
  x: 40,
  y: 0,
  score: 0,
  best: 0,
  frame: 0,
  boardWidth: 0,
  boardHeight: 0,
  obstacles: [],
  pickups: [],
  rafId: null,
};
const galleryLightboxState = {
  items: [],
  index: 0,
};

function createAvatarDataUri(label, startColor, endColor) {
  const initials = label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${startColor}" />
          <stop offset="100%" stop-color="${endColor}" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="30" fill="url(#g)" />
      <circle cx="60" cy="42" r="18" fill="rgba(255,255,255,0.88)" />
      <path d="M28 100c5-18 19-28 32-28s27 10 32 28" fill="rgba(255,255,255,0.88)" />
      <text x="60" y="112" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="rgba(9,12,18,0.65)">
        ${initials}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function setupGalleryCarousels() {
  const galleries = document.querySelectorAll(".gallery-carousel");
  if (!galleries.length) return;

  galleries.forEach((gallery) => {
    const mainImage = gallery.querySelector("[data-gallery-main]");
    const thumbs = Array.from(gallery.querySelectorAll("[data-gallery-thumb]"));
    const prevButton = gallery.querySelector("[data-gallery-prev]");
    const nextButton = gallery.querySelector("[data-gallery-next]");

    if (!(mainImage instanceof HTMLImageElement) || !thumbs.length) return;

    const items = thumbs.map((thumb) => ({
      image: thumb.dataset.image || "",
      alt: thumb.dataset.alt || "",
    }));

    const setActive = (index) => {
      const thumb = thumbs[index];
      if (!(thumb instanceof HTMLButtonElement)) return;

      mainImage.src = thumb.dataset.image || mainImage.src;
      mainImage.alt = thumb.dataset.alt || mainImage.alt;

      thumbs.forEach((item, thumbIndex) => {
        item.classList.toggle("is-active", thumbIndex === index);
      });

      gallery.dataset.activeIndex = String(index);
    };

    mainImage.addEventListener("click", () => {
      openGalleryLightbox(items, Number(gallery.dataset.activeIndex || 0));
    });

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener("click", () => setActive(index));
    });

    prevButton?.addEventListener("click", () => {
      const currentIndex = Number(gallery.dataset.activeIndex || 0);
      const nextIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
      setActive(nextIndex);
    });

    nextButton?.addEventListener("click", () => {
      const currentIndex = Number(gallery.dataset.activeIndex || 0);
      const nextIndex = (currentIndex + 1) % thumbs.length;
      setActive(nextIndex);
    });

    setActive(0);
  });
}

function getPageName(pathname) {
  const parts = decodeURIComponent(pathname).split("/").filter(Boolean);
  return parts.at(-1) || "index.html";
}

function setupActiveNavigation() {
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  if (!navLinks.length || navLinks.some((link) => link.classList.contains("is-active"))) return;

  const currentPage = getPageName(window.location.pathname);

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPage = getPageName(new URL(href, window.location.href).pathname);
    if (linkPage === currentPage) {
      link.classList.add("is-active");
    }
  });
}

function renderGalleryLightbox() {
  if (!(galleryLightbox instanceof HTMLElement) || !(galleryLightboxImage instanceof HTMLImageElement)) return;
  const currentItem = galleryLightboxState.items[galleryLightboxState.index];
  if (!currentItem) return;

  galleryLightboxImage.src = currentItem.image;
  galleryLightboxImage.alt = currentItem.alt;
}

function openGalleryLightbox(items, startIndex) {
  if (!(galleryLightbox instanceof HTMLElement) || !items.length) return;

  galleryLightboxState.items = items;
  galleryLightboxState.index = startIndex;
  renderGalleryLightbox();
  galleryLightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeGalleryLightbox() {
  if (!(galleryLightbox instanceof HTMLElement)) return;
  galleryLightbox.hidden = true;
  document.body.style.overflow = "";
}

function stepGalleryLightbox(direction) {
  if (!galleryLightboxState.items.length) return;
  galleryLightboxState.index =
    (galleryLightboxState.index + direction + galleryLightboxState.items.length) %
    galleryLightboxState.items.length;
  renderGalleryLightbox();
}

function setupGalleryLightbox() {
  if (!(galleryLightbox instanceof HTMLElement)) return;

  galleryLightboxClose?.addEventListener("click", closeGalleryLightbox);
  galleryLightboxPrev?.addEventListener("click", () => stepGalleryLightbox(-1));
  galleryLightboxNext?.addEventListener("click", () => stepGalleryLightbox(1));

  galleryLightbox.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.hasAttribute("data-lightbox-close")) {
      closeGalleryLightbox();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (galleryLightbox.hidden) return;
    if (event.key === "Escape") closeGalleryLightbox();
    if (event.key === "ArrowLeft") stepGalleryLightbox(-1);
    if (event.key === "ArrowRight") stepGalleryLightbox(1);
  });
}

function setMobileSection(sectionKey) {
  mobileSectionTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.mobileTarget === sectionKey);
  });

  mobileSectionTargets.forEach((section) => {
    section.classList.toggle("mobile-section-hidden", section.dataset.mobileGroup !== sectionKey);
  });
}

function setupMobileSections() {
  if (!mobileSectionTabs.length || !mobileSectionTargets.length) return;

  const mobileQuery = window.matchMedia("(max-width: 760px)");

  const syncMode = () => {
    if (mobileQuery.matches) {
      const activeTab =
        Array.from(mobileSectionTabs).find((tab) => tab.classList.contains("is-active")) ||
        mobileSectionTabs[0];
      setMobileSection(activeTab.dataset.mobileTarget || "home");
    } else {
      mobileSectionTargets.forEach((section) => section.classList.remove("mobile-section-hidden"));
    }
  };

  mobileSectionTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setMobileSection(tab.dataset.mobileTarget || "home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", syncMode);
  } else {
    mobileQuery.addListener(syncMode);
  }

  syncMode();
}

function setSnippet(key) {
  if (!snippetContent || !snippets[key]) return;
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

function setupTerminal() {
  if (!terminalLog) return;

  terminalMessages.forEach((message, index) => {
    appendTerminalLine(message, 350 * index);
  });
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
  if (!revealTargets.length || !("IntersectionObserver" in window)) return;

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

function setupWorldScene() {
  if (!(worldScene instanceof HTMLElement) || !worldNodes.length) return;

  worldNodes.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      worldScene.dataset.activeDestination = node.dataset.worldDestination || "core";
    });
    node.addEventListener("focus", () => {
      worldScene.dataset.activeDestination = node.dataset.worldDestination || "core";
    });
    node.addEventListener("mouseleave", () => {
      worldScene.dataset.activeDestination = "core";
    });
    node.addEventListener("blur", () => {
      worldScene.dataset.activeDestination = "core";
    });
  });
}

function setupSolarSystem() {
  if (!(solarStage instanceof HTMLElement) || !planets.length) return;

  planets.forEach((planet) => {
    planet.addEventListener("mouseenter", () => {
      solarStage.dataset.activePlanet = planet.dataset.planet || "core";
    });
    planet.addEventListener("focus", () => {
      solarStage.dataset.activePlanet = planet.dataset.planet || "core";
    });
    planet.addEventListener("mouseleave", () => {
      solarStage.dataset.activePlanet = "core";
    });
    planet.addEventListener("blur", () => {
      solarStage.dataset.activePlanet = "core";
    });
  });
}

const cardRoomState = {
  mode: "blackjack",
  chips: 100,
  deck: [],
  player: [],
  dealer: [],
  community: [],
};

function buildCardDeck() {
  const suits = ["clubs", "diamonds", "hearts", "spades"];
  const ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
  return suits.flatMap((suit) =>
    ranks.map((rank) => ({
      rank,
      suit,
      image: `./src/images/cards/${rank}_of_${suit}.png`,
    }))
  );
}

function shuffleDeck(cards) {
  return [...cards].sort(() => Math.random() - 0.5);
}

function cardValue(card) {
  if (["jack", "queen", "king"].includes(card.rank)) return 10;
  if (card.rank === "ace") return 11;
  return Number(card.rank);
}

function handValue(hand) {
  let total = hand.reduce((sum, card) => sum + cardValue(card), 0);
  let aces = hand.filter((card) => card.rank === "ace").length;
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
}

function drawCard() {
  return cardRoomState.deck.pop();
}

function renderCardRoom() {
  if (!(dealerHand instanceof HTMLElement) || !(playerHand instanceof HTMLElement)) return;
  dealerHand.innerHTML = cardRoomState.dealer.map((card) => `<img class="playing-card" src="${card.image}" alt="${card.rank} of ${card.suit}" />`).join("");
  if (communityHand) {
    communityHand.innerHTML = cardRoomState.community.map((card) => `<img class="playing-card" src="${card.image}" alt="${card.rank} of ${card.suit}" />`).join("");
  }
  playerHand.innerHTML = cardRoomState.player.map((card) => `<img class="playing-card" src="${card.image}" alt="${card.rank} of ${card.suit}" />`).join("");
  if (cardRoomChips) cardRoomChips.textContent = String(cardRoomState.chips);
}

function startCardGame(mode) {
  cardRoomState.mode = mode;
  cardRoomState.deck = shuffleDeck(buildCardDeck());
  cardRoomState.player = [];
  cardRoomState.dealer = [];
  cardRoomState.community = [];
  cardRoomMenu.setAttribute("hidden", "");
  cardRoomTable.removeAttribute("hidden");
  if (cardRoomMode) cardRoomMode.textContent = mode === "blackjack" ? "Blackjack" : "Texas Hold'em";
  if (cardRoomMessage) cardRoomMessage.textContent = mode === "blackjack" ? "Blackjack selected. Press Deal." : "Poker selected. Press Deal.";
  cardRoomHit?.toggleAttribute("hidden", mode !== "blackjack");
  cardRoomStand?.toggleAttribute("hidden", mode !== "blackjack");
  cardRoomDraw?.toggleAttribute("hidden", mode !== "poker");
  renderCardRoom();
}

function dealCardGame() {
  cardRoomState.deck = shuffleDeck(buildCardDeck());
  cardRoomState.player = [drawCard(), drawCard()];
  cardRoomState.dealer = [drawCard(), drawCard()];
  cardRoomState.community = cardRoomState.mode === "blackjack" ? [] : Array.from({ length: 5 }, drawCard);
  if (cardRoomMessage) cardRoomMessage.textContent = cardRoomState.mode === "blackjack" ? "Hit or stand." : "Community dealt. Reveal the winner.";
  renderCardRoom();
}

function resolveBlackjack() {
  while (handValue(cardRoomState.dealer) < 17) cardRoomState.dealer.push(drawCard());
  const player = handValue(cardRoomState.player);
  const dealer = handValue(cardRoomState.dealer);
  const won = player <= 21 && (dealer > 21 || player > dealer);
  cardRoomState.chips += won ? 10 : -10;
  if (cardRoomMessage) cardRoomMessage.textContent = won ? "You win the hand." : player === dealer ? "Push." : "Dealer wins.";
  renderCardRoom();
}

function resolvePoker() {
  if (!globalThis.PokerEngine) return;
  const playerBest = globalThis.PokerEngine.bestPokerHand([...cardRoomState.player, ...cardRoomState.community]);
  const dealerBest = globalThis.PokerEngine.bestPokerHand([...cardRoomState.dealer, ...cardRoomState.community]);
  const result = globalThis.PokerEngine.comparePokerHands(playerBest, dealerBest);
  cardRoomState.chips += result > 0 ? 10 : result < 0 ? -10 : 0;
  if (cardRoomMessage) {
    cardRoomMessage.textContent =
      result > 0
        ? `You win with ${playerBest.name}.`
        : result < 0
          ? `Dealer wins with ${dealerBest.name}.`
          : `Push — both make ${playerBest.name}.`;
  }
  renderCardRoom();
}

function setupCardRoom() {
  if (!(cardRoom instanceof HTMLElement)) return;
  document.querySelectorAll("[data-card-game]").forEach((button) => {
    button.addEventListener("click", () => startCardGame(button.dataset.cardGame));
  });
  cardRoomDeal?.addEventListener("click", dealCardGame);
  cardRoomHit?.addEventListener("click", () => {
    if (cardRoomState.mode !== "blackjack") return;
    if (!cardRoomState.player.length) {
      if (cardRoomMessage) cardRoomMessage.textContent = "Press Deal first.";
      return;
    }
    cardRoomState.player.push(drawCard());
    if (handValue(cardRoomState.player) > 21) {
      cardRoomState.chips -= 10;
      if (cardRoomMessage) cardRoomMessage.textContent = "Bust. Dealer wins.";
    }
    renderCardRoom();
  });
  cardRoomStand?.addEventListener("click", () => {
    if (cardRoomState.mode === "blackjack") {
      if (!cardRoomState.player.length) {
        if (cardRoomMessage) cardRoomMessage.textContent = "Press Deal first.";
        return;
      }
      resolveBlackjack();
    }
  });
  cardRoomDraw?.addEventListener("click", () => {
    if (cardRoomState.mode === "poker") {
      if (!cardRoomState.player.length) {
        if (cardRoomMessage) cardRoomMessage.textContent = "Press Deal first.";
        return;
      }
      resolvePoker();
    }
  });
  cardRoomMenuButton?.addEventListener("click", () => {
    cardRoomMenu.removeAttribute("hidden");
    cardRoomTable.setAttribute("hidden", "");
  });
}

const driftState = {
  running: false,
  x: 110,
  y: 120,
  vx: 1.7,
  vy: -1.2,
  score: 0,
  best: 0,
  pickupX: 240,
  pickupY: 110,
  rafId: null,
};

function placePickup() {
  if (!(orbitalBoard instanceof HTMLElement)) return;
  driftState.pickupX = 36 + Math.random() * Math.max(orbitalBoard.clientWidth - 72, 1);
  driftState.pickupY = 36 + Math.random() * Math.max(orbitalBoard.clientHeight - 72, 1);
}

function renderOrbitalDrift() {
  if (!(driftProbe instanceof HTMLElement) || !(driftPickup instanceof HTMLElement)) return;
  driftProbe.style.transform = `translate(${driftState.x}px, ${driftState.y}px)`;
  driftPickup.style.transform = `translate(${driftState.pickupX}px, ${driftState.pickupY}px)`;
  if (orbitalScore) orbitalScore.textContent = `Score: ${driftState.score}`;
  if (orbitalBest) orbitalBest.textContent = `Best: ${driftState.best}`;
}

function resetOrbitalDrift() {
  if (!(orbitalBoard instanceof HTMLElement)) return;
  driftState.running = false;
  driftState.x = orbitalBoard.clientWidth * 0.72;
  driftState.y = orbitalBoard.clientHeight * 0.5;
  driftState.vx = 0;
  driftState.vy = -2.1;
  driftState.score = 0;
  placePickup();
  renderOrbitalDrift();
}

function tickOrbitalDrift() {
  if (!(orbitalBoard instanceof HTMLElement) || !driftState.running) return;
  const cx = orbitalBoard.clientWidth / 2;
  const cy = orbitalBoard.clientHeight / 2;
  const dx = cx - driftState.x;
  const dy = cy - driftState.y;
  const distSq = Math.max(dx * dx + dy * dy, 2400);
  const gravity = 180 / distSq;
  driftState.vx += dx * gravity;
  driftState.vy += dy * gravity;
  driftState.x += driftState.vx;
  driftState.y += driftState.vy;

  const pdx = driftState.pickupX - driftState.x;
  const pdy = driftState.pickupY - driftState.y;
  if (Math.hypot(pdx, pdy) < 24) {
    driftState.score += 1;
    driftState.best = Math.max(driftState.best, driftState.score);
    placePickup();
  }

  if (
    driftState.x < -20 ||
    driftState.y < -20 ||
    driftState.x > orbitalBoard.clientWidth + 20 ||
    driftState.y > orbitalBoard.clientHeight + 20 ||
    Math.hypot(dx, dy) < 42
  ) {
    driftState.running = false;
  }

  renderOrbitalDrift();
  driftState.rafId = requestAnimationFrame(tickOrbitalDrift);
}

function setupOrbitalDrift() {
  if (!(orbitalBoard instanceof HTMLElement)) return;
  resetOrbitalDrift();
  orbitalBoard.addEventListener("click", (event) => {
    const rect = orbitalBoard.getBoundingClientRect();
    const tx = event.clientX - rect.left;
    const ty = event.clientY - rect.top;
    driftState.vx += (tx - driftState.x) * 0.01;
    driftState.vy += (ty - driftState.y) * 0.01;
  });
  orbitalStart?.addEventListener("click", () => {
    if (!driftState.running) {
      driftState.running = true;
      if (orbitalStart) orbitalStart.textContent = "Orbiting...";
      tickOrbitalDrift();
    }
  });
  orbitalReset?.addEventListener("click", () => {
    resetOrbitalDrift();
    if (orbitalStart) orbitalStart.textContent = "Start Orbit";
  });
}

async function validateResumeLinks() {
  if (!resumeLinks.length) return;

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
setupGalleryCarousels();
setupGalleryLightbox();
setupMobileSections();
setupActiveNavigation();
setupResumeWalkthrough();
setupBackgroundCanvas();
setupGame();
setupTerminal();
setupWorldScene();
setupSolarSystem();
setupCardRoom();
setupOrbitalDrift();

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
