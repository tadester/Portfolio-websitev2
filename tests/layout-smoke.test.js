const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const gamesHtml = fs.readFileSync(path.join(projectRoot, "games.html"), "utf8");
const css = fs.readFileSync(path.join(projectRoot, "styles.css"), "utf8");

test("desktop only has one active grab spoon button in the hand panel", () => {
  const grabButtonMatches = gamesHtml.match(/id="spoons-grab"/g) || [];
  assert.equal(grabButtonMatches.length, 1);
  assert.match(gamesHtml, /<div class="spoons-hand-actions">[\s\S]*id="spoons-grab"/);
  assert.doesNotMatch(gamesHtml, /id="spoons-grab"[^>]*\sdisabled(?!=)/);
});

test("center spoon pile remains a clickable grab target", () => {
  assert.match(gamesHtml, /id="spoons-ring"[^>]*role="button"/);
  assert.match(gamesHtml, /id="spoons-ring"[^>]*tabindex="0"/);
});

test("spoon chips render as actual buttons in the game script", () => {
  assert.match(fs.readFileSync(path.join(projectRoot, "script.js"), "utf8"), /<button type="button" class="spoons-spoon-chip/);
});

test("human seat is not rendered inside the table to avoid table overlays", () => {
  assert.match(css, /\.spoons-seat-bottom\s*\{\s*display:\s*none;/);
});

test("gallery cards constrain their columns to prevent cross-card overflow", () => {
  assert.match(css, /\.gallery-grid\s*\{\s*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /\.gallery-card\s*\{[\s\S]*min-width:\s*0;/);
  assert.match(css, /\.gallery-stage\s*\{[\s\S]*minmax\(0,\s*1fr\)/);
});

test("multipage layout exposes shared page hierarchy and active navigation hooks", () => {
  assert.match(css, /\.page-shell\s*\{[\s\S]*display:\s*grid;[\s\S]*gap:\s*clamp\(/);
  assert.match(css, /\.page-intro\s*\{[\s\S]*padding:\s*clamp\(/);
  assert.match(css, /\.nav a\.is-active\s*\{[\s\S]*color:\s*var\(--text\);/);
});

test("shared cards use premium surfaces and responsive project spacing", () => {
  assert.match(css, /--shadow-card:\s*0 14px 42px/);
  assert.match(css, /\.premium-surface\s*\{[\s\S]*transition:/);
  assert.match(css, /\.project-card,[\s\S]*\.proof-card,[\s\S]*\.contact-card\s*\{[\s\S]*box-shadow:\s*var\(--shadow-card\);/);
  assert.match(css, /\.project-copy a\s*\{[\s\S]*display:\s*inline-flex;/);
  assert.match(css, /@media \(max-width:\s*640px\)[\s\S]*\.project-grid\s*\{[\s\S]*gap:\s*16px;/);
});

test("homepage visual rhythm favors a calmer centered premium composition", () => {
  assert.match(css, /\.hero\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*820px\);[\s\S]*justify-content:\s*center;/);
  assert.match(css, /\.hero-copy\s*\{[\s\S]*text-align:\s*center;/);
  assert.match(css, /\.hero-copy h1\s*\{[\s\S]*background-clip:\s*text;/);
  assert.match(css, /\.nav a\.is-active\s*\{[\s\S]*border-radius:\s*999px;/);
  assert.match(css, /\.home-feature-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/);
});
