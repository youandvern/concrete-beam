// Latex notes:
// \\  --> Line break
// \\[4pt] --> Line break with 4pt line spacing

import { Stack, styled, Typography } from "@mui/material";

// & --> alignment reference
export const BEGIN_ALIGN = "\\begin{align}";
export const END_ALIGN = "\\end{align}";
export const ALIGN = "&";
export const LINE_BREAK = "\\\\[4pt]";
export const CALC_MARGIN = "2rem";

export const getCalcKey = (index: number) => `calc-item-${index}`;
export const getInnerCalcKey = (index: number) => `inner-${getCalcKey(index)}`;

export const CalcTypography = styled(Typography)(() => ({
  fontFamily: "serif",
}));

export const wrapMathString = (tex: string) => `\\( ${tex} \\)`;
export const wrapMathEquationString = (tex: string) => `\\[ ${tex} \\]`;
export const wrapAlignment = (tex: string) => `${BEGIN_ALIGN} ${tex} ${END_ALIGN}`;

export const addReference = (mainContent: JSX.Element, reference?: string) => (
  <Stack direction="row" justifyContent="space-between">
    <div>{mainContent}</div>
    {reference && (
      <div>
        <CalcTypography>{`[${reference}]`}</CalcTypography>
      </div>
    )}
  </Stack>
);
