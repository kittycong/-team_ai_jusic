// Local proxy for Korea Investment (KIS) Open API quotes.
// Keeps the app key/secret out of the browser. The app calls:
//   GET {proxy}/api/kis/quote?symbol=005930
//
// Usage:
//   KIS_APP_KEY=... KIS_APP_SECRET=... node scripts/kis-quote-proxy.mjs
// Optional env:
//   KIS_BASE_URL  (default: real server; mock: https://openapivts.koreainvestment.com:29443)
//   KIS_PROXY_PORT (default: 8766)
//   KIS_ALLOWED_ORIGIN (default: *)
import http from "node:http";

const appKey = process.env.KIS_APP_KEY || "";
const appSecret = process.env.KIS_APP_SECRET || "";
const baseUrl = (process.env.KIS_BASE_URL || "https://openapi.koreainvestment.com:9443").replace(/\/+$/, "");
const port = Number(process.env.KIS_PROXY_PORT || 8766);
const allowedOrigin = process.env.KIS_ALLOWED_ORIGIN || "*";

if (!appKey || !appSecret) {
  console.error("KIS_APP_KEY와 KIS_APP_SECRET 환경변수가 필요합니다.");
  process.exit(1);
}

let cachedToken = null;
let pendingToken = null;

async function issueToken() {
  const response = await fetch(`${baseUrl}/oauth2/tokenP`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ grant_type: "client_credentials", appkey: appKey, appsecret: appSecret })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.msg1 || `토큰 발급 실패 (${response.status})`);
  }
  // KIS tokens last ~24h and issuance is rate-limited, so cache with a safety margin.
  const ttlMs = Number(data.expires_in || 86400) * 1000;
  return { value: data.access_token, expiresAt: Date.now() + ttlMs - 10 * 60 * 1000 };
}

async function getToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }
  pendingToken ??= issueToken().finally(() => {
    pendingToken = null;
  });
  cachedToken = await pendingToken;
  return cachedToken.value;
}

async function fetchDomesticQuote(code) {
  const token = await getToken();
  const url = new URL(`${baseUrl}/uapi/domestic-stock/v1/quotations/inquire-price`);
  url.searchParams.set("FID_COND_MRKT_DIV_CODE", "J");
  url.searchParams.set("FID_INPUT_ISCD", code);

  const response = await fetch(url, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      authorization: `Bearer ${token}`,
      appkey: appKey,
      appsecret: appSecret,
      tr_id: "FHKST01010100",
      custtype: "P"
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.rt_cd !== "0" || !data.output) {
    throw new Error(data.msg1 || `KIS 응답 ${response.status}`);
  }

  const price = Number(data.output.stck_prpr);
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("KIS 응답에 유효한 현재가가 없습니다.");
  }

  return {
    ok: true,
    symbol: code,
    price,
    currency: "KRW",
    changePercent: Number(data.output.prdy_ctrt),
    timestamp: new Date().toISOString(),
    sourceNote: "한국투자 Open API 현재가"
  };
}

function send(res, status, body) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": allowedOrigin,
    "access-control-allow-methods": "GET, OPTIONS",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    send(res, 204, {});
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method !== "GET" || url.pathname !== "/api/kis/quote") {
    send(res, 404, { ok: false, error: "지원하지 않는 경로입니다." });
    return;
  }

  const code = (url.searchParams.get("symbol") || "").match(/^\d{6}$/)?.[0];
  if (!code) {
    send(res, 400, { ok: false, error: "symbol은 6자리 종목코드여야 합니다." });
    return;
  }

  try {
    send(res, 200, await fetchDomesticQuote(code));
  } catch (error) {
    send(res, 502, { ok: false, error: error.message });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`KIS quote proxy listening on http://127.0.0.1:${port}`);
});
