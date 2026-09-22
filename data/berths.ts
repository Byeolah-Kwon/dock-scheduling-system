export type Berth = {
  id: number;
  name: string;
  length: number;
};

export const berths: Berth[] = [
  {
    id: 1,
    name: "North Pier West",
    length: 410,
  },
  {
    id: 2,
    name: "North Pier Face",
    length: 75,
  },
  {
    id: 3,
    name: "North Pier East",
    length: 240,
  },
  {
    id: 4,
    name: "Inner Channel",
    length: 55,
  },
  {
    id: 5,
    name: "South Float West",
    length: 90,
  },
  {
    id: 6,
    name: "South Float East",
    length: 90,
  },
];