import type { ResearchInput } from "@amcc/ai/types";

export interface QuantScore {
  totalScore: number;
  trend: number;
  momentum: number;
  volume: number;
  news: number;
  fundamental: number;
  risk: number;
  band: "강한 후보" | "관찰" | "중립" | "약세";
}

export function scoreAsset(input: ResearchInput): QuantScore {
  const totalScore = Math.round(
    input.trendScore * 0.25 +
    input.momentumScore * 0.2 +
    input.volumeScore * 0.15 +
    input.newsScore * 0.15 +
    input.fundamentalScore * 0.15 +
    input.riskScore * 0.1
  );

  const band =
    totalScore >= 80 ? "강한 후보" :
    totalScore >= 65 ? "관찰" :
    totalScore >= 50 ? "중립" :
    "약세";

  return {
    totalScore,
    trend: input.trendScore,
    momentum: input.momentumScore,
    volume: input.volumeScore,
    news: input.newsScore,
    fundamental: input.fundamentalScore,
    risk: input.riskScore,
    band
  };
}
