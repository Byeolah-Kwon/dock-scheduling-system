"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-CA");
    };

    setArrivalDate(formatDate(today));
    setDepartureDate(formatDate(tomorrow));
  }, []);

  const isDateRangeValid =
    arrivalDate !== "" &&
    departureDate !== "" &&
    departureDate > arrivalDate;

  const handleContinue = () => {
    if (!isDateRangeValid) {
      return;
    }

    router.push(
      `/book?arrival=${arrivalDate}&departure=${departureDate}`
    );
  };

  const handleLookup = () => {
    router.push("/lookup");
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
            Reserve waterfront space for vessels and events.
          </p>
        </div>

        {/* Date selection */}
        <div className="card">
          <div className="date-grid">

            <div className="form-group">
              <label htmlFor="arrival">
                Arrival date
              </label>

              <input
                id="arrival"
                type="date"
                value={arrivalDate}
                onChange={(e) => {
                  setArrivalDate(e.target.value);

                  if (
                    departureDate &&
                    e.target.value >= departureDate
                  ) {
                    setDepartureDate("");
                  }
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="departure">
                Departure date
              </label>

              <input
                id="departure"
                type="date"
                value={departureDate}
                min={arrivalDate}
                onChange={(e) =>
                  setDepartureDate(e.target.value)
                }
              />
            </div>

          </div>

          <button
            className="button"
            onClick={handleContinue}
            disabled={!isDateRangeValid}
          >
            Continue →
          </button>
        </div>

        {/* Existing booking lookup */}
        <button
          className="lookup-link"
          onClick={handleLookup}
        >
          Already booked? Look up your reservation →
        </button>

      </main>
    </div>
  );
}