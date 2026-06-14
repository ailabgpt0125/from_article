const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const site = JSON.parse(fs.readFileSync(path.join(root, "data", "site.json"), "utf8"));
const products = JSON.parse(fs.readFileSync(path.join(root, "data", "products.json"), "utf8"));

const expectedWorldSlugs = [
  "elden-ring",
  "dark-souls",
  "bloodborne",
  "sekiro",
  "armored-core",
  "demons-souls"
];
const expectedNav = ["ABOUT", "WORLDS", "OBJECTS", "JOURNAL"];
const prohibitedPublicTerms = [
  "おすすめ",
  "人気",
  "ランキング",
  "セール",
  "最安値",
  "今すぐ購入",
  "絶対買うべき",
  "神商品",
  "最強",
  "Buy Now",
  "収蔵品 0",
  "AIで作った",
  "AI活用",
  "生成AI",
  "AIと共同制作",
  "AI生成",
  "AI制作"
];

const warnings = [];
const errors = [];

function walk(dir, predicate, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === ".git" || name === "old" || name === "docs") continue;
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) walk(file, predicate, acc);
    else if (!predicate || predicate(file)) acc.push(file);
  }
  return acc;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function assertFile(route) {
  const file = path.join(root, route, "index.html");
  if (!fs.existsSync(file)) fail(`missing page: ${route}/index.html`);
}

function checkRequiredPages() {
  ["about", "worlds", "objects", "journal"].forEach(assertFile);
  expectedWorldSlugs.forEach((slug) => assertFile(path.join("worlds", slug)));
  ["records", "relics", "echoes", "insignia", "entrance"].forEach((slug) => assertFile(path.join("category", slug)));
}

function checkProducts() {
  const published = products.filter((product) => product.isPublished === true);
  if (published.length < 12) fail(`published product count is low: ${published.length}`);
  for (const product of published) {
    assertFile(path.join("objects", product.id));
    const links = Array.isArray(product.outboundLinks) ? product.outboundLinks : [];
    const enabled = links.filter((link) => link.enabled !== false && link.url);
    if (!enabled.length) fail(`published product has no enabled outbound link: ${product.id}`);
    for (const link of enabled) {
      if (!/^https:\/\//.test(link.url)) fail(`non-https outbound link: ${product.id} ${link.url}`);
      if (link.type === "affiliate" && !String(link.rel || "").includes("sponsored")) {
        fail(`affiliate link missing sponsored rel: ${product.id} ${link.provider || link.label}`);
      }
      if (!String(link.rel || "").includes("noopener")) {
        fail(`external link missing noopener rel: ${product.id} ${link.provider || link.label}`);
      }
    }
    if (!product.image || !product.image.alt) fail(`published product missing image alt policy text: ${product.id}`);
  }
}

function resolveHref(htmlFile, href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || /^(https?:|mailto:|tel:|javascript:)/i.test(clean)) return null;
  const base = path.dirname(htmlFile);
  const resolved = path.resolve(base, clean);
  if (clean.endsWith("/")) return path.join(resolved, "index.html");
  if (path.extname(resolved)) return resolved;
  return path.join(resolved, "index.html");
}

function checkHtml() {
  const htmlFiles = walk(root, (file) => file.endsWith(".html"));
  for (const file of htmlFiles) {
    const text = read(file);
    const name = rel(file);
    if (!/<title>[^<]+<\/title>/.test(text)) fail(`missing title: ${name}`);
    if (!/<meta name="description" content="[^"]+">/.test(text)) fail(`missing meta description: ${name}`);
    if (!/<meta property="og:title" content="[^"]+">/.test(text)) fail(`missing og:title: ${name}`);
    if (!/<meta property="og:description" content="[^"]+">/.test(text)) fail(`missing og:description: ${name}`);
    if (site.siteUrl && !/<link rel="canonical" href="https?:\/\//.test(text)) fail(`missing absolute canonical: ${name}`);
    for (const term of prohibitedPublicTerms) {
      if (text.includes(term)) fail(`prohibited public term "${term}" in ${name}`);
    }
    const hrefs = Array.from(text.matchAll(/\shref="([^"]+)"/g)).map((match) => match[1]);
    for (const href of hrefs) {
      const target = resolveHref(file, href);
      if (target && !fs.existsSync(target)) fail(`broken internal link in ${name}: ${href}`);
    }
  }
  if (!site.siteUrl) warn("siteUrl is empty; canonical URLs and absolute sitemap URLs will be generated after TODO_HUMAN public URL is set.");
}

function checkHomeOrder() {
  const home = read(path.join(root, "index.html"));
  const markers = [
    "hero--home",
    "section--concept",
    "section--worlds",
    "section--types",
    "section--journal",
    "section--selected"
  ];
  let last = -1;
  for (const marker of markers) {
    const index = home.indexOf(marker);
    if (index === -1) fail(`home missing section marker: ${marker}`);
    if (index < last) fail(`home section order is wrong around: ${marker}`);
    last = index;
  }
  const navText = Array.from(home.matchAll(/<nav class="site-nav"[^>]*>([\s\S]*?)<\/nav>/g))[0]?.[1] || "";
  const actual = Array.from(navText.matchAll(/>([A-Z]+)<\/a>/g)).map((match) => match[1]);
  if (actual.join(",") !== expectedNav.join(",")) fail(`main nav changed: ${actual.join(",")}`);
}

checkRequiredPages();
checkProducts();
checkHtml();
checkHomeOrder();

console.log(`Verification checked ${products.filter((product) => product.isPublished === true).length} published objects.`);
if (warnings.length) {
  console.log("\nWARNINGS");
  warnings.forEach((message) => console.log(`- ${message}`));
}
if (errors.length) {
  console.error("\nERRORS");
  errors.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}
console.log("Verification passed.");
