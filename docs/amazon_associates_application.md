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

`FromSoftware作品に関連する書籍、音楽、造形物、ゲームソフト等を、個人の視点で整理する非公式キュレーションサイトです。ランキングやセール訴求ではなく、作品世界の余韻を補完する周辺アイテムを「記録」「断片」「収蔵品」として紹介しています。Amazon.co.jpへのリンクは取り扱い確認用に設置し、価格・在庫・販売条件はリンク先で確認いただく方針です。本サイトはFromSoftware公式サイトではなく、各権利は権利者に帰属する旨を明記しています。`

Longer description if the form allows:

`FromSoftware作品にまつわる書籍、音楽、造形物、ゲームソフト等を、個人の視点で静かに収集・編集する非公式キュレーションサイトです。本サイトは、商品をランキング形式で紹介したり、セールや最安値を強調したりするサイトではありません。作品世界の余韻や美意識を補完する周辺アイテムを、「記録」「断片」「収蔵品」として整理し、作品ごとの世界観やカテゴリごとに閲覧できるようにしています。Amazon.co.jpへのリンクは、各商品の取り扱い状況を確認するための外部リンクとして設置します。価格、在庫、販売条件はAmazon.co.jp上で確認していただく方針です。本サイトはFromSoftware公式サイトではなく、株式会社フロム・ソフトウェアおよび各権利元とは関係のない個人運営の非公式アーカイブです。作品名、商品名、画像、商標等の権利は各権利者に帰属する旨をサイト内に明記しています。`

Topics:

`ゲーム関連書籍、サウンドトラック、造形物、ゲームソフト、個人アーカイブ`

Audience:

`FromSoftware作品の余韻や関連資料を静かに辿りたい読者`

Traffic/source plan:

`公開サイト、検索流入、個人SNSまたは制作ログからの自然流入を想定。広告出稿や誤認を誘う誘導は行いません。`

## Human-Only Steps

- TODO_HUMAN: Amazon account login.
- TODO_HUMAN: Register `https://ailabgpt0125.github.io/from_article/` as the site URL.
- TODO_HUMAN: Account owner, address, phone, payee, tax, and payment information entry.
- TODO_HUMAN: CAPTCHA, OTP, SMS, email verification.
- TODO_HUMAN: Final application submission.
- TODO_HUMAN: Copy the issued Tracking ID into `data/affiliate.json`.

## After Tracking ID Is Available

1. Run `node scripts/configure-amazon-associate.js <tracking-id>`.
2. Run `node scripts/build.js`.
3. Run `node scripts/verify.js`.
4. Confirm Amazon links include `tag=<tracking-id>`.
5. Confirm the pending Tracking ID text is gone and the Amazon Associate earning disclosure is visible.
6. Commit, push, and wait for GitHub Pages to rebuild.
7. Check one or two public detail-page Amazon links in the browser.

Dry-run command before writing:

`node scripts/configure-amazon-associate.js <tracking-id> --dry-run`
