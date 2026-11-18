import React from "react";
import Seat from "./Seat";
import SeatLegend from "./SeatLegend";

function AircraftLayout({
  seats,
  layout,
  activePassenger,
  passengers,
  onSeatSelect,
  onLayoutChange,
}) {
  const columns =
    layout === "3-2"
      ? ["A", "B", "C", "D", "E"]
      : ["A", "B", "C", "D", "E", "F", "G"];

  // Insert aisle gaps before D in 3-2 and before C/F in 2-3-2.
  const aisleAfter = layout === "3-2" ? [3] : [2, 5];

  const getPassengerForSeat = (seatId) =>
    passengers.find((passenger) => passenger.seatId === seatId);

  return (
    <section className="aircraft-section">
      <div className="section-heading">
        <div>
          <span className="seat-section-kicker">YOUR FLIGHT EXPERIENCE</span>
          <h2>Select Your Seat</h2>
          <p>Choose a comfortable seat for your journey.</p>
        </div>

        <select
          value={layout}
          onChange={(event) => onLayoutChange(event.target.value)}
          aria-label="Aircraft layout"
        >
          <option value="3-2">3–2 Aircraft</option>
          <option value="2-3-2">2–3–2 Aircraft</option>
        </select>
      </div>

      <div className="seat-instruction">
        <span className="instruction-icon">✦</span>
        <span>
          Selecting a seat for{" "}
          <strong>
            {passengers.find(
              (passenger) => passenger.id === activePassenger
            )?.name || "Active passenger"}
          </strong>
        </span>
      </div>

      <div className="aircraft-body">
        <div className="aircraft-front">
          <div className="cockpit-window">
            <span>✈</span>
            <small>AIRCRAFT FRONT</small>
          </div>
        </div>

        <div className="seat-map">
          <div className="seat-row column-labels">
            <span className="row-number">ROW</span>

            {columns.map((column, index) => (
              <React.Fragment key={column}>
                {aisleAfter.includes(index) && (
                  <span className="aisle-space" />
                )}
                <span className="column-label">{column}</span>
              </React.Fragment>
            ))}
          </div>

          {Array.from({ length: 10 }, (_, rowIndex) => {
            const row = rowIndex + 1;

            return (
              <div className="seat-row" key={row}>
                <span className="row-number">{String(row).padStart(2, "0")}</span>

                {columns.map((column, index) => {
                  const seat = seats.find(
                    (item) => item.id === `${row}${column}`
                  );

                  if (!seat) return null;

                  const assignedPassenger = getPassengerForSeat(seat.id);

                  const isOccupied =
                    Boolean(assignedPassenger) &&
                    assignedPassenger.id !== activePassenger;

                  const isSelected =
                    assignedPassenger?.id === activePassenger;

                  return (
                    <React.Fragment key={seat.id}>
                      {aisleAfter.includes(index) && (
                        <span className="aisle-space" />
                      )}

                      <Seat
                        seat={seat}
                        isSelected={Boolean(isSelected)}
                        isOccupied={isOccupied}
                        onSelect={onSeatSelect}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="aircraft-rear">
          <span>REAR OF AIRCRAFT</span>
        </div>
      </div>

      <SeatLegend />

      <div className="seat-map-note">
        <span>ⓘ</span>
        Click an available seat to select it. Click your selected seat again
        to remove it.
      </div>
    </section>
  );
}

export default AircraftLayout;