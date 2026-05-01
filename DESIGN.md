# DESIGN.md

## 目的

このファイルは、`SEED A HOSTILE EARTH` の見た目・空気感・トーン&マナーを定義するためのデザイン基準です。

ここには、法務、SEO、アフィリエイト、運用ルール、エージェント制約などは含めません。  
それらは `AGENTS.md`、`NOTICE`、または別の運用ルール文書で管理します。

この `DESIGN.md` は、以下だけを扱います。

- ビジュアルトーン
- 配色
- タイポグラフィ
- 余白
- レイアウト
- カード表現
- リンク表現
- 文体の見た目
- 可読性の最低ライン
- 作品世界ごとの視覚的な扱い

---

## 1. デザインコンセプト

このサイトは、ECサイトではなく、静かな展示室・個人アーカイブ・ブランドサイトのように見せる。

目指す体験は、商品を素早く探すことではなく、世界の気配を眺めながら静かに辿ること。

デザイン上の中心思想は以下。

> もう戻れない世界の気配を、日常のそばに残す。

画面は、売り場ではなく、収蔵庫。  
カードは、商品棚ではなく、展示ラベル。  
リンクは、購入ボタンではなく、外部への静かな出口。

---

## 2. ビジュアルキーワード

### 英語キーワード

- minimal
- quiet
- editorial
- archive
- gallery
- object
- fragment
- relic
- afterglow
- ruin
- silence
- whitespace
- restrained
- curated

### 日本語キーワード

- 余白
- 静けさ
- 断片
- 残響
- 遺物
- 記章
- 収蔵
- 気配
- 滅び
- 巡礼
- 古い世界
- もう戻れない世界
- 日常の片隅
- 静かな熱

---

## 3. 配色

白〜薄いグレーを基調にする。

FromSoftware的な重さは、真っ黒な背景ではなく、余白、線、言葉、鈍い色で表現する。

### ベースカラー

| 役割 | 推奨値 |
|---|---|
| 背景 | `#f7f6f2` / `#f4f3ef` |
| 面 | `#ffffff` / `#f2f1ed` |
| メインテキスト | `#24221f` |
| 本文テキスト | `#4f4b45` |
| サブテキスト | `#77736b` |
| メタテキスト | `#8a867d` |
| 罫線 | `#dedbd2` |
| 淡い罫線 | `#e8e5dc` |

### アクセントカラー

| 役割 | 推奨値 |
|---|---|
| 乾いた赤 | `#8a3f35` |
| 古金 | `#9a7a3d` |
| 灰色 | `#8b8982` |
| 鈍銀 | `#b8b6ae` |
| 深い墨 | `#1f1e1b` |

### 避ける色

- 強い黒背景
- 派手な赤
- 強い金
- ネオンカラー
- ゲーミング風の青紫
- カラフルなバッジ
- セールラベル風の色

---

## 4. タイポグラフィ方針

### 全体方針

- 大きな英字見出し
- 小さめだが読める日本語本文
- 広めの行間
- 文字数は少なく
- 読ませるより、余韻を置く
- 装飾的な英字ラベルは小さくしてよいが、判読不能にはしない

### 英字見出し

英字見出しは、静かな古さ・記録感・展示感を持たせる。

推奨方向：

- serif
- high contrast
- editorial
- large scale
- generous spacing

例：

```text
SEED A HOSTILE EARTH
WORLDS
OBJECTS
JOURNAL
SELECTED RELICS
QUIET ARCHIVE
```

### 日本語本文

日本語本文は読みやすさを維持する。

- 行間は広め
- 1段落は短く
- 説明しすぎない
- コピーは1〜3行で止める
- 長文にしない

---

## 5. 最低可読性ライン

このサイトはデザイン優先の個人アーカイブであるが、文字が読めない・小さすぎる・操作しづらい状態は許容しない。

「静けさ」「余白」「展示室感」を優先しつつ、最低限の可読性を必ず確保する。

### 基本文字サイズ

本文の基準サイズは、PC・モバイルともに **16px以上** を原則とする。

CSS目安：

    body {
      font-size: 16px;
      line-height: 1.85;
    }

禁止：

- `body` を `15px` 未満にしない
- 日本語本文を `14px` 以下にしない
- 雰囲気を理由に本文全体を小さくしない

---

## 6. 本文・リード文のサイズ

通常本文、説明文、リード文は、以下を最低ラインとする。

| 要素 | 最低サイズ | 推奨サイズ | 備考 |
|---|---:|---:|---|
| 通常本文 | 16px | 16px〜17px | 日本語の可読性を優先 |
| リード文 | 16px | 16px〜18px | Hero下やConceptに使用 |
| 商品説明文 | 15.5px | 16px | 小さすぎないようにする |
| Journal本文 | 16px | 16px〜18px | 長文は特に読みやすさ優先 |
| ABOUT本文 | 16px | 16px〜18px | 思想文は読みやすくする |

CSS目安：

    .lead,
    .concept-text,
    .statement p,
    .journal-body,
    .about-body {
      font-size: clamp(1rem, 1.25vw, 1.08rem);
      line-height: 1.9;
    }

    .object-description,
    .world-card p,
    .type-card p {
      font-size: 1rem;
      line-height: 1.85;
    }

---

## 7. 見出しサイズ

見出しは大きく、余白を持って見せる。

| 要素 | 最低サイズ | 推奨サイズ |
|---|---:|---:|
| Hero h1 | 48px | 56px〜88px |
| Page h1 | 40px | 48px〜72px |
| Section h2 | 28px | 32px〜48px |
| Card h3 | 18px | 19px〜22px |

CSS目安：

    .hero h1 {
      font-size: clamp(3rem, 7vw, 5.5rem);
      line-height: 0.95;
    }

    .page-hero h1 {
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      line-height: 1;
    }

    .section-heading h2,
    .section h2 {
      font-size: clamp(1.9rem, 3.8vw, 3.2rem);
      line-height: 1.15;
    }

    h3,
    .world-card h3,
    .object-card h3,
    .type-card h3 {
      font-size: clamp(1.15rem, 1.7vw, 1.35rem);
      line-height: 1.35;
    }

---

## 8. 小さな英字・メタ情報

英字ラベル、eyebrow、カテゴリ名、日付、番号などは小さくしてよい。  
ただし、読めないほど小さくしてはいけない。

| 要素 | 最低サイズ | 推奨サイズ |
|---|---:|---:|
| eyebrow | 11.5px | 12px〜13px |
| object number | 11.5px | 12px〜13px |
| meta text | 11.5px | 12px〜13px |
| checked date | 11.5px | 12px |
| breadcrumb | 12px | 12px〜13px |

CSS目安：

    .eyebrow,
    .object-number,
    .object-world,
    .object-checked,
    .breadcrumb,
    .last-updated,
    .meta,
    .card-meta {
      font-size: 0.75rem;
      line-height: 1.5;
      letter-spacing: 0.12em;
    }

禁止：

- `0.7rem` 未満を多用しない
- 英字ラベルを装飾として読めないサイズにしない
- 日付やカテゴリ情報を判読困難にしない

---

## 9. ナビゲーションの見た目

ナビゲーションは小さくてもよいが、操作できるサイズを維持する。

| 要素 | 最低サイズ | 推奨サイズ |
|---|---:|---:|
| Header site name | 13px | 13px〜14px |
| Header nav | 13px | 13px〜14px |
| Footer nav | 13px | 13px〜14px |

CSS目安：

    .site-name {
      font-size: 0.82rem;
      letter-spacing: 0.16em;
    }

    .site-nav a,
    .footer-links a {
      font-size: 0.82rem;
      letter-spacing: 0.14em;
    }

    .site-nav a,
    .footer-links a,
    .text-link {
      padding: 0.25rem 0;
    }

---

## 10. レイアウト原則

### TOP

TOPは商品の入口ではなく、世界の入口。

推奨セクション順：

```text
1. Hero
2. Concept
3. Worlds
4. Object Types
5. Journal
6. Selected Relics
```

### セクションのリズム

- セクションごとに広い上下余白を取る
- 罫線は細く、淡く
- カード間の余白を広く
- 情報を詰め込みすぎない
- 一画面で全部説明しようとしない

---

## 11. カード表現

カードはECカードではなく、展示ラベルに近づける。

### 基本方針

- 薄い罫線
- 控えめなhover
- 大きすぎないCTA
- タグは小さく薄く
- 商品よりも世界観・分類・短い説明を優先

### Worldカード

Worldカードは「作品世界への扉」として扱う。

- 商品カードより先に表示する
- 商品カードより少し存在感を持たせる
- lead文は読める大きさにする
- hoverは控えめにする
- 黒背景や派手な演出にしない

### Objectカード

Objectカードは「収蔵品のラベル」として扱う。

- 商品画像やリンクを主役にしない
- タグは薄く小さく
- 外部リンクは控えめ
- 価格や在庫を前面に出さない
- 商品カード感を強めすぎない

---

## 12. リンク・外部リンク表現

外部販売先へのリンクは「出口」であり、主役ではない。

### 方針

- ボタンを大きくしない
- 強い背景色を使わない
- Amazon / Rakuten / Yahoo Shopping は控えめに表示
- 「今すぐ購入」は使わない
- 外部リンクはCTAではなく「静かな出口」として扱う

### サイズ最低ライン

| 要素 | 最低サイズ | 推奨サイズ |
|---|---:|---:|
| 外部リンク | 12.5px | 13px〜14px |
| filter button | 13px | 13px〜14px |
| text link | 13px | 13px〜15px |

CSS目安：

    .object-links a,
    .button-link,
    .filter-button,
    .text-link {
      font-size: 0.82rem;
      line-height: 1.4;
    }

---

## 13. タグ・バッジ

タグは控えめでよい。  
ただし、判読できるサイズを維持する。

| 要素 | 最低サイズ | 推奨サイズ |
|---|---:|---:|
| tag | 12px | 12.5px〜13px |
| category label | 12px | 12.5px〜13px |

CSS目安：

    .tag-list span,
    .category-label {
      font-size: 0.78rem;
      line-height: 1.4;
    }

禁止：

- カラフルなバッジにしない
- セールラベル風にしない
- 商品訴求を強める装飾にしない

---

## 14. 行間

このサイトは余白と静けさを重視するため、行間は広めに取る。

| 要素 | 最低line-height | 推奨line-height |
|---|---:|---:|
| 本文 | 1.7 | 1.8〜1.95 |
| リード文 | 1.7 | 1.85〜2.0 |
| 商品説明 | 1.6 | 1.75〜1.9 |
| 見出し | 1.0 | 1.05〜1.25 |
| メタ情報 | 1.4 | 1.5〜1.6 |

CSS目安：

    body {
      line-height: 1.85;
    }

    p,
    li {
      line-height: 1.85;
    }

    .lead,
    .statement p,
    .concept-text {
      line-height: 1.95;
    }

    h1,
    h2,
    h3 {
      line-height: 1.1;
    }

---

## 15. 文字色・コントラスト

薄い文字は使ってよいが、読みづらくしすぎない。

| 用途 | 推奨色 |
|---|---|
| メイン本文 | `#24221f` |
| 本文 | `#4f4b45` |
| サブ本文 | `#5f5b54` |
| メタ情報 | `#8a867d` |
| 罫線 | `#dedbd2` |
| 淡い罫線 | `#e8e5dc` |

禁止：

- 本文に薄すぎるグレーを使わない
- 長文を `#999` より薄くしない
- 小さい文字に薄すぎる色を使わない
- 可読性を犠牲にして雰囲気だけを優先しない

CSS目安：

    body {
      color: #24221f;
    }

    p,
    li {
      color: #4f4b45;
    }

    .eyebrow,
    .meta,
    .object-world,
    .object-checked {
      color: #8a867d;
    }

---

## 16. モバイル最低ライン

モバイルでは、PC以上に本文サイズを小さくしすぎない。

| 要素 | 最低サイズ |
|---|---:|
| body | 16px |
| 本文 | 16px |
| 商品説明 | 15.5px〜16px |
| nav | 13px |
| meta | 11.5px〜12px |
| h1 | 42px以上 |
| h2 | 28px以上 |
| h3 | 18px以上 |

CSS目安：

    @media (max-width: 640px) {
      body {
        font-size: 16px;
        line-height: 1.85;
      }

      .hero h1 {
        font-size: clamp(2.65rem, 13vw, 4rem);
      }

      .section h2,
      .section-heading h2 {
        font-size: clamp(1.8rem, 8vw, 2.6rem);
      }

      h3,
      .world-card h3,
      .object-card h3,
      .type-card h3 {
        font-size: 1.15rem;
      }

      .lead,
      .object-description,
      .world-card p,
      .type-card p {
        font-size: 1rem;
      }

      .eyebrow,
      .object-number,
      .object-world,
      .object-checked,
      .breadcrumb,
      .last-updated {
        font-size: 0.74rem;
      }

      .site-nav a,
      .footer-links a,
      .object-links a {
        font-size: 0.82rem;
      }
    }

---

## 17. 最低タップ領域

スマホで押せる要素は、文字だけでなく余白を含めて操作しやすくする。

| 要素 | 最低高さ |
|---|---:|
| nav link | 32px相当 |
| external link | 32px相当 |
| filter button | 36px相当 |
| card link | 44px相当 |

CSS目安：

    .site-nav a,
    .object-links a,
    .filter-button,
    .text-link {
      min-height: 32px;
      display: inline-flex;
      align-items: center;
    }

    .card-link,
    .world-card a,
    .type-card a {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }

---

## 18. 作品世界ごとの視覚トーン

作品は単なるカテゴリではなく、それぞれ異なる展示室として扱う。

| 作品 | 表示名 | 視覚トーン |
|---|---|---|
| ELDEN RING | THE LANDS BETWEEN | 褪せた黄金、祝福、王権、広い余白 |
| DARK SOULS | LINKED FIRE | 火、灰、甲冑、祈り、巡礼 |
| Bloodborne | PALE NIGHT | 血、月、悪夢、狩人、禁忌 |
| SEKIRO | ASHINA SILENCE | 刃、沈黙、主従、死生観 |
| ARMORED CORE | STEEL ECHOES | 鋼鉄、企業、通信、燃え残る星 |
| Demon’s Souls | FOGBOUND ORIGIN | 霧、古い王国、魂、原初の暗さ |

---

## 19. Object Typesの視覚トーン

商品カテゴリではなく、「かたち」として扱う。

| Key | Label | 日本語 | 視覚トーン |
|---|---|---|---|
| books | RECORDS | 記録・書物 | 紙、記録、古い余白 |
| figures | RELICS | 遺物・造形 | 静物、棚、影 |
| soundtracks | ECHOES | 残響 | 音、余韻、空白 |
| apparel | MARKS | 装い・記章 | 布、記章、控えめな主張 |
| games | ENTRANCE | 入口 | 門、開始地点、世界への入口 |

---

## 20. 文体の見た目

文章は売り込みではなく、展示文・収蔵文として見せる。

### 良い方向

```text
声高にすすめることはしない。
ただ、失われた世界の気配を、ひとつずつ収めていく。
```

```text
火、血、霧、黄金、鋼鉄。
かつて画面の奥にあった世界の残響を、
静かに収めていく。
```

```text
血と月と悪夢の都市を、紙の奥に静かに封じた記録。
```

```text
灰の惑星に降り立ち、名もなき傭兵として再び鋼鉄を組み上げるための入口。
```

### 避ける方向

- 「おすすめ」
- 「人気」
- 「ランキング」
- 「セール」
- 「最安値」
- 「今すぐ購入」
- 「絶対買うべき」
- 「神商品」
- 「最強」
- 「単なる商品ではありません」
- ネットスラング
- 過剰な厨二ワード連発
- 公式テキストの引用・模倣
- 作中アイテム説明文の丸写し

---

## 21. 監査チェックリスト

CSS変更後は以下を確認する。

- `body` が16px以上である
- 日本語本文が14px台になっていない
- 商品説明が読める
- Worldカードのleadが読める
- Object Typesの説明文が読める
- Amazon / Rakuten / Yahoo Shoppingリンクが小さすぎない
- モバイルで本文が16px以上ある
- 小さい英字ラベルが判読できる
- 余白と静けさが壊れていない
- 商品カードが目立ちすぎていない
- 黒背景・ネオン・ゲーミング感に寄っていない
- セール・ランキング・おすすめ風の見た目になっていない

---

## 22. デザイン判断基準

迷った場合は、以下の順で判断する。

1. 自分が眺めていたいか
2. 世界観が壊れていないか
3. 商用サイト感が出ていないか
4. 余白と静けさがあるか
5. FromSoftware的な緊張感や残響があるか
6. 商品が前に出すぎていないか
7. デザインとして美しいか
8. 作品ごとの展示室として成立しているか
9. 最低限の可読性があるか
10. 操作できるリンクサイズが確保されているか

**「小さくて読めない」は、静けさではなく欠陥として扱う。**
