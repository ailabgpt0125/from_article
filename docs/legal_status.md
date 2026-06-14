# Legal Status

Date: 2026-06-14

Published URL: https://from-item.idea-base.net/

## Current Legal Coverage

The generated site currently includes:

- Non-official site disclosure in footer, ABOUT, and JOURNAL.
- Statement that FromSoftware and rights holders are not affiliated with this site.
- Rights attribution for works, product names, images, trademarks, and related materials.
- Affiliate disclosure for external links.
- Conditional Amazon Associate wording: pending text is shown until an official Tracking ID is configured; Associate earning text is shown only after configuration.
- Price, stock, sales terms, and product specification confirmation directed to external sellers.
- Product image policy that limits use to authorized provider URLs.
- Public footer legal/affiliate text confirmed locally and deployed to the custom domain.

## Protected Areas

Do not remove or weaken legal text in:

- `scripts/build.js` footer text
- `scripts/build.js` JOURNAL sections
- ABOUT page generation
- Object detail quiet exit text
- Product image usage notes in `data/products.json`

## Known Open Items

- Final custom domain `siteUrl` is set.
- Product image URLs are blank by design until image rights are confirmed.
- Several `official` reference URLs are blank until manually verified.
- Product identifiers such as ASIN, JAN, and ISBN are mostly blank.
- Amazon Associates account/application is complete and the Tracking ID is configured as `fromitem-22`.
- Tracking ID configuration script exists and was used after the official ID was obtained.

## TODO_HUMAN

- Conduct final legal review before publication.
- Confirm affiliate program wording against the active account requirements.
- Monitor Amazon Associates account-center prompts and keep account/payment/tax information human-controlled.
- After `oldking1986/from_article` is synced and Cloudflare redeploys, confirm the public Amazon Associate earning disclosure and `tag=fromitem-22` links on the live site.
- Confirm all image sources and usage permissions.
- Confirm public pages cannot be mistaken for an official FromSoftware or rights-holder site.
