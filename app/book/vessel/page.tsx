"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { vessels } from "@/data/vessels";
import { berths } from "@/data/berths";
import { bookings } from "@/data/bookings";

function VesselBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const arrivalDate = searchParams.get("arrival");
  const departureDate = searchParams.get("departure");

  const [vesselId, setVesselId] = useState("");
  const [berthId, setBerthId] = useState("");
  const [savedBookings, setSavedBookings] = useState<any[]>([]);

  // Load bookings previously saved in the browser
  useEffect(() => {
    const storedBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    setSavedBookings(storedBookings);
  }, []);

  // Combine sample bookings with newly saved bookings
  const allBookings = [...bookings, ...savedBookings];

  // Find the selected vessel
  const selectedVessel = vessels.find(
    (vessel) => vessel.id === Number(vesselId)
  );

  // Find berths large enough for the selected vessel
  const compatibleBerths = selectedVessel
    ? berths.filter(
        (berth) => berth.length >= selectedVessel.length
      )
    : [];

  // Remove berths that already have a booking conflict
  const availableBerths = compatibleBerths.filter((berth) => {
    const berthBookings = allBookings.filter(
      (booking) => booking.berthId === berth.id
    );

    const hasConflict = berthBookings.some((booking) => {
      return (
        arrivalDate! <= booking.departureDate &&
        departureDate! >= booking.arrivalDate
      );
    });

    return !hasConflict;
  });

  const handleContinue = () => {
    router.push(
      `/confirm?arrival=${arrivalDate}&departure=${departureDate}&vessel=${vesselId}&berth=${berthId}`
    );
  };

  return (
    <div className="page">
      <main className="container">

        {/* Header */}
        <div className="hero">
          <div className="logo-icon">⛵</div>

          <h1>Book a Vessel</h1>

          <p className="subtitle">
            Select your vessel and an available berth.
          </p>
        </div>

        {/* Selected dates */}
        <div className="selected-dates">
          <span>{arrivalDate}</span>

          <span className="date-arrow">
            →
          </span>

          <span>{departureDate}</span>
        </div>

        {/* Vessel selection */}
        <div className="card">
          <div className="form-group">
            <label htmlFor="vessel">
              Vessel
            </label>

            <select
              id="vessel"
              value={vesselId}
              onChange={(e) => {
                setVesselId(e.target.value);
                setBerthId("");
              }}
            >
              <option value="">
                Select a vessel
              </option>

              {vessels.map((vessel) => (
                <option
                  key={vessel.id}
                  value={vessel.id}
                >
                  {vessel.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selected vessel details */}
          {selectedVessel && (
            <div className="vessel-details">
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
                  Length
                </span>

                <span className="summary-value">
                  {selectedVessel.length} ft
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Available berths */}
        {selectedVessel && (
          <div className="card">
            <h2>Available Berths</h2>

            <p className="section-description">
              These berths can accommodate your vessel
              and are available for the selected dates.
            </p>

            {availableBerths.length > 0 ? (
              <div className="berth-list">
                {availableBerths.map((berth) => (
                  <label
                    key={berth.id}
                    className={
                      berthId === String(berth.id)
                        ? "berth-option berth-selected"
                        : "berth-option"
                    }
                  >
                    <input
                      type="radio"
                      name="berth"
                      value={berth.id}
                      checked={
                        berthId === String(berth.id)
                      }
                      onChange={(e) =>
                        setBerthId(e.target.value)
                      }
                    />

                    <div className="berth-info">
                      <span className="berth-name">
                        {berth.name}
                      </span>

                      <span className="berth-length">
                        {berth.length} ft
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                No compatible berths are available for
                these dates.
              </div>
            )}
          </div>
        )}

        {/* Continue */}
        <button
          className="button"
          onClick={handleContinue}
          disabled={!vesselId || !berthId}
        >
          Continue →
        </button>

        {/* Back */}
        <button
          className="back-button"
          onClick={() => router.back()}
        >
          ← Back
        </button>

      </main>
    </div>
  );
}

export default function VesselBooking() {
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
      <VesselBookingContent />
    </Suspense>
  );
}