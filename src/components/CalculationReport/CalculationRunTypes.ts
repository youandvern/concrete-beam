export interface CalcTypeToParse {
  type: string;
  [key: string]: any;
}

export interface CalculationTitle {
  value?: string;
}

export interface Assumption {
  value?: string;
}

export type InputT = "number" | "select" | "text";

export interface InputVariable {
  value?: number | string;
  name?: string;
  unit?: string;
  description?: string;
  reference?: string;
  inputType?: InputT;
  numStep?: number | "any" | null;
  minValue?: number | null;
  maxValue?: number | null;
  selectOptions?: string[] | number[] | null;
  tex?: string;
}

export interface CalcVariable {
  value?: number | string;
  name?: string;
  unit?: string;
  description?: string;
  reference?: string;
  finalResult?: boolean;
  calcLength?: "long" | "number" | "short";
  symbolic?: string;
  substituted?: string;
  resultWithUnit?: string;
  error?: string | null;
}

export interface Comparison {
  value?: boolean;
  resultMessage?: string;
  unit?: string;
  description?: string;
  reference?: string;
  finalResult?: boolean; // rename finalResult
  symbolic?: string;
  substituted?: string;
  resultWithUnit?: string;
}

export interface ComparisonForced {
  unit?: string;
  description?: string;
  reference?: string;
  finalResult?: boolean;
  symbolic?: string;
}

export interface TextBlock {
  value?: string;
  reference?: string;
}

export interface BodyHeading {
  value?: string;
  reference?: string;
  level?: number;
  numbered?: boolean;
}

export interface InputTable {
  value?: (string | number | null)[][];
  name?: string;
  description?: string;
  reference?: string;
}

export interface ResultTable {
  value?: (string | number | null)[][];
  name?: string;
  description?: string;
  reference?: string;
  finalResult?: boolean;
}
