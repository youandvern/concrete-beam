import React from "react";
import {
  Collapse,
  Container,
  Grid,
  Typography,
  Button,
  Box,
  useTheme,
  Theme,
  Stack,
  Paper,
} from "@mui/material";
import DataTable from "../DataTable";
import APIResults from "../Interfaces/APIResults";
import CalcReport from "../CalculationReport/CalcReport";

const displayResult = (
  description: string,
  varName: string,
  result: string | number,
  unit: string,
  theme: Theme
) => (
  <Box
    key={"calc-description-box-" + varName}
    padding="0.5rem"
    margin="0.5rem"
    sx={{
      borderStyle: "solid",
      borderRadius: "1rem",
      borderColor: theme.palette.grey["800"],
      backgroundColor: theme.palette.success.light,
    }}
  >
    <Typography key={`calc-description-${varName}`} fontWeight="bold" textAlign="center">
      {description}
    </Typography>
    <Typography key={`calc-result-${varName}`} align="center">
      {`\\( ${varName} = ${result} \ \\mathrm{${unit}} \\)`}
    </Typography>
  </Box>
);

// expected properties to draw beam section
interface ResultProps {
  showresult: boolean;
  getbeam: APIResults;
  getBeamSection: (maxHeight: number) => JSX.Element;
}

// Beam shape in input form for beam capacity calculation
export default function BeamResults({ showresult = false, getbeam, getBeamSection }: ResultProps) {
  const theme = useTheme();

  const printPdf = () => {
    document
      .querySelectorAll(".not-calc-report")
      .forEach((element) => element?.classList.add("no-print"));
    window.print();
    setTimeout(() => {
      document
        .querySelectorAll(".not-calc-report")
        .forEach((element) => element?.classList.remove("no-print"));
    }, 500);
  };

  const showCalculationsDiv = () => {
    document.querySelector(".print-only-calc-report")?.classList.add("show-calc-report");
  };

  const hideCalculationsDiv = () => {
    document.querySelector(".print-only-calc-report")?.classList.remove("show-calc-report");
  };

  return (
    <Collapse in={showresult}>
      <Container className="top-space">
        <div className="not-calc-report">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="1rem"
            marginRight="1rem"
          >
            <Typography variant="h2">Results:</Typography>

            <Button
              onClick={printPdf}
              variant="contained"
              color="primary"
              sx={{ height: "fit-content" }}
            >
              Print Calculation Report
            </Button>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={7}>
              <Box height="100%" display="flex" flexDirection="column" justifyContent="center">
                <DataTable
                  header_list={getbeam.reinforcementHeaders}
                  data_list={getbeam.reinforcementResults}
                  title="Reinforcement Demands at Flexural Capacity"
                />
              </Box>
            </Grid>

            <Grid item xs={5} container direction="column" spacing={0} className="justify-apart">
              <Grid item>
                {displayResult(
                  "Moment Capacity",
                  "\\phi M_n",
                  getbeam.Mn.toFixed(2),
                  "\\ kip-ft",
                  theme
                )}
                {displayResult(
                  "Shear Capacity",
                  "\\phi V_n",
                  getbeam.Vn.toFixed(2),
                  "\\ kips",
                  theme
                )}
                {displayResult("Neutral axis depth", "c", getbeam.c.toFixed(3), "\\ in", theme)}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div id="print-only-calc-report" className="print-only-calc-report">
          <CalcReport runResults={getbeam.reportItems} beamSection={getBeamSection} />
        </div>
      </Container>
    </Collapse>
  );
}
