import { Box } from "@mui/material";
import { ComparisonForced } from "../CalculationRunTypes";
import {
  addReference,
  CalcTypography,
  CALC_MARGIN,
  wrapMathEquationString,
} from "./reportUtilities";

interface Props {
  item: ComparisonForced;
}

export default function CheckVariablesTextReport({ item }: Props) {
  return (
    <Box marginLeft={CALC_MARGIN}>
      {item.description && <CalcTypography marginTop="0.5rem">{item.description}:</CalcTypography>}
      {addReference(
        <CalcTypography>{wrapMathEquationString(`\\rightarrow ${item.symbolic}`)}</CalcTypography>,
        item.reference
      )}
    </Box>
  );
}
