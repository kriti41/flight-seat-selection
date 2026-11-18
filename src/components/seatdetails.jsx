
import React from "react";
import { formatPrice } from "../utils/pricing";

function SeatDetails({ passenger, seats }) {
  const selectedSeat = seats.find(
    (seat) => seat.id === passenger?.seatId
  );

  const categoryNames = {
    standard: "Standard Seat",
    preferred: "Preferred Seat",
    premium: "Premium Seat",
    "extra-legroom": "Extra Legroom Seat",
  };

  return (
    <section className="seat-details">
      <h3>Selected Seat Details</h3>

      {selectedSeat ? (
        <>
          <div className="seat-detail-number">
            <span>SEAT NUMBER</span>
            <strong>{selectedSeat.id}</strong>
          </div>

          <div className="seat-detail-row">
            <span>Passenger</span>
            <strong>{passenger.name}</strong>
          </div>

          <div className="seat-detail-row">
            <span>Category</span>
            <strong>{categoryNames[selectedSeat.type]}</strong>
          </div>

          <div className="seat-detail-row">
            <span>Seat price</span>
            <strong>{formatPrice(selectedSeat.price)}</strong>
          </div>
        </>
      ) : (
        <p className="empty-seat-message">
          Select a seat from the aircraft map to view its details.
        </p>
      )}
    </section>
  );
}

export default SeatDetails;
