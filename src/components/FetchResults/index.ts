import BarsWithProps from "../Interfaces/BarsWithProps";
import ConcreteProps from "../Interfaces/ConcreteProps";
import APIResults from "../Interfaces/APIResults";
import { APIResultsUnparced } from "../Interfaces/APIResults";

// https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

interface FetchObject {
  show: boolean;
  data: APIResults;
}

export const FetchResults = (barprops: BarsWithProps, concprops: ConcreteProps): FetchObject => {
  let show = false;
  let data = {} as APIResults;
  let barslist: any[][] = [["bar_id", "As", "db", "x", "y"]];

  Object.entries(barprops).map(([key, val]) =>
    barslist.push([key, Math.PI * val.rbar ** 2, val.rbar * 2, val.x, val.y])
  );

  let request_dict = {
    "f'_c": concprops.fc,
    f_y: concprops.fy,
    E_s: concprops.Es,
    b: concprops.b,
    h: concprops.h,
    Reinforcement: barslist,
  };

  if (barprops) {
    const fetchData = async () => {
      const res = await fetch("/api/ConcreteBeam", {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(request_dict),
      });

      const unparsed_data = (await res.json()) as APIResultsUnparced;

      data = {
        reinforcementHeaders: unparsed_data.ReinforcementResults.shift(),
        reinforcementResults: unparsed_data.ReinforcementResults,
        "\\phi M_n": unparsed_data["\\phi M_n"],
        c: unparsed_data.c,
      };
      show = true;
    };

    fetchData();
  }

  //.then(setDatatable(getbeam.ReinforcementResults)) // move to useEffect
  return { show, data };
};
