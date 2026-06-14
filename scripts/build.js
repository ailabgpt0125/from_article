const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const products = JSON.parse(fs.readFileSync(path.join(root, "data", "products.json"), "utf8"));
const site = JSON.parse(fs.readFileSync(path.join(root, "data", "site.json"), "utf8"));

const rawSiteUrl = String(site.siteUrl || "").replace(/\/$/, "");
const siteUrl = rawSiteUrl && !/example\.com/i.test(rawSiteUrl) ? rawSiteUrl : "";
const siteName = "SEED A HOSTILE EARTH";
const siteSubtitle = "FromSoftware作品の断片を収める非公式アーカイブ";
const publishedProducts = products
  .filter((product) => product.isPublished === true && !(product.tags || []).includes("仮データ"))
  .sort((a, b) => Number(a.priority || 999) - Number(b.priority || 999) || a.title.localeCompare(b.title, "ja"));

const worlds = [
  {
    name: "ELDEN RING",
    slug: "elden-ring",
    displayName: "THE LANDS BETWEEN",
    title: "ELDEN RING | SEED A HOSTILE EARTH",
    lead: "砕けた黄金と祝福の残響を辿る。",
    reading: "砕けた黄金律の断片を、狭間の地の記憶として拾う。",
    statement: "黄金は砕け、祝福は遠い。それでも旅のあとに残るものがある。書物、音、造形のかたちで、狭間の地の気配を静かに収める。"
  },
  {
    name: "DARK SOULS",
    slug: "dark-souls",
    displayName: "LINKED FIRE",
    title: "DARK SOULS | SEED A HOSTILE EARTH",
    lead: "火、灰、甲冑、祈り。滅びた巡礼の記録。",
    reading: "火の消えたあとを、巡礼として辿る。",
    statement: "火の消えかけた世界に、なお残るものがある。甲冑、祈り、怪物、そして倒れた者の記憶を、日常の片隅に残す。"
  },
  {
    name: "Bloodborne",
    slug: "bloodborne",
    displayName: "PALE NIGHT",
    title: "Bloodborne | SEED A HOSTILE EARTH",
    lead: "血と月と悪夢の都市に残る、狩人の気配。",
    reading: "醒めない悪夢の底に、獣と祈りの痕跡を見る。",
    statement: "血の夜を越えた者だけが覚えている気配がある。それは音であり、紙に残された線であり、棚の上に留まる小さな影でもある。"
  },
  {
    name: "ARMORED CORE",
    slug: "armored-core",
    displayName: "STEEL ECHOES",
    title: "ARMORED CORE | SEED A HOSTILE EARTH",
    lead: "鋼鉄、企業、通信、燃え残る星の残響。",
    reading: "通信、残骸、機体の輪郭から、戦場の気配を読む。",
    statement: "灰の惑星、企業の火、通信のざらつき。鋼鉄を組み上げ、名もなき傭兵として進んだ記録を、冷たい余韻のまま収める。"
  },
  {
    name: "Demon's Souls",
    slug: "demons-souls",
    displayName: "FOGBOUND ORIGIN",
    title: "Demon's Souls | SEED A HOSTILE EARTH",
    lead: "霧の向こうに沈む古い王国の断片。",
    reading: "霧の向こうに沈んだ王国の残響を辿る。",
    statement: "霧の向こうに沈む古い王国。その始まりの気配を忘れないために、まだ空に近い棚をひとつ残しておく。"
  },
  {
    name: "SEKIRO",
    slug: "sekiro",
    displayName: "ASHINA SILENCE",
    title: "SEKIRO | SEED A HOSTILE EARTH",
    lead: "刃、沈黙、主従。研ぎ澄まされた死生の記録。",
    reading: "刃、主従、不死の呪いを、静かな記録として残す。",
    statement: "刃と沈黙のあいだに残るものがある。まだ収蔵品は少ないが、忍びの記録を置くための静かな余白として、この部屋を残しておく。"
  }
];
const worldOrder = ["DARK SOULS", "Bloodborne", "ELDEN RING", "SEKIRO", "ARMORED CORE", "Demon's Souls"];
worlds.sort((a, b) => worldOrder.indexOf(a.name) - worldOrder.indexOf(b.name));

const objectTypes = [
  { key: "entrance", slug: "entrance", label: "ENTRANCE", jp: "入口", lead: "世界へ踏み入るための門。", categories: ["games"], isPrimary: true },
  { key: "records", slug: "records", label: "RECORDS", jp: "記録・書物", lead: "紙と余白に残された、古い世界の輪郭。", categories: ["books"], isPrimary: true },
  { key: "echoes", slug: "echoes", label: "ECHOES", jp: "残響", lead: "失われた場所へ戻るための音。", categories: ["soundtracks"], isPrimary: true },
  { key: "relics", slug: "relics", label: "RELICS", jp: "遺物・造形", lead: "棚の上に留まる、小さな気配。", categories: ["figures", "plastic-models"], isPrimary: true },
  { key: "insignia", slug: "insignia", label: "MARKS", jp: "装い・記章", lead: "日常にひそませる、小さなしるし。", categories: ["apparel", "goods"], isPrimary: true }
];
const typeFilterCandidates = objectTypes.map((type) => ({ key: type.slug, label: type.jp }));
const previewLimit = 3;

const amazonAssociateDisclosure = `Amazonのアソシエイトとして、${siteName}は適格販売により収入を得ています。`;
const footerText = `このサイトは非公式の個人アーカイブです。作品名・商品名・画像・商標等の権利は各権利者に帰属します。外部リンクにはアフィリエイトリンクを含む場合があります。${amazonAssociateDisclosure}`;
const externalCheckText = "取り扱い、価格、在庫の状況は、外部販売先の記録をご確認ください。";
const amazonImagePolicy = "Amazon商品画像は、PA-APIまたはAmazonアソシエイトが提供する正規の画像URLを利用できる場合のみ表示します。画像の保存、加工、再アップロード、スクリーンショットによる仮置きは行いません。";
const journalSections = [
  {
    title: "このサイトについて",
    body: "SEED A HOSTILE EARTHは、FromSoftware作品の周辺に残る書物、音、造形、入口を、個人の視点で静かに収める非公式アーカイブです。商品を急いで選ぶ場所ではなく、世界の断片を眺めるための小さな展示室として作っています。"
  },
  {
    title: "外部リンクについて",
    body: `${amazonAssociateDisclosure} Amazon、Rakuten、Yahoo Shopping、Officialへの外部リンクには、アフィリエイトリンクを含む場合があります。リンクは購入を急がせるためではなく、取り扱いを確認するための静かな出口として置いています。`
  },
  {
    title: "商品画像について",
    body: amazonImagePolicy
  },
  {
    title: "価格・在庫・販売状況について",
    body: "このサイトでは価格、在庫、販売状況を固定表示しません。変わり続ける情報は、各外部販売先で確認してください。"
  },
  {
    title: "権利・商標について",
    body: "掲載している作品名、商品名、画像、商標等の権利は、それぞれの権利者または販売元に帰属します。"
  },
  {
    title: "非公式サイトであること",
    body: "本サイトは株式会社フロム・ソフトウェア、FromSoftware、および各権利元とは関係のない非公式サイトです。公式サイト、販売元、監修済み媒体ではありません。"
  },
  {
    title: "このサイトの姿勢",
    body: "売り場ではなく、編集された余白を作るための記録です。声高にすすめることはせず、失われた世界の気配を、日常のそばにそっと残します。"
  }
];

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageUrl(route) {
  return siteUrl ? `${siteUrl}${route}` : route;
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
  const urlMeta = siteUrl ? `  <link rel="canonical" href="${canonical}">
  <meta property="og:url" content="${canonical}">
` : "";
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
${urlMeta}  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(siteName)}">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(ogDesc)}">
  <link rel="stylesheet" href="${relPath(depth, "style.css")}">
</head>`;
}

function header(depth) {
  return `<header class="site-header">
    <div class="header-inner">
      <a class="site-name" href="${relPath(depth, "index.html")}">${siteName}</a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="${relPath(depth, "about/")}">ABOUT</a>
        <a href="${relPath(depth, "worlds/")}">WORLDS</a>
        <a href="${relPath(depth, "objects/")}">OBJECTS</a>
        <a href="${relPath(depth, "journal/")}">JOURNAL</a>
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
        <a href="${relPath(depth, "worlds/")}">WORLDS</a>
        <a href="${relPath(depth, "objects/")}">OBJECTS</a>
        <a href="${relPath(depth, "journal/")}">JOURNAL</a>
        <a href="${relPath(depth, "about/")}">ABOUT</a>
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

function productSlug(product) {
  return product.id;
}

function productRoute(product) {
  return `/objects/${productSlug(product)}/`;
}

function worldByName(worldName) {
  return worlds.find((world) => world.name === worldName);
}

function categoryRoute(type) {
  return `/category/${type.slug}/`;
}

function productsForWorld(worldName) {
  return publishedProducts.filter((product) => (product.series || []).includes(worldName));
}

function productsForType(typeKey, items = publishedProducts) {
  const type = objectTypes.find((item) => item.key === typeKey || item.slug === typeKey || (item.categories || []).includes(typeKey));
  const categories = type ? type.categories : [typeKey];
  return items.filter((product) => categories.includes(product.category));
}

function fragmentForProduct(product) {
  const type = objectTypes.find((item) => (item.categories || []).includes(product.category));
  const fragmentsByType = {
    entrance: "失われた場所へ戻るための、静かな入口。",
    records: "火の消えたあとにも、記録だけは残る。",
    echoes: "記憶の奥で、まだ鳴り続ける断片。",
    relics: "棚の片隅に、小さな巡礼を置く。",
    insignia: "わかる者だけに伝わる、古い記章。"
  };
  const fragmentsByWorld = {
    "DARK SOULS": "灰のあとに、まだ消えない輪郭がある。",
    "Bloodborne": "かつて対峙した影が、日常の余白に残る。",
    "ELDEN RING": "砕けた黄金の気配を、そっと手元に残す。",
    "SEKIRO": "刃の沈黙だけが、薄く残り続ける。",
    "ARMORED CORE": "鋼鉄の通信が、遠い砂のように残る。",
    "Demon's Souls": "霧の向こうから、古い始まりが戻ってくる。"
  };
  const world = (product.series || [])[0];
  return fragmentsByType[type && type.key] || fragmentsByWorld[world] || "触れたあとに、かすかな気配だけが残る。";
}

function fragmentForWorld(world) {
  const fragments = {
    "DARK SOULS": "火の消えたあとにも、巡礼の記録だけは残る。",
    "Bloodborne": "夜の底に沈んだ影が、紙と音の奥で息をする。",
    "ELDEN RING": "砕けた黄金の下に、まだ旅の気配が残っている。",
    "SEKIRO": "刃と沈黙のあいだに、主従の記憶が眠る。",
    "ARMORED CORE": "鋼鉄と通信の残響が、冷たい棚に並ぶ。",
    "Demon's Souls": "霧の向こうの始まりを、まだ忘れないために。"
  };
  return fragments[world.name] || "失われた世界の気配を、もう一度たどる。";
}

function archiveNoteForProduct(product) {
  const type = objectTypes.find((item) => (item.categories || []).includes(product.category));
  const description = String(product.description || "触れたあとに残る気配を留めるための収蔵品。").trim();
  const firstSentence = /[。.!！?？]$/.test(description) ? description : `${description}。`;
  const typePhrase = type ? `${type.jp}として、` : "";
  return `${firstSentence}${typePhrase}攻略や比較のためではなく、旅のあとに残った輪郭を静かに収めるために置いています。`;
}

function worldFragmentForProduct(product) {
  const world = worldByName((product.series || [])[0]);
  if (!world) {
    return "これは分類のための品ではなく、触れたあとに残る気配を思い出すための断片です。";
  }
  return `${world.reading} このオブジェクトは、${world.displayName}を分類するためではなく、かつて歩いた場所の温度を思い出すための断片です。`;
}

function normalizedOutboundLinks(product) {
  if (Array.isArray(product.outboundLinks)) {
    return product.outboundLinks;
  }
  const legacyLinks = product.links || {};
  return [
    {
      label: "Amazon",
      type: "affiliate",
      provider: "amazon",
      url: legacyLinks.amazonProduct || legacyLinks.amazonSearch || "",
      rel: "nofollow sponsored noopener",
      enabled: Boolean(legacyLinks.amazonProduct || legacyLinks.amazonSearch),
      priority: 1
    },
    {
      label: "Rakuten",
      type: "affiliate",
      provider: "rakuten",
      url: legacyLinks.rakutenSearch || "",
      rel: "nofollow sponsored noopener",
      enabled: Boolean(legacyLinks.rakutenSearch),
      priority: 2
    },
    {
      label: "Yahoo Shopping",
      type: "affiliate",
      provider: "yahoo",
      url: legacyLinks.yahooSearch || "",
      rel: "nofollow sponsored noopener",
      enabled: Boolean(legacyLinks.yahooSearch),
      priority: 3
    },
    {
      label: "Official",
      type: "reference",
      provider: "official",
      url: legacyLinks.official || "",
      rel: "nofollow noopener",
      enabled: Boolean(legacyLinks.official),
      priority: 9
    }
  ];
}

function externalLinks(product) {
  const links = normalizedOutboundLinks(product)
    .filter((link) => link && link.enabled !== false && link.url)
    .sort((a, b) => Number(a.priority || 999) - Number(b.priority || 999))
    .map((link) => {
      const rel = link.rel || (link.type === "reference" ? "nofollow noopener" : "nofollow sponsored noopener");
      return `<a href="${escapeHtml(link.url)}" target="_blank" rel="${escapeHtml(rel)}">${escapeHtml(link.label || "External Link")}</a>`;
    })
    .join("");
  if (!links) return "";
  return `<div class="object-links" aria-label="External links">${links}</div>`;
}

function detailNotice() {
  return `<p class="object-detail-notice">${externalCheckText}</p>`;
}

function filterWorldSlugs(product) {
  return (product.series || [])
    .map((name) => worldByName(name))
    .filter(Boolean)
    .map((world) => world.slug);
}

function filterTypeKeys(product) {
  const type = objectTypes.find((item) => (item.categories || []).includes(product.category));
  return type ? [type.slug] : [];
}

function detailLink(product, depth) {
  return `<a class="text-link detail-link" href="${relPath(depth, `objects/${productSlug(product)}/`)}">収蔵記録を見る</a>`;
}

function objectDetailMedia(product) {
  const image = product.image || {};
  if (image.url) {
    const alt = image.alt || `${product.title} の収蔵画像`;
    return `<figure class="object-detail-image">
        <img src="${escapeHtml(image.url)}" alt="${escapeHtml(alt)}" loading="lazy">
        <figcaption>${escapeHtml(alt)}</figcaption>
      </figure>`;
  }
  const type = objectTypes.find((item) => (item.categories || []).includes(product.category));
  const mediaLabel = type ? type.label : "OBJECT";
  return `<div class="object-detail-image object-detail-image--empty" aria-label="${escapeHtml(product.title)} の抽象収蔵パネル">
        <span>${escapeHtml(mediaLabel)}</span>
      </div>`;
}

function objectCardMedia(product, mediaLabel) {
  const image = product.image || {};
  if (image.url) {
    const alt = image.alt || `${product.title} 商品画像`;
    return `<figure class="object-card__media object-card__media--image">
        <img src="${escapeHtml(image.url)}" alt="${escapeHtml(alt)}" loading="lazy">
      </figure>`;
  }
  return `<div class="object-card__media" aria-hidden="true">
        <span>${escapeHtml(mediaLabel)}</span>
      </div>`;
}

function objectCards(items, options = {}) {
  const limit = options.limit || items.length;
  const depth = options.depth || 0;
  const includeExternalLinks = options.includeExternalLinks === true;
  const subset = items.slice(0, limit);
  if (!subset.length) {
    return `<div class="empty-state object-empty-state">
      <p class="eyebrow">EMPTY SHELF</p>
      <h3>この展示室には、まだ公開できる収蔵品がありません。</h3>
    </div>`;
  }
  return subset.map((product, index) => {
    const tags = (product.tags || []).slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const type = objectTypes.find((item) => (item.categories || []).includes(product.category));
    const mediaLabel = type ? type.label : "OBJECT";
    return `<article class="object-card product-card" data-product-card data-category="${escapeHtml(product.category)}" data-series="${escapeHtml(worldFor(product))}" data-filter-worlds="${escapeHtml(filterWorldSlugs(product).join(" "))}" data-filter-types="${escapeHtml(filterTypeKeys(product).join(" "))}">
      ${objectCardMedia(product, mediaLabel)}
      <div class="object-card__body">
        <p class="object-world">${escapeHtml(worldFor(product))} / ${escapeHtml(typeLabel(product.category))}</p>
        <h3>${escapeHtml(product.title)}</h3>
        <p class="object-description">${escapeHtml(product.description)}</p>
        <p class="object-fragment">${escapeHtml(fragmentForProduct(product))}</p>
        <div class="tag-list">${tags}</div>
        ${detailLink(product, depth)}
        <p class="object-checked">Checked ${escapeHtml(product.lastChecked)}</p>
        ${includeExternalLinks ? externalLinks(product) : ""}
      </div>
    </article>`;
  }).join("\n");
}

function typeOverviewLink(type, depth, label = "すべて見る") {
  return `<a class="text-link archive-link" href="${relPath(depth, `category/${type.slug}/`)}">${escapeHtml(label)}</a>`;
}

function worldTypeOverviewLink(type, world, depth) {
  return `<a class="text-link archive-link" href="${relPath(depth, `category/${type.slug}/`)}#world-${escapeHtml(world.slug)}">この世界の${escapeHtml(type.jp)}をすべて見る</a>`;
}

function collectionCountLabel(count) {
  return count > 0 ? `収蔵品 ${count}` : "収蔵準備中";
}

function worldCard(world, depth, index) {
  const count = productsForWorld(world.name).length;
  return `<a class="quiet-card world-card" href="${relPath(depth, `worlds/${world.slug}/`)}">
    <strong>${escapeHtml(world.displayName)}</strong>
    <small>${collectionCountLabel(count)}</small>
    <p>${escapeHtml(world.lead)}</p>
    <span class="world-reading">${escapeHtml(world.reading)}</span>
    <span class="card-fragment">${escapeHtml(fragmentForWorld(world))}</span>
    <em>ENTER THE WORLD</em>
  </a>`;
}

function worldEmptyState(world) {
  const bodies = {
    "DARK SOULS": "火の記録を置く棚として、この場所だけを静かに残しています。",
    "Bloodborne": "醒めない夜の断片を迎える余白として、この場所だけを残しています。",
    "ELDEN RING": "狭間の地の記憶を置くための余白として、この場所だけを残しています。",
    "SEKIRO": "刃と沈黙の記録を置くための余白として、この場所だけを残しています。",
    "ARMORED CORE": "通信と鋼鉄の残響を置くための余白として、この場所だけを残しています。",
    "Demon's Souls": "霧の向こうの記録を置くための余白として、この場所だけを残しています。"
  };
  return `<section class="empty-state world-empty-state">
          <p class="eyebrow">EMPTY SHELF</p>
          <h2>まだ、この部屋には公開できる収蔵品がありません。</h2>
          <p>${escapeHtml(bodies[world.name] || "世界の断片を置くための余白として、この場所だけを残しています。")}</p>
        </section>`;
}

function typeCard(type, depth) {
  const count = productsForType(type.key).length;
  return `<a class="quiet-card type-card" href="${relPath(depth, `category/${type.slug}/`)}">
    <strong>${escapeHtml(type.jp)}</strong>
    <small>${escapeHtml(type.label)} / ${collectionCountLabel(count)}</small>
    <p>${escapeHtml(type.lead)}</p>
  </a>`;
}

function filterButton(group, value, label, isActive = false) {
  return `<button class="filter-button${isActive ? " is-active" : ""}" type="button" data-filter-group="${escapeHtml(group)}" data-filter-value="${escapeHtml(value)}">${escapeHtml(label)}</button>`;
}

function objectsFilterPanel() {
  const worldButtons = worlds
    .filter((world) => productsForWorld(world.name).length)
    .map((world) => filterButton("world", world.slug, world.name))
    .join("");
  const typeButtons = typeFilterCandidates
    .filter((candidate) => publishedProducts.some((product) => filterTypeKeys(product).includes(candidate.key)))
    .map((candidate) => filterButton("type", candidate.key, candidate.label))
    .join("");
  return `<div class="object-filter-panel" data-object-filters>
        <div class="filter-group" aria-label="World filter">
          <p class="eyebrow">WORLD FILTER</p>
          <div class="filter-list">${filterButton("world", "all", "All", true)}${worldButtons}</div>
        </div>
        <div class="filter-group" aria-label="Type filter">
          <p class="eyebrow">TYPE FILTER</p>
          <div class="filter-list">${filterButton("type", "all", "All", true)}${typeButtons}</div>
        </div>
        <p class="notice object-filter-empty" data-filter-empty hidden>この条件で見える収蔵品は、まだありません。</p>
      </div>`;
}

function renderHome() {
  const content = `    <section class="hero hero--home">
      <div class="container">
        <p class="eyebrow">PRIVATE ARCHIVE</p>
        <h1>${siteName}</h1>
        <p class="site-subtitle">${siteSubtitle}</p>
        <p class="hero-copy">もう戻れない世界の気配を、日常のそばに残す。</p>
        <p class="lead">火、血、霧、黄金、鋼鉄。<br>かつて画面の奥にあった世界の残響を、<br>静かに収めていく。</p>
      </div>
    </section>
    <section class="section section--concept">
      <div class="container statement">
        <p><span class="concept-line">失われた世界の記憶を、ひとつずつ集めていく。</span><br><span class="concept-line">あの世界を、つなぎ止めるために。</span></p>
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
    <section class="section section--types">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">OBJECT TYPES</p>
          <h2>かたちから辿る</h2>
        </div>
        <div class="quiet-grid quiet-grid--types">${objectTypes.map((type) => typeCard(type, 0)).join("")}</div>
      </div>
    </section>
    <section class="section section--journal">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">JOURNAL</p>
          <h2>静かな出口の前に</h2>
        </div>
        <div class="journal-teaser">
          <p>外部リンク、画像、権利、広告表記について。必要なことだけを、ひとつの記録にまとめています。</p>
          <a class="text-link archive-link" href="${relPath(0, "journal/")}">JOURNAL</a>
        </div>
      </div>
    </section>
    <section class="section section--selected">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">SELECTED RELICS</p>
          <h2>記憶の欠片</h2>
        </div>
        <div class="object-grid" data-product-list="featured">${objectCards(publishedProducts, { limit: 4, depth: 0 })}</div>
      </div>
    </section>`;
  writeFile("index.html", basePage({
    title: `${siteName} | ${siteSubtitle}`,
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
        <section class="about-section">
          <h2>この場所について</h2>
          <p>明るい世界を、素直には信じられない日があります。それでも、かつて歩んだ火、血、霧、黄金、鋼鉄の記憶は、自分の奥に静かに残り続けています。</p>
          <p>SEED A HOSTILE EARTHは、その記憶をひとつずつ収めるための個人編集アーカイブです。商品ではなく、旅のあとに残った断片として、書物、音、造形、入口を置いています。</p>
        </section>
        <section class="about-section">
          <h2>収蔵の基準</h2>
          <p>この場所に置くものは、数を増やすためではなく、作品のあとに残る気配を損なわないものに限っています。書物、音、造形、入口。どれも商品としてではなく、かつて歩いた世界を思い出すための断片として収めています。</p>
          <p>すべての記録は、ひとりの観測者の視点で選び、短い言葉に整えています。説明しすぎず、すすめすぎず、ただ世界の外縁に残ったものを静かに置く。その距離感を、このアーカイブの基準にしています。</p>
        </section>
        <section class="about-section">
          <h2>非公式サイトとしての立ち位置</h2>
          <p>本サイトは、株式会社フロム・ソフトウェア、FromSoftwareおよび各権利元とは関係のない非公式サイトです。作品名、商品名、画像、商標等の権利は、それぞれの権利者に帰属します。</p>
          <p>外部リンクにはアフィリエイトリンクを含む場合があります。価格、在庫、販売条件、画像利用の方針など、詳しい記録は<a class="text-link" href="${relPath(1, "journal/")}">JOURNAL</a>にまとめています。</p>
        </section>
      </div>
    </section>`;
  writeFile("about/index.html", basePage({
    title: `ABOUT | ${siteName}`,
    description: "SEED A HOSTILE EARTHの思想、個人編集アーカイブとしての姿勢、非公式表記について。",
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
        <h1 aria-label="ROOMS OF OLD WORLDS">ROOMS OF<br>OLD WORLDS</h1>
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
    const visibleTypes = primaryTypes.filter((type) => productsForType(type.key, items).length);
    const otherWorlds = worlds
      .filter((item) => item.name !== world.name)
      .map((item) => `<a class="text-link" href="../${item.slug}/">${escapeHtml(item.displayName)}</a>`)
      .join("");
    const typeNav = visibleTypes.map((type) => {
      const count = productsForType(type.key, items).length;
      return `<a class="quiet-card type-card" href="#${escapeHtml(type.slug)}">
        <strong>${escapeHtml(type.jp)}</strong>
        <small>${escapeHtml(type.label)} / 収蔵品 ${count}</small>
        <p>${escapeHtml(type.lead)}</p>
      </a>`;
    }).join("");
    const typeSections = visibleTypes.map((type) => {
      const typeItems = productsForType(type.key, items);
      const previewItems = typeItems.slice(0, previewLimit);
      const overview = typeItems.length > previewLimit ? `<div class="section-follow-link">${worldTypeOverviewLink(type, world, 2)}</div>` : "";
      return `<section class="object-type-section" id="${escapeHtml(type.slug)}">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">${escapeHtml(type.label)}</p>
            <h3>${escapeHtml(type.jp)}</h3>
          </div>
          <div class="object-grid" data-product-list="${escapeHtml(world.slug)}-${escapeHtml(type.slug)}">${objectCards(previewItems, { depth: 2 })}</div>
          ${overview}
        </section>`;
    }).join("");
    const worldObjectSections = items.length ? `<section class="section section--types">
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
    </section>` : `<section class="section section--selected">
      <div class="container">
        ${worldEmptyState(world)}
      </div>
    </section>`;
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
    ${worldObjectSections}
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
    return `<a class="quiet-card type-card" href="${relPath(1, `category/${type.slug}/`)}" aria-label="${escapeHtml(type.jp)}の部屋へ">
    <strong>${escapeHtml(type.jp)}</strong>
    <small>${escapeHtml(type.label)} / ${collectionCountLabel(count)}</small>
    <p>${escapeHtml(type.lead)}</p>
  </a>`;
  }).join("");
  const content = `    <section class="hero hero--text">
      <div class="container">
        <p class="eyebrow">OBJECTS</p>
        <h1 aria-label="ARCHIVE OF RELICS">ARCHIVE OF<br>RELICS</h1>
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
        ${objectsFilterPanel()}
        <div class="object-grid" data-product-list="objects-all">${objectCards(publishedProducts, { depth: 1 })}</div>
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
    const worldLinks = worlds
      .filter((world) => productsForType(type.key, productsForWorld(world.name)).length)
      .map((world) => `<a class="text-link" href="#world-${escapeHtml(world.slug)}">${escapeHtml(world.displayName)}</a>`)
      .join("");
    const worldSections = worlds.map((world) => {
      const worldItems = productsForType(type.key, productsForWorld(world.name));
      if (!worldItems.length) return "";
      return `<section class="object-type-section category-world-section" id="world-${escapeHtml(world.slug)}">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">${escapeHtml(world.displayName)}</p>
            <h3>${escapeHtml(world.name)}</h3>
          </div>
          <div class="object-grid" data-product-list="category-${escapeHtml(type.slug)}-${escapeHtml(world.slug)}">${objectCards(worldItems, { depth: 2 })}</div>
        </section>`;
    }).filter(Boolean).join("");
    const content = `    <section class="hero hero--text">
      <div class="container">
        <p class="breadcrumb"><a href="../../objects/">OBJECTS</a> / ${escapeHtml(type.jp)}</p>
        <p class="eyebrow">OBJECT TYPE</p>
        <h1>${escapeHtml(type.jp)}</h1>
        <p class="lead">${escapeHtml(type.lead)}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="other-links category-world-nav"><span>WORLDS</span>${worldLinks}</div>
        <div class="world-type-stack">${worldSections || objectCards(items, { depth: 2 })}</div>
      </div>
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

function renderProductPages() {
  publishedProducts.forEach((product) => {
    const content = `    <section class="hero hero--text">
      <div class="container narrow">
        <p class="breadcrumb"><a href="../../objects/">OBJECTS</a> / ${escapeHtml(worldFor(product))}</p>
        <p class="eyebrow">${escapeHtml(typeLabel(product.category))}</p>
        <h1>${escapeHtml(product.title)}</h1>
        <p class="lead">${escapeHtml(product.description)}</p>
      </div>
    </section>
    <section class="section object-detail">
      <div class="container narrow">
        ${objectDetailMedia(product)}
        <div class="object-record-meta">
          <p class="object-detail-fragment">${escapeHtml(fragmentForProduct(product))}</p>
          <div class="tag-list">${(product.tags || []).slice(0, 4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          <p class="object-checked">Checked ${escapeHtml(product.lastChecked)}</p>
        </div>
        <div class="object-record">
          <section class="object-record-section">
            <p class="eyebrow">ARCHIVE NOTE</p>
            <h2>Archive Note</h2>
            <p>${escapeHtml(archiveNoteForProduct(product))}</p>
          </section>
          <section class="object-record-section">
            <p class="eyebrow">WORLD FRAGMENT</p>
            <h2>World Fragment</h2>
            <p>${escapeHtml(worldFragmentForProduct(product))}</p>
          </section>
          <section class="object-record-section quiet-exit">
            <p class="eyebrow">QUIET EXIT</p>
            <h2>静かな出口</h2>
            <p class="object-detail-notice">取り扱いの有無は、外部の記録をご確認ください。価格や在庫は変わり続けるため、この場所では固定していません。</p>
            ${externalLinks(product)}
          </section>
        </div>
      </div>
    </section>`;
    writeFile(`objects/${productSlug(product)}/index.html`, basePage({
      title: `${product.title} | ${siteName}`,
      description: `${product.title}を、収蔵品として静かに記録する詳細ページ。`,
      route: productRoute(product),
      depth: 2,
      bodyAttrs: 'data-page-type="object-detail" data-products-path="../../data/products.json"',
      content
    }));
  });
}

function renderJournalIndex() {
  const content = `    <section class="hero hero--text">
      <div class="container">
        <p class="eyebrow">JOURNAL</p>
        <h1>SITE NOTES</h1>
        <p class="lead">この場所の姿勢、外部リンク、画像、権利について。必要なことだけを、静かに残します。</p>
      </div>
    </section>
    <section class="section section--journal">
      <div class="container narrow journal-body">
        ${journalSections.map((section) => `<section class="journal-section">
          <h2>${escapeHtml(section.title)}</h2>
          <p>${escapeHtml(section.body)}</p>
        </section>`).join("")}
      </div>
    </section>`;
  writeFile("journal/index.html", basePage({
    title: `JOURNAL | ${siteName}`,
    description: "SEED A HOSTILE EARTHの姿勢、外部リンク、画像、権利、非公式表記についてまとめた記録。",
    route: "/journal/",
    depth: 1,
    bodyAttrs: 'data-page-type="journal"',
    content
  }));
}

function renderSitemapAndRobots() {
  const routes = [
    "/",
    "/about/",
    "/journal/",
    "/worlds/",
    "/objects/",
    ...publishedProducts.map((product) => productRoute(product)),
    ...worlds.map((world) => `/worlds/${world.slug}/`),
    ...objectTypes.map((type) => `/category/${type.slug}/`)
  ];
  const sitemapLine = siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : "";
  writeFile("robots.txt", `User-agent: *
Allow: /
${sitemapLine}`);
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
renderProductPages();
renderJournalIndex();
renderSitemapAndRobots();

console.log(`Built ${publishedProducts.length} curated objects.`);










