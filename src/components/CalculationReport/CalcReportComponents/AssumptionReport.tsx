import { Stack } from "@mui/material";
import { Assumption } from "../CalculationRunTypes";
import { CalcTypography, CALC_MARGIN } from "./reportUtilities";

interface Props {
  item: Assumption;
}

export default function AssumptionReport({ item }: Props) {
  return (
    <Stack direction="row" alignItems="baseline" marginLeft={CALC_MARGIN}>
      <CalcTypography variant="overline" paddingRight="0.5em">
        {"[ASSUME]"}
      </CalcTypography>
      <CalcTypography>{item.value}</CalcTypography>
    </Stack>
  );
}
