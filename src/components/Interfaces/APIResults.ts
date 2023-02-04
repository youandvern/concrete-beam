import { CalcTypeToParse } from "../CalculationReport/CalculationRunTypes";

export default interface APIResults {
  reportItems: CalcTypeToParse[];
  reinforcementHeaders: string[];
  reinforcementResults: number[][];
  Mn: number;
  Vn: number;
  c: number;
}

export interface APIResultsUnparced {
  allItems: CalcTypeToParse[];
  summary: SummaryResults;
}

interface SummaryResults {
  reinforcement: any[][];
  Mn: number;
  Vn: number;
  c: number;
}
