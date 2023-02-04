// ACI 318-14 Appendix A
function bar_diameter(size: number) {
  switch (size) {
    case 3:
      return 0.375;
    case 4:
      return 0.5;
    case 5:
      return 0.625;
    case 6:
      return 0.75;
    case 7:
      return 0.875;
    case 8:
      return 1.0;
    case 9:
      return 1.128;
    case 10:
      return 1.27;
    case 11:
      return 1.41;
    case 14:
      return 1.693;
    case 18:
      return 2.257;
    default:
      return size / 8;
  }
}

type ReinforcementAreasT = { [key: string]: number };

const REINFORCEMENT_AREAS: ReinforcementAreasT = {
  "3": 0.11,
  "4": 0.2,
  "5": 0.31,
  "6": 0.44,
  "7": 0.6,
  "8": 0.79,
  "9": 1.0,
  "10": 1.27,
  "11": 1.56,
  "14": 2.25,
  "18": 4.0,
};

function bar_area(size: number) {
  return (
    REINFORCEMENT_AREAS[size.toFixed(0)] || +(Math.PI * (bar_diameter(size) / 2) ** 2).toFixed(2)
  );
}

// ACI 318-14 Table 25.3.1
function bar_bend_radius(size: number) {
  switch (size) {
    case 3:
      return 0.375 * 3;
    case 4:
      return 0.5 * 3;
    case 5:
      return 0.625 * 3;
    case 6:
      return 0.75 * 3;
    case 7:
      return 0.875 * 3;
    case 8:
      return 1.0 * 3;
    case 9:
      return 1.128 * 4;
    case 10:
      return 1.27 * 4;
    case 11:
      return 1.41 * 4;
    case 14:
      return 1.693 * 5;
    case 18:
      return 2.257 * 5;
    default:
      return (size / 8) * 4;
  }
}

export { bar_area, bar_diameter, bar_bend_radius };
