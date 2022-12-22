import React, { useState } from "react";
import "./App.css?v=1";
import { createTheme, ThemeProvider, Container } from "@mui/material";
import BeamShapeForm from "./components/BeamShapeForm";
import BeamResults from "./components/BeamResults";
import APIResults from "./components/Interfaces/APIResults";
import HomeBar from "./components/HomeBar";
import IntroText from "./components/IntroText";

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
    Mn: 0,
    reinforcementHeaders: ["a", "b"],
    reinforcementResults: [[0, 1]],
  });

  return (
    <Container maxWidth="md">
      <ThemeProvider theme={theme}>
        <HomeBar />
        <IntroText />
        <BeamShapeForm setShowResult={setShowResult} setGetBeam={setGetBeam} />
        <BeamResults showresult={showResult} getbeam={getBeam} />
      </ThemeProvider>
    </Container>
  );
}

export default App;
