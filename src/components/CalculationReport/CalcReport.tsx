import { Box, SxProps } from "@mui/material";
import {
  Assumption,
  BodyHeading,
  TextBlock,
  CalcTypeToParse,
  CalculationTitle,
  CalcVariable,
  Comparison,
  ComparisonForced,
  InputVariable,
  ResultTable,
  InputTable,
} from "./CalculationRunTypes";
import BodyTextReport from "./CalcReportComponents/BodyTextReport";
import CalcTitleReport from "./CalcReportComponents/CalcTitleReport";
import AssumptionReport from "./CalcReportComponents/AssumptionReport";
import DeclareVariableReport from "./CalcReportComponents/DeclareVariableReport";
import BodyHeaderReport from "./CalcReportComponents/BodyHeaderReport";
import CalcVariableReport from "./CalcReportComponents/CalcVariableReport";
import CheckVariableReport from "./CalcReportComponents/CheckVariableReport";
import CheckVariablesTextReport from "./CalcReportComponents/CheckVariablesTextReport";
import { getCalcKey } from "./CalcReportComponents/reportUtilities";
import { useEffect, useState } from "react";
import { updateMathJax } from "../..";
import ResultTableReport from "./CalcReportComponents/ResultTableReport";
import InputTableReport from "./CalcReportComponents/InputTableReport";

const headLevelToFontSize = {
  1: "2rem",
  2: "1.75rem",
  3: "1.55rem",
  4: "1.4rem",
  5: "1.25rem",
} as {
  [key: number]: string;
};

const getFontSizeForHeadLevel = (level: number) =>
  level > 0 && level < 6 ? headLevelToFontSize[level] : "1.25rem";

const incrementAndGetHeaderCount = (headerCounts: number[], level: number) => {
  const headerIndex = level - 1;
  const currentSize = headerCounts.length;

  if (level >= 1) {
    if (currentSize < level) {
      for (let i = currentSize; i < level; i++) {
        headerCounts[i] = 0;
      }
    }

    headerCounts[headerIndex] = (headerCounts[headerIndex] || 0) + 1;
    headerCounts = headerCounts.slice(0, level);
  }
  return headerCounts;
};

const SectionDisplay = (section: (maxHeight: number) => JSX.Element) => (
  <Box display="flex" justifyContent="center" className="no-break">
    {section(300)}
  </Box>
);

interface Props {
  runResults: CalcTypeToParse[];
  beamSection: (maxHeight: number) => JSX.Element;
}

// TODO: allow calc title in addition to template title in calc report
export default function CalcReport({ runResults, beamSection }: Props) {
  // const runResults = useAppSelector(getCalculationRunResults)?.items;
  let headerCounts = [0];

  // update mathjax whenever math containing items change
  useEffect(() => {
    updateMathJax();
  }, [runResults]);

  return (
    <Box maxWidth="980px">
      {runResults &&
        runResults.map((item, index) => {
          switch (item.type) {
            case "Title":
              return (
                <CalcTitleReport
                  item={item as CalculationTitle}
                  index={index}
                  key={getCalcKey(index)}
                />
              );
            case "Assumption":
              return <AssumptionReport item={item as Assumption} key={getCalcKey(index)} />;
            case "Input":
              return <DeclareVariableReport item={item as InputVariable} key={getCalcKey(index)} />;
            case "Heading":
              const parsedBH = item as BodyHeading;
              const levelNum = parsedBH.level || 0;
              headerCounts = item.numbered
                ? incrementAndGetHeaderCount(headerCounts, levelNum)
                : headerCounts;
              const headerNumber = item.numbered ? headerCounts.join(".") + "." : undefined;
              const fontSize = getFontSizeForHeadLevel(levelNum);
              const insertBeamSection = parsedBH.value === "Beam Section";
              return (
                <>
                  <BodyHeaderReport
                    item={parsedBH}
                    fontSize={fontSize}
                    headerNumber={headerNumber}
                    key={getCalcKey(index)}
                  />
                  {insertBeamSection && SectionDisplay(beamSection)}
                </>
              );
            case "TextBlock":
              return <BodyTextReport item={item as TextBlock} key={getCalcKey(index)} />;
            case "Calculation":
              return <CalcVariableReport item={item as CalcVariable} key={getCalcKey(index)} />;
            case "Comparison":
              return <CheckVariableReport item={item as Comparison} key={getCalcKey(index)} />;
            case "ComparisonForced":
              return (
                <CheckVariablesTextReport item={item as ComparisonForced} key={getCalcKey(index)} />
              );
            case "ResultTable":
              return <ResultTableReport item={item as ResultTable} key={getCalcKey(index)} />;
            case "InputTable":
              return <InputTableReport item={item as InputTable} key={getCalcKey(index)} />;
            default:
              return null;
          }
        })}
    </Box>
  );
}
