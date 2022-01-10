import React, { useState } from "react";
import "./App.css";
import { createTheme, ThemeProvider, Container } from "@mui/material";
import BeamShapeForm from "./components/BeamShapeForm";
import BeamResults from "./components/BeamResults";
import APIResults from "./components/Interfaces/APIResults";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#004aad",
      },
      secondary: {
        main: "#faa92f",
      },
    },
  });

  const [showResult, setShowResult] = useState(false);
  const [getBeam, setGetBeam] = useState<APIResults>({
    c: 0,
    "\\phi M_n": 0,
    reinforcementHeaders: ["a", "b"],
    reinforcementResults: [[0, 1]],
  });

  return (
    <Container maxWidth="md">
      <ThemeProvider theme={theme}>
        <BeamShapeForm setShowResult={setShowResult} setGetBeam={setGetBeam} />
        <BeamResults showresult={showResult} getbeam={getBeam} />
      </ThemeProvider>
    </Container>
  );
}

export default App;
