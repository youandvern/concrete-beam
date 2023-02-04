import { Box, Stack } from "@mui/material";
import { InputVariable } from "../CalculationRunTypes";
import { CalcTypography, CALC_MARGIN, wrapMathString } from "./reportUtilities";

interface Props {
  item: InputVariable;
}

export default function DeclareVariableReport({ item }: Props) {
  return item.tex ? (
    <Stack direction="row" justifyContent="flex-start" marginLeft={CALC_MARGIN}>
      {item.description ? (
        <CalcTypography display="inline-block" lineHeight={1} marginBottom="1em" width="350px">
          {item.description};
        </CalcTypography>
      ) : (
        <Box width="350px"></Box>
      )}
      <CalcTypography>{wrapMathString(item.tex)}</CalcTypography>
    </Stack>
  ) : (
    <></>
  );
}
