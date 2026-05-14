import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "live-snapshots.json");
const today = new Date().toISOString().slice(0, 10);
const twelveApiKey = process.env.TWELVE_DATA_API_KEY || "";

const featuredStocks = [
  { id: "005930:KRX", symbol: "005930:KRX", market: "KRX", currency: "KRW", stooq: null, twelve: "005930:KRX" },
  { id: "000660:KRX", symbol: "000660:KRX", market: "KRX", currency: "KRW", stooq: null, twelve: "000660:KRX" },
  { id: "AAPL", symbol: "AAPL", market: "NASDAQ", currency: "USD", stooq: "aapl.us", twelve: "AAPL" },
  { id: "MSFT", symbol: "MSFT", market: "NASDAQ", currency: "USD", stooq: "msft.us", twelve: "MSFT" },
  { id: "NVDA", symbol: "NVDA", market: "NASDAQ", currency: "USD", stooq: "nvda.us", twelve: "NVDA" },
  { id: "GOOGL", symbol: "GOOGL", market: "NASDAQ", currency: "USD", stooq: "googl.us", twelve: "GOOGL" }
];

async function readExistingSnapshots() {
  try {
    const raw = await fs.readFile(outputPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { updatedAt: null, provider: "bootstrap", quotes: {} };
  }
}

async function fetchStooqQuote(stock) {
  if (!stock.stooq) {
    return null;
  }

  const response = await fetch(`https://stooq.com/q/l/?s=${encodeURIComponent(stock.stooq)}&i=d`);
  const csv = await response.text();
  const parts = csv.trim().split(",");
  if (parts.length < 7 || parts[1] === "N/D") {
    return null;
  }

  return {
    price: Number(parts[6]),
    currency: stock.currency,
    sourceDate: today,
    sourceLabel: "GitHub Actions / Stooq",
    sourceNote: `GitHub Actions에서 ${today} 기준으로 공개 시세를 반영했습니다.`
  };
}

async function fetchTwelveQuote(stock) {
  if (!twelveApiKey) {
    return null;
  }

  const url = `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(stock.twelve)}&apikey=${encodeURIComponent(twelveApiKey)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.status === "error" || !(data.close || data.price)) {
    return null;
  }

  return {
    price: Number(data.close ?? data.price),
    currency: data.currency || stock.currency,
    sourceDate: today,
    sourceLabel: "GitHub Actions / Twelve Data",
    sourceNote: `GitHub Actions에서 ${today} 기준으로 Twelve Data 시세를 반영했습니다.`
  };
}

async function refreshStock(stock, existingQuote) {
  if (stock.market === "NASDAQ") {
    return (await fetchStooqQuote(stock)) || existingQuote || null;
  }

  return (await fetchTwelveQuote(stock)) || existingQuote || null;
}

const existing = await readExistingSnapshots();
const nextQuotes = { ...(existing.quotes || {}) };

for (const stock of featuredStocks) {
  const updated = await refreshStock(stock, nextQuotes[stock.id]);
  if (updated) {
    nextQuotes[stock.id] = updated;
  }
}

const output = {
  updatedAt: new Date().toISOString(),
  provider: twelveApiKey ? "stooq+twelve" : "stooq+existing",
  quotes: nextQuotes
};

await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf-8");
console.log(`Updated ${Object.keys(nextQuotes).length} live snapshots -> ${outputPath}`);
