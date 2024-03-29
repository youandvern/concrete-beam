import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import "./style.css";
import NumInput from "../NumInput";
import NumSlider from "../NumSlider";
import BeamSection from "../BeamSection";
import { FetchResults } from "../FetchResults";
import { bar_area, bar_diameter } from "../utilities";
import BarsWithProps from "../Interfaces/BarsWithProps";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ConcreteProps, { BarSizeT } from "../Interfaces/ConcreteProps";
import APIResults from "../Interfaces/APIResults";

// expected properties to draw beam section
interface FormProps {
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setGetBeam: React.Dispatch<React.SetStateAction<APIResults>>;
  setGetBeamSection: React.Dispatch<React.SetStateAction<(n: number) => JSX.Element>>;
}

// Beam shape in input form for beam capacity calculation
export default function BeamShapeForm({ setShowResult, setGetBeam, setGetBeamSection }: FormProps) {
  const [fc, setFc] = useState(4000);
  const [fy, setFy] = useState(60);
  const [w, setW] = useState(12);
  const [h, setH] = useState(24);
  const [nbars, setNbars] = useState(3);
  const [barsize, setBarsize] = useState(6);
  const [side_cover, setSide_cover] = useState(1.5);
  const [bot_cover, setBot_cover] = useState(1.5);
  const [maxwidth, setMaxwidth] = useState(window.innerWidth / 4);
  const [maxheight, setMaxheight] = useState(window.innerHeight / 2);

  const [nbarst, setNbarst] = useState(0);
  const [barsizet, setBarsizet] = useState(4);
  const [top_cover, setTop_cover] = useState(1.5);
  const [nlegs, setNlegs] = useState(0);
  const [legsize, setLegsize] = useState(3);
  const [legspacing, setLegspacing] = useState(8);

  const [resultsLoading, setResultsLoading] = useState(false);

  const beamGridRef = useRef<HTMLDivElement>(null);

  const [barProps, setBarProps] = useState<BarsWithProps>({});

  // need to setBarProps whenever props change
  useEffect(() => {
    //(w, h, nbars, barsize, side_cover, bot_cover, top_cover, maxheight, maxwidth, nbarst, barsizet, nlegs=0, legsize=4) {
    const genprops = {} as BarsWithProps;
    let i = 0;
    const dleg = nlegs < 2 ? 0 : bar_diameter(legsize); // diameter of stirrup leg bars

    const dbar = bar_diameter(barsize);
    const bary = h - bot_cover - dleg - dbar / 2;

    const dbart = bar_diameter(barsizet);
    const baryt = top_cover + dleg + dbart / 2;

    const keyname = "Bar #";

    // set up bot bar positions
    if (nbars > 1) {
      const sbar = (w - 2 * side_cover - 2 * dleg - dbar) / (nbars - 1);
      for (; i < nbars; i++) {
        genprops[keyname + i] = {
          x: side_cover + dleg + dbar / 2 + i * sbar,
          y: bary,
          barArea: bar_area(barsize),
          rbar: dbar / 2,
          id: keyname + i,
        };
      }
    } else {
      genprops[keyname + i] = {
        x: w / 2,
        y: bary,
        barArea: bar_area(barsize),
        rbar: dbar / 2,
        id: keyname + i,
      };
      i++;
    }

    // set up top bar positions
    if (nbarst > 1) {
      const sbart = (w - 2 * side_cover - 2 * dleg - dbart) / (nbarst - 1);
      for (; i < nbarst + nbars; i++) {
        genprops[keyname + i] = {
          x: side_cover + dleg + dbart / 2 + (i - nbars) * sbart,
          y: baryt,
          barArea: bar_area(barsizet),
          rbar: dbart / 2,
          id: keyname + i,
        };
      }
    } else if (nbarst === 1) {
      genprops[keyname + i] = {
        x: w / 2,
        y: baryt,
        barArea: bar_area(barsizet),
        rbar: dbart / 2,
        id: keyname + i,
      };
    }

    setBarProps(genprops);
  }, [nlegs, legsize, barsize, h, bot_cover, barsizet, top_cover, nbars, nbarst, w, side_cover]);

  const updateResult = useCallback(() => {
    setResultsLoading(true);
    const concrete_props: ConcreteProps = {
      fc: fc,
      fy: fy,
      Es: 29000,
      b: w,
      h: h,
      nShearBars: nlegs,
      spacingShearBars: legspacing,
      sizeShearBars: `\\#${legsize}` as BarSizeT,
    };

    FetchResults(barProps, concrete_props).then((result) => {
      setShowResult(result.show);
      setGetBeam(result.data);
      setTimeout(() => {
        setResultsLoading(false);
      }, 100);
    });
  }, [fc, fy, w, h, barProps, nlegs, legsize, legspacing, setShowResult, setGetBeam]);

  // reset beam section scaling to fit inside component when window size changes
  useEffect(() => {
    function resizeBeam() {
      if (beamGridRef.current !== null) {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const portraitOrientation = windowHeight / windowWidth > 1.0;
        setMaxwidth(beamGridRef.current.clientWidth);
        setMaxheight(
          Math.min(
            beamGridRef.current.clientWidth * 2,
            portraitOrientation ? 300 : 0.75 * window.innerHeight
          )
        );
      }
    }

    resizeBeam();
    window.addEventListener("resize", resizeBeam);
    window.addEventListener("load", resizeBeam);

    return () => {
      window.removeEventListener("resize", resizeBeam);
      window.removeEventListener("load", resizeBeam);
    };
  }, []);

  // hide results if any input changes
  useEffect(() => {
    setShowResult(false);
  }, [
    nbars,
    barsize,
    nbarst,
    barsizet,
    side_cover,
    bot_cover,
    top_cover,
    w,
    h,
    nlegs,
    legsize,
    legspacing,
    fc,
    fy,
    setShowResult,
  ]);

  const max_side_cover = w / 2 - bar_diameter(barsize);
  const max_bot_cover = h - bar_diameter(barsize);
  const max_top_cover = h - bar_diameter(barsizet);

  const getBeamSection = (maxHeightOverride: number | null) => (
    <BeamSection
      width={w}
      height={h}
      side_cover={side_cover}
      bot_cover={bot_cover}
      top_cover={top_cover}
      maxwidth={maxwidth}
      maxheight={maxHeightOverride || maxheight}
      nlegs={nlegs}
      legsize={legsize}
      bar_props={barProps}
      setBarState={setBarProps}
    />
  );

  useEffect(() => {
    setGetBeamSection(() => getBeamSection);
  }, [
    w,
    h,
    side_cover,
    bot_cover,
    top_cover,
    maxwidth,
    maxheight,
    nlegs,
    legsize,
    barProps,
    setBarProps,
    setGetBeamSection,
  ]);

  return (
    <div className="not-calc-report">
      <Grid container className="small-margins" spacing={3} marginBottom="2rem">
        <Grid item xs={12} md={4} ref={beamGridRef}>
          {getBeamSection(null)}
        </Grid>
        <Grid item xs={0} md={1}></Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <NumInput
                label="Concrete Strength"
                value={fc}
                onChange={setFc}
                unit="psi"
                min={0}
                max={12000}
                step={500}
              />
            </Grid>

            <Grid item xs={6}>
              <NumInput
                label="Steel Strength"
                value={fy}
                onChange={setFy}
                unit="ksi"
                min={0}
                max={200}
                step={20}
              />
            </Grid>

            <Grid item xs={6}>
              <NumInput label="Beam Width" value={w} onChange={setW} min={1} max={48} />
            </Grid>

            <Grid item xs={6}>
              <NumInput label="Beam Height" value={h} onChange={setH} unit="in" min={1} max={72} />
            </Grid>

            <Grid item xs={12}>
              <NumSlider
                label="Number of Bars:"
                value={nbars}
                onChange={setNbars}
                min={1}
                max={25}
                step={1}
              />
            </Grid>

            <Grid item xs={12}>
              <NumSlider
                label="Bar Size (US):"
                value={barsize}
                onChange={setBarsize}
                min={3}
                max={11}
                step={1}
              />
            </Grid>

            <Grid item xs={6}>
              <NumInput
                label="Side Clear Cover"
                value={side_cover}
                onChange={setSide_cover}
                unit="in"
                min={0}
                max={max_side_cover}
                step={0.25}
              />
            </Grid>

            <Grid item xs={6}>
              <NumInput
                label="Bottom Clear Cover"
                value={bot_cover}
                onChange={setBot_cover}
                unit="in"
                min={0}
                max={max_bot_cover}
                step={0.25}
              />
            </Grid>

            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Top Reinforcement</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12}>
                      <NumSlider
                        label="Number of Top Bars:"
                        value={nbarst}
                        onChange={setNbarst}
                        min={0}
                        max={25}
                        step={1}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <NumSlider
                        label="Top Bar Size (US):"
                        value={barsizet}
                        onChange={setBarsizet}
                        min={3}
                        max={11}
                        step={1}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <NumInput
                        label="Top Clear Cover"
                        value={top_cover}
                        onChange={setTop_cover}
                        unit="in"
                        min={0}
                        max={max_top_cover}
                        step={0.25}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Shear Reinforcement</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12}>
                      <NumSlider
                        label="Number of Stirrup Legs:"
                        value={nlegs}
                        onChange={setNlegs}
                        min={0}
                        max={12}
                        step={1}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <NumSlider
                        label="Stirrup Leg Size (US):"
                        value={legsize}
                        onChange={setLegsize}
                        min={3}
                        max={8}
                        step={1}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <NumInput
                        label="Stirrup Leg Spacing"
                        value={legspacing}
                        onChange={setLegspacing}
                        unit="in"
                        min={0}
                        max={100}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <br />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            disabled={resultsLoading}
            fullWidth
            color="primary"
            onClick={updateResult}
          >
            {resultsLoading ? (
              <>
                Loading Results...{" "}
                <CircularProgress color="inherit" size="1rem" sx={{ marginLeft: "1rem" }} />
              </>
            ) : (
              "Calculate!"
            )}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
