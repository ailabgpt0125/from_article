# Affiliate Link Status

Date: 2026-06-14

Published URL: https://ailabgpt0125.github.io/from_article/

## Policy

External links are quiet exits, not purchase prompts. The site may contain affiliate links, but they must remain visually restrained and use `rel="nofollow sponsored noopener"` where appropriate.

Amazon product images must not be saved, processed, re-uploaded, or replaced with screenshots. Use only permitted provider URLs, such as PA-API or authorized Associate/ASP image URLs.

## Current Structure

- Product links live in `data/products.json` under `outboundLinks`.
- Legacy search fields remain under `links` for compatibility.
- Amazon Associate configuration lives in `data/affiliate.json`.
- `AMAZON_ASSOCIATE_TAG` can override `data/affiliate.json` for local or deployment builds.
- Enabled affiliate links currently point to search pages unless a product URL has been manually confirmed.
- Published products are expected to have at least one enabled external link.

## Current Status

- Amazon: structure present; search URLs present for published objects; Associate Tracking ID is not set yet.
- Amazon without Tracking ID: rendered as ordinary external links with `rel="nofollow noopener"`.
- Amazon with Tracking ID: build script appends `tag=<tracking-id>` to Amazon Japan URLs and renders `rel="nofollow sponsored noopener"`.
- ChatGPT project consultation: GO for Amazon Associates application, with Tracking ID and disclosure recheck required after human application.
- Rakuten: structure present; search URLs present for published objects.
- Yahoo Shopping: structure present; search URLs present for published objects.
- Official/reference links: structure present; most values intentionally blank until confirmed.
- Product images: intentionally blank until rights-safe URLs are available.
- Public detail page link attributes: confirmed on the live site.

## Official Amazon References

- Amazon Associates Japan entry point: https://affiliate.amazon.co.jp/
- Amazon Operating Agreement: https://affiliate.amazon.co.jp/help/operating/agreement/
- Amazon guidance on multiple websites and Tracking IDs: https://affiliate.amazon.co.jp/help/node/topic/GM3CX5D6DSLGVSJD

## TODO_HUMAN

- Register the published site URL in Amazon Associates: `https://ailabgpt0125.github.io/from_article/`.
- Add the issued Amazon Tracking ID to `data/affiliate.json` or `AMAZON_ASSOCIATE_TAG`.
- Replace search URLs with approved Amazon Special Links or product URLs where appropriate.
- Confirm whether each external URL should remain a search page or become a specific product page.
- Add ASIN/JAN/ISBN fields where confirmed.
- Keep disabled links disabled until the URL and rights status are confirmed.
