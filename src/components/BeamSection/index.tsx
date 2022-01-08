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
  // scale beam image up to fill frame $$$ useState req'd? $$$$
  const fscale = useRef(1.0);
  const off_x = useRef(0.0);
  const off_y = useRef(0.0);
  const dleg = useRef(0);
  const leg_offsets = useRef<number[]>([]);
  const [stirrup_hoop, setStirrupHoop] = useState<any>();
  const [leg_hoop_space, setLegHoopSpace] = useState(1);

  // change display scale when beam or screen height/width changes
  useEffect(() => {
    if (height / width > maxheight / maxwidth) {
      fscale.current = maxheight / height;
      off_x.current = (maxwidth - width * fscale.current) / 2;
    } else {
      fscale.current = maxwidth / width;
    }
  }, [height, width, maxheight, maxwidth]);

  // set up stirrup legs and hoop spacing
  useEffect(() => {
    dleg.current = nlegs < 2 ? 0 : bar_diameter(legsize); // diameter of stirrup leg bars
    setLegHoopSpace(width - 2 * side_cover - dleg.current);
  }, [nlegs, legsize, width, side_cover]);

  useEffect(() => {
    if (nlegs === 1) {
      leg_offsets.current.push(leg_hoop_space / 2);
    } else if (nlegs > 1) {
      for (let i = 1; i < nlegs - 1; i++) {
        leg_offsets.current.push((leg_hoop_space * i) / (nlegs - 1));
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
  }, [nlegs, leg_hoop_space, width, height, side_cover, bot_cover, top_cover, legsize]);

  return (
    <Stage width={maxwidth} height={maxheight}>
      <Layer scale={{ x: fscale.current, y: fscale.current }} x={off_x.current} y={off_y.current}>
        <Rect width={width} height={height} fill="grey" />

        {stirrup_hoop}

        {leg_offsets.current.map((offset_dist) => (
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
