import React from "react";
import "./style.css";
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material/";

// expected properties given to NumInput
interface NumProps {
  label?: string;
  value?: number;
  onChange?: ((a: number) => number) | React.Dispatch<React.SetStateAction<number>>;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
}

// typical number input for concrete beam design form
export default function NumInput({
  label = "label",
  value = 1,
  onChange = (a: number) => a,
  unit = "in",
  min = 0,
  max = 10,
  step = 1,
}: NumProps) {
  return (
    // outlined group of label and input
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        label={label}
        value={value}
        // change the value whenever the input is changed (restrict within min/max bounds)
        onChange={(e) =>
          onChange(
            Number(e.target.value) <= max && Number(e.target.value) >= min
              ? Number(e.target.value)
              : min
          )
        }
        // add unit to the end
        endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
        aria-describedby="standard-weight-helper-text"
        type="number"
        inputProps={{
          min: min,
          max: max,
          step: step,
        }}
      />
    </FormControl>
  );
}
