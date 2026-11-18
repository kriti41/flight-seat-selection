
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import AirlineLogo from "./AirlineLogo";

const seatCategories = {
  standard: "Standard",
  preferred: "Preferred",
  premium: "Premium",
  "extra-legroom": "Extra legroom",
};

function DigitalBoardingPasses({
  passengers,
  seats,
  bookingReference,
  selectedFlight,
}) {
  const flight = selectedFlight?.chosenFlight || {};

  const airline = flight.airline || "Airline";
  const flightNumber = flight.code || "Flight number unavailable";

  const origin = selectedFlight?.from || {};
  const destination = selectedFlight?.to || {};

  const route = `${origin.code || "—"} → ${destination.code || "—"}`;

  const travelDate = selectedFlight?.departureDate || "Date unavailable";
  const travelClass = selectedFlight?.cabin || "Economy";

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="boarding-pass-section">
      <div className="boarding-section-heading">
        <div>
          <span className="section-eyebrow">
            YOUR DIGITAL TRAVEL DOCUMENTS
          </span>
          <h2>Boarding passes</h2>
          <p>
            An individual digital pass preview for every passenger.
          </p>
        </div>

        <div className="boarding-section-icon">✈</div>
      </div>

      <div className="boarding-pass-list">
        {passengers.map((passenger) => {
          const seat = seats.find(
            (item) => item.id === passenger.seatId
          );

          const qrData = JSON.stringify({
            type: "SKYSELECT_DEMO_BOARDING_PASS",
            bookingReference,
            airline,
            flight: flightNumber,
            route,
            travelDate,
            passenger: passenger.name,
            passengerNumber: passenger.id,
            seat: seat?.id || "Unassigned",
            seatCategory: seatCategories[seat?.type] || "Standard",
            travelClass,
          });

          return (
            <article
              className="digital-boarding-pass"
              key={passenger.id}
            >
              <div className="boarding-pass-main">
                <div className="boarding-pass-topline">

                  <div className="boarding-airline">
                    <AirlineLogo
                      airline={airline}
                      size={58}
                      className="boarding-airline-logo"
                    />

                    <div className="boarding-airline-info">
                      <strong>{airline}</strong>
                      <small>DIGITAL BOARDING PASS</small>
                    </div>
                  </div>

                  <span className="boarding-demo-label">
                    DEMO PASS
                  </span>
                </div>

                <div className="boarding-route">
                  <div>
                    <span>FLIGHT</span>
                    <strong>{flightNumber}</strong>
                    <small>{travelClass}</small>
                  </div>

                  <div className="boarding-route-line">
                    <span>✈</span>
                  </div>

                  <div className="boarding-route-destination">
                    <span>ROUTE</span>
                    <strong>{route}</strong>
                    <small>
                      {origin.city || "Origin"} to{" "}
                      {destination.city || "Destination"}
                    </small>
                  </div>
                </div>

                <div className="boarding-pass-divider"></div>

                <div className="boarding-pass-passenger">
                  <div>
                    <span>PASSENGER NAME</span>
                    <strong>{passenger.name}</strong>
                  </div>

                  <div>
                    <span>BOOKING REFERENCE</span>
                    <strong>{bookingReference}</strong>
                  </div>
                </div>

                <div className="boarding-seat-grid">
                  <div className="boarding-seat-highlight">
                    <span>SEAT</span>
                    <strong>{seat?.id || "—"}</strong>
                  </div>

                  <div>
                    <span>SEAT CATEGORY</span>
                    <strong>
                      {seatCategories[seat?.type] || "Standard"}
                    </strong>
                  </div>

                  <div>
                    <span>PASSENGER</span>
                    <strong>
                      {passenger.id} of {passengers.length}
                    </strong>
                  </div>

                  <div>
                    <span>TRAVEL CLASS</span>
                    <strong>{travelClass}</strong>
                  </div>
                </div>

                <div className="boarding-pass-footer">
                  <span>TRAVEL DATE</span>
                  <strong>{travelDate}</strong>
                </div>

                <div className="boarding-pass-footer">
                  <span>BOARDING TIME</span>
                  <strong>Not provided by demo flight data</strong>
                </div>
              </div>

              <div className="boarding-pass-stub">
                <div className="boarding-stub-heading">
                  <span>SCAN YOUR CODE</span>
                  <small>DEMO ONLY</small>
                </div>

                <div className="boarding-qr-wrapper">
                  <QRCodeSVG
                    value={qrData}
                    size={116}
                    level="M"
                    includeMargin={true}
                  />
                </div>

                <strong className="boarding-stub-name">
                  {passenger.name}
                </strong>

                <span className="boarding-stub-seat">
                  SEAT {seat?.id || "—"}
                </span>

                <span className="boarding-stub-reference">
                  {bookingReference}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="boarding-pass-actions">
        <div>
          <strong>Your digital passes are ready</strong>
          <p>
            Print or save these demo passes as PDF using your browser.
          </p>
        </div>

        <button
          type="button"
          className="download-boarding-button"
          onClick={handlePrint}
        >
          <span>↓</span>
          Print boarding passes
        </button>
      </div>

      <div className="boarding-pass-disclaimer">
        These QR codes contain demonstration booking data only.
        They are not valid for airline check-in or airport boarding.
      </div>
    </section>
  );
}

export default DigitalBoardingPasses;
