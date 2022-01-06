import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { bar_diameter, bar_bend_radius } from "../utilities";
import { Line, Arc } from "react-konva";

// expected properties to draw stirrup
interface HoopProps {
  w: number;
  h: number;
  ccs: number;
  ccb: number;
  cct: number;
  barsize: number;
  stirrupcolor?: string;
}

// Stirrup component for concrete beam display
export default function StirrupHoop({
  w,
  h,
  ccs,
  ccb,
  cct,
  barsize,
  stirrupcolor = "#004aad",
}: HoopProps) {
  const [dbar, setDbar] = useState(bar_diameter(barsize));
  const [rbend, setRbend] = useState(bar_bend_radius(barsize));

  useEffect(() => {
    setDbar(bar_diameter(barsize));
    setRbend(bar_bend_radius(barsize));
  }, [barsize]);

  return (
    <>
      {/* left leg */}
      <Line
        points={[ccs + dbar / 2, cct + dbar + rbend, ccs + dbar / 2, h - ccb - dbar - rbend]}
        stroke={stirrupcolor}
        strokeWidth={dbar}
        fillAfterStrokeEnabled
      />

      <Arc
        x={ccs + dbar + rbend}
        y={cct + dbar + rbend}
        innerRadius={rbend}
        outerRadius={rbend + dbar}
        angle={90}
        fill={stirrupcolor}
        stroke={stirrupcolor}
        strokeWidth={0}
        rotation={180}
      />

      {/* top leg */}
      <Line
        points={[ccs + dbar + rbend, cct + dbar / 2, w - ccs - dbar - rbend, cct + dbar / 2]}
        stroke={stirrupcolor}
        strokeWidth={dbar}
      />

      <Arc
        x={w - ccs - dbar - rbend}
        y={cct + dbar + rbend}
        innerRadius={rbend}
        outerRadius={rbend + dbar}
        angle={90}
        fill={stirrupcolor}
        stroke={stirrupcolor}
        strokeWidth={0}
        rotation={270}
      />

      {/* right leg */}
      <Line
        points={[
          w - ccs - dbar / 2,
          cct + dbar + rbend,
          w - ccs - dbar / 2,
          h - ccb - dbar - rbend,
        ]}
        stroke={stirrupcolor}
        strokeWidth={dbar}
      />

      <Arc
        x={w - ccs - dbar - rbend}
        y={h - ccb - dbar - rbend}
        innerRadius={rbend}
        outerRadius={rbend + dbar}
        angle={90}
        fill={stirrupcolor}
        stroke={stirrupcolor}
        strokeWidth={0}
        rotation={0}
      />

      {/* bot leg */}

      <Line
        points={[
          ccs + dbar + rbend,
          h - ccb - dbar / 2,
          w - ccs - dbar - rbend,
          h - ccb - dbar / 2,
        ]}
        stroke={stirrupcolor}
        strokeWidth={dbar}
      />

      <Arc
        x={ccs + dbar + rbend}
        y={h - ccb - dbar - rbend}
        innerRadius={rbend}
        outerRadius={rbend + dbar}
        angle={90}
        fill={stirrupcolor}
        stroke={stirrupcolor}
        strokeWidth={0}
        rotation={90}
      />
    </>
  );
}
