import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const sourcePath = path.join(rootDir, "market-data.js");

const KOSPI_URL = "https://kind.krx.co.kr/corpgeneral/corpList.do?method=download&searchType=13&marketType=stockMkt";
const TODAY = new Date().toISOString().slice(0, 10);
const prefix = "window.MARKET_MASTER = ";
const suffix = ";";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function seededOffset(code) {
  return [...String(code)].reduce((sum, character) => sum + character.charCodeAt(0), 0) % 7;
}

function inferProfile(sector, product, name, code) {
  const context = `${sector} ${product} ${name}`.toLowerCase();

  const templates = {
    core: { return12m: 22, roe: 18, debtRatio: 42, per: 18, pbr: 2.6, fcfYield: 3.6, volatility: 22 },
    growth: { return12m: 31, roe: 15, debtRatio: 48, per: 28, pbr: 3.8, fcfYield: 2.1, volatility: 30 },
    defensive: { return12m: 14, roe: 11, debtRatio: 45, per: 13, pbr: 1.1, fcfYield: 4.4, volatility: 18 },
    cyclical: { return12m: 18, roe: 12, debtRatio: 55, per: 15, pbr: 1.4, fcfYield: 3.2, volatility: 27 }
  };

  let bucket = "core";
  let styleProfile = "코스피 일반 상장주";
  let marketCapBand = "코스피 상장주";

  if (/은행|금융|보험|증권|카드|리츠|전기, 가스|전기가스|통신|식료품|담배|유틸리티/.test(context)) {
    bucket = "defensive";
    styleProfile = "코스피 방어주";
    marketCapBand = "코스피 배당 / 방어";
  } else if (/반도체|전자부품|전기전자|소프트웨어|서비스업|인터넷|플랫폼|바이오|의약품|배터리|이차전지|2차전지|게임|클라우드/.test(context)) {
    bucket = "growth";
    styleProfile = "코스피 성장주";
    marketCapBand = "코스피 성장 / 기술";
  } else if (/철강|화학|조선|기계|건설|운수장비|자동차|항공|해운|유통|섬유|비금속|제조업/.test(context)) {
    bucket = "cyclical";
    styleProfile = "코스피 경기민감주";
    marketCapBand = "코스피 경기민감";
  }

  if (/지주회사|홀딩스|삼성물산|sk스퀘어|lg/.test(context)) {
    bucket = "core";
    styleProfile = "코스피 지주 / 복합기업";
    marketCapBand = "코스피 코어";
  }

  const base = templates[bucket];
  const offset = seededOffset(code) - 3;

  return {
    styleProfile,
    marketCapBand,
    return12m: clamp(base.return12m + offset * 2, -10, 85),
    roe: clamp(base.roe + offset, 4, 28),
    debtRatio: clamp(base.debtRatio - offset * 3, 10, 120),
    per: clamp(base.per + offset * 1.5, 5, 40),
    pbr: clamp(base.pbr + offset * 0.18, 0.4, 8),
    fcfYield: clamp(base.fcfYield - offset * 0.12, 0.5, 8),
    volatility: clamp(base.volatility + offset * 1.5, 12, 48)
  };
}

function stripHtml(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractRows(html) {
  const headers = [...html.matchAll(/<th[^>]*>(.*?)<\/th>/gis)]
    .map((match) => stripHtml(match[1]))
    .filter(Boolean);

  const rows = [...html.matchAll(/<tr[^>]*>(.*?)<\/tr>/gis)]
    .slice(1)
    .map((row) => [...row[1].matchAll(/<td[^>]*>(.*?)<\/td>/gis)].map((cell) => stripHtml(cell[1])))
    .filter((cells) => cells.length === headers.length);

  return { headers, rows };
}

function buildKospiStock(headers, cells) {
  const record = Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
  const code = record["종목코드"];
  const company = record["회사명"];
  const sector = record["업종"] || "업종 미분류";
  const product = record["주요제품"] || sector;
  const listedAt = record["상장일"] || TODAY;
  const region = record["지역"] || "대한민국";
  const homepage = record["홈페이지"] || "";
  const profile = inferProfile(sector, product, company, code);

  return {
    id: `${code}:KRX`,
    name: company,
    displayName: company,
    koName: company,
    aliases: [company, code, `${code}:KRX`, sector, product, region, "코스피", "KOSPI"],
    symbol: `${code}:KRX`,
    providerSymbols: { alpha: code, twelve: `${code}:KRX` },
    market: "KOSPI",
    currency: "KRW",
    price: null,
    return12m: profile.return12m,
    roe: profile.roe,
    debtRatio: profile.debtRatio,
    per: profile.per,
    pbr: profile.pbr,
    fcfYield: profile.fcfYield,
    volatility: profile.volatility,
    sector,
    industry: product,
    marketCapBand: profile.marketCapBand,
    styleProfile: profile.styleProfile,
    thesis: `${company}은(는) KIND 코스피 상장법인 목록 기준 종목입니다. 세부 재무 원본이 아직 연결되지 않은 구간은 업종과 주요제품을 바탕으로 비교용 팩터 구조를 먼저 추정했습니다.`,
    sourceLabel: "KIND KOSPI listed companies download",
    sourceDate: TODAY,
    sourceNote: `대한민국 대표 기업공시채널 KIND의 코스피 상장법인 다운로드 스냅샷입니다. 상장일 ${listedAt}, 지역 ${region}${homepage ? `, 홈페이지 ${homepage}` : ""}.`
  };
}

const response = await fetch(KOSPI_URL);
if (!response.ok) {
  throw new Error(`KOSPI source fetch failed: ${response.status}`);
}

const buffer = Buffer.from(await response.arrayBuffer());
const html = new TextDecoder("euc-kr").decode(buffer);
const { headers, rows } = extractRows(html);
const kospiStocks = rows.map((cells) => buildKospiStock(headers, cells));

const source = await fs.readFile(sourcePath, "utf-8");
if (!source.startsWith(prefix) || !source.trimEnd().endsWith(suffix)) {
  throw new Error("Unexpected market-data.js format");
}

const jsonText = source.slice(prefix.length, source.lastIndexOf(suffix)).trim();
const marketMaster = JSON.parse(jsonText);
const nonKospiStocks = (marketMaster.stocks || []).filter((stock) => stock.market !== "KOSPI");

marketMaster.generatedAt = TODAY;
marketMaster.counts = {
  ...(marketMaster.counts || {}),
  kospi: kospiStocks.length
};
marketMaster.stocks = [...nonKospiStocks, ...kospiStocks];

await fs.writeFile(sourcePath, `${prefix}${JSON.stringify(marketMaster)}${suffix}\n`, "utf-8");
console.log(`Updated KOSPI master with ${kospiStocks.length} official listings from KIND (${TODAY}).`);
