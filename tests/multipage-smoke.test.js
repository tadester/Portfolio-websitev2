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

test("global nav uses page links on every page", () => {
  for (const html of Object.values(pages)) {
    assert.match(html, /href="\.\/index\.html">Home<\/a>/);
    assert.match(html, /href="\.\/projects\.html">Projects<\/a>/);
    assert.match(html, /href="\.\/resume\.html">Resume<\/a>/);
    assert.match(html, /href="\.\/games\.html">Games<\/a>/);
    assert.match(html, /href="\.\/contact\.html">Contact<\/a>/);
  }
});

test("homepage is concise and points visitors deeper", () => {
  assert.match(pages.home, /class="hero"/);
  assert.match(pages.home, /class="section proof-strip"/);
  assert.match(pages.home, /Featured Project Previews/);
  assert.doesNotMatch(pages.home, /id="gallery"/);
  assert.doesNotMatch(pages.home, /id="resume"/);
  assert.doesNotMatch(pages.home, /id="games"/);
  assert.doesNotMatch(pages.home, /id="contact"/);
});

test("projects page owns selected work, gallery, architecture, repos, and bakery delivery", () => {
  assert.match(pages.projects, /id="projects"/);
  assert.match(pages.projects, /id="gallery"/);
  assert.match(pages.projects, /id="architecture"/);
  assert.match(pages.projects, /<h3>Bakery Delivery<\/h3>/);
  assert.match(pages.projects, /<p class="project-type">Bakery Delivery<\/p>[\s\S]*<h3>Mobile delivery operations platform<\/h3>/);
  assert.match(pages.projects, /https:\/\/github\.com\/tadester\/Jumpshot-Trainer-v2/);
  assert.match(pages.projects, /https:\/\/github\.com\/tadester\/Tadester-Flow/);
  assert.match(pages.projects, /https:\/\/github\.com\/tadester\/bakery-del/);
});

test("dedicated pages contain their matching content", () => {
  assert.match(pages.resume, /id="resume"/);
  assert.match(pages.resume, /\.\/assets\/resume-professional\.pdf/);
  assert.match(pages.games, /id="games"/);
  assert.match(pages.contact, /id="contact"/);
});
