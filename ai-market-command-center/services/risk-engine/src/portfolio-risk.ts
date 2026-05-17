export interface HoldingRiskInput {
  symbol: string;
  sector: string;
  weight: number;
  volatility: number;
  leverage: number;
  liquidityScore: number;
}

export interface PortfolioRiskInput {
  holdings: HoldingRiskInput[];
  cashWeight: number;
}

export interface PortfolioRiskOutput {
  level: "LOW" | "MEDIUM" | "HIGH";
  cashWeight: number;
  concentration: number;
  sectorConcentration: number;
  leverageExposure: number;
  reasons: string[];
}

export function analyzePortfolioRisk(input: PortfolioRiskInput): PortfolioRiskOutput {
  const concentration = Math.max(...input.holdings.map((item) => item.weight), 0);

  const bySector = new Map<string, number>();
  for (const holding of input.holdings) {
    bySector.set(holding.sector, (bySector.get(holding.sector) ?? 0) + holding.weight);
  }
  const sectorConcentration = Math.max(...bySector.values(), 0);
  const leverageExposure = input.holdings.reduce((sum, item) => sum + item.weight * item.leverage, 0);

  const reasons: string[] = [];
  if (concentration >= 0.3) reasons.push(`단일 종목 집중도 ${Math.round(concentration * 100)}%`);
  if (sectorConcentration >= 0.5) reasons.push(`섹터 편중 ${Math.round(sectorConcentration * 100)}%`);
  if (input.cashWeight < 0.15) reasons.push(`현금 비중 부족 ${Math.round(input.cashWeight * 100)}%`);
  if (leverageExposure >= 1.4) reasons.push(`레버리지 노출 ${leverageExposure.toFixed(2)}x`);
  if (input.holdings.some((item) => item.volatility >= 0.55)) reasons.push("고변동성 자산 노출");
  if (input.holdings.some((item) => item.liquidityScore < 0.6)) reasons.push("유동성 취약 자산 포함");

  const level =
    reasons.length >= 4 ? "HIGH" :
    reasons.length >= 2 ? "MEDIUM" :
    "LOW";

  return {
    level,
    cashWeight: input.cashWeight,
    concentration,
    sectorConcentration,
    leverageExposure,
    reasons
  };
}
