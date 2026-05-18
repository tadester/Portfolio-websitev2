# Olatade Obasan — Orbital Portfolio

A cinematic, multi-page software engineering portfolio for Olatade Obasan. The site uses a real Three.js solar-system homepage, polished project case studies, playable browser games, a resume page, and a focused contact page.

## What is included

- **Home:** interactive 3D orbital navigation powered by Three.js.
- **Projects:** three featured case studies plus a compact project directory.
- **Games:** Card Room with Blackjack and Hold'em-lite poker, plus Orbital Drift and smaller experiments.
- **Resume:** downloadable resume and structured experience walkthrough.
- **Contact:** direct links for email, phone, GitHub, LinkedIn, and resume.

## Run locally

From the repository root:

```bash
python3 -m http.server 4174
```

Then open:

```text
http://127.0.0.1:4174/index.html
```

The local server is recommended because the 3D homepage uses browser module imports.

## Test

Run the full smoke and game test suite:

```bash
node --test tests/poker-engine.test.js tests/card-room.test.js tests/layout-smoke.test.js tests/multipage-smoke.test.js
```

## Project structure

```text
assets/                 Image assets, project screenshots, resume PDF
src/game/               Small browser game logic modules
src/images/cards/       Playing-card image assets for Card Room
index.html              3D orbital homepage
projects.html           Featured projects and project directory
resume.html             Resume and experience page
games.html              Playable games / arcade page
contact.html            Contact page
404.html                Space-themed fallback page
script.js               Shared page interactions and canvas background
solar-system.js         Three.js orbital homepage scene
styles.css              Shared visual system and responsive layout
tests/                  Static and game logic smoke tests
```

## Deployment notes

This is a static website. It can be deployed by any static host that serves HTML, CSS, JS, and assets from the repository root. The current workflow expects changes to be committed and pushed to GitHub, then pulled by the connected host.

## Contact

- Email: Obasantade@gmail.com
- Phone: 825-440-6380
- GitHub: https://github.com/tadester
- LinkedIn: https://www.linkedin.com/in/tadeobasan/
