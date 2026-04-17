(function initSpoonsEngine(globalScope) {
  function getRankCounts(hand) {
    return hand.reduce((counts, card) => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
      return counts;
    }, {});
  }

  function hasFourOfKind(hand) {
    return Object.values(getRankCounts(hand)).some((count) => count >= 4);
  }

  function canPlayerClaimSpoon(player, phase, spoonsRemaining) {
    if (!player || player.out || player.hasSpoon) return false;

    if (phase === "spoon-race") {
      return spoonsRemaining > 0;
    }

    if (phase === "playing") {
      return player.hand.length >= 4 && hasFourOfKind(player.hand);
    }

    return false;
  }

  function chooseBotDiscardIndex(player) {
    let bestIndex = 0;
    let bestScore = Number.NEGATIVE_INFINITY;

    player.hand.forEach((candidate, index) => {
      const nextHand = player.hand.filter((_, cardIndex) => cardIndex !== index);
      const counts = Object.values(getRankCounts(nextHand));
      const maxCount = counts.length ? Math.max(...counts) : 0;
      const comboScore = counts.reduce((total, value) => total + value * value, 0);
      const discardPenalty = (getRankCounts(player.hand)[candidate.rank] || 0) * 4;
      const score = maxCount * 100 + comboScore - discardPenalty;

      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    });

    return bestIndex;
  }

  function getBotGrabDelay(player, randomValue = Math.random()) {
    const counts = Object.values(getRankCounts(player.hand));
    const bestCount = counts.length ? Math.max(...counts) : 1;
    return Math.max(1200, 1900 - bestCount * 120 + randomValue * 520);
  }

  const api = {
    getRankCounts,
    hasFourOfKind,
    canPlayerClaimSpoon,
    chooseBotDiscardIndex,
    getBotGrabDelay,
  };

  globalScope.SpoonsEngine = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
