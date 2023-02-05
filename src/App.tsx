import React, { useState } from "react";
import "./App.css?v=1";
import { Container } from "@mui/material";
import BeamShapeForm from "./components/BeamShapeForm";
import BeamResults from "./components/BeamResults";
import APIResults from "./components/Interfaces/APIResults";

function App() {
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
      <BeamShapeForm
        setShowResult={setShowResult}
        setGetBeam={setGetBeam}
        setGetBeamSection={setGetBeamSection}
      />
      <BeamResults showresult={showResult} getbeam={getBeam} getBeamSection={getBeamSection} />
    </Container>
  );
}

export default App;
