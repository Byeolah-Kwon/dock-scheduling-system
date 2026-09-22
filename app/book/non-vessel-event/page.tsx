"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { berths } from "@/data/berths";
import { bookings } from "@/data/bookings";

function NonVesselEventBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const arrivalDate = searchParams.get("arrival");
  const departureDate = searchParams.get("departure");

  const [eventName, setEventName] = useState("");
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

  // Find berths that do not have a booking conflict
  const availableBerths = berths.filter((berth) => {
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
      `/confirm?arrival=${arrivalDate}&departure=${departureDate}&berth=${berthId}&type=non-vessel&event=${encodeURIComponent(
        eventName
      )}`
    );
  };

  return (
    <div className="page">
      <main className="container">

        {/* Header */}
        <div className="hero">
          <div className="logo-icon">☀️</div>

          <h1>Book a Non-vessel Event</h1>

          <p className="subtitle">
            Reserve waterfront space for an event or activity.
          </p>
        </div>

        {/* Selected dates */}
        <div className="selected-dates">
          <span>{arrivalDate}</span>
          <span className="date-arrow">→</span>
          <span>{departureDate}</span>
        </div>

        {/* Event information */}
        <div className="card">
          <div className="form-group">
            <label htmlFor="eventName">
              Event name
            </label>

            <input
              id="eventName"
              type="text"
              value={eventName}
              placeholder="e.g. Community Sail Day"
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
        </div>

        {/* Available berths */}
        <div className="card">
          <h2>Available Berths</h2>

          <p className="section-description">
            Select an available berth for your event.
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
                    checked={berthId === String(berth.id)}
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
              No berths are available for these dates.
            </div>
          )}
        </div>

        {/* Continue */}
        <button
          className="button"
          onClick={handleContinue}
          disabled={!eventName.trim() || !berthId}
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

export default function NonVesselEventBooking() {
  return (
    <Suspense
      fallback={
        <div className="page">
          <main className="container">
            <div className="hero">
              <div className="logo-icon">☀️</div>

              <h1>Loading...</h1>
            </div>
          </main>
        </div>
      }
    >
      <NonVesselEventBookingContent />
    </Suspense>
  );
}