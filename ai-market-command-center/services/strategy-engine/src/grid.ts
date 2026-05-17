export interface GridStrategyInput {
  symbol: string;
  lowerBound: number;
  upperBound: number;
  grids: number;
  orderSize: number;
  stopLoss: number;
  maxLoss: number;
}

export interface GridStrategyResult {
  symbol: string;
  gridInterval: number;
  capitalRequired: number;
  expectedProfitMin: number;
  expectedProfitMax: number;
  worstCaseLoss: number;
  riskSummary: string;
}

export function simulateGridStrategy(input: GridStrategyInput): GridStrategyResult {
  const gridInterval = (input.upperBound - input.lowerBound) / input.grids;
  const capitalRequired = input.orderSize * input.grids;
  const expectedProfitMin = gridInterval * 0.35 * input.grids;
  const expectedProfitMax = gridInterval * 0.9 * input.grids;
  const worstCaseLoss = Math.min(input.maxLoss, Math.max(0, input.lowerBound - input.stopLoss) * (input.orderSize / input.lowerBound) * input.grids);

  return {
    symbol: input.symbol,
    gridInterval,
    capitalRequired,
    expectedProfitMin,
    expectedProfitMax,
    worstCaseLoss,
    riskSummary:
      worstCaseLoss >= input.maxLoss * 0.9
        ? "최대 손실 한도에 근접하므로 범위를 더 좁히거나 주문 크기를 줄이는 편이 안전합니다."
        : "설정 범위 안에서는 운영 가능하지만, 급격한 추세 장에서는 손절 규칙을 우선해야 합니다."
  };
}
