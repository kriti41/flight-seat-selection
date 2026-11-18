
import { useState } from "react";

import HomePage from "./components/HomePage";
import MealSelector from "./components/MealSelector";
import SeatDetails from "./components/seatdetails";
import PassengerSelector from "./components/PassengerSelector";
import AircraftLayout from "./components/AircraftLayout";
import BookingSummary from "./components/BookingSummary";
import BookingConfirmation from "./components/BookingConfirmation";
import FlightResults from "./components/FlightResults";

import { generateSeats } from "./data/seats";
import { createPassengers } from "./data/passengers";
import { calculateTotal } from "./utils/pricing";

import "./App.css";

// --------------------------------
// LOCAL STORAGE CONFIGURATION
// --------------------------------

const BOOKINGS_STORAGE_KEY = "skyselect_bookings";
const CURRENT_USER_KEY = "skyselect_current_user";

function getSavedBookings() {
  try {
    const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Unable to read saved bookings:", error);
    return [];
  }
}

function getCurrentUser() {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Unable to read current user:", error);
    return null;
  }
}

// --------------------------------
// BOOKING TOTAL CALCULATION
// --------------------------------

const mealPrices = {
  none: 0,
  vegetarian: 250,
  nonVegetarian: 350,
  vegan: 300,
};

function calculateBookingTotal(passengers, seats, selectedFlight) {
  const flight = selectedFlight?.chosenFlight || {};

  const flightFarePerPassenger = Number(
    flight.finalPrice ??
    (
      Number(flight.basePrice ?? flight.price ?? 0) +
      Number(
        flight.fareUpgrade ??
        flight.selectedFare?.extra ??
        0
      )
    )
  );

  const totalFlightFare =
    flightFarePerPassenger * passengers.length;

  const additionalCharges = calculateTotal(passengers, seats);

  return totalFlightFare + additionalCharges;
}

// --------------------------------
// APPLICATION
// --------------------------------

function App() {
  // --------------------------------
  // APPLICATION STATE
  // --------------------------------

  const [layout, setLayout] = useState("3-2");

  const [seats, setSeats] = useState(() =>
    generateSeats("3-2")
  );

  const [passengers, setPassengers] = useState(() =>
    createPassengers(2)
  );

  const [showFlightResults, setShowFlightResults] =
    useState(false);

  const [flightSearch, setFlightSearch] = useState(null);

  const [hasStartedBooking, setHasStartedBooking] =
    useState(false);

  const [selectedFlight, setSelectedFlight] =
    useState(null);

  const [activePassenger, setActivePassenger] =
    useState(1);

  const [bookingReference, setBookingReference] =
    useState(null);

  const [bookingError, setBookingError] = useState("");

  const [isConfirmed, setIsConfirmed] = useState(false);

  // --------------------------------
  // SAVED BOOKING HISTORY
  // --------------------------------

  const [bookings, setBookings] = useState(() =>
    getSavedBookings()
  );

  // --------------------------------
  // SAVE BOOKING
  // --------------------------------

  const saveBooking = (reference) => {
    const currentUser = getCurrentUser();

    const bookingTotal = calculateBookingTotal(
      passengers,
      seats,
      selectedFlight
    );

    const newBooking = {
      id: reference,
      bookingReference: reference,

      // Account association
      userEmail: currentUser?.email?.toLowerCase() || null,
      userName: currentUser?.name || "Guest",

      // Booking timestamps
      bookingDate: new Date().toISOString(),

      // Flight snapshot
      selectedFlight: JSON.parse(
        JSON.stringify(selectedFlight)
      ),

      // Passenger and seat snapshots
      passengers: JSON.parse(
        JSON.stringify(passengers)
      ),

      seats: JSON.parse(
        JSON.stringify(seats)
      ),

      // Final booking amount
      total: bookingTotal,
      totalAmount: bookingTotal,
    };

    setBookings((previousBookings) => {
      // Prevent duplicate booking references
      const alreadyExists = previousBookings.some(
        (booking) =>
          booking.bookingReference === reference
      );

      if (alreadyExists) {
        return previousBookings;
      }

      const updatedBookings = [
        newBooking,
        ...previousBookings,
      ];

      try {
        localStorage.setItem(
          BOOKINGS_STORAGE_KEY,
          JSON.stringify(updatedBookings)
        );
      } catch (error) {
        console.error("Unable to save booking:", error);
        setBookingError(
          "Your booking could not be saved in browser storage."
        );
      }

      return updatedBookings;
    });
  };

  // --------------------------------
  // EVENT HANDLERS
  // --------------------------------

  const handleStartBooking = (searchData) => {
    setFlightSearch(searchData);
    setShowFlightResults(true);
    setHasStartedBooking(true);
    setBookingError("");
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight({
      ...flightSearch,
      chosenFlight: flight,
    });

    setPassengers(
      createPassengers(
        Number(flightSearch?.passengers || 1)
      )
    );

    setActivePassenger(1);
    setBookingError("");
    setShowFlightResults(false);
    setHasStartedBooking(true);
  };

  const handleBackToResults = () => {
    setHasStartedBooking(true);
    setShowFlightResults(true);
    setBookingError("");
  };

  // --------------------------------
  // PASSENGER COUNT
  // --------------------------------

  const handlePassengerCountChange = (count) => {
    setPassengers((previous) => {
      if (count < previous.length) {
        return previous.slice(0, count);
      }

      const newPassengers = [...previous];

      for (let i = previous.length; i < count; i++) {
        newPassengers.push({
          id: i + 1,
          name: `Passenger ${i + 1}`,
          seatId: null,
          meal: "none",
        });
      }

      return newPassengers;
    });

    setActivePassenger((current) =>
      Math.min(current, count)
    );

    setBookingError("");
  };

  // --------------------------------
  // SEAT ASSIGNMENT
  // --------------------------------

  const handleSeatSelect = (seat) => {
    const alreadyAssigned = passengers.some(
      (passenger) =>
        passenger.seatId === seat.id &&
        passenger.id !== activePassenger
    );

    if (alreadyAssigned) {
      return;
    }

    setPassengers((previous) =>
      previous.map((passenger) => {
        if (passenger.id !== activePassenger) {
          return passenger;
        }

        return {
          ...passenger,
          seatId:
            passenger.seatId === seat.id
              ? null
              : seat.id,
        };
      })
    );

    setBookingError("");
  };

  // --------------------------------
  // AIRCRAFT LAYOUT
  // --------------------------------

  const handleLayoutChange = (newLayout) => {
    const newSeats = generateSeats(newLayout);

    const validSeatIds = new Set(
      newSeats.map((seat) => seat.id)
    );

    setLayout(newLayout);
    setSeats(newSeats);

    setPassengers((previous) =>
      previous.map((passenger) => ({
        ...passenger,
        seatId: validSeatIds.has(passenger.seatId)
          ? passenger.seatId
          : null,
      }))
    );

    setBookingError("");
  };

  // --------------------------------
  // MEAL SELECTION
  // --------------------------------

  const handleMealChange = (meal) => {
    setPassengers((previous) =>
      previous.map((passenger) =>
        passenger.id === activePassenger
          ? { ...passenger, meal }
          : passenger
      )
    );
  };

  // --------------------------------
  // CURRENT PASSENGER
  // --------------------------------

  const currentPassenger = passengers.find(
    (passenger) =>
      passenger.id === activePassenger
  );

  // --------------------------------
  // CONFIRM BOOKING
  // --------------------------------

  const handleConfirmBooking = () => {
    const unassignedPassengers = passengers.filter(
      (passenger) => !passenger.seatId
    );

    const assignedSeats = passengers
      .map((passenger) => passenger.seatId)
      .filter(Boolean);

    const hasDuplicateSeats =
      new Set(assignedSeats).size !==
      assignedSeats.length;

    if (unassignedPassengers.length > 0) {
      setBookingError(
        `Please select seats for all passengers. ${unassignedPassengers.length} passenger(s) still need a seat.`
      );
      return;
    }

    if (hasDuplicateSeats) {
      setBookingError(
        "Two passengers cannot share the same seat. Please review your selections."
      );
      return;
    }

    const reference =
      "SKY" + Date.now().toString().slice(-8);

    // Save booking before showing confirmation
    saveBooking(reference);

    setBookingReference(reference);
    setBookingError("");
    setIsConfirmed(true);
  };

  // --------------------------------
  // RETURN TO SEAT SELECTION
  // --------------------------------

  const handleBackToSelection = () => {
    setIsConfirmed(false);
    setBookingError("");
  };

  // --------------------------------
  // TOP-LEVEL VIEWS
  // --------------------------------

  if (!hasStartedBooking) {
    return (
      <HomePage
        onSearch={handleStartBooking}
        bookings={bookings}
      />
    );
  }

  if (showFlightResults) {
    return (
      <FlightResults
        searchData={flightSearch}
        onSelectFlight={handleSelectFlight}
        onBack={() => {
          setShowFlightResults(false);
          setHasStartedBooking(false);
        }}
      />
    );
  }

  if (isConfirmed) {
    return (
      <BookingConfirmation
        passengers={passengers}
        seats={seats}
        bookingReference={bookingReference}
        selectedFlight={selectedFlight}
        onBack={handleBackToSelection}
      />
    );
  }

  // --------------------------------
  // SEAT SELECTION PAGE
  // --------------------------------

  return (
    <div className="app-container">

      <header className="app-header">
        <div className="brand">
          <span className="brand-icon">✈</span>

          <div>
            <h1>SkySelect</h1>
            <p>Flight Seat Selection</p>
          </div>
        </div>

        <div className="header-tag">
          Your journey, your choice
        </div>
      </header>

      {/* SELECTED FLIGHT DETAILS */}

      {selectedFlight && (
        <div className="selected-flight-banner">
          <span>✈</span>

          <strong>
            {selectedFlight.from.city} (
            {selectedFlight.from.code})
            {" → "}
            {selectedFlight.to.city} (
            {selectedFlight.to.code})
          </strong>

          <span>
            {selectedFlight.flightType === "domestic"
              ? "Domestic"
              : "International"}
          </span>

          <span>
            {new Date(
              selectedFlight.departureDate + "T00:00:00"
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      )}

      <main className="main-content">

        <button
          type="button"
          className="seat-back-button"
          onClick={handleBackToResults}
        >
          ← Back to flight results
        </button>

        {/* WELCOME SECTION */}

        <section className="welcome-section">
          <div>
            <span className="eyebrow">
              FLIGHT EXPERIENCE
            </span>

            <h2>Choose your perfect seat</h2>

            <p>
              Select passengers, explore available seats,
              and customize your journey.
            </p>
          </div>

          <div className="flight-badge">
            <span>✈</span>

            <div>
              <strong>
                {selectedFlight?.chosenFlight?.code ||
                  "SK 204"}
              </strong>

              <small>
                {selectedFlight?.cabin || "Economy"} Class
              </small>
            </div>
          </div>
        </section>

        {/* MAIN BOOKING GRID */}

        <div className="main-grid">

          <div className="left-column">

            <PassengerSelector
              passengers={passengers}
              activePassenger={activePassenger}
              onPassengerChange={setActivePassenger}
              onCountChange={handlePassengerCountChange}
            />

            <AircraftLayout
              seats={seats}
              layout={layout}
              activePassenger={activePassenger}
              passengers={passengers}
              onSeatSelect={handleSeatSelect}
              onLayoutChange={handleLayoutChange}
            />

          </div>

          <aside className="right-column">

            {currentPassenger && (
              <>
                <SeatDetails
                  passenger={currentPassenger}
                  seats={seats}
                />

                <MealSelector
                  passenger={currentPassenger}
                  onMealChange={handleMealChange}
                />
              </>
            )}

            <BookingSummary
              passengers={passengers}
              seats={seats}
              selectedFlight={selectedFlight}
            />

          </aside>

        </div>

        {/* CONFIRM BOOKING SECTION */}

        <section className="continue-booking-section">

          {bookingError && (
            <div className="booking-error">
              <span>!</span>
              {bookingError}
            </div>
          )}

          <div className="continue-booking-content">

            <div>
              <strong>Ready for your journey?</strong>

              <p>
                Review your passenger and seat selections
                before confirming.
              </p>
            </div>

            <button
              className="continue-booking-button premium-confirm-button"
              onClick={handleConfirmBooking}
              type="button"
            >
              <span className="confirm-button-icon">
                ✈
              </span>

              <span className="confirm-button-copy">
                <strong>Confirm my booking</strong>
                <small>
                  Review and complete your selection
                </small>
              </span>

              <span className="confirm-button-arrow">
                →
              </span>
            </button>

          </div>

        </section>

      </main>

      {/* FOOTER */}

      <footer className="app-footer">
        <p>SkySelect · Flight Seat Selection Demo</p>
        <p>Plan your journey with comfort.</p>
      </footer>

    </div>
  );
}

export default App;
