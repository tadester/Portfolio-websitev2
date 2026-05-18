const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const games = fs.readFileSync(path.join(root, "games.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

test("poker card room exposes a shared community board", () => {
  assert.match(games, /id="community-hand"/);
  assert.match(games, />Community Cards</);
  assert.match(games, />Reveal Winner</);
});

test("poker deals two private cards per side and five community cards", () => {
  assert.match(script, /cardRoomState\.community = cardRoomState\.mode === "blackjack" \? \[\] : Array\.from\(\{ length: 5 \}, drawCard\)/);
  assert.match(script, /cardRoomState\.player = \[drawCard\(\), drawCard\(\)\]/);
  assert.match(script, /cardRoomState\.dealer = \[drawCard\(\), drawCard\(\)\]/);
});
