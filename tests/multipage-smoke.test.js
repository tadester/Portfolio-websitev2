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
};
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
  assert.match(pages.home, /<section class="hero"/);
  assert.match(pages.home, /<section class="section proof-strip"/);
  assert.match(pages.home, /aria-labelledby="featured-projects-title"/);
  assert.equal(hasHref(pages.home, "projects.html"), true);
  assert.doesNotMatch(pages.home, /id="gallery"/);
  assert.doesNotMatch(pages.home, /id="resume"/);
  assert.doesNotMatch(pages.home, /id="games"/);
  assert.doesNotMatch(pages.home, /id="contact"/);
});

test("homepage uses a dedicated feature-card rhythm hook", () => {
  assert.match(pages.home, /<div class="project-grid home-feature-grid">/);
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

test("dedicated pages contain their matching sections", () => {
  assert.match(pages.resume, /<section\b[^>]*id="resume"/);
  assert.match(pages.resume, /\.\/assets\/resume-professional\.pdf/);
  assert.match(pages.games, /<section\b[^>]*id="games"/);
  assert.match(pages.contact, /<section\b[^>]*id="contact"/);
});

test("dedicated pages wire the shared multipage hierarchy and active navigation hooks", () => {
  const expectedActiveLinks = { home: "index.html", projects: "projects.html", resume: "resume.html", games: "games.html", contact: "contact.html" };

  for (const [page, href] of Object.entries(expectedActiveLinks)) {
    assert.match(pages[page], new RegExp(`<a class="is-active" href="\\./${href}"`));
  }

  for (const page of ["projects", "resume", "games", "contact"]) {
    assert.match(pages[page], /<main id="top" class="page-shell">/);
    assert.match(pages[page], /<div class="section-heading page-intro">/);
  }
});
