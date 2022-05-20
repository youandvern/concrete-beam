import React from "react";
import { useState, useEffect, useRef } from "react";
import "./style.css";
import StirrupHoop from "../StirrupHoop";
import StirrupLeg from "../StirrupLeg";
import { bar_diameter } from "../utilities";
import { Stage, Layer, Rect, Circle } from "react-konva";
import BarsWithProps from "../Interfaces/BarsWithProps";

// expected properties to draw beam section
interface SectionProps {
  width: number;
  height: number;
  side_cover: number;
  bot_cover: number;
  top_cover: number;
  maxheight: number;
  maxwidth: number;
  nlegs?: number;
  legsize?: number;
  bar_props: BarsWithProps;
  setBarState: (value: React.SetStateAction<{}>) => void;
}

// Beam section to display form inputs
export default function BeamSection({
  width,
  height,
  side_cover,
  bot_cover,
  top_cover,
  maxheight,
  maxwidth,
  nlegs = 0,
  legsize = 4,
  bar_props,
  setBarState,
}: SectionProps) {
  const border = Math.max(width * 2, height) / 100;
  const sceneWidth = width + 2 * border;
  const sceneHeight = height + 2 * border;
  const fscale = Math.min(maxheight / sceneHeight, maxwidth / sceneWidth);

  const [legOffsets, setLegOffsets] = useState<number[]>([]);
  const [stirrup_hoop, setStirrupHoop] = useState<any>(null);
  const [leg_hoop_space, setLegHoopSpace] = useState(1);

  const dleg = useRef(0);

  // set up stirrup legs and hoop spacing
  useEffect(() => {
    dleg.current = nlegs < 2 ? 0 : bar_diameter(legsize); // diameter of stirrup leg bars
    setLegHoopSpace(width - 2 * side_cover - dleg.current);
  }, [nlegs, legsize, width, side_cover]);

  useEffect(() => {
    const leg_offsets: number[] = [];
    if (nlegs === 1) {
      leg_offsets.push(leg_hoop_space / 2);
      setStirrupHoop(null);
    } else if (nlegs > 1) {
      for (let i = 1; i < nlegs - 1; i++) {
        leg_offsets.push((leg_hoop_space * i) / (nlegs - 1));
      }
      setStirrupHoop(
        <StirrupHoop
          w={width}
          h={height}
          ccs={side_cover}
          ccb={bot_cover}
          cct={top_cover}
          barsize={legsize}
        />
      );
    }
    setLegOffsets(leg_offsets);
  }, [nlegs, leg_hoop_space, width, height, side_cover, bot_cover, top_cover, legsize]);

  return (
    <Stage width={maxwidth} height={maxheight} x={(maxwidth - sceneWidth * fscale) / 2}>
      <Layer scale={{ x: fscale, y: fscale }} x={border * fscale} y={border * fscale}>
        <Rect width={width} height={height} fill="grey" />

        {stirrup_hoop}

        {legOffsets.map((offset_dist) => (
          <StirrupLeg
            offset={offset_dist}
            key={"stirrup_leg" + offset_dist}
            w={width}
            h={height}
            ccs={side_cover}
            ccb={bot_cover}
            cct={top_cover}
            barsize={legsize}
          />
        ))}

        {Object.entries(bar_props).map(([key, val]) => (
          <Circle
            x={val.x}
            y={val.y}
            draggable
            fill="black"
            onDragEnd={(e) => {
              setBarState({
                ...bar_props,
                [key]: { x: e.target.x(), y: e.target.y(), rbar: val.rbar, id: key },
              });
            }}
            radius={val.rbar}
            key={val.id}
          />
        ))}
      </Layer>
    </Stage>
  );
}
