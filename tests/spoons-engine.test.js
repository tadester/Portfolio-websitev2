const test = require("node:test");
const assert = require("node:assert/strict");

const {
  getRankCounts,
  hasFourOfKind,
  canPlayerClaimSpoon,
  chooseBotDiscardIndex,
  getBotGrabDelay,
} = require("../src/game/spoons-engine.js");

function makeCard(rank, suit = "hearts") {
  return { rank, suit, id: `${rank}-${suit}` };
}

test("rank counts group cards by rank", () => {
  const counts = getRankCounts([
    makeCard("ace", "hearts"),
    makeCard("ace", "spades"),
    makeCard("king", "clubs"),
  ]);

  assert.deepEqual(counts, { ace: 2, king: 1 });
});

test("four of a kind is detected in a 4-card hand", () => {
  const hand = [
    makeCard("7", "hearts"),
    makeCard("7", "diamonds"),
    makeCard("7", "clubs"),
    makeCard("7", "spades"),
  ];

  assert.equal(hasFourOfKind(hand), true);
});

test("four of a kind is detected in a 5-card hand", () => {
  const hand = [
    makeCard("queen", "hearts"),
    makeCard("queen", "diamonds"),
    makeCard("queen", "clubs"),
    makeCard("queen", "spades"),
    makeCard("4", "clubs"),
  ];

  assert.equal(hasFourOfKind(hand), true);
});

test("non-matching hand does not claim spoon during play", () => {
  const player = {
    hand: [makeCard("2"), makeCard("3"), makeCard("4"), makeCard("5"), makeCard("6")],
    out: false,
    hasSpoon: false,
  };

  assert.equal(canPlayerClaimSpoon(player, "playing", 3), false);
});

test("player with four matching cards can claim spoon during play", () => {
  const player = {
    hand: [
      makeCard("10", "hearts"),
      makeCard("10", "diamonds"),
      makeCard("10", "clubs"),
      makeCard("10", "spades"),
      makeCard("2", "clubs"),
    ],
    out: false,
    hasSpoon: false,
  };

  assert.equal(canPlayerClaimSpoon(player, "playing", 3), true);
});

test("player with four matching cards out of five can still claim immediately", () => {
  const player = {
    hand: [
      makeCard("ace", "hearts"),
      makeCard("ace", "diamonds"),
      makeCard("ace", "clubs"),
      makeCard("ace", "spades"),
      makeCard("king", "hearts"),
    ],
    out: false,
    hasSpoon: false,
  };

  assert.equal(canPlayerClaimSpoon(player, "playing", 3), true);
});

test("player can still grab during spoon race when spoons remain", () => {
  const player = {
    hand: [makeCard("2"), makeCard("3"), makeCard("4"), makeCard("5")],
    out: false,
    hasSpoon: false,
  };

  assert.equal(canPlayerClaimSpoon(player, "spoon-race", 1), true);
  assert.equal(canPlayerClaimSpoon(player, "spoon-race", 0), false);
});

test("out players and players already holding spoons cannot claim again", () => {
  const outPlayer = {
    hand: [
      makeCard("ace", "hearts"),
      makeCard("ace", "diamonds"),
      makeCard("ace", "clubs"),
      makeCard("ace", "spades"),
    ],
    out: true,
    hasSpoon: false,
  };
  const spoonPlayer = { ...outPlayer, out: false, hasSpoon: true };

  assert.equal(canPlayerClaimSpoon(outPlayer, "playing", 3), false);
  assert.equal(canPlayerClaimSpoon(spoonPlayer, "spoon-race", 1), false);
});

test("bot discard logic keeps the strongest matching set", () => {
  const player = {
    hand: [
      makeCard("jack", "hearts"),
      makeCard("jack", "diamonds"),
      makeCard("jack", "clubs"),
      makeCard("4", "spades"),
      makeCard("8", "clubs"),
    ],
  };

  const discardIndex = chooseBotDiscardIndex(player);
  assert.ok([3, 4].includes(discardIndex));
});

test("bot grab delay rewards stronger hands with faster grabs", () => {
  const strongPlayer = {
    hand: [
      makeCard("9", "hearts"),
      makeCard("9", "diamonds"),
      makeCard("9", "clubs"),
      makeCard("9", "spades"),
    ],
  };
  const weakPlayer = {
    hand: [makeCard("2"), makeCard("5"), makeCard("8"), makeCard("king")],
  };

  const fastDelay = getBotGrabDelay(strongPlayer, 0);
  const slowDelay = getBotGrabDelay(weakPlayer, 0);

  assert.ok(fastDelay < slowDelay);
  assert.ok(fastDelay >= 1200);
});
