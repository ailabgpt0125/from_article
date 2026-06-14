const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const affiliatePath = path.join(root, "data", "affiliate.json");
const tag = String(process.argv[2] || "").trim();
const isDryRun = process.argv.includes("--dry-run");

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!tag || tag.startsWith("--")) {
  fail("Usage: node scripts/configure-amazon-associate.js <amazon-tracking-id> [--dry-run]");
}

if (!/^[a-z0-9][a-z0-9-]{2,63}$/i.test(tag)) {
  fail("Tracking ID format looks invalid. Use the exact ID issued by Amazon Associates, for example xxxxx-22.");
}

if (!fs.existsSync(affiliatePath)) {
  fail("Missing data/affiliate.json.");
}

const affiliate = JSON.parse(fs.readFileSync(affiliatePath, "utf8"));
affiliate.amazon = affiliate.amazon || {};
affiliate.amazon.associateTag = tag;
affiliate.amazon.status = "tracking_id_configured";
affiliate.amazon.configuredAt = new Date().toISOString().slice(0, 10);

if (isDryRun) {
  console.log(JSON.stringify(affiliate.amazon, null, 2));
  process.exit(0);
}

fs.writeFileSync(`${affiliatePath}.tmp`, `${JSON.stringify(affiliate, null, 2)}\n`, "utf8");
fs.renameSync(`${affiliatePath}.tmp`, affiliatePath);

console.log(`Configured Amazon Associates Tracking ID: ${tag}`);
console.log("Next: node scripts/build.js && node scripts/verify.js");
