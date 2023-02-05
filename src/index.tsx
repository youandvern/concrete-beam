import { createTheme, ThemeProvider, Container } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css?v=1";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeBar from "./components/HomeBar";

(window as any).MathJax = {
  // Lazy loading makes printing take a long long time, UX not greatly improved
  // https://docs.mathjax.org/en/latest/output/lazy.html?highlight=lazy%20loading
  // loader: { load: ["ui/lazy"] },
  output: {
    displayOverflow: "linebreak",
    linebreaks: {
      // options for when overflow is linebreak
      inline: true, // true for browser-based breaking of inline equations
      width: "100%", // a fixed size or a percentage of the container width
      lineleading: 0.2, // the default lineleading in em units
      LinebreakVisitor: null, // The LinebreakVisitor to use
    },
  },
};

let mathjaxPromise = Promise.resolve();

(function () {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@4.0.0-alpha.1/es5/tex-mml-chtml.js";
  script.async = true;
  document.head.appendChild(script);
})();

export const updateMathJax = () => {
  const typeset = (window as any).MathJax.typesetPromise;
  if (typeof typeset === "function") {
    mathjaxPromise = mathjaxPromise
      .then(() => typeset())
      .catch((err) => console.log("MathJax typesetting failed: " + err.message));
  }
  return mathjaxPromise;
};

const THEME = createTheme({
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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <HomeBar />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("headerPanel")
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
