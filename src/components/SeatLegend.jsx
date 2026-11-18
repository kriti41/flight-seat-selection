
import React from "react";

function SeatLegend() {
  const items = [
    { color: "free", label: "Free seat" },
    { color: "paid", label: "Paid seat" },
    { color: "selected", label: "Selected seat" },
    { color: "occupied", label: "Occupied seat" },
  ];

  return (
    <div className="seat-legend">
      {items.map((item) => (
        <div className="legend-item" key={item.color}>
          <span className={`legend-box ${item.color}`}></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default SeatLegend;
