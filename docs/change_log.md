# Change Log

## 2026-06-14

- Published the site through the custom domain at `https://from-item.idea-base.net/`.
- Replaced the Amazon Associates application URL target from the temporary GitHub Pages URL to the final custom domain.
- Added `CNAME` to keep the GitHub Pages custom domain bound to `from-item.idea-base.net`.
- Created the public GitHub repository `https://github.com/ailabgpt0125/from_article`.
- Enabled GitHub Pages from the `main` branch root.
- Verified the live TOP, OBJECTS, object detail, JOURNAL, and mobile layouts.
- Aligned generated public navigation with the fixed main navigation: ABOUT, WORLDS, OBJECTS, JOURNAL.
- Restored the fixed Hero lead from `AGENTS.md`.
- Aligned world display names with the required archive room names.
- Aligned Object Type wording for RECORDS and MARKS.
- Added publishable entrance records for SEKIRO and Demon's Souls using quiet search-link exits.
- Updated `data/site.json` `lastModified` and added a public URL TODO note.
- Added `scripts/verify.js` for pre-publish checks covering required pages, metadata, internal links, affiliate link attributes, prohibited public copy, and home section order.
- Added public-readiness documentation:
  - `docs/project_status.md`
  - `docs/pre_publish_checklist.md`
  - `docs/affiliate_link_status.md`
  - `docs/legal_status.md`
  - `docs/change_log.md`
- Added `data/affiliate.json` as the Amazon Associates configuration point.
- Added conditional Amazon link handling: Amazon Japan links become tagged Special Links only when an Associate Tracking ID is configured.
- Changed Amazon disclosure behavior so the site does not claim Associate earnings while no Tracking ID is set.
- Added `docs/amazon_associates_application.md` with the human-only Amazon Associates application handoff text.
- Extended `scripts/verify.js` to catch mismatched Amazon disclosure and missing configured Amazon tags.
- Deployed the Amazon pending-disclosure update to GitHub Pages.
- Consulted the ChatGPT project in-browser and saved the Amazon affiliate review in `docs/chappy_amazon_affiliate_consultation.md`.
- Added three quiet JOURNAL fragments to strengthen the public archive substance without adding sales copy.
- Updated the Amazon Associates application description with the reviewed concise and long versions.
- Added `scripts/configure-amazon-associate.js` so a human-issued Tracking ID can be applied consistently before rebuild and verification.
- Completed Amazon Associates signup and configured the issued Tracking ID `fromitem-22`.
- Rebuilt generated pages so Amazon links include `tag=fromitem-22` and the Amazon Associate earning disclosure is visible.

## Notes

- No product images were added because rights-safe image URLs have not been confirmed.
- No upload, purchase, account action, or external submission was performed.
