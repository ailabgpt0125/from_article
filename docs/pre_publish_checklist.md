# Pre-Publish Checklist

Date: 2026-06-14

Published URL: https://from-item.idea-base.net/

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

- [x] Confirm no public copy uses sales-heavy labels such as ranking, strong purchase prompts, or price comparison framing.
- [x] Confirm objects read as records, relics, echoes, marks, or entrances.
- [x] Confirm no public page explains AI usage or production process unless intentionally added outside this archive.
- [x] Confirm no obvious official text, item descriptions, or official copy are copied.
- [x] Add quiet editorial JOURNAL fragments so the page is more than only a legal notice.

## Legal And Affiliate

- [x] Confirm the site is clearly non-official.
- [x] Confirm rights attribution remains in footer, ABOUT, and JOURNAL.
- [x] Confirm Amazon pending disclosure is visible while Tracking ID is unset.
- [ ] TODO_HUMAN: Confirm Amazon Associate disclosure after Tracking ID is issued and configured.
- [x] Confirm price, stock, sales terms, and specifications are directed to external sellers.
- [ ] TODO_HUMAN: Complete Amazon Associates account/application flow.
- [ ] TODO_HUMAN: Confirm Amazon Tracking ID and apply it with `node scripts/configure-amazon-associate.js <tracking-id>`.
- [ ] TODO_HUMAN: Confirm each affiliate URL before treating Amazon links as affiliate links.
- [ ] TODO_HUMAN: Confirm image usage rights before adding any product images.
- [x] Consult the ChatGPT project in-browser for Amazon Associates readiness.

## Final Human Step

- [x] Upload after checks pass.
- [x] Publish with final custom domain URL.
- [ ] TODO_HUMAN: Rebuild and redeploy after Amazon Tracking ID is configured.
