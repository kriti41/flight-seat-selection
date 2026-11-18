
import { useMemo, useState } from "react";
import "./FlightResults.css";
import FlightRouteMap from "./FlightRouteMap";
import AirlineLogo from "./AirlineLogo";
const demoFlights = [
  {
    id: 1,
    airline: "IndiGo",
    code: "6E 204",
    departure: "06:15",
    arrival: "08:25",
    duration: "2h 10m",
    stops: 0,
    price: 4599,
    logo: "6E",
    meals: "Buy on board",
    tag: "Cheapest",
  },
  {
    id: 2,
    airline: "Air India",
    code: "AI 865",
    departure: "09:30",
    arrival: "11:40",
    duration: "2h 10m",
    stops: 0,
    price: 5299,
    logo: "AI",
    meals: "Meal included",
    tag: "Popular",
  },
  {
    id: 3,
    airline: "Akasa Air",
    code: "QP 112",
    departure: "13:45",
    arrival: "16:00",
    duration: "2h 15m",
    stops: 0,
    price: 4899,
    logo: "QP",
    meals: "Buy on board",
    tag: "",
  },
  {
    id: 4,
    airline: "Air India Express",
    code: "IX 341",
    departure: "17:20",
    arrival: "20:10",
    duration: "2h 50m",
    stops: 1,
    price: 4199,
    logo: "IX",
    meals: "Meal available",
    tag: "Value pick",
  },
];

const fares = [
  {
    id: "saver",
    name: "Saver",
    description: "Essential travel",
    extra: 0,
    benefits: [
      "Cabin baggage",
      "Standard check-in baggage",
    ],
  },
  {
    id: "value",
    name: "Value",
    description: "A little more flexibility",
    extra: 700,
    benefits: [
      "Cabin baggage",
      "Check-in baggage",
      "Meal included",
    ],
  },
  {
    id: "flex",
    name: "Flex",
    description: "Maximum flexibility",
    extra: 1500,
    benefits: [
      "Priority services",
      "Flexible changes",
      "Meal included",
    ],
  },
];

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function FlightResults({
  searchData,
  onSelectFlight,
  onBack,
}) {
  const [sortBy, setSortBy] = useState("recommended");
  const [nonStopOnly, setNonStopOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [selectedFare, setSelectedFare] = useState({});

  const from = searchData?.from;
  const to = searchData?.to;

  const routeDate = searchData?.departureDate
    ? new Date(
        searchData.departureDate + "T00:00:00"
      ).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date not selected";

  const passengerCount = Number(
    searchData?.passengers || 1
  );

  const flights = useMemo(() => {
    let result = [...demoFlights];

    if (nonStopOnly) {
      result = result.filter(
        (flight) => flight.stops === 0
      );
    }

    result = result.filter(
      (flight) => flight.price <= maxPrice
    );

    if (sortBy === "price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "departure") {
      result.sort((a, b) =>
        a.departure.localeCompare(b.departure)
      );
    } else if (sortBy === "duration") {
      const getMinutes = (duration) => {
        const hours = Number(
          duration.match(/(\d+)h/)?.[1] || 0
        );
        const minutes = Number(
          duration.match(/(\d+)m/)?.[1] || 0
        );

        return hours * 60 + minutes;
      };

      result.sort(
        (a, b) =>
          getMinutes(a.duration) -
          getMinutes(b.duration)
      );
    }

    return result;
  }, [sortBy, nonStopOnly, maxPrice]);

  // Pass the complete fare information to App.jsx.
  const handleContinue = (flight, fare) => {
    const finalPrice = flight.price + fare.extra;

    onSelectFlight({
      ...flight,
      basePrice: flight.price,
      fareUpgrade: fare.extra,
      selectedFare: fare,
      finalPrice,
    });
  };

  return (
    <main className="fr-page">

      <header className="fr-header">
        <button
          className="fr-brand"
          onClick={onBack}
          type="button"
        >
          <span className="fr-brand-icon">✈</span>
          <span>SkySelect</span>
        </button>

        <span className="fr-header-label">
          YOUR JOURNEY, YOUR CHOICE
        </span>
      </header>

      <section className="fr-content">

        <button
          className="fr-back-button"
          onClick={onBack}
          type="button"
        >
          ← Back to search
        </button>

        <div className="fr-route-card">
          <div>
            <span className="fr-eyebrow">
              FLIGHT SEARCH
            </span>

            <h1>
              {from?.code || "FROM"}{" "}
              <span>→</span>{" "}
              {to?.code || "TO"}
            </h1>

            <p>
              {from?.city || "Origin"} to{" "}
              {to?.city || "Destination"}
            </p>
          </div>

          <div className="fr-route-meta">
            <span>{routeDate}</span>
            <span>{passengerCount} Traveller(s)</span>
            <span>{searchData?.cabin || "Economy"}</span>
          </div>
        </div>

        <FlightRouteMap
          from={from?.code || "BOM"}
          to={to?.code || "DEL"}
        />

        <div className="fr-heading">
          <div>
            <span className="fr-eyebrow">
              AVAILABLE FLIGHTS
            </span>

            <h2>Choose your flight</h2>

            <p>
              Compare timings, prices and fare benefits
              before selecting your journey.
            </p>
          </div>

          <span className="fr-result-count">
            {flights.length} flights found
          </span>
        </div>

        <div className="fr-layout">

          <aside className="fr-filters">

            <div className="fr-filter-heading">
              <h3>Filters</h3>

              <button
                onClick={() => {
                  setNonStopOnly(false);
                  setMaxPrice(10000);
                  setSortBy("recommended");
                }}
                type="button"
              >
                Reset
              </button>
            </div>

            <div className="fr-filter-group">
              <h4>Stops</h4>

              <label className="fr-check">
                <input
                  type="checkbox"
                  checked={nonStopOnly}
                  onChange={(e) =>
                    setNonStopOnly(e.target.checked)
                  }
                />
                Non-stop flights
              </label>
            </div>

            <div className="fr-filter-group">
              <h4>Maximum price</h4>

              <strong>{formatPrice(maxPrice)}</strong>

              <input
                className="fr-price-slider"
                type="range"
                min="4000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
              />

              <div className="fr-range-labels">
                <span>₹4,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            <div className="fr-filter-note">
              <span>✦</span>

              <p>
                Compare fares carefully. Baggage and meal
                inclusions may differ by fare type.
              </p>
            </div>

          </aside>

          <section className="fr-flight-list">

            <div className="fr-sort-bar">
              <span>Sort by</span>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >
                <option value="recommended">
                  Recommended
                </option>
                <option value="price">
                  Lowest price
                </option>
                <option value="departure">
                  Departure time
                </option>
                <option value="duration">
                  Duration
                </option>
              </select>
            </div>

            {flights.length === 0 && (
              <div className="fr-empty">
                <span>✈</span>
                <h3>No flights match your filters</h3>
                <p>
                  Try increasing your price limit or
                  changing filters.
                </p>
              </div>
            )}

            {flights.map((flight) => {
              const isExpanded =
                expandedFlight === flight.id;

              const fare =
                selectedFare[flight.id] || "saver";

              const selectedFareOption =
                fares.find(
                  (item) => item.id === fare
                ) || fares[0];

              return (
                <article
                  className="fr-flight-card"
                  key={flight.id}
                >

                  <div className="fr-flight-main">

                    <div className="fr-airline">
                    <AirlineLogo
                        airline={flight.airline}
                        size={52}
                    />

                    <div className="fr-airline-info">
                        <strong>{flight.airline}</strong>
                        <span>{flight.code}</span>
                    </div>
                    </div>

                    <div className="fr-time-block">
                      <strong>{flight.departure}</strong>
                      <span>{from?.code || "ORG"}</span>
                    </div>

                    <div className="fr-duration">
                      <span>{flight.duration}</span>

                      <div className="fr-duration-line">
                        <i />
                      </div>

                      <small>
                        {flight.stops === 0
                          ? "Non-stop"
                          : `${flight.stops} stop`}
                      </small>
                    </div>

                    <div className="fr-time-block">
                      <strong>{flight.arrival}</strong>
                      <span>{to?.code || "DST"}</span>
                    </div>

                    <div className="fr-price-block">
                      <strong>
                        {formatPrice(flight.price)}
                      </strong>
                      <span>per traveller</span>
                    </div>

                  </div>

                  <div className="fr-card-footer">

                    <div className="fr-flight-tags">
                      {flight.tag && (
                        <span className="fr-tag">
                          {flight.tag}
                        </span>
                      )}

                      <span>{flight.meals}</span>
                    </div>

                    <div className="fr-card-actions">

                      <button
                        className="fr-details-button"
                        onClick={() =>
                          setExpandedFlight(
                            isExpanded ? null : flight.id
                          )
                        }
                        type="button"
                      >
                        {isExpanded
                          ? "Hide details"
                          : "More details"}
                      </button>

                      <button
                        className="fr-fare-button"
                        onClick={() =>
                          setExpandedFlight(
                            isExpanded ? null : flight.id
                          )
                        }
                        type="button"
                      >
                        {isExpanded
                          ? "Close fares"
                          : "View fares"} →
                      </button>

                    </div>

                  </div>

                  {isExpanded && (
                    <div className="fr-fare-panel">

                      <div className="fr-fare-heading">
                        <h3>Select your fare</h3>
                        <span>
                          Choose the benefits you need
                        </span>
                      </div>

                      <div className="fr-fare-options">

                        {fares.map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            className={`fr-fare-option ${
                              fare === item.id
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              setSelectedFare((previous) => ({
                                ...previous,
                                [flight.id]: item.id,
                              }))
                            }
                          >
                            <span className="fr-fare-radio">
                              {fare === item.id ? "✓" : ""}
                            </span>

                            <strong>{item.name}</strong>

                            <span>{item.description}</span>

                            <b>
                              {item.extra === 0
                                ? "Included"
                                : `+ ${formatPrice(item.extra)}`}
                            </b>

                            <ul>
                              {item.benefits.map(
                                (benefit) => (
                                  <li key={benefit}>
                                    ✓ {benefit}
                                  </li>
                                )
                              )}
                            </ul>

                          </button>
                        ))}

                      </div>

                      <div className="fr-fare-bottom">

                        <div>
                          <span>
                            Selected fare per traveller
                          </span>

                          <strong>
                            {formatPrice(
                              flight.price +
                              selectedFareOption.extra
                            )}
                          </strong>
                        </div>

                        <button
                          className="fr-continue-button"
                          onClick={() =>
                            handleContinue(
                              flight,
                              selectedFareOption
                            )
                          }
                          type="button"
                        >
                          Continue to seat selection →
                        </button>

                      </div>

                    </div>
                  )}

                </article>
              );
            })}

            <div className="fr-demo-note">
              <span>ⓘ</span>
              These are sample flights for the SkySelect
              demonstration. Prices and availability are
              not live airline inventory.
            </div>

          </section>

        </div>

      </section>
    </main>
  );
}
