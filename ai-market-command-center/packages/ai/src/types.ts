export type ActionLabel = "Buy Candidate" | "Hold" | "Watch" | "Reduce Risk";

export interface ResearchInput {
  symbol: string;
  assetType: "equity" | "crypto" | "etf" | "fx" | "macro";
  sector: string;
  theme: string;
  price: number;
  changePct: number;
  volumeShock: number;
  trendScore: number;
  momentumScore: number;
  volumeScore: number;
  newsScore: number;
  fundamentalScore: number;
  riskScore: number;
}

export interface ResearchReport {
  symbol: string;
  summary: string;
  bullishDrivers: string[];
  bearishDrivers: string[];
  technicalView: string;
  fundamentalView: string;
  riskView: string;
  actionLabel: ActionLabel;
  confidenceScore: number;
}
