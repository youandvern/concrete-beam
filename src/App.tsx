import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import BeamShapeForm from "./components/BeamShapeForm";

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
  return (
    <ThemeProvider theme={theme}>
      <BeamShapeForm />
    </ThemeProvider>
  );
}

export default App;
