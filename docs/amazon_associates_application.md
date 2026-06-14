# Amazon Associates Application

Date: 2026-06-14

Published URL: https://ailabgpt0125.github.io/from_article/
Application URL: https://affiliate.amazon.co.jp/

## Current State

- The site is already public on GitHub Pages.
- Amazon disclosure logic is implemented.
- Amazon links are rendered as ordinary external links while no Tracking ID is set.
- When `data/affiliate.json` `amazon.associateTag` or `AMAZON_ASSOCIATE_TAG` is set, Amazon URLs are automatically rendered with `tag=<tracking-id>`.
- Product images remain blank unless a rights-safe PA-API, SiteStripe, or authorized provider URL is available.

## Official Requirements Checked

- Amazon Associates links must use the Special Link/tagged format provided by Amazon.
- The site must clearly identify Associate participation when affiliate links are used.
- Amazon link creation can be done through Associates Central/SiteStripe after login.
- Product images, product data, and prices should not be copied or self-hosted unless allowed by Amazon tools/API terms.

## Suggested Application Copy

Site name:

`SEED A HOSTILE EARTH`

Site URL:

`https://ailabgpt0125.github.io/from_article/`

Site description:

`FromSoftware作品にまつわる書物、音、造形、入口を、商品ではなく世界観の断片として静かに収める非公式の個人編集アーカイブです。購入を急がせるサイトではなく、外部販売先へのリンクは取り扱い確認のための静かな出口として設置しています。`

Topics:

`ゲーム関連書籍、サウンドトラック、造形物、ゲームソフト、個人アーカイブ`

Audience:

`FromSoftware作品の余韻や関連資料を静かに辿りたい読者`

Traffic/source plan:

`公開サイト、検索流入、個人SNSまたは制作ログからの自然流入を想定。広告出稿や誤認を誘う誘導は行いません。`

## Human-Only Steps

- TODO_HUMAN: Amazon account login.
- TODO_HUMAN: Account owner, address, phone, payee, tax, and payment information entry.
- TODO_HUMAN: CAPTCHA, OTP, SMS, email verification.
- TODO_HUMAN: Final application submission.
- TODO_HUMAN: Copy the issued Tracking ID into `data/affiliate.json`.

## After Tracking ID Is Available

1. Set `data/affiliate.json` `amazon.associateTag`.
2. Run `node scripts/build.js`.
3. Run `node scripts/verify.js`.
4. Confirm Amazon links include `tag=<tracking-id>`.
5. Commit, push, and wait for GitHub Pages to rebuild.
