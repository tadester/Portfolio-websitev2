(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PokerEngine = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const rankValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    jack: 11,
    queen: 12,
    king: 13,
    ace: 14,
  };

  const handNames = [
    "High Card",
    "Pair",
    "Two Pair",
    "Three of a Kind",
    "Straight",
    "Flush",
    "Full House",
    "Four of a Kind",
    "Straight Flush",
  ];

  function combinations(items, size) {
    if (size === 0) return [[]];
    if (items.length < size) return [];
    const [first, ...rest] = items;
    return combinations(rest, size - 1)
      .map((combo) => [first, ...combo])
      .concat(combinations(rest, size));
  }

  function straightHigh(values) {
    const unique = [...new Set(values)].sort((a, b) => b - a);
    if (unique.includes(14)) unique.push(1);
    for (let index = 0; index <= unique.length - 5; index += 1) {
      const slice = unique.slice(index, index + 5);
      if (slice.every((value, offset) => value === slice[0] - offset)) {
        return slice[0] === 5 && slice[4] === 1 ? 5 : slice[0];
      }
    }
    return null;
  }

  function evaluateFive(cards) {
    const values = cards.map((card) => rankValues[card.rank]).sort((a, b) => b - a);
    const suits = cards.map((card) => card.suit);
    const flush = suits.every((suit) => suit === suits[0]);
    const straight = straightHigh(values);
    const grouped = Object.entries(
      values.reduce((map, value) => ({ ...map, [value]: (map[value] || 0) + 1 }), {})
    )
      .map(([value, count]) => ({ value: Number(value), count }))
      .sort((a, b) => b.count - a.count || b.value - a.value);

    if (flush && straight) return { rank: 8, name: handNames[8], tiebreakers: [straight], cards };
    if (grouped[0].count === 4) {
      return { rank: 7, name: handNames[7], tiebreakers: [grouped[0].value, grouped[1].value], cards };
    }
    if (grouped[0].count === 3 && grouped[1].count === 2) {
      return { rank: 6, name: handNames[6], tiebreakers: [grouped[0].value, grouped[1].value], cards };
    }
    if (flush) return { rank: 5, name: handNames[5], tiebreakers: values, cards };
    if (straight) return { rank: 4, name: handNames[4], tiebreakers: [straight], cards };
    if (grouped[0].count === 3) {
      return {
        rank: 3,
        name: handNames[3],
        tiebreakers: [grouped[0].value, ...grouped.slice(1).map((group) => group.value)],
        cards,
      };
    }
    if (grouped[0].count === 2 && grouped[1].count === 2) {
      return {
        rank: 2,
        name: handNames[2],
        tiebreakers: [grouped[0].value, grouped[1].value, grouped[2].value],
        cards,
      };
    }
    if (grouped[0].count === 2) {
      return {
        rank: 1,
        name: handNames[1],
        tiebreakers: [grouped[0].value, ...grouped.slice(1).map((group) => group.value)],
        cards,
      };
    }
    return { rank: 0, name: handNames[0], tiebreakers: values, cards };
  }

  function comparePokerHands(left, right) {
    if (left.rank !== right.rank) return left.rank > right.rank ? 1 : -1;
    const length = Math.max(left.tiebreakers.length, right.tiebreakers.length);
    for (let index = 0; index < length; index += 1) {
      const leftValue = left.tiebreakers[index] || 0;
      const rightValue = right.tiebreakers[index] || 0;
      if (leftValue !== rightValue) return leftValue > rightValue ? 1 : -1;
    }
    return 0;
  }

  function bestPokerHand(cards) {
    return combinations(cards, 5)
      .map(evaluateFive)
      .sort((left, right) => comparePokerHands(right, left))[0];
  }

  return {
    bestPokerHand,
    comparePokerHands,
  };
});
