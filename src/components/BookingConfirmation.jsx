
import React, { useState } from "react";
import {
  calculateTotal,
  formatPrice,
} from "../utils/pricing";
import DigitalBoardingPasses from "./DigitalBoardingPasses";

const mealOptions = {
  none: { name: "No meal", price: 0 },
  vegetarian: { name: "Vegetarian meal", price: 250 },
  nonVegetarian: { name: "Non-vegetarian meal", price: 350 },
  vegan: { name: "Vegan meal", price: 300 },
};

const seatCategories = {
  standard: "Standard",
  preferred: "Preferred",
  premium: "Premium",
  "extra-legroom": "Extra legroom",
};

function BookingConfirmation({
  passengers,
  seats,
  bookingReference,
  selectedFlight,
  onBack,
}) {
  const [copied, setCopied] = useState(false);

  const flight = selectedFlight?.chosenFlight || {};

  const airline = flight.airline || "Airline";
  const flightNumber = flight.code || "Not available";

  const origin = selectedFlight?.from || {};
  const destination = selectedFlight?.to || {};

  const cabin = selectedFlight?.cabin || "Economy";

  const fareName =
    flight.selectedFare?.name || "Saver";

  const baseFlightFare = Number(
    flight.basePrice ?? flight.price ?? 0
  );

  const fareUpgrade = Number(
    flight.fareUpgrade ??
    flight.selectedFare?.extra ??
    0
  );

  const flightFarePerPassenger =
    baseFlightFare + fareUpgrade;

  const totalFlightFare =
    flightFarePerPassenger * passengers.length;

  const seatTotal = passengers.reduce(
    (sum, passenger) => {
      const seat = seats.find(
        (item) => item.id === passenger.seatId
      );

      return sum + (seat?.price || 0);
    },
    0
  );

  const mealTotal = passengers.reduce(
    (sum, passenger) => {
      const meal =
        mealOptions[passenger.meal] ||
        mealOptions.none;

      return sum + meal.price;
    },
    0
  );

  const additionalCharges =
    calculateTotal(passengers, seats);

  const grandTotal =
    totalFlightFare + additionalCharges;

  const bookingDate = new Date().toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const departureDate = selectedFlight?.departureDate
    ? new Date(
        selectedFlight.departureDate + "T00:00:00"
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  const getPassengerDetails = (passenger) => {
    const seat = seats.find(
      (item) => item.id === passenger.seatId
    );

    const meal =
      mealOptions[passenger.meal] ||
      mealOptions.none;

    const seatPrice = seat?.price || 0;

    const passengerTotal =
      flightFarePerPassenger +
      seatPrice +
      meal.price;

    return {
      seat,
      meal,
      seatPrice,
      passengerTotal,
    };
  };

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(
        bookingReference
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);

      window.prompt(
        "Copy your booking reference:",
        bookingReference
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="premium-confirmation-page">

      <header className="confirmation-nav">
        <div className="confirmation-brand">
          <div className="confirmation-brand-icon">
            ✈
          </div>

          <div>
            <strong>SkySelect</strong>
            <span>YOUR JOURNEY, YOUR CHOICE</span>
          </div>
        </div>

        <div className="confirmation-nav-status">
          <span className="status-dot"></span>
          Booking confirmed
        </div>
      </header>

      <section className="confirmation-content">

        <div className="confirmation-hero">

          <div className="hero-success-symbol">
            <span>✓</span>
          </div>

          <span className="hero-eyebrow">
            YOUR BOOKING IS CONFIRMED
          </span>

          <h1>
            The journey
            <br />
            starts here.
          </h1>

          <p>
            Your seat selections are confirmed.
            We've put your journey details together below.
          </p>

          <div className="hero-booking-reference">
            <div>
              <span>BOOKING REFERENCE</span>
              <strong>{bookingReference}</strong>
            </div>

            <button
              className="copy-reference-button"
              onClick={handleCopyReference}
              type="button"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>

        </div>

        {/* FLIGHT DETAILS */}

        <section className="digital-ticket">

          <div className="ticket-top">

            <div className="ticket-airline">
              <div className="ticket-airline-icon">
                ✈
              </div>

              <div>
                <strong>{airline}</strong>
                <span>FLIGHT CONFIRMATION</span>
              </div>
            </div>

            <div className="ticket-confirmed-label">
              <span>✓</span>
              CONFIRMED
            </div>

          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-flight-details">

            <div className="ticket-flight-number">
              <span>FLIGHT NUMBER</span>
              <strong>{flightNumber}</strong>
              <small>{cabin} Class</small>
            </div>

            <div className="ticket-route-placeholder">
              <span className="route-line"></span>
              <span className="route-plane">✈</span>
              <span className="route-line"></span>
            </div>

            <div className="ticket-route-status">
              <span>ROUTE</span>
              <strong>
                {origin.code || "—"} → {destination.code || "—"}
              </strong>
              <small>
                {origin.city || "Origin"} to{" "}
                {destination.city || "Destination"}
              </small>
            </div>

          </div>

          <div className="ticket-divider"></div>

          <div className="ticket-meta">

            <div>
              <span>TRAVEL DATE</span>
              <strong>{departureDate}</strong>
            </div>

            <div>
              <span>TRAVEL CLASS</span>
              <strong>{cabin}</strong>
            </div>

            <div>
              <span>PASSENGERS</span>
              <strong>{passengers.length}</strong>
            </div>

            <div>
              <span>BOOKING STATUS</span>
              <strong className="ticket-status-text">
                Confirmed
              </strong>
            </div>

          </div>

          <div className="ticket-meta">

            <div>
              <span>DEPARTURE</span>
              <strong>{flight.departure || "—"}</strong>
            </div>

            <div>
              <span>ARRIVAL</span>
              <strong>{flight.arrival || "—"}</strong>
            </div>

            <div>
              <span>FARE TYPE</span>
              <strong>{fareName}</strong>
            </div>

            <div>
              <span>BOOKING DATE</span>
              <strong>{bookingDate}</strong>
            </div>

          </div>

          <div className="ticket-bottom-cut">
            <span></span>
            <span></span>
          </div>

        </section>

        {/* PASSENGER TICKETS */}

        <section className="passenger-ticket-section">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                YOUR TRAVEL COMPANIONS
              </span>

              <h2>Passenger tickets</h2>
            </div>

            <span className="passenger-count-label">
              {passengers.length} PASSENGERS
            </span>
          </div>

          <div className="passenger-ticket-list">

            {passengers.map((passenger) => {
              const details =
                getPassengerDetails(passenger);

              return (
                <article
                  className="premium-passenger-ticket"
                  key={passenger.id}
                >

                  <div className="passenger-ticket-main">

                    <div className="passenger-ticket-avatar">
                      {passenger.id}
                    </div>

                    <div className="passenger-ticket-name">
                      <span>
                        PASSENGER {passenger.id}
                      </span>

                      <strong>{passenger.name}</strong>

                      <small>{details.meal.name}</small>
                    </div>

                    <div className="passenger-seat-block">
                      <span>SEAT</span>

                      <strong>
                        {details.seat?.id || "—"}
                      </strong>

                      <small>
                        {details.seat
                          ? seatCategories[
                              details.seat.type
                            ] || "Standard"
                          : "Unassigned"}
                      </small>
                    </div>

                  </div>

                  <div className="passenger-ticket-breakdown">

                    <div>
                      <span>Flight fare</span>
                      <strong>
                        {formatPrice(
                          flightFarePerPassenger
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>Seat charge</span>
                      <strong>
                        {formatPrice(details.seatPrice)}
                      </strong>
                    </div>

                    <div>
                      <span>Meal charge</span>
                      <strong>
                        {formatPrice(details.meal.price)}
                      </strong>
                    </div>

                    <div className="passenger-ticket-total">
                      <span>Passenger total</span>
                      <strong>
                        {formatPrice(
                          details.passengerTotal
                        )}
                      </strong>
                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </section>

        {/* DIGITAL BOARDING PASSES */}

        <DigitalBoardingPasses
          passengers={passengers}
          seats={seats}
          bookingReference={bookingReference}
          selectedFlight={selectedFlight}
        />

        {/* PAYMENT SUMMARY */}

        <section className="premium-fare-card">

          <div className="fare-card-heading">
            <div>
              <span className="section-eyebrow">
                PAYMENT SUMMARY
              </span>

              <h2>Booking total</h2>
            </div>

            <div className="fare-card-icon">₹</div>
          </div>

          <div className="fare-breakdown-row">
            <span>Passengers</span>
            <strong>{passengers.length}</strong>
          </div>

          <div className="fare-breakdown-row">
            <span>Base flight fare</span>
            <strong>
              {formatPrice(
                baseFlightFare * passengers.length
              )}
            </strong>
          </div>

          <div className="fare-breakdown-row">
            <span>{fareName} fare upgrade</span>
            <strong>
              {formatPrice(
                fareUpgrade * passengers.length
              )}
            </strong>
          </div>

          <div className="fare-breakdown-row">
            <span>Seat selection charges</span>
            <strong>{formatPrice(seatTotal)}</strong>
          </div>

          <div className="fare-breakdown-row">
            <span>Meal charges</span>
            <strong>{formatPrice(mealTotal)}</strong>
          </div>

          <div className="fare-total-divider"></div>

          <div className="fare-grand-total">
            <div>
              <span>Total booking amount</span>

              <small>
                Flight fare + fare upgrade + seats + meals
              </small>
            </div>

            <strong>{formatPrice(grandTotal)}</strong>
          </div>

        </section>

        {/* DEMO NOTICE */}

        <div className="confirmation-demo-note">
          <span>i</span>

          <p>
            <strong>Demo booking:</strong> This is a
            frontend demonstration. No actual payment,
            airline reservation, or flight ticket has
            been issued.
          </p>
        </div>

        {/* ACTIONS */}

        <div className="confirmation-actions">

          <button
            className="print-ticket-button"
            onClick={handlePrint}
            type="button"
          >
            <span>↓</span>
            Print confirmation
          </button>

          <button
            className="back-selection-button"
            onClick={onBack}
            type="button"
          >
            Back to seat selection
            <span>→</span>
          </button>

        </div>

        <footer className="premium-confirmation-footer">
          <span>SKYSELECT</span>
          <p>Travel beautifully. Choose comfortably.</p>
        </footer>

      </section>

    </main>
  );
}

export default BookingConfirmation;
