# Pre-Publish Checklist

Date: 2026-06-14

## Build And Local Check

- [ ] Run `C:\Users\takan\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts\build.js`
- [ ] Run `C:\Users\takan\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts\verify.js`
- [ ] Open the local preview in a browser.
- [ ] Confirm TOP order: Hero, Concept, Worlds, Object Types, Journal, Selected Relics.
- [ ] Confirm ABOUT, WORLDS, OBJECTS, JOURNAL, and object detail pages render.
- [ ] Confirm mobile width does not break nav, cards, footer, or object detail pages.

## SEO And Publishing

- [ ] TODO_HUMAN: Set `data/site.json` `siteUrl` to the final public URL.
- [ ] Rebuild after setting `siteUrl`.
- [ ] Confirm canonical URLs are absolute after rebuild.
- [ ] Confirm `sitemap.xml` uses the final public URL after rebuild.
- [ ] Confirm `robots.txt` includes the final sitemap URL after rebuild.
- [ ] Confirm title, meta description, OGP title, and OGP description exist on major pages.

## Content And Tone

- [ ] Confirm no public copy uses sales-heavy labels such as ranking, strong purchase prompts, or price comparison framing.
- [ ] Confirm objects read as records, relics, echoes, marks, or entrances.
- [ ] Confirm no public page explains AI usage or production process unless intentionally added outside this archive.
- [ ] Confirm no official text, item descriptions, or official copy are copied.

## Legal And Affiliate

- [ ] Confirm the site is clearly non-official.
- [ ] Confirm rights attribution remains in footer, ABOUT, and JOURNAL.
- [ ] Confirm affiliate disclosure remains visible.
- [ ] Confirm price, stock, sales terms, and specifications are directed to external sellers.
- [ ] TODO_HUMAN: Confirm Amazon Associate ID and each affiliate URL before publication.
- [ ] TODO_HUMAN: Confirm image usage rights before adding any product images.

## Final Human Step

- [ ] Upload only after the above checks pass.
- [ ] Do not publish with placeholder public URL or unreviewed affiliate URLs.
