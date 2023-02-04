import { Box } from "@mui/material";
import { TextBlock } from "../CalculationRunTypes";
import { addReference, CALC_MARGIN, CalcTypography } from "./reportUtilities";

interface Props {
  item: TextBlock;
}

export default function BodyTextReport({ item }: Props) {
  return item.value ? (
    <Box marginLeft={CALC_MARGIN} marginTop="0.5rem">
      {addReference(<CalcTypography>{item.value}</CalcTypography>, item.reference)}
    </Box>
  ) : (
    <></>
  );
}
