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
- Amazon Associates account/application and Tracking ID are not completed.
- Tracking ID configuration script exists, but must only be run after a human obtains the official ID.

## TODO_HUMAN

- Conduct final legal review before publication.
- Confirm affiliate program wording against the active account requirements.
- Complete Amazon Associates application/login steps and keep the issued Tracking ID private except for the public Associate tag itself.
- After Tracking ID configuration, confirm the public Amazon Associate earning disclosure and `tag=<tracking-id>` links on the live site.
- Confirm all image sources and usage permissions.
- Confirm public pages cannot be mistaken for an official FromSoftware or rights-holder site.
