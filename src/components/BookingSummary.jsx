
import React from "react";
import { formatPrice } from "../utils/pricing";

const mealOptions = {
  none: { name: "No meal", price: 0 },
  vegetarian: { name: "Vegetarian", price: 250 },
  nonVegetarian: { name: "Non-vegetarian", price: 350 },
  vegan: { name: "Vegan", price: 300 },
};

const seatCategories = {
  standard: "Standard",
  preferred: "Preferred",
  premium: "Premium",
  "extra-legroom": "Extra legroom",
};

function BookingSummary({ passengers, seats, selectedFlight }) {
  // App.jsx stores the selected flight inside chosenFlight.
  const flight = selectedFlight?.chosenFlight || {};

  const baseFlightFare = Number(
    flight.basePrice ?? flight.price ?? 0
  );

  const fareUpgrade = Number(
    flight.fareUpgrade ??
    flight.selectedFare?.extra ??
    0
  );

  const fareName = flight.selectedFare?.name || "Saver";

  const flightFarePerPassenger =
    baseFlightFare + fareUpgrade;

  const totalFlightFare =
    flightFarePerPassenger * passengers.length;

  const assignedCount = passengers.filter(
    (passenger) => passenger.seatId
  ).length;

  const progress = passengers.length
    ? Math.round(
        (assignedCount / passengers.length) * 100
      )
    : 0;

  const getSeat = (seatId) =>
    seats.find((seat) => seat.id === seatId);

  const getMeal = (passenger) =>
    mealOptions[passenger.meal] || mealOptions.none;

  const getPassengerPrice = (passenger) => {
    const seat = getSeat(passenger.seatId);
    const meal = getMeal(passenger);

    return (
      flightFarePerPassenger +
      (seat?.price || 0) +
      meal.price
    );
  };

  const seatTotal = passengers.reduce(
    (sum, passenger) => {
      const seat = getSeat(passenger.seatId);
      return sum + (seat?.price || 0);
    },
    0
  );

  const mealTotal = passengers.reduce(
    (sum, passenger) => {
      return sum + getMeal(passenger).price;
    },
    0
  );

  const total = totalFlightFare + seatTotal + mealTotal;

  return (
    <section className="booking-summary premium-summary">

      <div className="summary-header">
        <div>
          <span className="summary-kicker">
            YOUR JOURNEY
          </span>

          <h2>Booking Summary</h2>

          <p>
            Review your selections before continuing.
          </p>
        </div>

        <div className="summary-header-icon">✈</div>
      </div>

      {/* Selected flight */}

      <div className="booking-progress-card">

        <div className="progress-topline">
          <span>Selected flight</span>

          <strong>
            {flight.airline || "Flight not selected"}
          </strong>
        </div>

        {flight.code && (
          <div className="progress-bottomline">
            {flight.code} · {flight.departure || "--:--"} –{" "}
            {flight.arrival || "--:--"}
          </div>
        )}

        <div className="summary-flight-fare">
          <div>
            <span>Base flight fare</span>
            <strong>
              {formatPrice(baseFlightFare)}
            </strong>
          </div>

          <div>
            <span>{fareName} fare upgrade</span>
            <strong>
              {formatPrice(fareUpgrade)}
            </strong>
          </div>

          <div className="summary-flight-subtotal">
            <span>Flight fare per passenger</span>
            <strong>
              {formatPrice(flightFarePerPassenger)}
            </strong>
          </div>
        </div>

      </div>

      {/* Booking progress */}

      <div className="booking-progress-card">

        <div className="progress-topline">
          <span>Seat selection progress</span>

          <strong>
            {assignedCount}/{passengers.length} passengers
          </strong>
        </div>

        <div
          className="booking-progress-track"
          role="progressbar"
          aria-label="Passenger seat selection progress"
          aria-valuemin={0}
          aria-valuemax={passengers.length}
          aria-valuenow={assignedCount}
        >
          <div
            className="booking-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="progress-bottomline">
          {assignedCount === passengers.length
            ? "All passengers have selected their seats."
            : `${passengers.length - assignedCount} passenger(s) still need a seat.`}
        </div>

      </div>

      {/* Passenger breakdown */}

      <div className="summary-list-heading">
        <span>PASSENGER DETAILS</span>
        <span>{passengers.length} TOTAL</span>
      </div>

      <div className="summary-passengers">

        {passengers.map((passenger) => {
          const seat = getSeat(passenger.seatId);
          const meal = getMeal(passenger);

          return (
            <article
              className="summary-passenger premium-passenger"
              key={passenger.id}
            >

              <div className="summary-passenger-main">

                <div className="summary-avatar">
                  {passenger.id}
                </div>

                <div className="summary-passenger-info">
                  <strong>{passenger.name}</strong>

                  <span className="summary-seat-status">
                    {seat
                      ? `Seat ${seat.id} · ${
                          seatCategories[seat.type] || "Standard"
                        }`
                      : "Seat not selected"}
                  </span>
                </div>

                <strong className="passenger-total">
                  {formatPrice(
                    getPassengerPrice(passenger)
                  )}
                </strong>

              </div>

              <div className="summary-item-breakdown">

                <div>
                  <span>Flight fare</span>
                  <strong>
                    {formatPrice(flightFarePerPassenger)}
                  </strong>
                </div>

                <div>
                  <span>Seat</span>
                  <strong>
                    {seat
                      ? formatPrice(seat.price)
                      : "—"}
                  </strong>
                </div>

                <div>
                  <span>Meal · {meal.name}</span>
                  <strong>
                    {formatPrice(meal.price)}
                  </strong>
                </div>

              </div>

            </article>
          );
        })}

      </div>

      {/* Final total */}

      <div className="summary-price-area">

        <div className="summary-price-row">
          <span>Base flight fare</span>

          <strong>
            {formatPrice(
              baseFlightFare * passengers.length
            )}
          </strong>
        </div>

        <div className="summary-price-row">
          <span>{fareName} fare upgrade</span>

          <strong>
            {formatPrice(
              fareUpgrade * passengers.length
            )}
          </strong>
        </div>

        <div className="summary-price-row">
          <span>Seat selection charges</span>
          <strong>{formatPrice(seatTotal)}</strong>
        </div>

        <div className="summary-price-row">
          <span>Meal charges</span>
          <strong>{formatPrice(mealTotal)}</strong>
        </div>

        <div className="summary-price-divider" />

        <div className="summary-grand-total">

          <div>
            <span>Total booking amount</span>

            <small>
              Flight + fare upgrade + seats + meals
            </small>
          </div>

          <strong
            key={total}
            className="animated-total"
          >
            {formatPrice(total)}
          </strong>

        </div>

      </div>

      <div className="summary-security-note">
        <span>✓</span>
        Your selections are updated automatically.
      </div>

    </section>
  );
}

export default BookingSummary;
