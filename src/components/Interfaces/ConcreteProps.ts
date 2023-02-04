export default interface ConcreteProps {
  fc: number;
  fy: number;
  Es: number;
  b: number;
  h: number;
  nShearBars: number;
  spacingShearBars: number;
  sizeShearBars: BarSizeT;
}

export type BarSizeT =
  | "\\#3"
  | "\\#4"
  | "\\#5"
  | "\\#6"
  | "\\#7"
  | "\\#8"
  | "\\#9"
  | "\\#10"
  | "\\#11"
  | "\\#14"
  | "\\#18";
