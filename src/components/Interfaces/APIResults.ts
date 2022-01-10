export default interface APIResults {
  reinforcementHeaders: string[];
  reinforcementResults: number[][];
  "\\phi M_n": number;
  c: number;
}

export interface APIResultsUnparced {
  ReinforcementResults: any[][];
  "\\phi M_n": number;
  c: number;
}
