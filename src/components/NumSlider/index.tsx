import React from "react";
import "./style.css";
import { Grid, Typography, Slider, TextField } from "@mui/material/";

// expected properties given to NumSlider
interface SlideProps {
  label?: string;
  value?: number;
  onChange?: ((a: number | number[]) => void) | React.Dispatch<React.SetStateAction<any>>;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
}

// typical slider for discrete number inputs for concrete beam design form
export default function NumSlider({
  label = "label",
  value = 1,
  min = 0,
  max = 10,
  step = 1,
  marks = true,
  onChange = (a: number | number[]) => a,
}: SlideProps) {
  return (
    // grid to group label and slider left of value display
    <Grid container spacing={3} alignItems="flex-start">
      <Grid item xs={10}>
        <Typography variant="caption" color="textSecondary" gutterBottom>
          {label}
          <Slider
            value={value}
            aria-labelledby="num-slider"
            min={min}
            max={max}
            step={step}
            marks={marks}
            valueLabelDisplay="auto"
            onChange={(e, val) => onChange(val)}
          />
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <TextField disabled fullWidth value={value} margin="normal" />
      </Grid>
    </Grid>
  );
}
