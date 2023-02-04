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
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        main: "#004aad",
        light: "#b3d4ff",
      },
      secondary: {
        main: "#faa92f",
        light: "#fccc83",
      },
      success: {
        main: "#00af54",
        light: "#d2ffc8",
      },
      error: {
        main: "#bf211e",
        light: "#ffc8cb",
      },
    },
    typography: {
      h1: {
        fontSize: "4rem",
        fontWeight: "500",
      },
      h2: {
        fontSize: "3rem",
        fontWeight: "600",
      },
      h3: {
        fontSize: "2.25rem",
        fontWeight: "600",
      },
      h4: {
        fontSize: "1.875rem",
        fontWeight: "600",
      },
      h5: {
        fontSize: "1.5rem",
        fontWeight: "700",
      },
      h6: {
        fontSize: "1rem",
        fontWeight: "700",
      },
      fontFamily: ["Sarabun", "Roboto", "Helvetica Neue", "Arial", "sans-serif"].join(","),
    },
  });

  const [showResult, setShowResult] = useState(false);
  const [getBeamSection, setGetBeamSection] = useState<(maxHeightOverride: number) => JSX.Element>(
    (n) => <></>
  );
  const [getBeam, setGetBeam] = useState<APIResults>({
    reportItems: [],
    c: 0,
    Mn: 0,
    Vn: 0,
    reinforcementHeaders: ["a", "b"],
    reinforcementResults: [[0, 1]],
  });

  return (
    <Container maxWidth="md">
      <ThemeProvider theme={theme}>
        <HomeBar />
        <IntroText />
        <BeamShapeForm
          setShowResult={setShowResult}
          setGetBeam={setGetBeam}
          setGetBeamSection={setGetBeamSection}
        />
        <BeamResults showresult={showResult} getbeam={getBeam} getBeamSection={getBeamSection} />
      </ThemeProvider>
    </Container>
  );
}

export default App;
