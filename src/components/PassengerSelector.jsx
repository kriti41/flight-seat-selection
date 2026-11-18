
import React from "react";

function PassengerSelector({
  passengers,
  activePassenger,
  onPassengerChange,
  onCountChange,
}) {
  return (
    <section className="passenger-section">
      <div className="section-heading">
        <h2>Passengers</h2>

        <select
          value={passengers.length}
          onChange={(e) => onCountChange(Number(e.target.value))}
          aria-label="Number of passengers"
        >
          {[1, 2, 3, 4, 5, 6].map((count) => (
            <option key={count} value={count}>
              {count} Passenger{count > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="passenger-list">
        {passengers.map((passenger) => (
          <button
            type="button"
            key={passenger.id}
            className={
              activePassenger === passenger.id
                ? "passenger-card active"
                : "passenger-card"
            }
            onClick={() => onPassengerChange(passenger.id)}
          >
            <span className="passenger-number">
              {passenger.id}
            </span>

            <span className="passenger-info">
              <strong>{passenger.name}</strong>
              <small>
                {passenger.seatId
                  ? `Seat ${passenger.seatId}`
                  : "No seat selected"}
              </small>
            </span>

            {activePassenger === passenger.id && (
              <span className="active-indicator">Active</span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default PassengerSelector;
