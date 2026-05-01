const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const products = JSON.parse(fs.readFileSync(path.join(root, "data", "products.json"), "utf8"));
const site = JSON.parse(fs.readFileSync(path.join(root, "data", "site.json"), "utf8"));

const siteUrl = site.siteUrl.replace(/\/$/, "");
const siteName = "SEED A HOSTILE EARTH";
const publishedProducts = products
  .filter((product) => product.isPublished === true && !(product.tags || []).includes("仮データ"))
  .sort((a, b) => Number(a.priority || 999) - Number(b.priority || 999) || a.title.localeCompare(b.title, "ja"));

const worlds = [
  {
    name: "ELDEN RING",
    slug: "elden-ring",
    displayName: "ELDEN RING",
    title: "ELDEN RING | SEED A HOSTILE EARTH",
    lead: "砕けた黄金と祝福の残響を辿る。",
    statement: "黄金は砕け、祝福は遠い。それでも旅のあとに残るものがある。書物、音、造形のかたちで、狭間の地の気配を静かに収める。"
  },
  {
    name: "DARK SOULS",
    slug: "dark-souls",
    displayName: "DARK SOULS",
    title: "DARK SOULS | SEED A HOSTILE EARTH",
    lead: "火、灰、甲冑、祈り。滅びた巡礼の記録。",
    statement: "火の消えかけた世界に、なお残るものがある。甲冑、祈り、怪物、そして倒れた者の記憶を、日常の片隅に残す。"
  },
  {
    name: "Bloodborne",
    slug: "bloodborne",
    displayName: "Bloodborne",
    title: "Bloodborne | SEED A HOSTILE EARTH",
    lead: "血と月と悪夢の都市に残る、狩人の気配。",
    statement: "血の夜を越えた者だけが覚えている気配がある。それは音であり、紙に残された線であり、棚の上に留まる小さな影でもある。"
  },
  {
    name: "ARMORED CORE",
    slug: "armored-core",
    displayName: "ARMORED CORE",
    title: "ARMORED CORE | SEED A HOSTILE EARTH",
    lead: "鋼鉄、企業、通信、燃え残る星の残響。",
    statement: "灰の惑星、企業の火、通信のざらつき。鋼鉄を組み上げ、名もなき傭兵として進んだ記録を、冷たい余韻のまま収める。"
  },
  {
    name: "Demon's Souls",
    slug: "demons-souls",
    displayName: "Demon's Souls",
    title: "Demon's Souls | SEED A HOSTILE EARTH",
    lead: "霧の向こうに沈む古い王国の断片。",
    statement: "霧の向こうに沈む古い王国。その始まりの気配を忘れないために、まだ空に近い棚をひとつ残しておく。"
  },
  {
    name: "SEKIRO",
    slug: "sekiro",
    displayName: "SEKIRO",
    title: "SEKIRO | SEED A HOSTILE EARTH",
    lead: "刃、沈黙、主従。研ぎ澄まされた死生の記録。",
    statement: "刃と沈黙のあいだに残るものがある。まだ収蔵品は少ないが、忍びの記録を置くための静かな余白として、この部屋を残しておく。"
  }
];
const worldOrder = ["DARK SOULS", "Bloodborne", "ELDEN RING", "SEKIRO", "ARMORED CORE", "Demon's Souls"];
worlds.sort((a, b) => worldOrder.indexOf(a.name) - worldOrder.indexOf(b.name));

const objectTypes = [
  { key: "entrance", slug: "entrance", label: "ENTRANCE", jp: "入口", lead: "世界へ踏み入るための門。", categories: ["games"], isPrimary: true },
  { key: "records", slug: "records", label: "RECORDS", jp: "記録・資料", lead: "紙と余白に残された、古い世界の輪郭。", categories: ["books"], isPrimary: true },
  { key: "echoes", slug: "echoes", label: "ECHOES", jp: "残響", lead: "失われた場所へ戻るための音。", categories: ["soundtracks"], isPrimary: true },
  { key: "relics", slug: "relics", label: "RELICS", jp: "遺物・造形", lead: "棚の上に留まる、小さな気配。", categories: ["figures", "plastic-models"], isPrimary: true },
  { key: "insignia", slug: "insignia", label: "INSIGNIA", jp: "記章・装い", lead: "日常にひそませる、小さなしるし。", categories: ["apparel", "goods"], isPrimary: true }
];

const footerText = "当サイトは非公式の個人アーカイブです。各作品名・商品名・商標・画像等の権利は各権利者に帰属します。外部リンク・アフィリエイトに関する詳細はNOTICEをご確認ください。";
const affiliateText = "当サイトでは、Amazonアソシエイト、楽天アフィリエイト、その他アフィリエイトプログラムを利用する場合があります。リンク先で商品を購入された場合、当サイトが紹介料を受け取ることがあります。Amazon、Amazon.co.jpおよびAmazon.co.jpロゴは、Amazon.com, Inc. またはその関連会社の商標です。";
const amazonImagePolicy = "当サイトに掲載するAmazonの商品画像・商品名・商品リンク等は、Amazon Product Advertising API またはAmazonアソシエイトが提供する情報をもとに表示します。当サイトでは、Amazon商品ページ上の画像を保存・再アップロード・加工して掲載することはありません。Amazon以外の商品画像を掲載する場合も、楽天API、各ASP、公式販売元など、提供元が利用を許可している範囲の画像URLのみを使用します。";

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageUrl(route) {
  return `${siteUrl}${route}`;
}

function relPath(depth, target) {
  return `${"../".repeat(depth)}${target}`;
}

function writeFile(filePath, content) {
  const absolute = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, content, "utf8");
}

function head({ title, description, ogDescription, route, depth }) {
  const canonical = pageUrl(route);
  const ogDesc = ogDescription || description;
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(ogDesc)}">
  <meta property="og:url" content="${canonical}">
  <link rel="stylesheet" href="${relPath(depth, "style.css")}">
</head>`;
}

function header(depth) {
  return `<header class="site-header">
    <div class="header-inner">
      <a class="site-name" href="${relPath(depth, "index.html")}">${siteName}</a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="${relPath(depth, "index.html")}">TOP</a>
        <a href="${relPath(depth, "about/")}">ABOUT</a>
        <a href="${relPath(depth, "worlds/")}">WORLDS</a>
        <a href="${relPath(depth, "objects/")}">OBJECTS</a>
        <a href="${relPath(depth, "guide/buying-notes/")}">NOTICE</a>
      </nav>
    </div>
  </header>`;
}

function footer(depth) {
  return `<footer class="site-footer">
    <div class="footer-inner">
      <p>${footerText}</p>
      <p class="last-updated">LAST UPDATED ${escapeHtml(site.lastModified)}</p>
      <div class="footer-links">
        <a href="${relPath(depth, "index.html")}">TOP</a>
        <a href="${relPath(depth, "about/")}">ABOUT</a>
        <a href="${relPath(depth, "worlds/")}">WORLDS</a>
        <a href="${relPath(depth, "objects/")}">OBJECTS</a>
        <a href="${relPath(depth, "guide/buying-notes/")}">NOTICE</a>
      </div>
    </div>
  </footer>`;
}

function basePage({ title, description, ogDescription, route, depth, bodyAttrs, content }) {
  return `${head({ title, description, ogDescription, route, depth })}
<body ${bodyAttrs || ""}>
  ${header(depth)}
  <main>
${content}
  </main>
  ${footer(depth)}
  <script src="${relPath(depth, "script.js")}"></script>
</body>
</html>
`;
}

function typeLabel(category) {
  const type = objectTypes.find((item) => item.key === category || (item.categories || []).includes(category));
  return type ? `${type.label} / ${type.jp}` : category;
}

function worldFor(product) {
  return (product.series || []).join(" / ");
}

function productsForWorld(worldName) {
  return publishedProducts.filter((product) => (product.series || []).includes(worldName));
}

function productsForType(typeKey, items = publishedProducts) {
  const type = objectTypes.find((item) => item.key === typeKey || item.slug === typeKey || (item.categories || []).includes(typeKey));
  const categories = type ? type.categories : [typeKey];
  return items.filter((product) => categories.includes(product.category));
}

function externalLinks(product) {
  const labels = {
    amazonProduct: "Amazon",
    amazonSearch: "Amazon",
    rakutenSearch: "Rakuten",
    yahooSearch: "Yahoo Shopping",
    official: "External Link"
  };
  const links = Object.entries(labels)
    .map(([key, label]) => {
      const href = product.links && product.links[key];
      if (!href) return "";
      return `<a href="${escapeHtml(href)}" target="_blank" rel="nofollow sponsored noopener">${label}</a>`;
    })
    .filter(Boolean)
    .join("");
  if (!links) return "";
  return `<div class="object-links" aria-label="External links">${links}</div>`;
}

function objectCards(items, options = {}) {
  const limit = options.limit || items.length;
  const subset = items.slice(0, limit);
  if (!subset.length) {
    return `<p class="notice">この展示室には、まだ公開できる収蔵品がありません。</p>`;
  }
  return subset.map((product, index) => {
    const tags = (product.tags || []).slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const type = objectTypes.find((item) => (item.categories || []).includes(product.category));
    const mediaLabel = type ? type.label : "OBJECT";
    return `<article class="object-card product-card" data-product-card data-category="${escapeHtml(product.category)}" data-series="${escapeHtml(worldFor(product))}">
      <div class="object-card__media" aria-hidden="true">
        <span>${escapeHtml(mediaLabel)}</span>
      </div>
      <div class="object-card__body">
        <p class="object-world">${escapeHtml(worldFor(product))} / ${escapeHtml(typeLabel(product.category))}</p>
        <h3>${escapeHtml(product.title)}</h3>
        <p class="object-description">${escapeHtml(product.description)}</p>
        <div class="tag-list">${tags}</div>
        <p class="object-note">${escapeHtml(product.note || "価格・在庫・販売状況は、外部販売先で確認してください。")}</p>
        <p class="object-checked">Checked ${escapeHtml(product.lastChecked)}</p>
        ${externalLinks(product)}
      </div>
    </article>`;
  }).join("\n");
}

function worldCard(world, depth, index) {
  const count = productsForWorld(world.name).length;
  return `<a class="quiet-card world-card" href="${relPath(depth, `worlds/${world.slug}/`)}">
    <strong>${escapeHtml(world.displayName)}</strong>
    <small>収蔵品 ${count}</small>
    <p>${escapeHtml(world.lead)}</p>
    <em>ENTER THE WORLD</em>
  </a>`;
}

function typeCard(type, depth) {
  const count = productsForType(type.key).length;
  return `<a class="quiet-card type-card" href="${relPath(depth, `category/${type.slug}/`)}">
    <strong>${escapeHtml(type.jp)}</strong>
    <small>${escapeHtml(type.label)} / 収蔵品 ${count}</small>
    <p>${escapeHtml(type.lead)}</p>
  </a>`;
}

function renderHome() {
  const content = `    <section class="hero hero--home">
      <div class="container">
        <p class="eyebrow">PRIVATE ARCHIVE</p>
        <h1>${siteName}</h1>
        <p class="hero-copy">もう戻れない世界の気配を、日常のそばに残す。</p>
        <p class="lead">火、血、霧、黄金、鋼鉄。<br>かつて日常と共にあった世界の残響、そして戦いの日々。</p>
      </div>
    </section>
    <section class="section section--concept">
      <div class="container statement">
        <p>失われた世界の記憶を、ひとつずつ収めていく。<br>あの世界を、つなぎ止めるために。</p>
      </div>
    </section>
    <section class="section section--worlds">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">WORLDS</p>
          <h2>世界を選ぶ</h2>
        </div>
        <div class="quiet-grid quiet-grid--worlds">${worlds.map((world, index) => worldCard(world, 0, index)).join("")}</div>
      </div>
    </section>
    <section class="section section--selected">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">SELECTED RELICS</p>
          <h2>最後に、いくつかの断片を。</h2>
        </div>
        <div class="object-grid" data-product-list="featured">${objectCards(publishedProducts, { limit: 4 })}</div>
      </div>
    </section>`;
  writeFile("index.html", basePage({
    title: siteName,
    description: "火、血、霧、黄金、鋼鉄。かつて画面の奥にあった気配を、静かに収めていく個人編集アーカイブ。",
    ogDescription: "滅びた世界の気配を、日常のそばに置く。",
    route: "/",
    depth: 0,
    bodyAttrs: 'data-page-type="home" data-products-path="data/products.json"',
    content
  }));
}

function renderAbout() {
  const content = `    <section class="hero hero--text">
      <div class="container narrow">
        <p class="eyebrow">ABOUT</p>
        <h1>SEED A HOSTILE EARTH</h1>
        <p class="lead">敵意ある世界に、種をまく。</p>
      </div>
    </section>
    <section class="section">
      <div class="container narrow prose">
        <p>明るい世界を、素直には信じられない。<br>日々は荒れ、疲れ、何かを続ける意味すら、少しずつ薄れていく。</p>
        <p>それでも、かつて歩んだ世界の記憶は、<br>自分の奥に、静かに残り続けている。</p>
        <p>火、血、霧、黄金、鋼鉄。<br>迷い、倒れ、何度も戻り、それでも進んだ場所。</p>
        <p>あの世界は、もう現実にはない。<br>けれど、完全に失われたわけでもない。</p>
        <p>何でもない日常の中で、<br>ふと、その輪郭が戻ってくることがある。</p>
        <p>それは、大きな救いではない。<br>世界を変えるものでもない。</p>
        <p>けれど、荒れた日々の中で、<br>まだ美しいと思えるものがあること。<br>まだ忘れたくない世界があること。<br>まだ手放したくない記憶があること。</p>
        <p>それは、小さな希望に似ている。</p>
        <p>SEED A HOSTILE EARTH.</p>
        <p>かつて歩んだ世界の記憶を、<br>ひとつずつ収めていく。</p>
        <p>あの世界を、つなぎ止めるために。<br>そして、敵意ある日常の中に、<br>それでも小さな種をまくために。</p>
        <hr>
        <p>本サイトは、株式会社フロム・ソフトウェア、FromSoftwareおよび各権利元とは関係のない非公式サイトです。掲載している作品名、商品名、画像、商標等の権利は、それぞれの権利者または販売元に帰属します。価格・在庫・販売状況は、必ず外部販売先で確認してください。</p>
          <p>${amazonImagePolicy}</p>
      </div>
    </section>`;
  writeFile("about/index.html", basePage({
    title: `ABOUT | ${siteName}`,
    description: "SEED A HOSTILE EARTHの思想、非公式表記、権利表記、アフィリエイト利用方針について。",
    route: "/about/",
    depth: 1,
    bodyAttrs: 'data-page-type="static"',
    content
  }));
}

function renderWorldsIndex() {
  const content = `    <section class="hero hero--text">
      <div class="container">
        <p class="eyebrow">WORLDS</p>
        <h1>ROOMS OF<br>OLD WORLDS</h1>
        <p class="lead">火、霧、血、黄金、鋼鉄。世界ごとに異なる残響を、静かな部屋として分けました。</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading"><p class="eyebrow">WORLDS</p><h2>世界から辿る</h2></div>
        <div class="quiet-grid quiet-grid--worlds">${worlds.map((world, index) => worldCard(world, 1, index)).join("")}</div>
      </div>
    </section>`;
  writeFile("worlds/index.html", basePage({
    title: `WORLDS | ${siteName}`,
    description: "FromSoftware作品ごとの展示室。ELDEN RING、DARK SOULS、Bloodborne、SEKIRO、ARMORED CORE、Demon's Soulsの世界を辿る入口。",
    route: "/worlds/",
    depth: 1,
    bodyAttrs: 'data-page-type="worlds"',
    content
  }));
}

function renderWorldPages() {
  const primaryTypes = objectTypes.filter((type) => type.isPrimary);
  worlds.forEach((world) => {
    const items = productsForWorld(world.name);
    const otherWorlds = worlds
      .filter((item) => item.name !== world.name)
      .map((item) => `<a class="text-link" href="../${item.slug}/">${escapeHtml(item.displayName)}</a>`)
      .join("");
    const typeNav = primaryTypes.map((type) => {
      const count = productsForType(type.key, items).length;
      return `<a class="quiet-card type-card" href="#${escapeHtml(type.slug)}">
        <strong>${escapeHtml(type.label)}</strong>
        <small>${escapeHtml(type.jp)} / 収蔵品 ${count}</small>
        <p>${escapeHtml(type.lead)}</p>
      </a>`;
    }).join("");
    const typeSections = primaryTypes.map((type) => {
      const typeItems = productsForType(type.key, items);
      return `<section class="object-type-section" id="${escapeHtml(type.slug)}">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">${escapeHtml(type.label)}</p>
            <h3>${escapeHtml(type.jp)}</h3>
          </div>
          <div class="object-grid" data-product-list="${escapeHtml(world.slug)}-${escapeHtml(type.slug)}">${objectCards(typeItems)}</div>
        </section>`;
    }).join("");
    const content = `    <section class="hero hero--text">
      <div class="container">
        <p class="breadcrumb"><a href="../../worlds/">WORLDS</a> / ${escapeHtml(world.name)}</p>
        <p class="eyebrow">WORLD</p>
        <h1>${escapeHtml(world.displayName)}</h1>
        <p class="lead">${escapeHtml(world.lead)}</p>
      </div>
    </section>
    <section class="section section--statement">
      <div class="container statement statement--left">
        <p>${escapeHtml(world.statement)}</p>
      </div>
    </section>
    <section class="section section--types">
      <div class="container">
        <div class="section-heading"><p class="eyebrow">OBJECT TYPES</p><h2>この世界のかたち</h2></div>
        <div class="quiet-grid quiet-grid--types">${typeNav}</div>
      </div>
    </section>
    <section class="section section--selected">
      <div class="container">
        <div class="section-heading"><p class="eyebrow">OBJECTS FROM THIS WORLD</p><h2>収められた断片</h2></div>
        <div class="world-type-stack">${typeSections}</div>
      </div>
    </section>
    <section class="section">
      <div class="container other-links"><span>OTHER WORLDS</span>${otherWorlds}</div>
    </section>`;
    writeFile(`worlds/${world.slug}/index.html`, basePage({
      title: world.title,
      description: `${world.name}の展示室。書物、音、造形、記章など、作品世界の気配を残す収蔵品を静かに辿るページ。`,
      route: `/worlds/${world.slug}/`,
      depth: 2,
      bodyAttrs: `data-page-type="world" data-series="${escapeHtml(world.name)}" data-products-path="../../data/products.json"`,
      content
    }));
    writeFile(`series/${world.slug}/index.html`, basePage({
      title: world.title,
      description: `${world.name}の展示室はWORLDS配下へ移動しました。`,
      route: `/worlds/${world.slug}/`,
      depth: 2,
      bodyAttrs: 'data-page-type="redirect"',
      content: `    <section class="hero hero--text">
      <div class="container narrow">
        <p class="eyebrow">WORLD MOVED</p>
        <h1>${escapeHtml(world.displayName)}</h1>
        <p class="lead">この展示室はWORLDS配下へ移動しました。</p>
        <a class="text-link" href="../../worlds/${world.slug}/">ENTER THE WORLD</a>
      </div>
    </section>`
    }));
  });
}

function renderObjectsIndex() {
  const primaryTypes = objectTypes.filter((type) => type.isPrimary);
  const typeAnchorCards = primaryTypes.map((type) => {
    const count = productsForType(type.key).length;
    return `<a class="quiet-card type-card" href="#${escapeHtml(type.slug)}">
    <strong>${escapeHtml(type.label)}</strong>
    <small>${escapeHtml(type.jp)} / 収蔵品 ${count}</small>
    <p>${escapeHtml(type.lead)}</p>
  </a>`;
  }).join("");
  const typeSections = primaryTypes.map((type) => {
    const items = productsForType(type.key);
    return `<section class="object-type-section" id="${escapeHtml(type.slug)}">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">${escapeHtml(type.label)}</p>
            <h3>${escapeHtml(type.jp)}</h3>
          </div>
          <div class="object-grid" data-product-list="objects-${escapeHtml(type.slug)}">${objectCards(items)}</div>
        </section>`;
  }).join("");
  const content = `    <section class="hero hero--text">
      <div class="container">
        <p class="eyebrow">OBJECTS</p>
        <h1>ARCHIVE OF<br>RELICS</h1>
        <p class="lead">入口、記録、残響、遺物、記章。作品世界を越えて、断片のかたちから収蔵品を辿るための一覧です。</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading"><p class="eyebrow">OBJECT TYPES</p><h2>かたちから辿る</h2></div>
        <div class="quiet-grid quiet-grid--types">${typeAnchorCards}</div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading"><p class="eyebrow">OBJECTS</p><h2>分類ごとの収蔵品</h2></div>
        <div class="world-type-stack">${typeSections}</div>
      </div>
    </section>`;
  writeFile("objects/index.html", basePage({
    title: `OBJECTS | ${siteName}`,
    description: "FromSoftware作品にまつわる書籍、造形物、音楽、周辺アイテムを収蔵品のように眺める一覧ページ。",
    route: "/objects/",
    depth: 1,
    bodyAttrs: 'data-page-type="objects" data-products-path="../data/products.json"',
    content
  }));
}

function renderCategoryPages() {
  objectTypes.forEach((type) => {
    const items = productsForType(type.key);
    const content = `    <section class="hero hero--text">
      <div class="container">
        <p class="breadcrumb"><a href="../../objects/">OBJECTS</a> / ${escapeHtml(type.jp)}</p>
        <p class="eyebrow">OBJECT TYPE</p>
        <h1>${escapeHtml(type.jp)}</h1>        <p class="lead">${escapeHtml(type.lead)}</p>
      </div>
    </section>
    <section class="section">
      <div class="container"><div class="object-grid" data-product-list="category">${objectCards(items)}</div></div>
    </section>`;
    writeFile(`category/${type.slug}/index.html`, basePage({
      title: `${type.jp} | ${siteName}`,
      description: `${type.jp}を、収蔵品のように静かに眺める非公式アーカイブページ。`,
      route: `/category/${type.slug}/`,
      depth: 2,
      bodyAttrs: `data-page-type="category" data-category="${type.key}" data-products-path="../../data/products.json"`,
      content
    }));
  });
}

function renderGuide() {
  const content = `    <section class="hero hero--text"><div class="container narrow"><p class="eyebrow">NOTICE</p><h1>購入時の注意</h1><p class="lead">外部リンク、販売状況、権利表記について。ここでは正確性を優先して記録します。</p></div></section>
    <section class="section"><div class="container narrow prose"><p>当サイトは非公式情報サイトであり、公式サイトや販売サイトではありません。</p><p>価格・在庫・販売状況は、外部販売先で必ず確認してください。プレミア価格、非公式品、模倣品、権利関係が不明な商品には注意してください。予約商品や再販商品は、販売元・製造元の情報を確認してください。</p><p>商品画像・商標・作品名の権利は各権利者に帰属します。当サイトは正規流通品・販売元確認可能な商品の紹介を基本方針とします。</p><p>${amazonImagePolicy}</p><p>${footerText}</p><p>${affiliateText}</p></div></section>`;
  writeFile("guide/buying-notes/index.html", basePage({
    title: `NOTICE | ${siteName}`,
    description: "FromSoftware作品関連アイテムを見る際の注意事項。非公式表記、権利表記、外部リンク、価格・在庫確認について。",
    route: "/guide/buying-notes/",
    depth: 2,
    bodyAttrs: 'data-page-type="static"',
    content
  }));
}

function renderSitemapAndRobots() {
  const routes = [
    "/",
    "/about/",
    "/worlds/",
    "/objects/",
    ...worlds.map((world) => `/worlds/${world.slug}/`),
    ...objectTypes.map((type) => `/category/${type.slug}/`),
    "/guide/buying-notes/"
  ];
  writeFile("robots.txt", `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`);
  writeFile("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${pageUrl(route)}</loc><lastmod>${site.lastModified}</lastmod></url>`).join("\n")}
</urlset>
`);
}

renderHome();
renderAbout();
renderWorldsIndex();
renderWorldPages();
renderObjectsIndex();
renderCategoryPages();
renderGuide();
renderSitemapAndRobots();

console.log(`Built ${publishedProducts.length} curated objects.`);










