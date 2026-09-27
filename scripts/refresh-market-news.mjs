import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Fetches Korean-market financial headlines from Google News RSS (no API key
// needed) and tags each headline with a light keyword-based positive/negative
// read. This mirrors, at a much smaller scale and without a trained model,
// the "positive/negative news classification" idea from the StockNews project
// (https://github.com/woqls22/StockNews) that this feature was inspired by.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "market-news.json");

const categories = [
  { id: "kospi", label: "코스피/증시", query: "코스피 증시" },
  { id: "fx", label: "환율", query: "원달러 환율" },
  { id: "oil", label: "유가", query: "국제유가" },
  { id: "rate", label: "금리", query: "기준금리 연준" },
  { id: "nasdaq", label: "미국증시", query: "나스닥 뉴욕증시" }
];

const POSITIVE_WORDS = ["상승", "급등", "호재", "최고", "강세", "반등", "인상", "사상최대", "돌파"];
const NEGATIVE_WORDS = ["하락", "급락", "악재", "우려", "경고", "약세", "인하", "부진", "쇼크", "폭락"];

const ITEMS_PER_CATEGORY = 6;

function decodeEntities(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function tagSentiment(title) {
  const hasPositive = POSITIVE_WORDS.some((word) => title.includes(word));
  const hasNegative = NEGATIVE_WORDS.some((word) => title.includes(word));
  if (hasPositive && !hasNegative) return "positive";
  if (hasNegative && !hasPositive) return "negative";
  return "neutral";
}

function parseRssItems(xml) {
  const items = [];
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  for (const block of itemBlocks) {
    const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1];
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1];
    const source = block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1];

    if (!title || !link) {
      continue;
    }

    const cleanTitle = decodeEntities(title.replace(/<!\[CDATA\[|\]\]>/g, ""));
    const cleanSource = source ? decodeEntities(source.replace(/<!\[CDATA\[|\]\]>/g, "")) : null;

    items.push({
      title: cleanTitle,
      link: decodeEntities(link),
      source: cleanSource,
      pubDate: pubDate ? new Date(pubDate).toISOString() : null,
      sentiment: tagSentiment(cleanTitle)
    });
  }

  return items;
}

async function fetchCategoryNews(category) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(category.query)}&hl=ko&gl=KR&ceid=KR:ko`;
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) {
    throw new Error(`뉴스 응답 ${response.status}`);
  }

  const xml = await response.text();
  const items = parseRssItems(xml).slice(0, ITEMS_PER_CATEGORY);
  if (!items.length) {
    throw new Error("파싱된 뉴스 항목이 없습니다.");
  }

  return items;
}

async function readExisting() {
  try {
    const raw = await fs.readFile(outputPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { updatedAt: null, categories: {} };
  }
}

const existing = await readExisting();
const nextCategories = { ...(existing.categories || {}) };
let changed = false;

for (const category of categories) {
  try {
    const items = await fetchCategoryNews(category);
    nextCategories[category.id] = { label: category.label, items };
    changed = true;
  } catch (error) {
    console.warn(`${category.id} 뉴스 갱신 실패: ${error.message}`);
    // Keep whatever was previously stored for this category.
  }
}

if (!changed) {
  console.log("No news changes; leaving market-news.json untouched.");
  process.exit(0);
}

const output = {
  updatedAt: new Date().toISOString(),
  source: "Google News RSS",
  categories: nextCategories
};

await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf-8");
console.log(`Updated market news across ${Object.keys(nextCategories).length} categories -> ${outputPath}`);
