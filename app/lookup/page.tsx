"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { vessels } from "@/data/vessels";
import { berths } from "@/data/berths";

type SavedBooking = {
  id: string;
  type: "vessel" | "non-vessel";
  arrivalDate: string;
  departureDate: string;
  vesselId: number | null;
  berthId: number | null;
  eventName: string | null;
};

export default function LookupBooking() {
  const router = useRouter();

  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState<SavedBooking | null>(null);
  const [searched, setSearched] = useState(false);

  const handleLookup = () => {
    const savedBookings: SavedBooking[] = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    const foundBooking = savedBookings.find(
      (savedBooking) =>
        savedBooking.id === bookingId.trim()
    );

    setBooking(foundBooking || null);
    setSearched(true);
  };

  const selectedVessel = booking?.vesselId
    ? vessels.find(
        (vessel) => vessel.id === booking.vesselId
      )
    : undefined;

  const selectedBerth = booking?.berthId
    ? berths.find(
        (berth) => berth.id === booking.berthId
      )
    : undefined;

  const isNonVesselEvent =
    booking?.type === "non-vessel";

  return (
    <div className="page">
      <main className="container">

        {/* Header */}
        <div className="hero">
          <div className="logo-icon">
            🔎
          </div>

          <h1>Find Your Booking</h1>

          <p className="subtitle">
            Enter your booking ID to view your reservation.
          </p>
        </div>

        {/* Search */}
        <div className="card">
          <div className="form-group">
            <label htmlFor="bookingId">
              Booking ID
            </label>

            <input
              id="bookingId"
              type="text"
              value={bookingId}
              placeholder="e.g. booking-123456789"
              onChange={(e) => {
                setBookingId(e.target.value);
                setSearched(false);
                setBooking(null);
              }}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  bookingId.trim()
                ) {
                  handleLookup();
                }
              }}
            />
          </div>

          <button
            className="button"
            onClick={handleLookup}
            disabled={!bookingId.trim()}
          >
            Look Up Booking
          </button>
        </div>

        {/* Booking found */}
        {booking && (
          <div className="card">
            <h2>Reservation Details</h2>

            <div className="summary-row">
              <span className="summary-label">
                Booking ID
              </span>

              <span className="summary-value">
                {booking.id}
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                Booking type
              </span>

              <span className="summary-value">
                {isNonVesselEvent
                  ? "Non-vessel Event"
                  : "Vessel"}
              </span>
            </div>

            {isNonVesselEvent && (
              <div className="summary-row">
                <span className="summary-label">
                  Event
                </span>

                <span className="summary-value">
                  {booking.eventName}
                </span>
              </div>
            )}

            {selectedVessel && (
              <>
                <div className="summary-row">
                  <span className="summary-label">
                    Vessel
                  </span>

                  <span className="summary-value">
                    {selectedVessel.name}
                  </span>
                </div>

                {selectedVessel.operator && (
                  <div className="summary-row">
                    <span className="summary-label">
                      Operator
                    </span>

                    <span className="summary-value">
                      {selectedVessel.operator}
                    </span>
                  </div>
                )}

                <div className="summary-row">
                  <span className="summary-label">
                    Vessel length
                  </span>

                  <span className="summary-value">
                    {selectedVessel.length} ft
                  </span>
                </div>
              </>
            )}

            <div className="summary-row">
              <span className="summary-label">
                Berth
              </span>

              <span className="summary-value">
                {selectedBerth?.name}
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                Arrival
              </span>

              <span className="summary-value">
                {booking.arrivalDate}
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                Departure
              </span>

              <span className="summary-value">
                {booking.departureDate}
              </span>
            </div>
          </div>
        )}

        {/* Booking not found */}
        {searched && !booking && (
          <div className="empty-state">
            No booking was found with that booking ID.
            Please check the number and try again.
          </div>
        )}

        {/* Back */}
        <button
          className="back-button"
          onClick={() => router.push("/")}
        >
          ← Back to Home
        </button>

      </main>
    </div>
  );
}