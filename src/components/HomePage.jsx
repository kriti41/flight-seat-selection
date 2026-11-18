
import { useEffect, useMemo, useState } from "react";
import AccountPage from "./AccountPage";
import MyBookings from "./MyBookings";
import "./HomePage.css";
import DestinationPage from "./DestinationPage";
import AuthModal from "./AuthModal";

const STORAGE_KEY = "skyselect_current_user";

const airports = [
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International", country: "India" },
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International", country: "India" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International", country: "India" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International", country: "India" },
  { code: "MAA", city: "Chennai", name: "Chennai International", country: "India" },
  { code: "PNQ", city: "Pune", name: "Pune International", country: "India" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhas Chandra Bose International", country: "India" },
  { code: "GOI", city: "Goa", name: "Manohar International", country: "India" },
  { code: "DXB", city: "Dubai", name: "Dubai International", country: "UAE" },
  { code: "SIN", city: "Singapore", name: "Singapore Changi Airport", country: "Singapore" },
  { code: "LHR", city: "London", name: "Heathrow Airport", country: "United Kingdom" },
  { code: "JFK", city: "New York", name: "John F. Kennedy International", country: "United States" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi Airport", country: "Thailand" },
];

const fareCategories = [
  "Regular",
  "Student",
  "Armed Forces",
  "Senior Citizen",
  "Doctor and Nurses",
];

/* ==========================================
   HERO DESTINATION DATA
========================================== */

const heroDestinations = [
  {
    name: "Maldives",
    tagline: "Escape to your own little paradise.",
    label: "TROPICAL ESCAPES",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Tokyo",
    tagline: "Discover a world that never stands still.",
    label: "CITY ADVENTURES",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Switzerland",
    tagline: "Find your way to breathtaking views.",
    label: "MOUNTAIN GETAWAYS",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Dubai",
    tagline: "Where extraordinary experiences await.",
    label: "LUXURY ESCAPES",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Singapore",
    tagline: "A new perspective at every turn.",
    label: "EXPLORE MORE",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2200&q=90",
  },
];

/* ==========================================
   DATE HELPERS
========================================== */

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const today = getToday();

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

/* ==========================================
   AIRPORT SELECT
========================================== */

function AirportSelect({ label, value, options, onChange }) {
  return (
    <label className="ss-field ss-airport-field">
      <span className="ss-field-label">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.city} ({airport.code}) — {airport.country}
          </option>
        ))}
      </select>

      <small>
        {airports.find((airport) => airport.code === value)?.name}
      </small>
    </label>
  );
}

/* ==========================================
   IMMERSIVE DESTINATION CAROUSEL
========================================== */

function DestinationHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeDestination = heroDestinations[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) =>
        (current + 1) % heroDestinations.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const showPrevious = () => {
    setActiveIndex((current) =>
      (current - 1 + heroDestinations.length) %
      heroDestinations.length
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      (current + 1) % heroDestinations.length
    );
  };

  return (
    <section
      className="ss-immersive-hero"
      aria-label="Featured travel destinations"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div
        key={activeIndex}
        className="ss-hero-background"
        style={{
          backgroundImage: `url("${activeDestination.image}")`,
        }}
        role="img"
        aria-label={`Scenic destination: ${activeDestination.name}`}
      />

      <div className="ss-hero-overlay" />

      <div
        key={`content-${activeIndex}`}
        className="ss-hero-content"
      >
        <span className="ss-hero-label">
          ✦ {activeDestination.label}
        </span>

        <h1>
          Somewhere
          <br />
          beyond the
          <br />
          <span>ordinary.</span>
        </h1>

        <p className="ss-hero-destination">
          {activeDestination.name}
        </p>

        <p className="ss-hero-tagline">
          {activeDestination.tagline}
        </p>

        <a href="#search" className="ss-hero-cta">
          Explore flights <span>→</span>
        </a>
      </div>

      <div className="ss-hero-bottom">
        <div className="ss-hero-slide-info">
          <span className="ss-hero-slide-number">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>

          <span className="ss-hero-slide-divider" />

          <span>
            {String(heroDestinations.length).padStart(2, "0")}
          </span>

          <span className="ss-hero-slide-caption">
            DESTINATIONS TO DISCOVER
          </span>
        </div>

        <div className="ss-hero-controls">
          <button
            type="button"
            className="ss-hero-arrow"
            onClick={showPrevious}
            aria-label="Previous destination"
          >
            ←
          </button>

          <div className="ss-hero-dots">
            {heroDestinations.map((destination, index) => (
              <button
                key={destination.name}
                type="button"
                className={`ss-hero-dot ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${destination.name}`}
                aria-current={
                  activeIndex === index ? "true" : undefined
                }
              />
            ))}
          </div>

          <button
            type="button"
            className="ss-hero-arrow"
            onClick={showNext}
            aria-label="Next destination"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   MAIN HOMEPAGE
========================================== */

export default function HomePage({
  onSearch,
  bookings = [],
}) {
  // Flight search states
  const [flightType, setFlightType] = useState("domestic");
  const [tripType, setTripType] = useState("one-way");

  const [from, setFrom] = useState("BOM");
  const [to, setTo] = useState("DEL");

  const [departureDate, setDepartureDate] = useState(today);
  const [returnDate, setReturnDate] = useState("");

  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState("Economy");
  const [fareCategory, setFareCategory] = useState("Regular");

  const [gstEnabled, setGstEnabled] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [priceProtection, setPriceProtection] = useState(false);

  const [error, setError] = useState("");

  // Authentication and profile states
  const [accountPage, setAccountPage] = useState(false);
  const [bookingsPage, setBookingsPage] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [profileOpen, setProfileOpen] = useState(false);

  // Destination page state
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Multi-city states
  const [segments, setSegments] = useState([
    { from: "BOM", to: "DEL", date: today },
    { from: "DEL", to: "BLR", date: today },
  ]);

  // Airport filtering
  const availableAirports = useMemo(() => {
    return airports.filter((airport) =>
      flightType === "domestic"
        ? airport.country === "India"
        : airport.country !== "India"
    );
  }, [flightType]);

  const originOptions =
    flightType === "domestic"
      ? availableAirports
      : airports.filter((airport) => airport.country === "India");

  const destinationOptions =
    flightType === "domestic"
      ? availableAirports
      : airports.filter((airport) => airport.country !== "India");

  // Change between domestic and international
  const changeFlightType = (type) => {
    setFlightType(type);

    if (type === "domestic") {
      setFrom("BOM");
      setTo("DEL");
    } else {
      setFrom("BOM");
      setTo("DXB");
    }

    setError("");
  };

  // Swap airports
  const swapAirports = () => {
    if (flightType === "international") {
      setError(
        "International journeys must have an Indian origin and an international destination in this demo."
      );
      return;
    }

    setFrom(to);
    setTo(from);
    setError("");
  };

  // Update multi-city segments
  const updateSegment = (index, field, value) => {
    setSegments((current) =>
      current.map((segment, i) =>
        i === index ? { ...segment, [field]: value } : segment
      )
    );
  };

  const addSegment = () => {
    if (segments.length >= 5) return;

    const lastSegment = segments[segments.length - 1];

    setSegments([
      ...segments,
      {
        from: lastSegment.to,
        to: "BLR",
        date: lastSegment.date,
      },
    ]);
  };

  const removeSegment = (index) => {
    if (segments.length <= 2) return;

    setSegments((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  // Main flight search
  const handleSearch = () => {
    setError("");

    if (tripType === "multi-city") {
      for (const [index, segment] of segments.entries()) {
        if (segment.from === segment.to) {
          setError(
            `Journey ${index + 1}: Origin and destination cannot be the same.`
          );
          return;
        }

        if (!segment.date) {
          setError(
            `Please select a date for journey ${index + 1}.`
          );
          return;
        }

        if (segment.date < today) {
          setError(
            `Journey ${index + 1}: The travel date cannot be in the past.`
          );
          return;
        }
      }

      const firstSegment = segments[0];

      if (gstEnabled && gstNumber.trim().length < 5) {
        setError(
          "Please enter your GST number or turn off the GST option."
        );
        return;
      }

      onSearch({
        flightType,
        tripType,
        from: airports.find(
          (airport) => airport.code === firstSegment.from
        ),
        to: airports.find(
          (airport) => airport.code === firstSegment.to
        ),
        departureDate: firstSegment.date,
        returnDate: "",
        passengers,
        cabin,
        fareCategory,
        gstEnabled,
        gstNumber,
        priceProtection,
        segments,
      });

      return;
    }

    if (!from || !to || from === to) {
      setError("Please choose two different airports.");
      return;
    }

    if (!departureDate) {
      setError("Please select your departure date.");
      return;
    }

    if (departureDate < today) {
      setError("Departure date cannot be in the past.");
      return;
    }

    if (tripType === "round-trip" && !returnDate) {
      setError("Please select your return date.");
      return;
    }

    if (
      tripType === "round-trip" &&
      returnDate < departureDate
    ) {
      setError(
        "Return date cannot be earlier than departure date."
      );
      return;
    }

    if (gstEnabled && gstNumber.trim().length < 5) {
      setError(
        "Please enter your GST number or turn off the GST option."
      );
      return;
    }

    onSearch({
      flightType,
      tripType,

      from: airports.find(
        (airport) => airport.code === from
      ),

      to: airports.find(
        (airport) => airport.code === to
      ),

      departureDate,
      returnDate: tripType === "round-trip" ? returnDate : "",

      passengers,
      cabin,
      fareCategory,

      gstEnabled,
      gstNumber,

      priceProtection,
    });
  };

  // Open a destination detail page
  const openDestination = (code) => {
    setSelectedDestination(code);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Destination page search button
  const handleDestinationSearch = (code) => {
    const destination = airports.find(
      (airport) => airport.code === code
    );

    const origin = airports.find(
      (airport) => airport.code === "BOM"
    );

    if (!destination || !origin) return;

    const isDomestic = destination.country === "India";

    setSelectedDestination(null);

    onSearch({
      flightType: isDomestic ? "domestic" : "international",
      tripType: "one-way",

      from: origin,
      to: destination,

      departureDate: today,
      returnDate: "",

      passengers: 1,
      cabin: "Economy",
      fareCategory: "Regular",

      gstEnabled: false,
      gstNumber: "",

      priceProtection: false,
    });
  };

  // Handle successful signup or login
  const handleAuthenticated = (user) => {
    setCurrentUser(user);
    setAuthMode(null);
    setProfileOpen(false);
    setAccountPage(false);
    setBookingsPage(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentUser(null);
    setProfileOpen(false);
    setAccountPage(false);
    setBookingsPage(false);
  };

  // --------------------------------
  // ACCOUNT PAGE
  // --------------------------------

  if (accountPage && currentUser) {
    return (
      <AccountPage
        user={currentUser}
        onBack={() => setAccountPage(false)}
        onLogout={handleLogout}
      />
    );
  }

  // --------------------------------
  // MY BOOKINGS PAGE
  // --------------------------------

  if (bookingsPage && currentUser) {
    return (
      <MyBookings
        bookings={bookings}
        user={currentUser}
        onBack={() => setBookingsPage(false)}
      />
    );
  }

  // --------------------------------
  // DESTINATION DETAIL PAGE
  // --------------------------------

  if (selectedDestination) {
    return (
      <DestinationPage
        code={selectedDestination}
        onBack={() => setSelectedDestination(null)}
        onSearch={handleDestinationSearch}
      />
    );
  }

  const firstName =
    currentUser?.name?.trim().split(/\s+/)[0] || "Account";

  const initials =
    currentUser?.name
      ?.trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "S";

  return (
    <div className="skyselect-home">

      {/* NAVIGATION */}
      <header className="ss-navbar">

        <a className="ss-brand" href="#home">
          <span className="ss-brand-mark">S</span>
          <span>skyselect</span>
        </a>

        <nav className="ss-nav-links">
          <a href="#search">Book flights</a>
          <a href="#destinations">Explore</a>
          <a href="#why-skyselect">Why SkySelect</a>
        </nav>

        {/* ACCOUNT AREA */}
        <div className="ss-nav-actions">

          {currentUser ? (
            <div className="ss-profile-wrapper">

              <button
                type="button"
                className="ss-profile-button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-label="Open account menu"
              >
                <span className="ss-profile-avatar-initials">
                  {initials}
                </span>

                <span>{firstName}</span>
                <span className="ss-profile-chevron">⌄</span>
              </button>

              {profileOpen && (
                <div className="ss-profile-dropdown">

                  <div className="ss-profile-header">
                    <img
                      className="ss-profile-avatar"
                      src="https://i.pravatar.cc/120?img=47"
                      alt="Profile"
                    />

                    <div className="ss-profile-details">
                      <strong>{currentUser.name}</strong>
                      <span>{currentUser.email}</span>
                      <span>
                        {currentUser.mobile
                          ? `+91 ${currentUser.mobile}`
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="ss-profile-divider" />

                  <button
                    type="button"
                    className="ss-logout-button"
                    onClick={() => {
                      setProfileOpen(false);
                      setBookingsPage(false);
                      setAccountPage(true);
                    }}
                  >
                    <span>♙</span>
                    My Account
                  </button>

                  <button
                    type="button"
                    className="ss-logout-button"
                    onClick={() => {
                      setProfileOpen(false);
                      setAccountPage(false);
                      setBookingsPage(true);
                    }}
                  >
                    <span>▤</span>
                    My Bookings
                  </button>

                  <div className="ss-profile-divider" />

                  <button
                    type="button"
                    className="ss-logout-button"
                    onClick={handleLogout}
                  >
                    <span>↪</span>
                    Log out
                  </button>

                </div>
              )}

            </div>
          ) : (
            <>
              <button
                type="button"
                className="ss-login-button"
                onClick={() => setAuthMode("login")}
              >
                Log in
              </button>

              <button
                type="button"
                className="ss-signup-button"
                onClick={() => setAuthMode("signup")}
              >
                Sign up
              </button>
            </>
          )}

        </div>
      </header>

      <main id="home">

        {/* IMMERSIVE DESTINATION HERO */}
        <DestinationHero />

        {/* FLIGHT SEARCH */}
        <section className="ss-search-section" id="search">

          <div className="ss-section-heading">

            <div>
              <span className="ss-eyebrow">
                PLAN YOUR TRIP
              </span>

              <h2>Find your flight</h2>

              <p>
                Choose your journey details to explore available flights.
              </p>
            </div>

            <span className="ss-demo-label">
              DEMO FLIGHT SEARCH
            </span>

          </div>

          <div className="ss-search-card">

            {/* TRIP TYPE */}
            <div className="ss-search-topline">

              <div className="ss-trip-tabs">
                {[
                  ["one-way", "One Way"],
                  ["round-trip", "Round Trip"],
                  ["multi-city", "Multi City"],
                ].map(([value, label]) => (
                  <button
                    type="button"
                    key={value}
                    className={tripType === value ? "active" : ""}
                    onClick={() => {
                      setTripType(value);
                      setError("");
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* DOMESTIC / INTERNATIONAL */}
              <div className="ss-flight-type">

                <button
                  type="button"
                  className={
                    flightType === "domestic" ? "active" : ""
                  }
                  onClick={() => changeFlightType("domestic")}
                >
                  Domestic
                </button>

                <button
                  type="button"
                  className={
                    flightType === "international" ? "active" : ""
                  }
                  onClick={() => changeFlightType("international")}
                >
                  International
                </button>

              </div>
            </div>

            {/* NORMAL SEARCH */}
            {tripType !== "multi-city" && (
              <div className="ss-route-grid">

                <AirportSelect
                  label="FROM"
                  value={from}
                  options={originOptions}
                  onChange={setFrom}
                />

                <button
                  type="button"
                  className="ss-swap-button"
                  onClick={swapAirports}
                  aria-label="Swap airports"
                >
                  ⇄
                </button>

                <AirportSelect
                  label="TO"
                  value={to}
                  options={destinationOptions}
                  onChange={setTo}
                />

                <label className="ss-field">
                  <span className="ss-field-label">
                    DEPARTURE
                  </span>

                  <input
                    type="date"
                    min={today}
                    value={departureDate}
                    onChange={(event) =>
                      setDepartureDate(event.target.value)
                    }
                  />
                </label>

                {tripType === "round-trip" && (
                  <label className="ss-field">
                    <span className="ss-field-label">
                      RETURN
                    </span>

                    <input
                      type="date"
                      min={departureDate || today}
                      value={returnDate}
                      onChange={(event) =>
                        setReturnDate(event.target.value)
                      }
                    />
                  </label>
                )}

              </div>
            )}

            {/* MULTI-CITY SEARCH */}
            {tripType === "multi-city" && (
              <div className="ss-multicity-list">

                {segments.map((segment, index) => (
                  <div className="ss-segment-row" key={index}>

                    <div className="ss-segment-label">
                      JOURNEY {index + 1}
                    </div>

                    <select
                      value={segment.from}
                      onChange={(event) =>
                        updateSegment(index, "from", event.target.value)
                      }
                    >
                      {airports.map((airport) => (
                        <option
                          key={airport.code}
                          value={airport.code}
                        >
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </select>

                    <span className="ss-segment-arrow">
                      →
                    </span>

                    <select
                      value={segment.to}
                      onChange={(event) =>
                        updateSegment(index, "to", event.target.value)
                      }
                    >
                      {airports.map((airport) => (
                        <option
                          key={airport.code}
                          value={airport.code}
                        >
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </select>

                    <input
                      type="date"
                      min={today}
                      value={segment.date}
                      onChange={(event) =>
                        updateSegment(index, "date", event.target.value)
                      }
                    />

                    {segments.length > 2 && (
                      <button
                        type="button"
                        className="ss-remove-segment"
                        onClick={() => removeSegment(index)}
                      >
                        Remove
                      </button>
                    )}

                  </div>
                ))}

                <button
                  type="button"
                  className="ss-add-segment"
                  onClick={addSegment}
                  disabled={segments.length >= 5}
                >
                  + Add another city
                </button>

              </div>
            )}

            {/* TRAVELLERS, CABIN AND FARE */}
            <div className="ss-options-grid">

              <label className="ss-field">
                <span className="ss-field-label">
                  TRAVELLERS
                </span>

                <select
                  value={passengers}
                  onChange={(event) =>
                    setPassengers(Number(event.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "Traveller" : "Travellers"}
                    </option>
                  ))}
                </select>
              </label>

              <label className="ss-field">
                <span className="ss-field-label">
                  CABIN CLASS
                </span>

                <select
                  value={cabin}
                  onChange={(event) => setCabin(event.target.value)}
                >
                  {[
                    "Economy",
                    "Premium Economy",
                    "Business",
                    "First",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="ss-field">
                <span className="ss-field-label">
                  FARE TYPE
                </span>

                <select
                  value={fareCategory}
                  onChange={(event) =>
                    setFareCategory(event.target.value)
                  }
                >
                  {fareCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

            </div>

            {/* ADDITIONAL OPTIONS */}
            <div className="ss-extra-options">

              <label className="ss-check-option">
                <input
                  type="checkbox"
                  checked={gstEnabled}
                  onChange={(event) =>
                    setGstEnabled(event.target.checked)
                  }
                />

                <span>
                  <strong>GST details</strong>
                  <small>
                    Book for business and claim eligible input tax credit.
                  </small>
                </span>
              </label>

              <label className="ss-check-option">
                <input
                  type="checkbox"
                  checked={priceProtection}
                  onChange={(event) =>
                    setPriceProtection(event.target.checked)
                  }
                />

                <span>
                  <strong>Price Drop Protection</strong>
                  <small>
                    Explore optional price protection for your booking.
                  </small>
                </span>
              </label>

            </div>

            {/* GST INPUT */}
            {gstEnabled && (
              <label className="ss-field ss-gst-field">
                <span className="ss-field-label">
                  GST NUMBER
                </span>

                <input
                  value={gstNumber}
                  onChange={(event) =>
                    setGstNumber(event.target.value.toUpperCase())
                  }
                  placeholder="Enter your business GST number"
                />
              </label>
            )}

            {/* VALIDATION */}
            {error && (
              <p className="ss-error-message" role="alert">
                {error}
              </p>
            )}

            {/* SEARCH BUTTON */}
            <div className="ss-search-footer">

              <p>
                Flight schedules and fares shown in this assessment are sample data.
              </p>

              <button
                type="button"
                className="ss-primary-button"
                onClick={handleSearch}
              >
                Search flights <span>→</span>
              </button>

            </div>

          </div>
        </section>

        {/* DESTINATION EXPLORER */}
        <section className="ss-destinations" id="destinations">

          <div className="ss-section-heading">
            <div>
              <span className="ss-eyebrow">
                GET INSPIRED
              </span>

              <h2>Somewhere to begin</h2>

              <p>
                A few ideas for your next escape.
              </p>
            </div>
          </div>

          <div className="ss-destination-grid">

            <button
              type="button"
              className="ss-destination-card ss-dubai"
              onClick={() => openDestination("DXB")}
            >
              <span>UNITED ARAB EMIRATES</span>
              <strong>Dubai</strong>
              <small>City lights & desert skies ↗</small>
            </button>

            <button
              type="button"
              className="ss-destination-card ss-singapore"
              onClick={() => openDestination("SIN")}
            >
              <span>SINGAPORE</span>
              <strong>Singapore</strong>
              <small>Where cultures meet ↗</small>
            </button>

            <button
              type="button"
              className="ss-destination-card ss-goa"
              onClick={() => openDestination("GOI")}
            >
              <span>INDIA</span>
              <strong>Goa</strong>
              <small>Slow down by the sea ↗</small>
            </button>

            <button
              type="button"
              className="ss-destination-card ss-dubai"
              onClick={() => openDestination("LHR")}
            >
              <span>UNITED KINGDOM</span>
              <strong>London</strong>
              <small>History and culture ↗</small>
            </button>

            <button
              type="button"
              className="ss-destination-card ss-singapore"
              onClick={() => openDestination("BKK")}
            >
              <span>THAILAND</span>
              <strong>Bangkok</strong>
              <small>Discover something vibrant ↗</small>
            </button>

          </div>
        </section>

        {/* WHY SKYSELECT */}
        <section
          className="ss-why-section"
          id="why-skyselect"
        >
          <span className="ss-eyebrow">
            THE SKYSELECT DIFFERENCE
          </span>

          <h2>A smoother way to take off.</h2>

          <div className="ss-benefits">

            <div>
              <span>01</span>
              <strong>Choose with clarity</strong>
              <p>
                Compare flight options and fare details in one place.
              </p>
            </div>

            <div>
              <span>02</span>
              <strong>Make it yours</strong>
              <p>
                Choose seats and meals to suit every traveller.
              </p>
            </div>

            <div>
              <span>03</span>
              <strong>Stay in control</strong>
              <p>
                Review your booking details before confirmation.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="ss-footer">

        <a className="ss-brand" href="#home">
          <span className="ss-brand-mark">S</span>
          <span>skyselect</span>
        </a>

        <span>
          Designed for journeys that matter.
        </span>

        <div>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#search">Help</a>
        </div>

        <small>
          © 2026 SkySelect. Demo flight-booking experience.
        </small>

      </footer>

      {/* LOGIN / SIGNUP MODAL */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={setAuthMode}
          onAuthenticated={handleAuthenticated}
        />
      )}

    </div>
  );
}
