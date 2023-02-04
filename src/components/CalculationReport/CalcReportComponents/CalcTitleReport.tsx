import { CalculationTitle } from "../CalculationRunTypes";
import { CalcTypography, getInnerCalcKey } from "./reportUtilities";

interface Props {
  item: CalculationTitle;
  index: number;
}

export default function CalcTitleReport({ item, index }: Props) {
  return (
    <CalcTypography gutterBottom key={getInnerCalcKey(index)} variant="h2">
      {item.value}
    </CalcTypography>
  );
}
