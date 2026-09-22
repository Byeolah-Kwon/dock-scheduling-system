export type Vessel = {
  id: number;
  name: string;
  operator: string;
  length: number;
  draft?: number;
};

export const vessels: Vessel[] = [
  {
    id: 1,
    name: "R/V High Drift",
    operator: "Coastal Survey Partners",
    length: 120,
  },
  {
    id: 2,
    name: "M/Y Western Strand",
    operator: "",
    length: 65,
    draft: 4,
  },
  {
    id: 3,
    name: "R/V Iron Skua",
    operator: "",
    length: 72,
  },
  {
    id: 4,
    name: "R/V Bright Dory",
    operator: "",
    length: 52,
  },
  {
    id: 5,
    name: "R/V Wild Marlin",
    operator: "",
    length: 32,
  },
  {
    id: 6,
    name: "M/V High Strand",
    operator: "",
    length: 145,
  },
  {
    id: 7,
    name: "S/V Wild Drift",
    operator: "",
    length: 24,
  },
  {
    id: 8,
    name: "M/V Northern Ketch",
    operator: "",
    length: 120,
  },
  {
    id: 9,
    name: "M/V Coral Drift",
    operator: "",
    length: 100,
  },
  {
    id: 10,
    name: "R/V Coral Voyager",
    operator: "",
    length: 46,
  },
  {
    id: 11,
    name: "S/V Clear Horizon",
    operator: "",
    length: 85,
  },
  {
    id: 12,
    name: "M/Y Iron Gannet",
    operator: "",
    length: 170,
  },
];