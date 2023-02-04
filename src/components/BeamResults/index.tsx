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
  return (
    <Collapse in={showresult}>
      <Container className="top-space">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="1rem"
        >
          <Typography variant="h2">Results:</Typography>

          <Button variant="outlined" color="primary" disabled sx={{ height: "fit-content" }}>
            Show Calculation Report (coming soon)
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
                "kip-ft",
                theme
              )}
              {displayResult("Shear Capacity", "\\phi V_n", getbeam.Vn.toFixed(2), "kips", theme)}
              {displayResult("Neutral axis depth", "c", getbeam.c.toFixed(3), "in", theme)}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CalcReport runResults={getbeam.reportItems} beamSection={getBeamSection} />
          </Grid>
        </Grid>
      </Container>
    </Collapse>
  );
}
