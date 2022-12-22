export default interface APIResults {
  reinforcementHeaders: string[];
  reinforcementResults: number[][];
  Mn: number;
  c: number;
}

export interface APIResultsUnparced {
  allItems: AllItems;
  summary: SummaryResults;
}

interface SummaryResults {
  reinforcement: any[][];
  Mn: number;
  c: number;
}

interface AllItems {
  [key: string]: any;
}
