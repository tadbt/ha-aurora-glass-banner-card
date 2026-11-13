const http = require("http");

const URL = "http://localhost:8123";
const ASSET = "http://localhost:8123/local/aurora-glass-banner-card.js";
const MAX_WAIT_MS = 120000;
const start = Date.now();

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode);
    }).on("error", reject);
  });
}

async function main() {
  process.stdout.write("Waiting for Home Assistant at " + URL + " ");
  while (Date.now() - start < MAX_WAIT_MS) {
    try {
      const code = await get(URL);
      if (code && code < 500) {
        const assetCode = await get(ASSET).catch(() => 0);
        console.log("\nHome Assistant is ready at " + URL + " (card JS HTTP " + assetCode + ")");
        console.log("Stop with: npm run test:ha:down");
        return;
      }
    } catch (_) {}
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.error("\nTimed out waiting for Home Assistant. Check: docker logs ha-aurora-glass-banner-test");
  process.exit(1);
}

main();

