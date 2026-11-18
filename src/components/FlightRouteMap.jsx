
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./FlightRouteMap.css";

// ------------------------------------------
// 1. AIRPORT DATABASE
// ------------------------------------------

const airports = {
  BOM: {
    name: "Mumbai",
    lat: 19.0896,
    lng: 72.8656,
  },
  DEL: {
    name: "Delhi",
    lat: 28.5562,
    lng: 77.1000,
  },
  BLR: {
    name: "Bengaluru",
    lat: 13.1986,
    lng: 77.7066,
  },
  HYD: {
    name: "Hyderabad",
    lat: 17.2403,
    lng: 78.4294,
  },
  MAA: {
    name: "Chennai",
    lat: 12.9941,
    lng: 80.1709,
  },
  PNQ: {
    name: "Pune",
    lat: 18.5822,
    lng: 73.9197,
  },
  CCU: {
    name: "Kolkata",
    lat: 22.6547,
    lng: 88.4467,
  },
  GOI: {
    name: "Goa",
    lat: 15.3808,
    lng: 73.8314,
  },
  DXB: {
    name: "Dubai",
    lat: 25.2532,
    lng: 55.3657,
  },
  SIN: {
    name: "Singapore",
    lat: 1.3644,
    lng: 103.9915,
  },
  LHR: {
    name: "London",
    lat: 51.4700,
    lng: -0.4543,
  },
  JFK: {
    name: "New York",
    lat: 40.6413,
    lng: -73.7781,
  },
  BKK: {
    name: "Bangkok",
    lat: 13.6900,
    lng: 100.7501,
  },
};

// ------------------------------------------
// 2. AIRPORT MARKER ICON
// ------------------------------------------

function createAirportIcon(code) {
  return L.divIcon({
    className: "ss-airport-marker-wrapper",

    html: `
      <div class="ss-airport-marker">
        ${code}
      </div>
    `,

    iconSize: [48, 32],
    iconAnchor: [24, 16],
  });
}

// ------------------------------------------
// 3. AIRPLANE ICON
// ------------------------------------------

const airplaneIcon = L.divIcon({
  className: "ss-plane-marker-wrapper",

  html: `
    <div class="ss-plane-marker">
      ✈
    </div>
  `,

  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// ------------------------------------------
// 4. GENERATE CURVED FLIGHT ROUTE
// ------------------------------------------

function createCurvedRoute(start, end) {
  const points = [];

  const midLat = (start.lat + end.lat) / 2;
  const midLng = (start.lng + end.lng) / 2;

  const curveOffset = Math.min(
    Math.abs(end.lng - start.lng) * 0.13,
    5
  );

  const controlLat = midLat + curveOffset;
  const controlLng = midLng;

  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const oneMinusT = 1 - t;

    const lat =
      oneMinusT * oneMinusT * start.lat +
      2 * oneMinusT * t * controlLat +
      t * t * end.lat;

    const lng =
      oneMinusT * oneMinusT * start.lng +
      2 * oneMinusT * t * controlLng +
      t * t * end.lng;

    points.push([lat, lng]);
  }

  return points;
}

// ------------------------------------------
// 5. AUTOMATICALLY FIT MAP TO ROUTE
// ------------------------------------------

function FitMapToRoute({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions, {
        padding: [55, 55],
      });
    }
  }, [map, positions]);

  return null;
}

// ------------------------------------------
// 6. MAIN FLIGHT ROUTE MAP COMPONENT
// ------------------------------------------

export default function FlightRouteMap({
  from = "BOM",
  to = "DEL",
}) {
  const origin = airports[from];
  const destination = airports[to];

  // Handle unsupported airport codes
  if (!origin || !destination) {
    return (
      <div className="ss-route-error">
        Flight route information is unavailable.
      </div>
    );
  }

  // Generate route points
  const route = useMemo(
    () => createCurvedRoute(origin, destination),
    [origin, destination]
  );

  // Airport coordinates
  const bounds = useMemo(
    () => [
      [origin.lat, origin.lng],
      [destination.lat, destination.lng],
    ],
    [origin, destination]
  );

  // Position of decorative airplane
  const airplanePosition = route[
    Math.floor(route.length / 2)
  ];

  return (
    <section className="ss-route-section">

      {/* MAP HEADER */}

      <div className="ss-route-heading">

        <div>
          <span className="ss-route-eyebrow">
            YOUR JOURNEY
          </span>

          <h3>Explore your flight route</h3>

          <p>
            See the journey between your departure
            and arrival cities.
          </p>
        </div>

        <div className="ss-route-distance">
          <span>ROUTE</span>

          <strong>
            {from} → {to}
          </strong>
        </div>

      </div>

      {/* INTERACTIVE MAP */}

      <div className="ss-route-map">

        <MapContainer
          key={`${from}-${to}`}
          bounds={bounds}
          scrollWheelZoom={false}
          zoomControl={true}
          className="ss-leaflet-map"
        >

          {/* OPENSTREETMAP TILES */}

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* FLIGHT ROUTE */}

          <Polyline
            positions={route}
            pathOptions={{
              color: "#3478f6",
              weight: 3,
              opacity: 0.9,
              dashArray: "8 9",
            }}
          />

          {/* DEPARTURE AIRPORT */}

          <Marker
            position={[origin.lat, origin.lng]}
            icon={createAirportIcon(from)}
          >
            <Tooltip direction="top">
              {origin.name} · {from} · Departure
            </Tooltip>
          </Marker>

          {/* ARRIVAL AIRPORT */}

          <Marker
            position={[
              destination.lat,
              destination.lng,
            ]}
            icon={createAirportIcon(to)}
          >
            <Tooltip direction="top">
              {destination.name} · {to} · Arrival
            </Tooltip>
          </Marker>

          {/* DECORATIVE AIRPLANE */}

          <Marker
            position={airplanePosition}
            icon={airplaneIcon}
            interactive={false}
          />

          {/* AUTOMATIC MAP POSITIONING */}

          <FitMapToRoute positions={bounds} />

        </MapContainer>

      </div>

      {/* MAP FOOTER */}

      <div className="ss-route-footer">

        <span>
          <i className="ss-route-dot" />
          Departure: {origin.name}
        </span>

        <span>
          <i className="ss-route-dot ss-arrival-dot" />
          Arrival: {destination.name}
        </span>

        <span className="ss-route-demo-label">
          Illustrative route
        </span>

      </div>

    </section>
  );
}
