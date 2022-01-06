import React from "react";
import "./style.css";
import {
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material/";

// expected properties given to DataTable
interface TableProps {
  header_list: string[];
  data_list: number[][];
  title?: string;
}

// Data table to display 2d data for concrete beam design results
export default function DataTable({ header_list, data_list, title = "" }: TableProps) {
  return (
    <TableContainer component={Paper}>
      <Typography className="title-text" variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <Table size="small" aria-label="custom table">
        <TableHead>
          <TableRow>
            {header_list.map((header, hindex) => (
              <TableCell
                className="title-text"
                key={"header" + hindex}
                dangerouslySetInnerHTML={{ __html: header }}
              ></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data_list.map((row, rindex) => (
            <TableRow key={"datarow" + rindex}>
              {row.map((col, cindex) => (
                <TableCell key={"data" + rindex + "-" + cindex}>{col}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
