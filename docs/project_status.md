# Project Status

Date: 2026-06-14

Published URL: https://ailabgpt0125.github.io/from_article/
Repository: https://github.com/ailabgpt0125/from_article

## Summary

`SEED A HOSTILE EARTH` is a static, non-official, design-first archive site for quietly curating FromSoftware-related books, soundtracks, figures, apparel-like marks, and game entrances as fragments rather than commercial products.

The site is generated from `data/site.json`, `data/products.json`, `scripts/build.js`, `style.css`, and `script.js`. Generated HTML should not be edited directly unless the generator is also updated.

## Current State

- Local build source: `scripts/build.js`
- Product data source: `data/products.json`
- Published object count: 12
- Public deployment: GitHub Pages from `main` branch root
- Required worlds: present
- Required object routes: present
- Main public routes: TOP, ABOUT, WORLDS, OBJECTS, JOURNAL, object detail pages
- External link structure: present through `outboundLinks`
- Amazon Associate configuration: present through `data/affiliate.json`
- Amazon Associate Tracking ID: TODO_HUMAN, not configured yet
- Amazon disclosure behavior: pending text is shown until a Tracking ID is configured; Associate earning text is shown only after configuration
- Legal/non-official disclosure: present in footer, ABOUT, and JOURNAL
- Product images: unset unless a permitted provider URL is available

## Published Verification

- GitHub Pages status: built
- Public TOP: HTTP 200 confirmed
- Public canonical URL: confirmed
- Public OBJECTS filter: confirmed
- Public detail external links: confirmed
- Public mobile checks: TOP, OBJECTS, JOURNAL confirmed with no horizontal overflow

## Public-Ready Boundaries

The site is published. Amazon Associates account creation, login, Tracking ID issuance, paid services, account settings outside GitHub Pages, tax/payment information, and final legal review remain human-only or credential-bound work.

## TODO_HUMAN

- Complete Amazon Associates account/application steps at `https://affiliate.amazon.co.jp/`.
- Add the issued Amazon Tracking ID to `data/affiliate.json` or `AMAZON_ASSOCIATE_TAG`, rebuild, verify, and redeploy.
- Replace Amazon search URLs with approved Associate Special Links where available.
- Confirm each product title, ASIN/JAN/ISBN, and official/licensed status before publication.
- Add only permitted product image URLs, such as PA-API or authorized shop/ASP images.
- Review the final browser-rendered pages before upload.
