import React from "react";
import { Collapse, Container, Grid, Typography, Button } from "@mui/material";
import DataTable from "../DataTable";
import APIResults from "../Interfaces/APIResults";

// expected properties to draw beam section
interface ResultProps {
  showresult: boolean;
  getbeam: APIResults;
}

// Beam shape in input form for beam capacity calculation
export default function BeamResults({ showresult = false, getbeam }: ResultProps) {
  return (
    <Collapse in={showresult}>
      <Container className="top-space">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <DataTable
              header_list={getbeam.reinforcementHeaders}
              data_list={getbeam.reinforcementResults}
              title="Reinforcement Bar Properties at Section Capacity"
            />
          </Grid>

          <Grid item xs={6} container direction="column" spacing={0} className="justify-apart">
            <Grid item>
              <Typography variant="h5" gutterBottom>
                Section Capacity (&Phi;M<sub>n</sub>) = {getbeam.Mn.toFixed(2)} kip-ft
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Neutral Axis Depth (c) = {getbeam.c.toFixed(3)} in
              </Typography>
            </Grid>

            <Grid item>
              <Button variant="outlined" fullWidth color="primary" disabled>
                Show Calculation Report (coming soon)
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Collapse>
  );
}
