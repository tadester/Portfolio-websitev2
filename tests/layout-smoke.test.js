const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const css = fs.readFileSync(path.join(projectRoot, "styles.css"), "utf8");

test("desktop only has one active grab spoon button in the hand panel", () => {
  const grabButtonMatches = html.match(/id="spoons-grab"/g) || [];
  assert.equal(grabButtonMatches.length, 1);
  assert.match(
    html,
    /<div class="spoons-hand-actions">[\s\S]*id="spoons-grab"/
  );
  assert.doesNotMatch(html, /id="spoons-grab"[^>]*\sdisabled(?!=)/);
});

test("center spoon pile remains a clickable grab target", () => {
  assert.match(html, /id="spoons-ring"[^>]*role="button"/);
  assert.match(html, /id="spoons-ring"[^>]*tabindex="0"/);
});

test("desktop keeps mobile section navigation hidden", () => {
  assert.match(css, /\.mobile-section-nav\s*\{\s*display:\s*none;/);
  assert.match(
    css,
    /@media \(min-width: 761px\)\s*\{\s*\.mobile-section-nav\s*\{\s*display:\s*none !important;/
  );
});

test("mobile navigation is only enabled inside the small-screen media query", () => {
  assert.match(
    css,
    /@media \(max-width: 760px\)\s*\{[\s\S]*\.mobile-section-nav\s*\{[\s\S]*display:\s*flex;/
  );
});

test("human seat is not rendered inside the table to avoid table overlays", () => {
  assert.match(css, /\.spoons-seat-bottom\s*\{\s*display:\s*none;/);
});

test("gallery cards constrain their columns to prevent cross-card overflow", () => {
  assert.match(css, /\.gallery-grid\s*\{\s*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /\.gallery-card\s*\{[\s\S]*min-width:\s*0;/);
  assert.match(css, /\.gallery-stage\s*\{[\s\S]*minmax\(0,\s*1fr\)/);
});
