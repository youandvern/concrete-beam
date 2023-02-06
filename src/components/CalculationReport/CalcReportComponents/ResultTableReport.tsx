import { Box, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ResultTable } from "../CalculationRunTypes";
import { addReference, CalcTypography, CALC_MARGIN } from "./reportUtilities";

function getTable(item: (string | number | null)[][], name?: string) {
  const heading = item.slice(0, 1)[0];
  const data = item.slice(1);

  return (
    <TableContainer component={Paper}>
      <CalcTypography variant="h6" marginTop="0.5em" marginLeft="1em">
        {name}
      </CalcTypography>
      <Table>
        <TableHead>
          <TableRow>
            {heading.map((columnTitle) => (
              <TableCell key={`column-${columnTitle}`}>{columnTitle}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={`data-row-${i}`}>
              {row.map((cell, j) => (
                <TableCell key={`cell-${i}-${j}`}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface Props {
  item: ResultTable;
}

export default function ResultTableReport({ item }: Props) {
  return !item.value ? (
    <></>
  ) : (
    <>
      <Box marginLeft={CALC_MARGIN} marginY="1rem">
        {addReference(<CalcTypography>{item.description}</CalcTypography>, item.reference)}
        {getTable(item.value, item.name)}
      </Box>
    </>
  );
}
