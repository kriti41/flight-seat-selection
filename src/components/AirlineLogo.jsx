
import React from "react";

const airlineLogos = {
  indigo: "/airlines/indigo.png",
  "air india": "/airlines/air-india.png",
  "akasa air": "/airlines/akasa.png",
  akasa: "/airlines/akasa.png",
  "air india express": "/airlines/air-india-express.png",
};

export default function AirlineLogo({
  airline,
  size = 48,
  className = "",
}) {
  const key = (airline || "").trim().toLowerCase();
  const logo = airlineLogos[key];

  return (
    <div
      className={`airline-logo-container ${className}`}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      {logo ? (
        <img
          src={logo}
          alt={`${airline} logo`}
          className="airline-logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.nextElementSibling.style.display = "flex";
          }}
        />
      ) : null}

      <span
        className="airline-logo-fallback"
        style={{ display: logo ? "none" : "flex" }}
      >
        ✈
      </span>
    </div>
  );
}
