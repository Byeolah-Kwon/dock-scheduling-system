export type Booking = {
  id: number;
  berthId: number;
  vesselId: number;
  arrivalDate: string;
  departureDate: string;
};

export const bookings: Booking[] = [
  {
    id: 1,
    berthId: 1,
    vesselId: 2,
    arrivalDate: "2026-09-26",
    departureDate: "2026-09-28",
  },
];