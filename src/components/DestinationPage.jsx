
import "./DestinationPage.css";

const destinationData = {
  DXB: {
    name: "Dubai",
    country: "United Arab Emirates",
    tagline: "A city where imagination meets possibility.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85",
    description:
      "Discover a destination of remarkable architecture, golden desert landscapes, vibrant shopping districts and unforgettable experiences.",
    bestTime: "November to March",
    airport: "Dubai International Airport (DXB)",
    duration: "4–5 days",
    attractions: [
      ["Burj Khalifa", "See the city from one of the world's most recognisable skyscrapers."],
      ["Dubai Mall", "Explore shopping, dining and entertainment in one destination."],
      ["Palm Jumeirah", "Discover the famous palm-shaped island and its waterfront."],
      ["Desert Safari", "Experience the dunes, desert sunset and traditional hospitality."],
    ],
  },
  SIN: {
    name: "Singapore",
    country: "Singapore",
    tagline: "Small in size. Extraordinary in experience.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=85",
    description:
      "Explore a modern city known for its waterfront skyline, beautiful gardens, diverse food culture and efficient public transport.",
    bestTime: "February to April",
    airport: "Singapore Changi Airport (SIN)",
    duration: "3–5 days",
    attractions: [
      ["Marina Bay Sands", "Enjoy the iconic skyline and waterfront promenade."],
      ["Gardens by the Bay", "Walk among extraordinary gardens and the Supertrees."],
      ["Sentosa Island", "Enjoy beaches, attractions and entertainment."],
      ["Jewel Changi", "Visit the spectacular indoor waterfall and shopping complex."],
    ],
  },
  GOI: {
    name: "Goa",
    country: "India",
    tagline: "Find your own rhythm by the sea.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=85",
    description:
      "Slow down along the coastline, discover Portuguese-influenced heritage, enjoy local food and explore Goa's beaches and markets.",
    bestTime: "November to February",
    airport: "Manohar International Airport (GOX)",
    duration: "3–5 days",
    attractions: [
      ["Palolem Beach", "Relax beside a beautiful crescent-shaped beach."],
      ["Fort Aguada", "Explore a historic fort overlooking the Arabian Sea."],
      ["Fontainhas", "Walk through colourful heritage streets in Panaji."],
      ["Anjuna Flea Market", "Discover local crafts, souvenirs and food."],
    ],
  },
  LHR: {
    name: "London",
    country: "United Kingdom",
    tagline: "History, culture and new discoveries at every turn.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=85",
    description:
      "Experience historic landmarks, world-class museums, beautiful parks, theatre and neighbourhoods filled with character.",
    bestTime: "May to September",
    airport: "Heathrow Airport (LHR)",
    duration: "5–7 days",
    attractions: [
      ["Big Ben", "See one of London's best-known landmarks."],
      ["Tower Bridge", "Discover the famous bridge over the River Thames."],
      ["British Museum", "Explore collections spanning world history."],
      ["Hyde Park", "Take a relaxing break in one of the city's major parks."],
    ],
  },
  BKK: {
    name: "Bangkok",
    country: "Thailand",
    tagline: "A vibrant city full of flavour and discovery.",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=85",
    description:
      "Discover ornate temples, lively markets, riverside neighbourhoods and a food scene that makes every visit memorable.",
    bestTime: "November to February",
    airport: "Suvarnabhumi Airport (BKK)",
    duration: "3–4 days",
    attractions: [
      ["Grand Palace", "Explore an extraordinary historic royal complex."],
      ["Wat Arun", "Visit the riverside Temple of Dawn."],
      ["Chatuchak Market", "Browse one of the city's best-known markets."],
      ["Chao Phraya River", "See Bangkok from its famous river."],
    ],
  },
};

export default function DestinationPage({ code, onBack, onSearch }) {
  const destination = destinationData[code];

  if (!destination) {
    return (
      <main className="destination-page">
        <button className="destination-back" onClick={onBack}>← Back</button>
        <h1>Destination information is coming soon.</h1>
      </main>
    );
  }

  return (
    <main className="destination-page">
      <nav className="destination-nav">
        <button className="destination-brand" onClick={onBack}>
          <span className="destination-brand-icon">S</span>
          skyselect
        </button>
        <button className="destination-back" onClick={onBack}>← Back to explore</button>
      </nav>

      <section className="destination-hero">
        <img src={destination.image} alt={`${destination.name} travel destination`} />
        <div className="destination-hero-overlay" />
        <div className="destination-hero-content">
          <span>{destination.country.toUpperCase()}</span>
          <h1>{destination.name}</h1>
          <p>{destination.tagline}</p>
          <button onClick={() => onSearch(code)}>Explore flights to {destination.name} →</button>
        </div>
      </section>

      <section className="destination-content">
        <div className="destination-intro">
          <span className="destination-eyebrow">DISCOVER {destination.name.toUpperCase()}</span>
          <h2>A little inspiration for your next journey.</h2>
          <p>{destination.description}</p>
        </div>

        <div className="destination-facts">
          <div><span>BEST TIME TO VISIT</span><strong>{destination.bestTime}</strong></div>
          <div><span>SUGGESTED STAY</span><strong>{destination.duration}</strong></div>
          <div><span>MAIN AIRPORT</span><strong>{destination.airport}</strong></div>
        </div>

        <div className="destination-attractions-heading">
          <span className="destination-eyebrow">MAKE THE MOST OF YOUR TRIP</span>
          <h2>Places worth discovering</h2>
        </div>

        <div className="destination-attractions">
          {destination.attractions.map(([name, description], index) => (
            <article className="destination-attraction-card" key={name}>
              <span>0{index + 1}</span>
              <h3>{name}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className="destination-cta">
          <div>
            <span className="destination-eyebrow">YOUR NEXT ADVENTURE AWAITS</span>
            <h2>Ready to explore {destination.name}?</h2>
            <p>Start planning your journey with SkySelect.</p>
          </div>
          <button onClick={() => onSearch(code)}>Search flights <span>→</span></button>
        </div>
      </section>

      <footer className="destination-footer">
        <strong>skyselect</strong>
        <span>Travel, your way.</span>
        <span>© 2026 SkySelect · Destination guide demo</span>
      </footer>
    </main>
  );
}
