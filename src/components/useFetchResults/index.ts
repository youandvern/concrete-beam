import React from "react";
import { useRef, useEffect, useState } from "react";
import BarsWithProps from "../Interfaces/BarsWithProps";
import ConcreteProps from "../Interfaces/ConcreteProps";

// https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

export const useFetchResults = (barprops: BarsWithProps, concprops: ConcreteProps) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const barslist = useRef<any[][]>([["bar_id", "As", "db", "x", "y"]]);

  Object.entries(barprops).map(([key, val]) =>
    barslist.current.push([key, Math.PI * val.rbar ** 2, val.rbar * 2, val.x, val.y])
  );

  const request_dict = useRef({
    "f'_c": concprops.fc,
    f_y: concprops.fy,
    E_s: concprops.Es,
    b: concprops.b,
    h: concprops.h,
    Reinforcement: barslist.current,
  });

  useEffect(() => {
    if (!barprops) {
      return;
    }

    const fetchData = async () => {
      const res = await fetch("/api/ConcreteBeam", {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(request_dict.current),
      });

      const data = await res.json();
      setData(data);
      setShow(true);
    };

    fetchData();
  }, [barprops, concprops]);

  //.then(setDatatable(getbeam.ReinforcementResults)) // move to useEffect
  return { show, data };
};
