
import React, { useMemo, useState } from "react";
import DigitalBoardingPasses from "./DigitalBoardingPasses";
import "./MyBookings.css";

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "₹0";

  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

function getFlightDetails(booking) {
  const selectedFlight = booking.selectedFlight || {};
  const flight = selectedFlight.chosenFlight || {};

  return {
    airline: flight.airline || "Airline",
    flightNumber: flight.code || "Flight details unavailable",
    origin: selectedFlight.from || {},
    destination: selectedFlight.to || {},
    departureDate: selectedFlight.departureDate || "",
    cabin: selectedFlight.cabin || "Economy",
  };
}

function getBookingStatus(booking) {
  const departureDate = getFlightDetails(booking).departureDate;

  if (!departureDate) return "upcoming";

  const date = new Date(departureDate);

  if (Number.isNaN(date.getTime())) return "upcoming";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date < today ? "past" : "upcoming";
}

export default function MyBookings({
  bookings = [],
  user,
  onBack,
}) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [expandedBooking, setExpandedBooking] = useState(null);

  const userBookings = useMemo(() => {
    const email = user?.email?.toLowerCase();

    return bookings
      .filter((booking) => {
        return (
          email &&
          booking.userEmail?.toLowerCase() === email
        );
      })
      .sort((a, b) => {
        const dateA = new Date(
          getFlightDetails(a).departureDate || 0
        ).getTime();

        const dateB = new Date(
          getFlightDetails(b).departureDate || 0
        ).getTime();

        return dateA - dateB;
      });
  }, [bookings, user]);

  const upcomingBookings = userBookings.filter(
    (booking) => getBookingStatus(booking) === "upcoming"
  );

  const pastBookings = userBookings.filter(
    (booking) => getBookingStatus(booking) === "past"
  );

  const visibleBookings =
    activeTab === "upcoming"
      ? upcomingBookings
      : pastBookings;

  const toggleBoardingPass = (reference) => {
    setExpandedBooking((current) =>
      current === reference ? null : reference
    );
  };

  return (
    <main className="my-bookings-page">
      <header className="my-bookings-navbar">
        <button
          type="button"
          className="my-bookings-back"
          onClick={onBack}
        >
          <span>←</span>
          Back to home
        </button>

        <div className="my-bookings-brand">
          <span className="my-bookings-brand-icon">✈</span>
          SKYSELECT
        </div>

        <div className="my-bookings-user">
          <span className="my-bookings-user-avatar">
            {user?.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
          </span>
          <span>{user?.name || "Traveler"}</span>
        </div>
      </header>

      <section className="my-bookings-content">
        <div className="my-bookings-heading">
          <div>
            <span className="my-bookings-eyebrow">
              YOUR JOURNEYS
            </span>
            <h1>My bookings</h1>
            <p>
              All your trips, travel details and digital boarding
              passes in one place.
            </p>
          </div>

          <div className="my-bookings-heading-icon">✈</div>
        </div>

        <div className="my-bookings-summary">
          <div className="my-bookings-summary-card">
            <span className="my-bookings-summary-icon">✈</span>
            <div>
              <strong>{userBookings.length}</strong>
              <span>Total bookings</span>
            </div>
          </div>

          <div className="my-bookings-summary-card">
            <span className="my-bookings-summary-icon upcoming">
              ↗
            </span>
            <div>
              <strong>{upcomingBookings.length}</strong>
              <span>Upcoming trips</span>
            </div>
          </div>

          <div className="my-bookings-summary-card">
            <span className="my-bookings-summary-icon past">
              ✓
            </span>
            <div>
              <strong>{pastBookings.length}</strong>
              <span>Completed trips</span>
            </div>
          </div>
        </div>

        <div className="my-bookings-list-header">
          <div>
            <h2>Your travel history</h2>
            <p>Manage and review your flight bookings.</p>
          </div>

          <div className="my-bookings-tabs">
            <button
              type="button"
              className={
                activeTab === "upcoming" ? "active" : ""
              }
              onClick={() => {
                setActiveTab("upcoming");
                setExpandedBooking(null);
              }}
            >
              Upcoming
              <span>{upcomingBookings.length}</span>
            </button>

            <button
              type="button"
              className={
                activeTab === "past" ? "active" : ""
              }
              onClick={() => {
                setActiveTab("past");
                setExpandedBooking(null);
              }}
            >
              Past
              <span>{pastBookings.length}</span>
            </button>
          </div>
        </div>

        {visibleBookings.length === 0 ? (
          <div className="my-bookings-empty">
            <div className="my-bookings-empty-icon">✈</div>

            <h3>
              {activeTab === "upcoming"
                ? "No upcoming trips yet"
                : "No completed trips yet"}
            </h3>

            <p>
              {activeTab === "upcoming"
                ? "Your confirmed future flight bookings will appear here."
                : "After you travel, your completed bookings will appear here."}
            </p>

            <button
              type="button"
              onClick={onBack}
              className="my-bookings-explore-button"
            >
              Explore flights
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="my-bookings-cards">
            {visibleBookings.map((booking) => {
              const details = getFlightDetails(booking);
              const reference =
                booking.bookingReference || booking.id;
              const passengers = booking.passengers || [];
              const seats = booking.seats || [];
              const isExpanded = expandedBooking === reference;

              const originCode = details.origin?.code || "—";
              const destinationCode =
                details.destination?.code || "—";

              return (
                <article
                  className="my-booking-card"
                  key={reference}
                >
                  <div className="my-booking-card-top">
                    <div className="my-booking-airline">
                      <span className="my-booking-plane-icon">
                        ✈
                      </span>
                      <div>
                        <strong>{details.airline}</strong>
                        <span>{details.flightNumber}</span>
                      </div>
                    </div>

                    <span
                      className={`my-booking-status ${
                        activeTab === "upcoming"
                          ? "status-upcoming"
                          : "status-past"
                      }`}
                    >
                      {activeTab === "upcoming"
                        ? "Confirmed"
                        : "Completed"}
                    </span>
                  </div>

                  <div className="my-booking-route">
                    <div className="my-booking-airport">
                      <strong>{originCode}</strong>
                      <span>
                        {details.origin?.city || "Origin"}
                      </span>
                    </div>

                    <div className="my-booking-route-middle">
                      <span>
                        {details.departureDate
                          ? formatDate(details.departureDate)
                          : "Date unavailable"}
                      </span>
                      <div className="my-booking-route-line">
                        <span>✈</span>
                      </div>
                      <small>{details.cabin}</small>
                    </div>

                    <div className="my-booking-airport destination">
                      <strong>{destinationCode}</strong>
                      <span>
                        {details.destination?.city || "Destination"}
                      </span>
                    </div>
                  </div>

                  <div className="my-booking-card-details">
                    <div>
                      <span>BOOKING REFERENCE</span>
                      <strong>{reference || "Unavailable"}</strong>
                    </div>

                    <div>
                      <span>PASSENGERS</span>
                      <strong>{passengers.length}</strong>
                    </div>

                    <div>
                      <span>SEATS SELECTED</span>
                      <strong>
                        {passengers
                          .map((passenger) => passenger.seatId)
                          .filter(Boolean)
                          .join(", ") || "Not assigned"}
                      </strong>
                    </div>

                    <div>
                      <span>TOTAL PAID</span>
                      <strong>
                        {formatPrice(
                          booking.total ??
                            booking.totalAmount ??
                            0
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className="my-booking-card-footer">
                    <span>
                      Booked on {formatDate(booking.bookingDate)}
                    </span>

                    <button
                      type="button"
                      className="my-booking-pass-button"
                      onClick={() => toggleBoardingPass(reference)}
                    >
                      {isExpanded
                        ? "Hide boarding passes"
                        : "View boarding passes"}
                      <span>{isExpanded ? "↑" : "↓"}</span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="my-booking-expanded">
                      <div className="my-booking-expanded-heading">
                        <h3>Passenger details</h3>
                        <p>
                          Your saved passenger and seat assignments.
                        </p>
                      </div>

                      {passengers.length > 0 ? (
                        <div className="my-booking-passengers">
                          {passengers.map((passenger) => {
                            const seat = seats.find(
                              (item) =>
                                item.id === passenger.seatId
                            );

                            return (
                              <div
                                className="my-booking-passenger"
                                key={passenger.id}
                              >
                                <div className="my-booking-passenger-avatar">
                                  {passenger.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "P"}
                                </div>

                                <div>
                                  <strong>
                                    {passenger.name || "Passenger"}
                                  </strong>
                                  <span>
                                    Passenger {passenger.id}
                                  </span>
                                </div>

                                <div className="my-booking-passenger-seat">
                                  <span>SEAT</span>
                                  <strong>
                                    {passenger.seatId || "—"}
                                  </strong>
                                </div>

                                <div className="my-booking-passenger-seat">
                                  <span>MEAL</span>
                                  <strong>
                                    {passenger.meal || "None"}
                                  </strong>
                                </div>

                                <div className="my-booking-passenger-seat">
                                  <span>SEAT TYPE</span>
                                  <strong>
                                    {seat?.type || "Standard"}
                                  </strong>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="my-booking-no-passengers">
                          Passenger details are unavailable for this booking.
                        </p>
                      )}

                      <DigitalBoardingPasses
                        passengers={passengers}
                        seats={seats}
                        bookingReference={reference}
                        selectedFlight={booking.selectedFlight}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className="my-bookings-demo-note">
          <span>ⓘ</span>
          SkySelect is a demonstration booking application. Booking
          records and boarding passes are stored locally in this browser.
        </div>
      </section>
    </main>
  );
}
