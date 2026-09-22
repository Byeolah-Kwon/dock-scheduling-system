"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { vessels } from "@/data/vessels";
import { berths } from "@/data/berths";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const arrivalDate = searchParams.get("arrival");
  const departureDate = searchParams.get("departure");
  const vesselId = searchParams.get("vessel");
  const berthId = searchParams.get("berth");
  const bookingType = searchParams.get("type");
  const eventName = searchParams.get("event");

  const selectedBerth = berths.find(
    (berth) => berth.id === Number(berthId)
  );

  const selectedVessel = vesselId
    ? vessels.find(
        (vessel) => vessel.id === Number(vesselId)
      )
    : undefined;

  const isNonVesselEvent =
    bookingType === "non-vessel";

  const handleConfirm = () => {
    // Create a unique booking ID
    const newBookingId = `booking-${Date.now()}`;

    // Create the booking object
    const newBooking = {
      id: newBookingId,
      type: isNonVesselEvent
        ? "non-vessel"
        : "vessel",
      arrivalDate,
      departureDate,
      vesselId: vesselId
        ? Number(vesselId)
        : null,
      berthId: berthId
        ? Number(berthId)
        : null,
      eventName: eventName || null,
    };

    // Get bookings that are already saved in localStorage
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    // Add the new booking
    const updatedBookings = [
      ...existingBookings,
      newBooking,
    ];

    // Save the updated bookings back to localStorage
    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    // Update the page to show confirmation
    setBookingId(newBookingId);
    setIsConfirmed(true);
  };

  return (
    <div className="page">
      <main className="container">

        {/* Header */}
        <div className="hero">
          <div className="logo-icon">
            {isConfirmed
              ? "✓"
              : isNonVesselEvent
              ? "☀️"
              : "⛵"}
          </div>

          <h1>
            {isConfirmed
              ? "Booking Confirmed!"
              : "Confirm Your Booking"}
          </h1>

          <p className="subtitle">
            {isConfirmed
              ? "Your reservation has been successfully saved."
              : "Review your reservation details before confirming."}
          </p>
        </div>

        {/* Reservation details */}
        <div className="card">
          <h2>Reservation Details</h2>

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
                {eventName}
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
              {arrivalDate}
            </span>
          </div>

          <div className="summary-row">
            <span className="summary-label">
              Departure
            </span>

            <span className="summary-value">
              {departureDate}
            </span>
          </div>

          {/* Show booking ID after confirmation */}
          {isConfirmed && (
            <div className="summary-row">
              <span className="summary-label">
                Booking ID
              </span>

              <span className="summary-value">
                {bookingId}
              </span>
            </div>
          )}
        </div>

        {/* Before confirmation */}
        {!isConfirmed ? (
          <>
            <div className="confirmation-note">
              Please review the information above. Once
              confirmed, this berth will be reserved for
              the selected dates.
            </div>

            <button
              className="button"
              onClick={handleConfirm}
            >
              Confirm Booking
            </button>

            <button
              className="back-button"
              onClick={() => router.back()}
            >
              ← Back to edit
            </button>
          </>
        ) : (
          <>
            {/* After confirmation */}
            <div className="confirmation-note">
              ✓ Your booking has been saved successfully.
            </div>

            <button
              className="button"
              onClick={() => router.push("/")}
            >
              Back to Home
            </button>
          </>
        )}

      </main>
    </div>
  );
}

export default function Confirm() {
  return (
    <Suspense
      fallback={
        <div className="page">
          <main className="container">
            <div className="hero">
              <div className="logo-icon">
                ⛵
              </div>

              <h1>Loading...</h1>
            </div>
          </main>
        </div>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}