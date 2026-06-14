# Pre-Publish Checklist

Date: 2026-06-14

Published URL: https://ailabgpt0125.github.io/from_article/

## Build And Local Check

- [x] Run `C:\Users\takan\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts\build.js`
- [x] Run `C:\Users\takan\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts\verify.js`
- [x] Open the local preview in a browser.
- [x] Confirm TOP order: Hero, Concept, Worlds, Object Types, Journal, Selected Relics.
- [x] Confirm ABOUT, WORLDS, OBJECTS, JOURNAL, and object detail pages render.
- [x] Confirm mobile width does not break nav, cards, footer, or object detail pages.

## SEO And Publishing

- [x] Set `data/site.json` `siteUrl` to the final public URL.
- [x] Rebuild after setting `siteUrl`.
- [x] Confirm canonical URLs are absolute after rebuild.
- [x] Confirm `sitemap.xml` uses the final public URL after rebuild.
- [x] Confirm `robots.txt` includes the final sitemap URL after rebuild.
- [x] Confirm title, meta description, OGP title, and OGP description exist on major pages.

## Content And Tone

- [ ] Confirm no public copy uses sales-heavy labels such as ranking, strong purchase prompts, or price comparison framing.
- [ ] Confirm objects read as records, relics, echoes, marks, or entrances.
- [ ] Confirm no public page explains AI usage or production process unless intentionally added outside this archive.
- [ ] Confirm no official text, item descriptions, or official copy are copied.

## Legal And Affiliate

- [ ] Confirm the site is clearly non-official.
- [ ] Confirm rights attribution remains in footer, ABOUT, and JOURNAL.
- [x] Confirm Amazon pending disclosure is visible while Tracking ID is unset.
- [ ] TODO_HUMAN: Confirm Amazon Associate disclosure after Tracking ID is issued and configured.
- [ ] Confirm price, stock, sales terms, and specifications are directed to external sellers.
- [ ] TODO_HUMAN: Complete Amazon Associates account/application flow.
- [ ] TODO_HUMAN: Confirm Amazon Tracking ID and each affiliate URL before treating Amazon links as affiliate links.
- [ ] TODO_HUMAN: Confirm image usage rights before adding any product images.

## Final Human Step

- [x] Upload after checks pass.
- [x] Publish with final GitHub Pages URL.
- [ ] TODO_HUMAN: Rebuild and redeploy after Amazon Tracking ID is configured.
