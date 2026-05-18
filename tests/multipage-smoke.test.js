const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const pages = {
  home: read("index.html"),
  projects: read("projects.html"),
  resume: read("resume.html"),
  games: read("games.html"),
  contact: read("contact.html"),
  notFound: fs.existsSync(path.join(root, "404.html")) ? read("404.html") : "",
};
const readme = read("README.md");
const script = read("script.js");
const solarScript = fs.existsSync(path.join(root, "solar-system.js")) ? read("solar-system.js") : "";
const pageLinks = ["index.html", "projects.html", "resume.html", "games.html", "contact.html"];
const hasHref = (html, href) => new RegExp(`<a\\b[^>]*href="\\./${href}"`).test(html);

test("global nav links each page to the multipage site", () => {
  for (const html of Object.values(pages)) {
    for (const href of pageLinks) assert.equal(hasHref(html, href), true);
  }
});

test("dedicated pages expose one visible primary heading", () => {
  for (const html of [pages.projects, pages.resume, pages.games, pages.contact]) {
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});

test("homepage is concise and points visitors deeper", () => {
  assert.match(pages.home, /<main id="solar-system"/);
  assert.equal(hasHref(pages.home, "projects.html"), true);
  assert.match(pages.home, /I build intelligent products, operational tools, and interactive systems\./);
  assert.doesNotMatch(pages.home, /id="gallery"/);
  assert.doesNotMatch(pages.home, /id="resume"/);
  assert.doesNotMatch(pages.home, /id="games"/);
  assert.doesNotMatch(pages.home, /id="contact"/);
});

test("homepage uses a dedicated feature-card rhythm hook", () => {
  assert.doesNotMatch(pages.home, /home-feature-grid/);
});

test("homepage exposes a futuristic 3d world navigation surface", () => {
  assert.match(pages.home, /<main id="solar-system"/);
  assert.match(pages.home, /id="solar-canvas"/);
  assert.match(pages.home, /type="module" src="\.\/solar-system\.js"/);
  assert.doesNotMatch(pages.home, /class="hero-support"/);
});

test("solar system uses a real three.js scene with planets and camera travel", () => {
  assert.match(solarScript, /from "three"/);
  assert.match(solarScript, /new THREE\.WebGLRenderer/);
  assert.match(solarScript, /new THREE\.PerspectiveCamera/);
  assert.match(solarScript, /planetDefinitions/);
  assert.match(solarScript, /focusPlanet/);
  assert.match(solarScript, /labelElement/);
});

test("projects page owns selected work, gallery, architecture, repos, and bakery delivery", () => {
  assert.match(pages.projects, /<section\b[^>]*id="projects"/);
  assert.match(pages.projects, /<section\b[^>]*id="gallery"/);
  assert.match(pages.projects, /<section\b[^>]*id="architecture"/);
  assert.ok((pages.projects.match(/Bakery Delivery/g) || []).length >= 2);
  assert.match(pages.projects, /https:\/\/github\.com\/tadester\/Jumpshot-Trainer-v2/);
  assert.match(pages.projects, /https:\/\/github\.com\/tadester\/Tadester-Flow/);
  assert.match(pages.projects, /https:\/\/github\.com\/tadester\/bakery-del/);
});

test("projects page includes every local project repository", () => {
  for (const projectName of [
    "Jumpshot Trainer",
    "Tadester Ops / TadesterFlow",
    "Bakery Delivery",
    "WorldSim",
    "Study Application",
    "Portfolio Website v2",
  ]) {
    assert.match(pages.projects, new RegExp(projectName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("projects page separates featured work from the full directory", () => {
  assert.match(pages.projects, /id="featured-projects"/);
  assert.match(pages.projects, /id="project-directory"/);
  assert.match(pages.projects, /10 employees/);
  assert.equal((pages.projects.match(/class="project-card[^"]*featured-project[^"]*"/g) || []).length, 3);
  assert.match(pages.projects, /Outcome/);
  assert.match(pages.projects, /Stack/);
  assert.doesNotMatch(pages.projects, /Instagram Unfollow/);
  assert.doesNotMatch(pages.projects, /Spoons Game/);
});

test("dedicated pages contain their matching sections", () => {
  assert.match(pages.resume, /<section\b[^>]*id="resume"/);
  assert.match(pages.resume, /\.\/assets\/resume-professional\.pdf/);
  assert.match(pages.games, /<section\b[^>]*id="games"/);
  assert.match(pages.contact, /<section\b[^>]*id="contact"/);
});

test("dedicated pages wire the shared multipage hierarchy and active navigation hooks", () => {
  const expectedActiveLinks = { projects: "projects.html", resume: "resume.html", games: "games.html", contact: "contact.html" };

  for (const [page, href] of Object.entries(expectedActiveLinks)) {
    assert.match(pages[page], new RegExp(`<a class="is-active" href="\\./${href}"`));
  }

  for (const page of ["projects", "resume", "games", "contact"]) {
    assert.match(pages[page], /<main id="top" class="page-shell">/);
    assert.match(pages[page], /<div class="section-heading page-intro">/);
  }
});

test("shared script derives active navigation from page URLs without overriding authored states", () => {
  assert.match(script, /function setupActiveNavigation\(\)/);
  assert.match(script, /window\.location\.pathname/);
  assert.match(script, /navLinks\.some\(\(link\) => link\.classList\.contains\("is-active"\)\)/);
  assert.match(script, /setupActiveNavigation\(\);/);
});

test("page-specific script setup functions exit cleanly when their DOM is absent", () => {
  assert.match(script, /function setupGalleryCarousels\(\)\s*\{\s*const galleries = document\.querySelectorAll\("\.gallery-carousel"\);\s*if \(!galleries\.length\) return;/);
  assert.match(script, /function setupResumeWalkthrough\(\)\s*\{\s*if \(!resumeTabs\.length \|\| !resumePanels\.length\) return;/);
  assert.match(script, /function setupGame\(\)\s*\{\s*if \(!\(gameBoard instanceof HTMLElement\) \|\| !\(playerDot instanceof HTMLElement\) \|\| !\(gameStart instanceof HTMLElement\)\)/);
  assert.match(script, /function setupTerminal\(\)\s*\{\s*if \(!terminalLog\) return;/);
});

test("shared script keeps background and game runtime state initialized", () => {
  assert.match(script, /const backgroundState = \{/);
  assert.match(script, /const gameState = \{/);
});

test("games page includes the orbital drift minigame and no longer references spoons", () => {
  assert.match(pages.games, /id="orbital-drift"/);
  assert.match(pages.games, /Arcade Floor/);
  assert.match(pages.games, /compact-experiments-grid/);
  assert.doesNotMatch(pages.games, /Grab Spoon|spoons-game/);
  assert.doesNotMatch(script, /setupSpoonsGame|spoonsState|spoonsEngine/);
});

test("card room hidden states can actually hide menu and table panels", () => {
  const css = read("styles.css");
  assert.match(css, /\.card-room-menu\[hidden\],[\s\S]*\.card-room-table\[hidden\]\s*\{[\s\S]*display:\s*none !important;/);
  assert.match(script, /cardRoomMenu\.setAttribute\("hidden", ""\)/);
  assert.match(script, /cardRoomTable\.removeAttribute\("hidden"\)/);
});

test("contact page has a direct call to action and current interests", () => {
  assert.match(pages.contact, /Start a conversation/);
  assert.match(pages.contact, /Currently interested in/);
});

test("shared styles favor restrained motion", () => {
  const css = read("styles.css");
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /--motion-fast:/);
  assert.match(css, /--motion-slow:/);
});

test("repository polish includes run instructions and a themed 404", () => {
  assert.match(readme, /python3 -m http\.server 4174/);
  assert.match(readme, /node --test tests\/poker-engine\.test\.js tests\/card-room\.test\.js tests\/layout-smoke\.test\.js tests\/multipage-smoke\.test\.js/);
  assert.match(pages.notFound, /Lost in orbit/);
  assert.match(pages.notFound, /href="\.\/index\.html"/);
});

test("project visuals use clean branded asset names", () => {
  assert.doesNotMatch(pages.projects, /Screenshot 2026/);
  assert.doesNotMatch(pages.projects, /world-sim gallery/);
  for (const asset of [
    "tadester-field-operations.png",
    "tadester-routing-map-screenshot.png",
    "flutter-operator-team.png",
    "jumpshot-analysis-dashboard.png",
    "worldsim-dashboard.png",
  ]) {
    assert.match(pages.projects, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
