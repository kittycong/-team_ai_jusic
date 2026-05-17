export interface DailyBriefExport {
  date: string;
  marketRegime: string;
  topSignals: string[];
  riskSummary: string;
  macroSummary: string;
  recommendedFocus: string;
}

export function buildNotionDailyBriefPayload(brief: DailyBriefExport) {
  return {
    parent: { database_id: process.env.NOTION_DATABASE_DAILY_BRIEF ?? "" },
    properties: {
      Date: { date: { start: brief.date } },
      "Market Regime": { rich_text: [{ text: { content: brief.marketRegime } }] },
      "Top Signals": { rich_text: [{ text: { content: brief.topSignals.join(", ") } }] },
      "Risk Summary": { rich_text: [{ text: { content: brief.riskSummary } }] },
      "Macro Summary": { rich_text: [{ text: { content: brief.macroSummary } }] },
      "Recommended Focus": { rich_text: [{ text: { content: brief.recommendedFocus } }] }
    }
  };
}
