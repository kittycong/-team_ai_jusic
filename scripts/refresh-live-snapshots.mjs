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
  { id: "005930:KRX", symbol: "005930:KRX", market: "KRX", currency: "KRW", yahoo: "005930.KS", stooq: null, twelve: "005930:KRX" },
  { id: "000660:KRX", symbol: "000660:KRX", market: "KRX", currency: "KRW", yahoo: "000660.KS", stooq: null, twelve: "000660:KRX" },
  { id: "AAPL", symbol: "AAPL", market: "NASDAQ", currency: "USD", yahoo: "AAPL", stooq: "aapl.us", twelve: "AAPL" },
  { id: "MSFT", symbol: "MSFT", market: "NASDAQ", currency: "USD", yahoo: "MSFT", stooq: "msft.us", twelve: "MSFT" },
  { id: "NVDA", symbol: "NVDA", market: "NASDAQ", currency: "USD", yahoo: "NVDA", stooq: "nvda.us", twelve: "NVDA" },
  { id: "GOOGL", symbol: "GOOGL", market: "NASDAQ", currency: "USD", yahoo: "GOOGL", stooq: "googl.us", twelve: "GOOGL" },
  // Macro reference assets for the investment calendar's daily briefing panel.
  { id: "USDKRW:FX", symbol: "USDKRW:FX", market: "MACRO", currency: "KRW", yahoo: "KRW=X", stooq: null, twelve: null },
  { id: "WTI:CMDTY", symbol: "WTI:CMDTY", market: "MACRO", currency: "USD", yahoo: "CL=F", stooq: null, twelve: null },
  { id: "BRENT:CMDTY", symbol: "BRENT:CMDTY", market: "MACRO", currency: "USD", yahoo: "BZ=F", stooq: null, twelve: null }
];

function isValidPrice(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isValidQuote(quote) {
  return Boolean(quote) && isValidPrice(quote.price);
}

async function readExistingSnapshots() {
  try {
    const raw = await fs.readFile(outputPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { updatedAt: null, provider: "bootstrap", quotes: {} };
  }
}

async function fetchYahooQuote(stock) {
  if (!stock.yahoo) {
    return null;
  }

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(stock.yahoo)}?interval=1d&range=1d`;
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const meta = data?.chart?.result?.[0]?.meta;
  const price = Number(meta?.regularMarketPrice);
  if (!isValidPrice(price)) {
    return null;
  }

  const sourceDate = meta.regularMarketTime
    ? new Date(meta.regularMarketTime * 1000).toISOString().slice(0, 10)
    : today;

  return {
    price,
    currency: meta.currency || stock.currency,
    sourceDate,
    sourceLabel: "GitHub Actions / Yahoo Finance",
    sourceNote: `GitHub Actions에서 ${sourceDate} 기준으로 Yahoo Finance 공개 시세를 반영했습니다.`
  };
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

  const price = Number(parts[6]);
  if (!isValidPrice(price)) {
    return null;
  }

  return {
    price,
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

  const price = Number(data.close ?? data.price);
  if (!isValidPrice(price)) {
    return null;
  }

  return {
    price,
    currency: data.currency || stock.currency,
    sourceDate: today,
    sourceLabel: "GitHub Actions / Twelve Data",
    sourceNote: `GitHub Actions에서 ${today} 기준으로 Twelve Data 시세를 반영했습니다.`
  };
}

async function tryFetch(fetcher, stock) {
  try {
    const quote = await fetcher(stock);
    return isValidQuote(quote) ? quote : null;
  } catch (error) {
    console.warn(`${fetcher.name} failed for ${stock.id}: ${error.message}`);
    return null;
  }
}

async function refreshStock(stock, existingQuote) {
  const fetchers = stock.market === "NASDAQ"
    ? [fetchYahooQuote, fetchStooqQuote, fetchTwelveQuote]
    : stock.market === "MACRO"
      ? [fetchYahooQuote]
      : [fetchTwelveQuote, fetchYahooQuote];

  for (const fetcher of fetchers) {
    const quote = await tryFetch(fetcher, stock);
    if (quote) {
      return { quote, source: fetcher.name };
    }
  }

  // Keep the last valid quote; never replace it with an invalid one.
  return { quote: isValidQuote(existingQuote) ? existingQuote : null, source: null };
}

const existing = await readExistingSnapshots();
const nextQuotes = { ...(existing.quotes || {}) };
const usedSources = new Set();

for (const stock of featuredStocks) {
  const { quote, source } = await refreshStock(stock, nextQuotes[stock.id]);
  if (quote) {
    nextQuotes[stock.id] = quote;
  } else {
    delete nextQuotes[stock.id];
  }
  if (source) {
    usedSources.add(source.replace(/^fetch|Quote$/g, "").toLowerCase());
  }
}

if (JSON.stringify(nextQuotes) === JSON.stringify(existing.quotes || {})) {
  console.log("No quote changes; leaving live-snapshots.json untouched.");
  process.exit(0);
}

const output = {
  updatedAt: new Date().toISOString(),
  provider: usedSources.size ? [...usedSources].join("+") : "existing",
  quotes: nextQuotes
};

await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf-8");
console.log(`Updated ${Object.keys(nextQuotes).length} live snapshots -> ${outputPath}`);
