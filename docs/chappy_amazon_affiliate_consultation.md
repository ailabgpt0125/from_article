# Chappy Amazon Affiliate Consultation

Date: 2026-06-14

ChatGPT Project URL:
https://chatgpt.com/g/g-p-69f1cec184a08191bc1d26562c8fa0d4-fu-ye-from/project

Consultation Conversation:
https://chatgpt.com/g/g-p-69f1cec184a08191bc1d26562c8fa0d4-fu-ye-from/c/6a2df8b1-89b8-83e8-98c0-ab882a479ff1

Published URL:
https://ailabgpt0125.github.io/from_article/

## Consultation Result

Chappy reviewed the current public site, Amazon disclosure logic, and application handoff state.

Overall judgement:

- GO for Amazon Associates application.
- No fatal pre-application issue was identified.
- Tracking ID must be reflected only after human application/login steps are complete.
- After Tracking ID is configured, the site must show the Amazon Associate earning disclosure and Amazon links must include `tag=<tracking-id>`.

## Key Findings

- The site has enough public structure for application: TOP, ABOUT, WORLDS, OBJECTS, JOURNAL, and detail routes exist.
- Non-official, rights, external-link, price/stock, and image-use notes are visible.
- Treating Amazon links as ordinary external links while no Tracking ID is configured is safer than showing an earning disclosure too early.
- The quiet archive tone matches the project direction and avoids ranking, sale, and purchase-pressure framing.
- Adding a few non-sales JOURNAL fragments may improve the site's public substance without turning it into an affiliate article site.

## Human Next Steps

1. Log in to Amazon Associates Japan.
2. Register `https://ailabgpt0125.github.io/from_article/` as the site URL.
3. Use the application description in `docs/amazon_associates_application.md`.
4. Complete account owner, address, phone, payee, tax, payment, CAPTCHA, OTP, SMS, and email verification steps manually.
5. Submit the application manually.
6. Copy the issued Tracking ID.
7. Run `node scripts/configure-amazon-associate.js <tracking-id>` or set `AMAZON_ASSOCIATE_TAG`.
8. Run `node scripts/build.js`.
9. Run `node scripts/verify.js`.
10. Confirm public Amazon links include `tag=<tracking-id>`.
11. Confirm the public footer/JOURNAL no longer show the pending Tracking ID text.

## Priority Notes

- P0: Do not publish Amazon affiliate links without the required Amazon Associate disclosure.
- P0: Do not claim Amazon Associate earnings before a real Tracking ID is configured.
- P0: Do not proceed through Amazon login, CAPTCHA, OTP, payment, tax, or final submission automatically.
- P1: Continue avoiding product-image uploads unless PA-API, SiteStripe, or another authorized provider URL permits it.
- P1: Keep official-misidentification risk low by preserving non-official wording.
- P2: Maintain one or more editorial JOURNAL fragments so the site reads as an archive rather than only a link directory.
