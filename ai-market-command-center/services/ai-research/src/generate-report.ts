import type { ResearchInput, ResearchReport, ActionLabel } from "@amcc/ai/types";
import type { QuantScore } from "@amcc/analytics/scoring";

function pickActionLabel(score: number): ActionLabel {
  if (score >= 80) return "Buy Candidate";
  if (score >= 65) return "Watch";
  if (score >= 50) return "Hold";
  return "Reduce Risk";
}

export function buildMockResearchReport(input: ResearchInput, score: QuantScore): ResearchReport {
  const actionLabel = pickActionLabel(score.totalScore);
  const confidenceScore = Math.max(45, Math.min(92, score.totalScore - Math.round((100 - input.riskScore) * 0.15)));

  return {
    symbol: input.symbol,
    summary:
      actionLabel === "Buy Candidate"
        ? `${input.symbol}는 추세와 거래량이 함께 지지되는 강한 후보지만, 실행 전 포지션 규모와 이벤트 리스크 검증이 필요합니다.`
        : actionLabel === "Watch"
          ? `${input.symbol}는 유효한 강점이 있으나 가격 기대치 또는 변동성 때문에 관찰 우선이 적절합니다.`
          : actionLabel === "Hold"
            ? `${input.symbol}는 방향성 신호가 혼재되어 즉시 확대보다 기존 포지션 관리 관점이 적절합니다.`
            : `${input.symbol}는 현재 구조상 리스크가 우위라 노출 축소 또는 신규 진입 보류가 더 합리적입니다.`,
    bullishDrivers: [
      `추세 점수 ${score.trend} / 모멘텀 점수 ${score.momentum}`,
      `거래량 충격 ${input.volumeShock.toFixed(2)}x`,
      `${input.theme} 테마 노출`
    ],
    bearishDrivers: [
      `리스크 점수 ${score.risk}로 방어력이 완전하지 않음`,
      `뉴스 점수 ${score.news}는 재료 강도가 제한적일 수 있음`,
      `실행 전 포트폴리오 편중 여부 추가 점검 필요`
    ],
    technicalView: `가격 변화율 ${input.changePct}%와 추세 점수 ${score.trend}를 보면 단기 방향성은 ${score.trend >= 70 ? "우상향 우위" : score.trend >= 55 ? "중립 이상" : "약화"}입니다.`,
    fundamentalView: `펀더멘털 점수 ${score.fundamental} 기준으로 ${input.sector} 내 상대 강도는 ${score.fundamental >= 70 ? "양호" : score.fundamental >= 50 ? "평균적" : "취약"}입니다.`,
    riskView: `리스크 점수 ${score.risk}와 자산 유형 ${input.assetType}를 고려하면 변동성 관리와 포지션 한도 설정이 중요합니다.`,
    actionLabel,
    confidenceScore
  };
}
