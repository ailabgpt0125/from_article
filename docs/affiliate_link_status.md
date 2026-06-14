# Affiliate Link Status

Date: 2026-06-14

Published URL: https://ailabgpt0125.github.io/from_article/

## Policy

External links are quiet exits, not purchase prompts. The site may contain affiliate links, but they must remain visually restrained and use `rel="nofollow sponsored noopener"` where appropriate.

Amazon product images must not be saved, processed, re-uploaded, or replaced with screenshots. Use only permitted provider URLs, such as PA-API or authorized Associate/ASP image URLs.

## Current Structure

- Product links live in `data/products.json` under `outboundLinks`.
- Legacy search fields remain under `links` for compatibility.
- Enabled affiliate links currently point to search pages unless a product URL has been manually confirmed.
- Published products are expected to have at least one enabled external link.

## Current Status

- Amazon: structure present; search URLs present for published objects.
- Rakuten: structure present; search URLs present for published objects.
- Yahoo Shopping: structure present; search URLs present for published objects.
- Official/reference links: structure present; most values intentionally blank until confirmed.
- Product images: intentionally blank until rights-safe URLs are available.
- Public detail page link attributes: confirmed on the live site.

## TODO_HUMAN

- Replace search URLs with approved affiliate/product URLs where appropriate.
- Add Amazon Associate tracking only after confirming account and program rules.
- Confirm whether each external URL should remain a search page or become a specific product page.
- Add ASIN/JAN/ISBN fields where confirmed.
- Keep disabled links disabled until the URL and rights status are confirmed.
