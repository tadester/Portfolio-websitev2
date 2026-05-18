const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(projectRoot, "styles.css"), "utf8");

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

test("responsive stylesheet has clean mobile rules for the 3d site", () => {
  assert.match(css, /@media \(max-width:\s*980px\)[\s\S]*\.compact-experiments-grid/);
  assert.match(css, /@media \(max-width:\s*640px\)[\s\S]*\.solar-intro/);
  assert.doesNotMatch(css, /\n\s+inset:\s*404px auto auto 50%;/);
  assert.doesNotMatch(css, /\n\s+top:\s*274px;\n\s+\}/);
});

test("homepage returns to a balanced side-by-side premium composition", () => {
  assert.match(css, /\.hero-support\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1\.05fr\)\s+minmax\(360px,\s*0\.95fr\);/);
  assert.match(css, /h1\s*\{[\s\S]*font-size:\s*clamp\(2\.35rem,\s*5vw,\s*4\.25rem\);/);
  assert.match(css, /\.hero-copy h1\s*\{[\s\S]*background-clip:\s*text;/);
  assert.match(css, /\.nav a\.is-active\s*\{[\s\S]*border-radius:\s*999px;/);
  assert.match(css, /\.home-feature-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/);
});
