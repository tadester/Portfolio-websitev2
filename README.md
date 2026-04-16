# Portfolio Website v2

A modern static portfolio site with a polished, nerdy-professional visual style.

## Files

- `index.html`: Main page structure and content.
- `styles.css`: Design system, layout, and responsive styling.
- `script.js`: Interactive demos, snippet switching, and lab controls.

## Quick start

Open `index.html` in a browser, or serve the folder locally with any static server.

## Auto deploy to Hostinger

This repo now includes [deploy-hostinger.yml](/Users/ktr/Developer/GitHub/Portfolio-websitev2/.github/workflows/deploy-hostinger.yml), which deploys the site automatically on every push to `main`.

Add these GitHub repository secrets before using it:

- `HOSTINGER_HOST`: your Hostinger FTP host, for example `ftp.yourdomain.com`
- `HOSTINGER_USERNAME`: your Hostinger FTP username
- `HOSTINGER_PASSWORD`: your Hostinger FTP password

After those secrets are set, pushing to `main` will upload the static site to Hostinger automatically.

## Customize

- Replace placeholder contact links in `index.html`.
- Add your real resume files in `assets/`.
- Swap the project descriptions with your own work.
- Replace the snippet examples in `script.js` with code from real projects.
