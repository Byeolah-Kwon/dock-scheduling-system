"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function BookContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const arrivalDate = searchParams.get("arrival");
  const departureDate = searchParams.get("departure");

  const handleVesselBooking = () => {
    router.push(
      `/book/vessel?arrival=${arrivalDate}&departure=${departureDate}`
    );
  };

  const handleNonVesselBooking = () => {
    router.push(
      `/book/non-vessel-event?arrival=${arrivalDate}&departure=${departureDate}`
    );
  };

  return (
    <div className="page">
      <main className="container">

        {/* Header */}
        <div className="hero">
          <div className="logo-icon">
            ⛵
          </div>

          <h1>Dock Scheduling</h1>

          <p className="subtitle">
            What would you like to reserve?
          </p>
        </div>

        {/* Booking options */}
        <div className="choice-grid">

          <button
            className="choice-card"
            onClick={handleVesselBooking}
          >
            <span className="choice-icon">
              ⛵
            </span>

            <span className="choice-title">
              Book a Vessel
            </span>

            <span className="choice-description">
              Reserve an available berth for a vessel.
            </span>
          </button>

          <button
            className="choice-card"
            onClick={handleNonVesselBooking}
          >
            <span className="choice-icon">
              ☀️
            </span>

            <span className="choice-title">
              Book a Non-vessel Event
            </span>

            <span className="choice-description">
              Reserve waterfront space for an event or activity.
            </span>
          </button>

        </div>

        {/* Selected dates */}
        <div className="selected-dates">
          <span>
            {arrivalDate}
          </span>

          <span className="date-arrow">
            →
          </span>

          <span>
            {departureDate}
          </span>
        </div>

        {/* Back */}
        <button
          className="back-button"
          onClick={() => router.back()}
        >
          ← Change dates
        </button>

      </main>
    </div>
  );
}

export default function Book() {
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
      <BookContent />
    </Suspense>
  );
}