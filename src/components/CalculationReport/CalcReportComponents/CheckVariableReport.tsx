import { Box } from "@mui/material";
import { Comparison } from "../CalculationRunTypes";
import {
  addReference,
  ALIGN,
  CALC_MARGIN,
  CalcTypography,
  LINE_BREAK,
  wrapAlignment,
  wrapMathEquationString,
} from "./reportUtilities";

interface Props {
  item: Comparison;
}

export default function CheckVariableReport({ item }: Props) {
  return (
    <Box marginLeft={CALC_MARGIN}>
      {item.description && <CalcTypography marginTop="0.5rem">{item.description}:</CalcTypography>}
      {addReference(
        <CalcTypography>
          {wrapMathEquationString(
            wrapAlignment(
              `Check ${item.symbolic} ${LINE_BREAK} ${item.substituted}
          ${LINE_BREAK} ${ALIGN} \\therefore ${item.resultMessage}`
            )
          )}
        </CalcTypography>,
        item.reference
      )}
    </Box>
  );
}
