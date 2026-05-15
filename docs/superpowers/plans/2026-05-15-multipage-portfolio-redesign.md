# Multi-page Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current one-page portfolio into a polished multi-page site with shared interactive styling and accurate GitHub links for each repo-backed project.

**Architecture:** Keep the project framework-free and static, split the current single document into focused HTML pages, and preserve a shared visual system through the existing stylesheet plus shared JavaScript. Reuse existing interactive modules where they still belong, while moving page-specific content into Projects, Resume/About, Games, and Contact pages.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node test runner

---

## File Map

- Modify `index.html` — become the shorter homepage.
- Create `projects.html` — house full portfolio content, galleries, code snippets, architecture cards, and GitHub links.
- Create `resume.html` — house resume walkthrough and about content.
- Create `games.html` — house playable demos and game controls.
- Create `contact.html` — house contact CTA and links.
- Modify `styles.css` — add page-shell, active-nav, stronger hierarchy, refined card styling, and page-specific layout rules.
- Modify `script.js` — make page-aware initialization safe across multiple documents and preserve shared interactions.
- Modify `tests/layout-smoke.test.js` — add multi-page navigation and GitHub-link coverage.
- Create `tests/multipage-smoke.test.js` — assert each new page contains expected page landmarks.

### Task 1: Add multi-page smoke tests

**Files:**
- Modify: `tests/layout-smoke.test.js`
- Create: `tests/multipage-smoke.test.js`

- [ ] **Step 1: Write failing tests for new pages and GitHub links**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("portfolio exposes dedicated top-level pages", () => {
  for (const file of ["projects.html", "resume.html", "games.html", "contact.html"]) {
    assert.equal(fs.existsSync(path.join(root, file)), true, `${file} should exist`);
  }
});

test("project page includes GitHub links for repo-backed projects", () => {
  const html = read("projects.html");
  assert.match(html, /https:\/\/github\.com\/tadester\/Jumpshot-Trainer-v2/);
  assert.match(html, /https:\/\/github\.com\/tadester\/Tadester-Flow/);
  assert.match(html, /https:\/\/github\.com\/tadester\/bakery-del/);
});
```

Add to `tests/layout-smoke.test.js`:

```js
test("homepage navigation points to dedicated pages", () => {
  assert.match(html, /href="\.\/projects\.html"/);
  assert.match(html, /href="\.\/resume\.html"/);
  assert.match(html, /href="\.\/games\.html"/);
  assert.match(html, /href="\.\/contact\.html"/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/layout-smoke.test.js tests/multipage-smoke.test.js`
Expected: FAIL because the new pages do not exist and homepage links still target anchors.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/layout-smoke.test.js tests/multipage-smoke.test.js
git commit -m "test: cover multipage portfolio structure"
```

### Task 2: Split the homepage into focused pages

**Files:**
- Modify: `index.html`
- Create: `projects.html`
- Create: `resume.html`
- Create: `games.html`
- Create: `contact.html`

- [ ] **Step 1: Create page skeletons using shared header and script/style includes**

Each new page should include:

```html
<header class="topbar">
  <a class="brand" href="./index.html">Olatade Obasan</a>
  <nav class="nav">
    <a href="./projects.html">Projects</a>
    <a href="./resume.html">Resume</a>
    <a href="./games.html">Games</a>
    <a href="./contact.html">Contact</a>
  </nav>
</header>
```

and shared assets:

```html
<link rel="stylesheet" href="./styles.css" />
<script src="./src/game/spoons-engine.js"></script>
<script src="./script.js"></script>
```

- [ ] **Step 2: Move content into page-specific documents**

Use these content allocations:
- `index.html`: hero, proof strip, featured project previews, CTA
- `projects.html`: selected work, gallery, architecture sections
- `resume.html`: resume walkthrough section
- `games.html`: games section
- `contact.html`: contact section

- [ ] **Step 3: Update homepage nav and CTAs to use page links**

Examples:

```html
<a href="./projects.html">Projects</a>
<a class="button button-primary" href="./projects.html">Explore Projects</a>
<a class="button button-secondary" href="./resume.html">View Resume</a>
```

- [ ] **Step 4: Run tests**

Run: `node --test tests/layout-smoke.test.js tests/multipage-smoke.test.js`
Expected: page existence/navigation tests pass; interaction tests may still reveal script assumptions.

- [ ] **Step 5: Commit**

```bash
git add index.html projects.html resume.html games.html contact.html
git commit -m "feat: split portfolio into dedicated pages"
```

### Task 3: Add project GitHub links

**Files:**
- Modify: `projects.html`
- Modify: `tests/multipage-smoke.test.js`

- [ ] **Step 1: Extend failing tests for link labels**

```js
test("project page surfaces visible GitHub actions", () => {
  const html = read("projects.html");
  assert.match(html, />GitHub<\/a>/);
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `node --test tests/multipage-smoke.test.js`
Expected: FAIL because GitHub buttons are not yet present.

- [ ] **Step 3: Add GitHub actions to project cards**

Example:

```html
<div class="cta-row compact-row">
  <a class="button button-secondary" href="https://github.com/tadester/Jumpshot-Trainer-v2">GitHub</a>
</div>
```

Add equivalent links for:
- Tadester Ops / TadesterFlow
- Bakery Delivery
- Portfolio Website if represented on-page

- [ ] **Step 4: Run tests**

Run: `node --test tests/multipage-smoke.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add projects.html tests/multipage-smoke.test.js
git commit -m "feat: add project github links"
```

### Task 4: Refine shared visual system for a more professional multi-page UI

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Add failing assertions for new global styling hooks**

Append to `tests/layout-smoke.test.js`:

```js
test("shared stylesheet includes multi-page layout hooks", () => {
  assert.match(css, /\.page-shell\s*\{/);
  assert.match(css, /\.nav a\.is-active/);
  assert.match(css, /\.page-intro\s*\{/);
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `node --test tests/layout-smoke.test.js`
Expected: FAIL because the new selectors do not yet exist.

- [ ] **Step 3: Add shared layout and polish styles**

Add focused rules such as:

```css
.page-shell {
  display: grid;
  gap: 2rem;
}

.nav a.is-active {
  color: var(--text);
  border-color: rgba(118, 244, 214, 0.45);
  background: rgba(118, 244, 214, 0.08);
}

.page-intro {
  display: grid;
  gap: 0.85rem;
  max-width: 760px;
}
```

Refine spacing, headings, project card rhythm, CTA alignment, and page-specific grids while preserving the existing visual language.

- [ ] **Step 4: Run tests**

Run: `node --test tests/layout-smoke.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add styles.css tests/layout-smoke.test.js
git commit -m "style: refine multipage portfolio ui"
```

### Task 5: Make JavaScript safe across multiple pages and preserve interactivity

**Files:**
- Modify: `script.js`
- Modify: `tests/multipage-smoke.test.js`

- [ ] **Step 1: Add failing tests for page-aware initialization markers**

```js
test("shared script contains page-safe guards", () => {
  const js = read("script.js");
  assert.match(js, /if \(!resumeTabs\.length \|\| !resumePanels\.length\) return;/);
  assert.match(js, /if \(!galleryCarousels\.length\) return;/);
});
```

- [ ] **Step 2: Run tests to inspect current status**

Run: `node --test tests/multipage-smoke.test.js`
Expected: identify which existing initializers already guard correctly and which ones need adjustment.

- [ ] **Step 3: Add or tighten guards for page-specific modules**

Ensure modules that depend on missing DOM nodes return early cleanly on pages where they are absent.

- [ ] **Step 4: Preserve active nav state**

Add a small initializer that reads `window.location.pathname` and applies `.is-active` to the matching top nav link.

- [ ] **Step 5: Run tests**

Run: `node --test tests/layout-smoke.test.js tests/multipage-smoke.test.js tests/spoons-engine.test.js`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add script.js tests/multipage-smoke.test.js
git commit -m "feat: make interactions page-aware"
```

### Task 6: Browser verification and content pass

**Files:**
- Modify as needed: `index.html`, `projects.html`, `resume.html`, `games.html`, `contact.html`, `styles.css`

- [ ] **Step 1: Run full automated verification**

Run: `node --test tests/layout-smoke.test.js tests/multipage-smoke.test.js tests/spoons-engine.test.js`
Expected: PASS.

- [ ] **Step 2: Manually verify in browser**

Check:
- desktop and mobile navigation
- page transitions and active nav state
- projects page galleries/snippets
- resume tabs
- games interactions
- contact links
- GitHub links open the intended repos

- [ ] **Step 3: Make any small final polish edits**

Only adjust spacing, labels, and alignment issues discovered during QA.

- [ ] **Step 4: Re-run full verification**

Run: `node --test tests/layout-smoke.test.js tests/multipage-smoke.test.js tests/spoons-engine.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html projects.html resume.html games.html contact.html styles.css script.js tests
git commit -m "feat: complete multipage portfolio redesign"
```
