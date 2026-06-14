# Project Status

Date: 2026-06-14

Published URL: https://from-item.idea-base.net/
Local working repository: https://github.com/ailabgpt0125/from_article
Cloudflare Pages repository: https://github.com/oldking1986/from_article

## Summary

`SEED A HOSTILE EARTH` is a static, non-official, design-first archive site for quietly curating FromSoftware-related books, soundtracks, figures, apparel-like marks, and game entrances as fragments rather than commercial products.

The site is generated from `data/site.json`, `data/products.json`, `scripts/build.js`, `style.css`, and `script.js`. Generated HTML should not be edited directly unless the generator is also updated.

## Current State

- Local build source: `scripts/build.js`
- Product data source: `data/products.json`
- Published object count: 12
- Public deployment target: custom domain `https://from-item.idea-base.net/`
- GitHub Pages artifact: current, built from `main` branch root in `ailabgpt0125/from_article`
- Cloudflare Pages Git connection: connected to `oldking1986/from_article` on branch `main`
- Active custom-domain delivery: currently returns an older Cloudflare-hosted build from `oldking1986/from_article` and does not yet match the local/latest artifact
- Required worlds: present
- Required object routes: present
- Main public routes: TOP, ABOUT, WORLDS, OBJECTS, JOURNAL, object detail pages
- External link structure: present through `outboundLinks`
- Amazon Associate configuration: present through `data/affiliate.json`
- Amazon Associate Tracking ID: configured as `fromitem-22`
- Amazon disclosure behavior: Associate earning text is shown after Tracking ID configuration
- Legal/non-official disclosure: present in footer, ABOUT, and JOURNAL
- Product images: unset unless a permitted provider URL is available
- ChatGPT project consultation: completed in-browser for Amazon Associates readiness
- Consultation record: `docs/chappy_amazon_affiliate_consultation.md`

## Published Verification

- Custom domain status: HTTP 200 confirmed, but serving an older build
- Cloudflare Pages source: connected to `oldking1986/from_article`, latest observed Cloudflare deployment commit `ead1a44718cfed25d65827b50a42b4db3a91c18c`
- GitHub Pages status: built, latest artifact confirmed from commit `c26136d`; local latest commit is `dcce58b`
- GitHub Pages/local artifact: Amazon Associate disclosure and `tag=fromitem-22` links confirmed
- Public custom-domain TOP: stale title `FROM ITEM ARCHIVE` still visible
- Public custom-domain detail external links: stale Amazon links without `tag=fromitem-22`
- Public mobile checks: previously confirmed; should be rechecked after Cloudflare/DNS update

## Public-Ready Boundaries

The site is published. Amazon Associates account creation and initial Tracking ID configuration are complete. Paid services, account settings outside GitHub Pages, tax/payment information, and final legal review remain human-only or credential-bound work.

## TODO_HUMAN

- Confirm Amazon Associates account status and any remaining account-center prompts at `https://affiliate.amazon.co.jp/`.
- TODO_HUMAN: Push or otherwise sync the latest local/static artifact into `oldking1986/from_article`; Cloudflare is now connected to that repository.
- TODO_HUMAN: After Cloudflare/DNS update, confirm public detail pages include `tag=fromitem-22`.
- Replace Amazon search URLs with approved Associate Special Links where available.
- Confirm each product title, ASIN/JAN/ISBN, and official/licensed status before publication.
- Add only permitted product image URLs, such as PA-API or authorized shop/ASP images.
- Review the final browser-rendered pages before upload.
