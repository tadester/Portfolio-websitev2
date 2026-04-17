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
const revealTargets = document.querySelectorAll(".project-card, .contact-card, .proof-card, .gallery-card, .architecture-card, .spoons-card, .game-showcase-card, .game-info-card, .game-controls-card, .resume-nav, .resume-stage");
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
const spoonsRoot = document.querySelector("#spoons-game");
const spoonsRound = document.querySelector("#spoons-round");
const spoonsDealer = document.querySelector("#spoons-dealer");
const spoonsDeckCount = document.querySelector("#spoons-deck-count");
const spoonsLeftCount = document.querySelector("#spoons-left-count");
const spoonsAnnouncer = document.querySelector("#spoons-announcer");
const spoonsHelper = document.querySelector("#spoons-helper");
const spoonsConsoleTitle = document.querySelector("#spoons-console-title");
const spoonsConsoleHearts = document.querySelector("#spoons-console-hearts");
const spoonsRing = document.querySelector("#spoons-ring");
const spoonsDiscardTop = document.querySelector("#spoons-discard-top");
const spoonsStart = document.querySelector("#spoons-start");
const spoonsNext = document.querySelector("#spoons-next");
const spoonsGrab = document.querySelector("#spoons-grab");
const spoonsPlayerHand = document.querySelector("#spoons-player-hand");
const spoonsSeatTop = document.querySelector("#spoons-seat-top");
const spoonsSeatLeft = document.querySelector("#spoons-seat-left");
const spoonsSeatRight = document.querySelector("#spoons-seat-right");
const spoonsSeatBottom = document.querySelector("#spoons-seat-bottom");
const galleryLightbox = document.querySelector("#gallery-lightbox");
const galleryLightboxImage = document.querySelector("#gallery-lightbox-image");
const galleryLightboxClose = document.querySelector("#gallery-lightbox-close");
const galleryLightboxPrev = document.querySelector("#gallery-lightbox-prev");
const galleryLightboxNext = document.querySelector("#gallery-lightbox-next");
const mobileSectionTabs = document.querySelectorAll(".mobile-section-tab");
const mobileSectionTargets = document.querySelectorAll("[data-mobile-group]");

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

const SPOONS_WORD = "SPOON";
const SPOONS_SEAT_FLOW = ["human", "left", "top", "right"];
const SPOONS_CARD_RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const SPOONS_CARD_SUITS = ["clubs", "diamonds", "hearts", "spades"];
const SPOONS_PROFILES = [
  {
    id: "human",
    seat: "bottom",
    name: "Tade",
    label: "You",
    isHuman: true,
    avatar: "./assets/headshot/olatade-headshot.jpg",
    accent: ["#77a6ff", "#f0b35a"],
  },
  {
    id: "left",
    seat: "left",
    name: "Laura",
    label: "Laura",
    isHuman: false,
    accent: ["#ff8c6e", "#ffd66b"],
  },
  {
    id: "top",
    seat: "top",
    name: "Nic",
    label: "Nic",
    isHuman: false,
    accent: ["#4fd8c7", "#77a6ff"],
  },
  {
    id: "right",
    seat: "right",
    name: "Juju",
    label: "Juju",
    isHuman: false,
    accent: ["#ff7aa2", "#ffc971"],
  },
];

const spoonsSeats = {
  top: spoonsSeatTop,
  left: spoonsSeatLeft,
  right: spoonsSeatRight,
  bottom: spoonsSeatBottom,
};

const spoonsState = {
  players: [],
  round: 0,
  phase: "idle",
  dealerId: "human",
  roundOrder: [],
  turnIndex: 0,
  deck: [],
  discardPile: [],
  lastDiscard: null,
  discardFaceDown: false,
  spoonsRemaining: Math.max(SPOONS_PROFILES.length - 1, 0),
  announcer: "Press Start Match to deal four cards and race for the spoons.",
  helper: "Start a match to begin passing cards around the table.",
  timers: [],
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

function createSpoonsPlayers() {
  return SPOONS_PROFILES.map((profile) => ({
    ...profile,
    avatar:
      profile.avatar ||
      createAvatarDataUri(profile.name, profile.accent[0], profile.accent[1]),
    hand: [],
    inbound: null,
    misses: 0,
    hasSpoon: false,
    out: false,
    lastDrawnId: null,
  }));
}

function clearSpoonsTimers() {
  spoonsState.timers.forEach((timerId) => window.clearTimeout(timerId));
  spoonsState.timers = [];
}

function scheduleSpoons(callback, delay) {
  const timerId = window.setTimeout(() => {
    spoonsState.timers = spoonsState.timers.filter((entry) => entry !== timerId);
    callback();
  }, delay);
  spoonsState.timers.push(timerId);
}

function getSpoonsPlayerById(playerId) {
  return spoonsState.players.find((player) => player.id === playerId) || null;
}

function getSpoonsActivePlayers() {
  return spoonsState.players.filter((player) => !player.out);
}

function getNextSeatId(currentId) {
  const startIndex = SPOONS_SEAT_FLOW.indexOf(currentId);
  for (let offset = 1; offset <= SPOONS_SEAT_FLOW.length; offset += 1) {
    const candidate = SPOONS_SEAT_FLOW[(startIndex + offset) % SPOONS_SEAT_FLOW.length];
    const player = getSpoonsPlayerById(candidate);
    if (player && !player.out) return candidate;
  }
  return currentId;
}

function getCurrentSpoonsPlayer() {
  return spoonsState.roundOrder[spoonsState.turnIndex] || null;
}

function buildSpoonsDeck() {
  const deck = [];
  SPOONS_CARD_SUITS.forEach((suit) => {
    SPOONS_CARD_RANKS.forEach((rank) => {
      deck.push({
        id: `${rank}-${suit}`,
        rank,
        suit,
        label: `${rank.replace(/^./, (char) => char.toUpperCase())} of ${suit.replace(/^./, (char) => char.toUpperCase())}`,
        image: `./src/images/cards/${rank}_of_${suit}.png`,
      });
    });
  });
  return deck;
}

function shuffleCards(cards) {
  const copy = [...cards];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function getSpoonsRankCounts(hand) {
  return hand.reduce((counts, card) => {
    counts[card.rank] = (counts[card.rank] || 0) + 1;
    return counts;
  }, {});
}

function hasFourOfKind(hand) {
  return Object.values(getSpoonsRankCounts(hand)).some((count) => count >= 4);
}

function canHumanGrabWithCurrentHand() {
  const human = getSpoonsPlayerById("human");
  if (!human || human.out || human.hasSpoon) return false;
  return human.hand.length >= 4 && hasFourOfKind(human.hand);
}

function chooseBotDiscardIndex(player) {
  let bestIndex = 0;
  let bestScore = Number.NEGATIVE_INFINITY;

  player.hand.forEach((candidate, index) => {
    const nextHand = player.hand.filter((_, cardIndex) => cardIndex !== index);
    const counts = Object.values(getSpoonsRankCounts(nextHand));
    const maxCount = counts.length ? Math.max(...counts) : 0;
    const comboScore = counts.reduce((total, value) => total + value * value, 0);
    const discardPenalty = (getSpoonsRankCounts(player.hand)[candidate.rank] || 0) * 4;
    const score = maxCount * 100 + comboScore - discardPenalty;

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function drawSpoonsCard() {
  if (!spoonsState.deck.length && spoonsState.discardPile.length) {
    spoonsState.deck = shuffleCards(spoonsState.discardPile);
    spoonsState.discardPile = [];
    spoonsState.lastDiscard = null;
  }

  if (!spoonsState.deck.length) {
    spoonsState.deck = shuffleCards(buildSpoonsDeck());
  }

  return spoonsState.deck.pop() || null;
}

function setSpoonsMessage(announcer, helper) {
  spoonsState.announcer = announcer;
  spoonsState.helper = helper;
}

function getSpoonsHealthTrack(player) {
  return Array.from({ length: SPOONS_WORD.length })
    .map(
      (_, index) =>
        `<span class="spoons-heart-chip${index < player.misses ? " is-lost" : ""}" aria-label="${
          index < player.misses ? "Heart lost" : "Heart remaining"
        }">♥</span>`
    )
    .join("");
}

function getSpoonsSeatNote(player) {
  if (player.out) return `${player.label} is out of the match.`;
  if (spoonsState.phase === "spoon-race" && !player.hasSpoon) return "Race to the center.";
  if (player.hasSpoon) return "Already holding a spoon.";
  if (player.id === spoonsState.dealerId) return "Dealer seat.";
  if (player.inbound) return "Card waiting from the right.";
  if (getCurrentSpoonsPlayer()?.id === player.id) return "Choosing a pass.";
  return "Watching for the next card.";
}

function renderSpoonsSeat(player) {
  const seat = spoonsSeats[player.seat];
  if (!(seat instanceof HTMLElement)) return;

  const cardCount = player.isHuman || player.out ? 0 : player.hand.length + (player.inbound ? 1 : 0);
  const badgeMarkup = [
    getCurrentSpoonsPlayer()?.id === player.id && !player.out
      ? '<span class="spoons-player-badge is-live">Turn</span>'
      : "",
    player.id === spoonsState.dealerId && !player.out
      ? '<span class="spoons-player-badge">Dealer</span>'
      : "",
    player.hasSpoon ? '<span class="spoons-player-badge is-spoon">Spoon</span>' : "",
    player.out ? '<span class="spoons-player-badge is-out">Out</span>' : "",
  ]
    .filter(Boolean)
    .join("");

  seat.classList.toggle("is-turn", getCurrentSpoonsPlayer()?.id === player.id && !player.out);
  seat.classList.toggle("is-out", player.out);

  seat.innerHTML = `
    <div class="spoons-seat-header">
      <img class="spoons-avatar" src="${player.avatar}" alt="${player.label} profile picture" />
      <div class="spoons-player-meta">
        <div class="spoons-player-name-row">
          <strong>${player.label}</strong>
          ${badgeMarkup}
        </div>
        <span>${player.name}</span>
      </div>
    </div>
    <p class="spoons-seat-note">${getSpoonsSeatNote(player)}</p>
    ${
      player.isHuman
        ? ""
        : `<div class="spoons-bot-hand">${Array.from({ length: Math.max(cardCount, spoonsState.phase === "idle" ? 4 : 0) })
            .map(() => '<div class="spoons-mini-card"></div>')
            .join("")}</div>`
    }
    <div class="spoons-health-track" aria-label="${player.label} remaining hearts">
      ${getSpoonsHealthTrack(player)}
    </div>
  `;
}

function renderSpoonsHand() {
  if (!(spoonsPlayerHand instanceof HTMLElement)) return;

  const human = getSpoonsPlayerById("human");
  if (!human || human.out) {
    spoonsPlayerHand.innerHTML = '<div class="spoons-empty-hand">You are out this match. Restart to jump back in.</div>';
    return;
  }

  if (!human.hand.length) {
    spoonsPlayerHand.innerHTML = '<div class="spoons-empty-hand">Cards will appear here when the round starts.</div>';
    return;
  }

  const canDiscard =
    spoonsState.phase === "playing" &&
    getCurrentSpoonsPlayer()?.id === human.id &&
    human.hand.length === 5;

  spoonsPlayerHand.innerHTML = "";
  human.hand.forEach((card, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `spoons-card-button${card.id === human.lastDrawnId ? " is-pick" : ""}`;
    button.disabled = !canDiscard;
    button.innerHTML = `
      <img src="${card.image}" alt="${card.label}" />
      <span>${canDiscard ? "Pass Left" : card.label}</span>
    `;
    button.addEventListener("click", () => handleHumanDiscard(index));
    spoonsPlayerHand.appendChild(button);
  });
}

function renderSpoonsConsole() {
  const human = getSpoonsPlayerById("human");
  if (!human) return;

  if (spoonsConsoleTitle) {
    if (human.out) {
      spoonsConsoleTitle.textContent = "You are out of hearts.";
    } else if (spoonsState.phase === "spoon-race" && !human.hasSpoon) {
      spoonsConsoleTitle.textContent = "Race to the spoon now.";
    } else if (spoonsState.phase === "spoon-race" && human.hasSpoon) {
      spoonsConsoleTitle.textContent = "You got a spoon.";
    } else if (
      spoonsState.phase === "playing" &&
      getCurrentSpoonsPlayer()?.id === human.id &&
      human.hand.length === 5
    ) {
      spoonsConsoleTitle.textContent = "Pick one card to pass left.";
    } else {
      spoonsConsoleTitle.textContent = "Hold your rank and watch the table.";
    }
  }

  if (spoonsConsoleHearts) {
    spoonsConsoleHearts.innerHTML = getSpoonsHealthTrack(human);
  }
}

function renderSpoonsCenter() {
  const human = getSpoonsPlayerById("human");
  if (spoonsRound) spoonsRound.textContent = String(spoonsState.round);
  if (spoonsDealer) {
    const dealer = getSpoonsPlayerById(spoonsState.dealerId);
    spoonsDealer.textContent = dealer ? dealer.label : "-";
  }
  if (spoonsDeckCount) spoonsDeckCount.textContent = String(spoonsState.deck.length);
  if (spoonsLeftCount) spoonsLeftCount.textContent = String(spoonsState.spoonsRemaining);
  if (spoonsAnnouncer) spoonsAnnouncer.textContent = spoonsState.announcer;
  if (spoonsHelper) spoonsHelper.textContent = spoonsState.helper;

  if (spoonsGrab instanceof HTMLButtonElement) {
    const canGrab =
      !!human &&
      ((spoonsState.phase === "spoon-race" && spoonsState.spoonsRemaining > 0) ||
        (spoonsState.phase === "playing" && canHumanGrabWithCurrentHand()));
    spoonsGrab.disabled = !canGrab;
  }

  if (spoonsNext instanceof HTMLButtonElement) {
    const showNext = spoonsState.phase === "round-over";
    spoonsNext.hidden = !showNext;
    spoonsNext.disabled = !showNext;
  }

  if (spoonsRing instanceof HTMLElement) {
    const activeCount = getSpoonsActivePlayers().length;
    const totalSpoons = Math.max(activeCount - 1, 0);
    const claimedCount = Math.max(totalSpoons - spoonsState.spoonsRemaining, 0);
    spoonsRing.innerHTML = Array.from({ length: totalSpoons })
      .map(
        (_, index) => `
          <div class="spoons-spoon-chip${index < claimedCount ? " is-claimed" : ""}">
            <img src="./src/images/spoon.png" alt="Spoon token" />
          </div>
        `
      )
      .join("");
  }

  if (spoonsDiscardTop instanceof HTMLElement) {
    spoonsDiscardTop.style.backgroundImage = spoonsState.lastDiscard
      ? `url("${spoonsState.discardFaceDown ? "./src/images/card_back.png" : spoonsState.lastDiscard.image}")`
      : "none";
  }
}

function renderSpoonsGame() {
  if (!(spoonsRoot instanceof HTMLElement)) return;

  spoonsState.players.forEach(renderSpoonsSeat);
  renderSpoonsHand();
  renderSpoonsConsole();
  renderSpoonsCenter();

  if (spoonsStart instanceof HTMLButtonElement) {
    spoonsStart.textContent = spoonsState.phase === "idle" ? "Start Match" : "Restart Match";
  }
}

function resetSpoonsRoundState() {
  spoonsState.deck = shuffleCards(buildSpoonsDeck());
  spoonsState.discardPile = [];
  spoonsState.lastDiscard = null;
  spoonsState.discardFaceDown = false;
  spoonsState.spoonsRemaining = Math.max(getSpoonsActivePlayers().length - 1, 0);
  spoonsState.roundOrder = [];
  spoonsState.turnIndex = 0;

  spoonsState.players.forEach((player) => {
    player.hand = [];
    player.inbound = null;
    player.hasSpoon = false;
    player.lastDrawnId = null;
  });
}

function startSpoonsMatch() {
  clearSpoonsTimers();
  spoonsState.players = createSpoonsPlayers();
  spoonsState.round = 0;
  spoonsState.dealerId = "human";
  spoonsState.phase = "idle";
  spoonsState.spoonsRemaining = Math.max(spoonsState.players.length - 1, 0);
  setSpoonsMessage(
    "Fresh match ready. Four cards each, one spoon fewer than players, and no mercy on the reaction race.",
    "Match reset. Press Start Match again any time to restart from zero."
  );
  startSpoonsRound();
}

function startSpoonsRound() {
  clearSpoonsTimers();
  if (getSpoonsActivePlayers().length <= 1) {
    const winner = getSpoonsActivePlayers()[0];
    spoonsState.phase = "match-over";
    setSpoonsMessage(
      winner ? `${winner.label} wins the table.` : "No players remain.",
      "Restart the match to play another full hearts ladder."
    );
    renderSpoonsGame();
    return;
  }

  spoonsState.round += 1;
  spoonsState.phase = "playing";
  resetSpoonsRoundState();

  const dealerStart = SPOONS_SEAT_FLOW.indexOf(spoonsState.dealerId);
  spoonsState.roundOrder = Array.from({ length: SPOONS_SEAT_FLOW.length }, (_, offset) =>
    SPOONS_SEAT_FLOW[(dealerStart + offset) % SPOONS_SEAT_FLOW.length]
  )
    .map((playerId) => getSpoonsPlayerById(playerId))
    .filter((player) => player && !player.out);

  spoonsState.roundOrder.forEach((player) => {
    for (let dealCount = 0; dealCount < 4; dealCount += 1) {
      const dealtCard = drawSpoonsCard();
      if (dealtCard) player.hand.push(dealtCard);
    }
  });

  const dealer = getSpoonsPlayerById(spoonsState.dealerId);
  setSpoonsMessage(
    `Round ${spoonsState.round} is live. ${dealer ? dealer.label : "Dealer"} starts the passing lane.`,
    "Collect four of a kind, then hammer the Grab Spoon button before the bots do."
  );
  renderSpoonsGame();
  scheduleSpoons(beginSpoonsTurn, 260);
}

function beginSpoonsTurn() {
  if (spoonsState.phase !== "playing") return;

  const currentPlayer = getCurrentSpoonsPlayer();
  if (!currentPlayer || currentPlayer.out) return;

  if (currentPlayer.hand.length === 4) {
    const incomingCard =
      currentPlayer.id === spoonsState.dealerId ? drawSpoonsCard() : currentPlayer.inbound;
    currentPlayer.inbound = null;

    if (incomingCard) {
      currentPlayer.hand.push(incomingCard);
      currentPlayer.lastDrawnId = incomingCard.id;
    }
  }

  if (currentPlayer.isHuman) {
    setSpoonsMessage(
      "Your move. Choose the card you want to pass left.",
      "You always finish with four cards. Keep the strongest rank group and send the weakest card."
    );
    renderSpoonsGame();
    return;
  }

  setSpoonsMessage(
    `${currentPlayer.label} is deciding what to pass.`,
    "Watch the table and be ready for the spoon race."
  );
  renderSpoonsGame();
  scheduleSpoons(() => handleBotDiscard(currentPlayer.id), 600 + Math.random() * 360);
}

function advanceSpoonsTurn() {
  spoonsState.turnIndex = (spoonsState.turnIndex + 1) % spoonsState.roundOrder.length;
  renderSpoonsGame();
  scheduleSpoons(beginSpoonsTurn, 200);
}

function handleHumanDiscard(cardIndex) {
  if (spoonsState.phase !== "playing") return;

  const player = getCurrentSpoonsPlayer();
  if (!player || !player.isHuman || player.hand.length !== 5) return;

  const discardedCard = player.hand.splice(cardIndex, 1)[0];
  player.lastDrawnId = null;
  resolveSpoonsDiscard(player, discardedCard);
}

function handleBotDiscard(playerId) {
  if (spoonsState.phase !== "playing") return;

  const player = getCurrentSpoonsPlayer();
  if (!player || player.id !== playerId || player.hand.length !== 5) return;

  const discardIndex = chooseBotDiscardIndex(player);
  const discardedCard = player.hand.splice(discardIndex, 1)[0];
  player.lastDrawnId = null;
  resolveSpoonsDiscard(player, discardedCard);
}

function resolveSpoonsDiscard(player, discardedCard) {
  const currentIndex = spoonsState.turnIndex;
  const nextPlayer = spoonsState.roundOrder[currentIndex + 1] || null;
  const nextTurnIndex = (spoonsState.turnIndex + 1) % spoonsState.roundOrder.length;

  if (nextPlayer) {
    nextPlayer.inbound = discardedCard;
    spoonsState.lastDiscard = discardedCard;
    spoonsState.discardFaceDown = !player.isHuman;
  } else {
    spoonsState.discardPile.push(discardedCard);
    spoonsState.lastDiscard = discardedCard;
    spoonsState.discardFaceDown = false;
  }

  const destinationLabel = nextPlayer ? nextPlayer.label : "the discard pile";
  const announcer = nextPlayer
    ? `${player.label} passed a face-down card to ${destinationLabel}.`
    : `${player.label} discarded ${discardedCard.label}.`;
  setSpoonsMessage(
    announcer,
    player.isHuman
      ? "Nice. Stay on the same rank cluster and look for four of a kind."
      : "The table is still moving. Wait for your next decision or the grab signal."
  );
  spoonsState.turnIndex = nextTurnIndex;
  renderSpoonsGame();

  if (hasFourOfKind(player.hand)) {
    scheduleSpoons(() => triggerSpoonsRace(player.id), 220);
    return;
  }

  scheduleSpoons(beginSpoonsTurn, 200);
}

function getBotGrabDelay(player) {
  const counts = Object.values(getSpoonsRankCounts(player.hand));
  const bestCount = counts.length ? Math.max(...counts) : 1;
  return Math.max(1200, 1900 - bestCount * 120 + Math.random() * 520);
}

function triggerSpoonsRace(triggerPlayerId) {
  if (spoonsState.phase !== "playing") return;

  clearSpoonsTimers();
  spoonsState.phase = "spoon-race";
  spoonsState.turnIndex = -1;
  const triggerPlayer = getSpoonsPlayerById(triggerPlayerId);
  if (!triggerPlayer) return;

  triggerPlayer.hasSpoon = true;
  spoonsState.spoonsRemaining = Math.max(spoonsState.spoonsRemaining - 1, 0);
  setSpoonsMessage(
    `${triggerPlayer.label} found four of a kind and grabbed first. Everyone else, grab now.`,
    triggerPlayer.isHuman
      ? "You started the race. The bots are lunging for the middle."
      : "Hit Grab Spoon before the remaining seats take the last spoons."
  );
  renderSpoonsGame();

  if (spoonsState.spoonsRemaining === 0) {
    resolveSpoonsRace();
    return;
  }

  getSpoonsActivePlayers()
    .filter((player) => !player.isHuman && !player.hasSpoon)
    .forEach((player) => {
      scheduleSpoons(() => {
        if (spoonsState.phase !== "spoon-race" || player.out || player.hasSpoon) return;
        if (spoonsState.spoonsRemaining > 0) {
          player.hasSpoon = true;
          spoonsState.spoonsRemaining -= 1;
          setSpoonsMessage(
            `${player.label} got to a spoon.`,
            "If a spoon is still available, grab it before the table closes out the round."
          );
          renderSpoonsGame();
        }
        if (spoonsState.spoonsRemaining === 0) {
          resolveSpoonsRace();
        }
      }, getBotGrabDelay(player));
    });
}

function handleHumanGrab() {
  const human = getSpoonsPlayerById("human");
  if (!human || human.out || human.hasSpoon) return;

  if (spoonsState.phase === "playing" && canHumanGrabWithCurrentHand()) {
    triggerSpoonsRace(human.id);
    return;
  }

  if (spoonsState.phase !== "spoon-race") return;

  if (spoonsState.spoonsRemaining > 0) {
    human.hasSpoon = true;
    spoonsState.spoonsRemaining -= 1;
    setSpoonsMessage(
      "You grabbed a spoon in time.",
      "Now watch who gets stuck with the next heart loss."
    );
    renderSpoonsGame();
  }

  if (spoonsState.spoonsRemaining === 0) {
    resolveSpoonsRace();
  }
}

function resolveSpoonsRace() {
  clearSpoonsTimers();
  spoonsState.turnIndex = -1;
  const loser = getSpoonsActivePlayers().find((player) => !player.hasSpoon) || null;
  if (!loser) return;

  loser.misses += 1;
  const completedWord = loser.misses >= SPOONS_WORD.length;
  if (completedWord) loser.out = true;

  const remainingPlayers = spoonsState.players.filter((player) => !player.out);
  spoonsState.dealerId = remainingPlayers.length
    ? getNextSeatId(spoonsState.dealerId)
    : spoonsState.dealerId;

  if (remainingPlayers.length <= 1) {
    spoonsState.phase = "match-over";
    setSpoonsMessage(
      `${loser.label} missed the last spoon and ${completedWord ? "lost the final heart." : "took another heart loss."}`,
      `${remainingPlayers[0]?.label || "No one"} wins the match. Press Restart Match to run it again.`
    );
    renderSpoonsGame();
    return;
  }

  spoonsState.phase = "round-over";
  setSpoonsMessage(
    `${loser.label} missed the spoon and lost ${loser.misses} ${loser.misses === 1 ? "heart" : "hearts"}.`,
    completedWord
      ? `${loser.label} is out. Press Next Round to continue with one fewer spoon.`
      : "Press Next Round to redeal and keep the elimination ladder going."
  );
  renderSpoonsGame();
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

function setupSpoonsGame() {
  if (!(spoonsRoot instanceof HTMLElement)) return;

  spoonsState.players = createSpoonsPlayers();
  renderSpoonsGame();

  spoonsStart?.addEventListener("click", startSpoonsMatch);
  spoonsNext?.addEventListener("click", () => {
    if (spoonsState.phase === "round-over") {
      startSpoonsRound();
    }
  });
  spoonsGrab?.addEventListener("click", handleHumanGrab);
}

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
setupGalleryCarousels();
setupGalleryLightbox();
setupMobileSections();
setupResumeWalkthrough();
setupBackgroundCanvas();
setupSpoonsGame();
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
