
import React from "react";

function Seat({ seat, isSelected, isOccupied, onSelect }) {
  const seatDetails = {
    premium: {
      name: "Premium Seat",
      benefit: "Front-cabin seating",
      icon: "✦",
    },
    preferred: {
      name: "Preferred Seat",
      benefit: "Preferred front-section location",
      icon: "★",
    },
    standard: {
      name: "Standard Seat",
      benefit: "Comfortable standard economy seating",
      icon: "✓",
    },
    "extra-legroom": {
      name: "Extra Legroom",
      benefit: "Additional space for your legs",
      icon: "↕",
    },
  };

  const details = seatDetails[seat.type] || seatDetails.standard;

  const status = isOccupied
    ? "Occupied"
    : isSelected
      ? "Selected"
      : "Available";

  const priceLabel =
    seat.price === 0
      ? "Free"
      : `₹${seat.price.toLocaleString("en-IN")}`;

  const seatClass = [
    "seat",
    isOccupied ? "occupied" : "",
    isSelected ? "selected" : "",
    !isOccupied && !isSelected
      ? seat.price === 0
        ? "free"
        : "paid"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={seatClass}
      onClick={() => onSelect(seat)}
      disabled={isOccupied}
      aria-label={`Seat ${seat.id}. ${status}. ${details.name}. ${priceLabel}`}
      aria-pressed={isSelected}
      title={`Seat ${seat.id} · ${details.name} · ${priceLabel}`}
    >
      <svg
        className="seat-illustration"
        viewBox="0 0 48 54"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left armrest */}
        <rect
          x="2.5"
          y="15"
          width="7"
          height="30"
          rx="3.5"
          fill="currentColor"
          opacity="0.55"
        />

        {/* Right armrest */}
        <rect
          x="38.5"
          y="15"
          width="7"
          height="30"
          rx="3.5"
          fill="currentColor"
          opacity="0.55"
        />

        {/* Seat backrest */}
        <path
          d="M12 5 Q12 2 16 2 H32 Q36 2 36 5 V21 Q36 25 32 25 H16 Q12 25 12 21 Z"
          fill="currentColor"
          opacity="0.85"
        />

        {/* Backrest inner detail */}
        <path
          d="M17 8 Q17 6 20 6 H28 Q31 6 31 8 V17 Q31 20 28 20 H20 Q17 20 17 17 Z"
          fill="white"
          opacity="0.22"
        />

        {/* Seat cushion */}
        <path
          d="M12 26 Q12 23 16 23 H32 Q36 23 36 26 V44 Q36 48 32 48 H16 Q12 48 12 44 Z"
          fill="currentColor"
        />

        {/* Cushion detail */}
        <path
          d="M17 29 H31 V42 Q31 44 28 44 H20 Q17 44 17 42 Z"
          fill="white"
          opacity="0.18"
        />

        {/* Front seat edge */}
        <path
          d="M17 49 H31"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <span className="seat-column-label">{seat.column}</span>

      <span className="seat-tooltip">
        <strong>Seat {seat.id}</strong>
        <span>{details.icon} {details.name}</span>
        <span>{details.benefit}</span>
        <b>{priceLabel}</b>
        <small>{status}</small>
      </span>
    </button>
  );
}

export default Seat;
