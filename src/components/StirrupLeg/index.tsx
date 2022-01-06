import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { bar_diameter, bar_bend_radius } from "../utilities";
import { Line, Arc } from "react-konva";

// expected properties to draw stirrup
interface LegProps {
  offset: number;
  w: number;
  h: number;
  ccs: number;
  ccb: number;
  cct: number;
  barsize: number;
  stirrupcolor?: string;
}

// Stirrup component for concrete beam display
export default function StirrupLeg({
  offset,
  w,
  h,
  ccs,
  ccb,
  cct,
  barsize,
  stirrupcolor = "#004aad",
}: LegProps) {
  const [dbar, setDbar] = useState(1);
  const [rbend, setRbend] = useState(1);
  const [reverse_factor, setReverse] = useState(1);

  useEffect(() => {
    offset > (w - 2 * ccs - dbar) / 2 ? setReverse(-1) : setReverse(1);
  }, [offset, w, ccs, dbar]);

  useEffect(() => {
    setDbar(bar_diameter(barsize));
    setRbend(bar_bend_radius(barsize));
  }, [barsize]);

  return (
    <>
      {/* left leg */}
      <Line
        points={[
          offset + ccs + dbar / 2,
          cct + dbar + rbend,
          offset + ccs + dbar / 2,
          h - ccb - dbar - rbend,
        ]}
        stroke={stirrupcolor}
        strokeWidth={dbar}
        fillAfterStrokeEnabled
      />

      <Arc
        x={offset + ccs + dbar / 2 + reverse_factor * (dbar / 2 + rbend)}
        y={cct + dbar + rbend}
        innerRadius={rbend}
        outerRadius={rbend + dbar}
        angle={90}
        fill={stirrupcolor}
        stroke={stirrupcolor}
        strokeWidth={0}
        rotation={225 - 45 * reverse_factor}
      />

      <Arc
        x={offset + ccs + dbar / 2 + reverse_factor * (dbar / 2 + rbend)}
        y={h - ccb - dbar - rbend}
        innerRadius={rbend}
        outerRadius={rbend + dbar}
        angle={90}
        fill={stirrupcolor}
        stroke={stirrupcolor}
        strokeWidth={0}
        rotation={45 + 45 * reverse_factor}
      />
    </>
  );
}
