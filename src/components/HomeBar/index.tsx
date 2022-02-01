import React from "react";
import "./style.css";
import { Container, Grid, Typography, Link } from "@mui/material/";
import HomeIcon from "@mui/icons-material/Home";
import ENCOMP from "./ENCOMP.png";

// Home bar with logo nad menu options
export default function HomeBar() {
  return (
    <Container maxWidth="md" className="page-top-padding">
      <Grid container spacing={1}>
        <Grid item xs={2}></Grid>

        <Grid item xs={8}>
          <Typography align="center">
            <a href="https://encompapp.com/">
              <img src={ENCOMP} alt="Encomp Logo"></img>
            </a>
          </Typography>
        </Grid>

        <Grid item container direction="column-reverse" xs={2}>
          <Grid item xs={3}></Grid>

          <Grid item container direction="column-reverse" xs={8}>
            <Typography align="center">
              <Link href="https://encompapp.com/">
                <HomeIcon fontSize="large" color="primary" />
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
