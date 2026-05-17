import { buildMockResearchReport } from "@amcc/research/generate-report";
import { scoreAsset } from "@amcc/analytics/scoring";
import { simulateGridStrategy } from "@amcc/strategy/grid";
import { analyzePortfolioRisk } from "@amcc/risk/portfolio-risk";

const watchlist = [
  {
    symbol: "NVDA",
    assetType: "equity" as const,
    sector: "Semiconductors",
    theme: "AI Infrastructure",
    price: 219.07,
    changePct: 1.8,
    volumeShock: 1.34,
    trendScore: 86,
    momentumScore: 82,
    volumeScore: 78,
    newsScore: 67,
    fundamentalScore: 79,
    riskScore: 46
  },
  {
    symbol: "BTC",
    assetType: "crypto" as const,
    sector: "Digital Asset",
    theme: "Store of Value",
    price: 103200,
    changePct: 2.1,
    volumeShock: 1.52,
    trendScore: 74,
    momentumScore: 71,
    volumeScore: 81,
    newsScore: 63,
    fundamentalScore: 55,
    riskScore: 42
  },
  {
    symbol: "SOXL",
    assetType: "etf" as const,
    sector: "Leveraged ETF",
    theme: "Semiconductor Beta",
    price: 64.2,
    changePct: 4.2,
    volumeShock: 1.91,
    trendScore: 77,
    momentumScore: 80,
    volumeScore: 84,
    newsScore: 49,
    fundamentalScore: 30,
    riskScore: 22
  }
];

const topAsset = watchlist[0];
const topScore = scoreAsset(topAsset);
const report = buildMockResearchReport(topAsset, topScore);
const grid = simulateGridStrategy({
  symbol: "BTC",
  lowerBound: 98000,
  upperBound: 112000,
  grids: 8,
  orderSize: 1500,
  stopLoss: 94000,
  maxLoss: 6000
});
const portfolioRisk = analyzePortfolioRisk({
  cashWeight: 0.12,
  holdings: [
    { symbol: "SOXL", sector: "Semiconductors", weight: 0.35, volatility: 0.62, leverage: 3, liquidityScore: 0.9 },
    { symbol: "NVDA", sector: "Semiconductors", weight: 0.27, volatility: 0.38, leverage: 1, liquidityScore: 0.95 },
    { symbol: "BTC", sector: "Digital Asset", weight: 0.16, volatility: 0.58, leverage: 1, liquidityScore: 0.88 },
    { symbol: "USD", sector: "Cash", weight: 0.12, volatility: 0.01, leverage: 1, liquidityScore: 1 }
  ]
});

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">AI Market Command Center</p>
          <h1 className="title">개인용 퀀트 리서치 데스크</h1>
          <p className="subtitle">
            CoinEx AI Research, Investing.com, Toss 증권, Bloomberg Terminal, 퀀트 헤지펀드 리서치 워크플로우를
            참고해 설계한 개인용 시장 분석 플랫폼입니다. 투자 실행은 하지 않고, 모든 액션은 사람 승인 전제로만 제시합니다.
          </p>
          <div className="chip-row">
            <span className="chip">Human approval required</span>
            <span className="chip">No auto-trading in MVP</span>
            <span className="chip">Research-first workflow</span>
          </div>
        </div>
      </section>

      <section className="hero-statbar">
        <article className="stat-card">
          <div className="muted">Market Regime</div>
          <div className="metric">Risk-On</div>
        </article>
        <article className="stat-card">
          <div className="muted">Portfolio Risk</div>
          <div className={`metric ${portfolioRisk.level === "HIGH" ? "bad" : portfolioRisk.level === "MEDIUM" ? "warn" : "good"}`}>
            {portfolioRisk.level}
          </div>
        </article>
        <article className="stat-card">
          <div className="muted">Top Signal</div>
          <div className="metric">{topAsset.symbol}</div>
        </article>
        <article className="stat-card">
          <div className="muted">Daily Brief Status</div>
          <div className="metric good">Ready</div>
        </article>
      </section>

      <section className="section-grid">
        <article className="panel">
          <p className="eyebrow">Dashboard</p>
          <h2>시장 위젯</h2>
          <div className="widget-grid">
            {watchlist.map((asset) => (
              <div key={asset.symbol} className="widget-card">
                <div className="muted">{asset.symbol}</div>
                <div className="metric">{asset.assetType === "crypto" ? `$${asset.price.toLocaleString("en-US")}` : `$${asset.price}`}</div>
                <div className={asset.changePct >= 0 ? "good" : "bad"}>
                  {asset.changePct >= 0 ? "+" : ""}
                  {asset.changePct}%
                </div>
                <div className="muted">Volume Shock {asset.volumeShock.toFixed(2)}x</div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">AI Research</p>
          <h2>{report.symbol} 리포트</h2>
          <div className="chip-row">
            <span className="chip">{report.actionLabel}</span>
            <span className="chip">Confidence {report.confidenceScore}/100</span>
          </div>
          <div className="list">
            <div className="list-item">
              <strong>한 줄 요약</strong>
              <div className="muted">{report.summary}</div>
            </div>
            <div className="list-item">
              <strong>상승 요인</strong>
              <div className="muted">{report.bullishDrivers.join(" / ")}</div>
            </div>
            <div className="list-item">
              <strong>하락 요인</strong>
              <div className="muted">{report.bearishDrivers.join(" / ")}</div>
            </div>
            <div className="list-item">
              <strong>리스크 분석</strong>
              <div className="muted">{report.riskView}</div>
            </div>
          </div>
        </article>
      </section>

      <section className="card-grid" style={{ marginTop: 24 }}>
        <article className="module-card">
          <p className="eyebrow">Strategy Lab</p>
          <h2>Grid Trading Simulator</h2>
          <div className="list">
            <div className="list-item">
              <strong>Grid Interval</strong>
              <div className="muted">${grid.gridInterval.toFixed(2)}</div>
            </div>
            <div className="list-item">
              <strong>Expected Range</strong>
              <div className="muted">${grid.expectedProfitMin.toFixed(0)} ~ ${grid.expectedProfitMax.toFixed(0)}</div>
            </div>
            <div className="list-item">
              <strong>Risk Note</strong>
              <div className="muted">{grid.riskSummary}</div>
            </div>
          </div>
        </article>

        <article className="module-card">
          <p className="eyebrow">Risk Engine</p>
          <h2>포트폴리오 검증</h2>
          <div className="chip-row">
            <span className={`chip ${portfolioRisk.level === "HIGH" ? "bad" : portfolioRisk.level === "MEDIUM" ? "warn" : "good"}`}>
              {portfolioRisk.level}
            </span>
            <span className="chip">Cash {Math.round(portfolioRisk.cashWeight * 100)}%</span>
          </div>
          <div className="list">
            {portfolioRisk.reasons.map((reason) => (
              <div className="list-item" key={reason}>
                <div className="muted">{reason}</div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section style={{ marginTop: 24 }}>
        <article className="table-card">
          <p className="eyebrow">Watchlist</p>
          <h2>퀀트 점수 테이블</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Theme</th>
                <th>Total</th>
                <th>Action</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((asset) => {
                const scored = scoreAsset(asset);
                return (
                  <tr key={asset.symbol}>
                    <td>{asset.symbol}</td>
                    <td>{asset.theme}</td>
                    <td>{scored.totalScore}</td>
                    <td>{scored.band}</td>
                    <td>{asset.riskScore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
}
