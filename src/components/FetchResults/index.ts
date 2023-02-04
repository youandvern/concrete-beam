import BarsWithProps from "../Interfaces/BarsWithProps";
import ConcreteProps from "../Interfaces/ConcreteProps";
import APIResults from "../Interfaces/APIResults";
import { APIResultsUnparced } from "../Interfaces/APIResults";

// https://api.encompapp.com
// http://127.0.0.1:8000
// const BASE_URL = "https://api.encompapp.com";
const BASE_URL = "http://127.0.0.1:8000";

// https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

interface FetchObject {
  show: boolean;
  data: APIResults;
}

export const FetchResults = (
  barprops: BarsWithProps,
  concprops: ConcreteProps
): Promise<FetchObject> => {
  let barslist: any[][] = [
    [
      "Bar #",
      "\\( A_s ( \\mathrm{in^2} ) \\)",
      "\\( d_b ( \\mathrm{in} ) \\)",
      "\\( x ( \\mathrm{in} ) \\)",
      "\\( y ( \\mathrm{in} ) \\)",
    ],
  ];

  Object.entries(barprops).map(([key, val]) =>
    barslist.push([key, val.barArea, val.rbar * 2, +val.x.toFixed(6), +val.y.toFixed(6)])
  );

  let request_dict = {
    fc: concprops.fc,
    fy: concprops.fy,
    Es: concprops.Es,
    b: concprops.b,
    h: concprops.h,
    reinforcement: barslist,
    nShearBars: concprops.nShearBars,
    spacingShearBars: concprops.spacingShearBars,
    sizeShearBars: concprops.sizeShearBars,
  };

  const fetchData = async () => {
    let show = false;
    let data = {
      reportItems: [],
      c: 0,
      Mn: 0,
      Vn: 0,
      reinforcementHeaders: ["a", "b"],
      reinforcementResults: [[0, 1]],
    } as APIResults;

    const res = await fetch(`${BASE_URL}/api/concrete-beam/`, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ inputs: request_dict }),
    });

    const unparsed_data = (await res.json()) as APIResultsUnparced;
    const headers_only = unparsed_data.summary.reinforcement.shift();

    if (headers_only) {
      data = {
        reportItems: unparsed_data.allItems,
        reinforcementHeaders: headers_only.map((a) => String(a)),
        reinforcementResults: unparsed_data.summary.reinforcement,
        Mn: unparsed_data.summary.Mn,
        Vn: unparsed_data.summary.Vn,
        c: unparsed_data.summary.c,
      };
      show = true;
    }

    return { show, data };
  };

  //.then(setDatatable(getbeam.ReinforcementResults)) // move to useEffect
  return fetchData();
};
