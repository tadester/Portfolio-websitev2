const test = require("node:test");
const assert = require("node:assert/strict");

const {
  bestPokerHand,
  comparePokerHands,
} = require("../src/game/poker-engine");

const card = (rank, suit) => ({ rank, suit });

test("bestPokerHand finds a straight flush from seven available cards", () => {
  const result = bestPokerHand([
    card("9", "hearts"),
    card("10", "hearts"),
    card("jack", "hearts"),
    card("queen", "hearts"),
    card("king", "hearts"),
    card("2", "clubs"),
    card("ace", "spades"),
  ]);

  assert.equal(result.name, "Straight Flush");
  assert.deepEqual(result.tiebreakers, [13]);
});

test("bestPokerHand prefers a full house over a flush", () => {
  const result = bestPokerHand([
    card("king", "clubs"),
    card("king", "diamonds"),
    card("king", "hearts"),
    card("4", "clubs"),
    card("4", "diamonds"),
    card("ace", "clubs"),
    card("9", "clubs"),
  ]);

  assert.equal(result.name, "Full House");
  assert.deepEqual(result.tiebreakers, [13, 4]);
});

test("comparePokerHands uses kickers when both players share the same pair", () => {
  const board = [
    card("8", "clubs"),
    card("8", "diamonds"),
    card("queen", "spades"),
    card("4", "clubs"),
    card("2", "hearts"),
  ];

  const player = bestPokerHand([...board, card("ace", "hearts"), card("king", "clubs")]);
  const dealer = bestPokerHand([...board, card("ace", "clubs"), card("jack", "clubs")]);

  assert.equal(comparePokerHands(player, dealer), 1);
});
