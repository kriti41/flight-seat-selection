# ✈️ SkySelect – Flight Booking & Seat Selection Platform

**SkySelect** is a modern, responsive flight booking web application built using React.js. It provides an interactive flight booking experience, allowing users to explore flights, manage passengers, select seats, customize meals, and access their digital boarding passes.

The application demonstrates a complete front-end flight booking workflow with an intuitive user interface and interactive components.

## 🌐 Live Demo

**[Visit SkySelect](https://kriti41.github.io/flight-seat-selection/)**

## 📂 GitHub Repository

**[View Source Code](https://github.com/kriti41/flight-seat-selection)**

---

## ✨ Features

### 1. User Authentication
- User registration and login interface.
- Account and profile management.
- Persistent demo user information using browser local storage.

### 2. Flight Search & Exploration
- Search and explore available flights.
- View flight information and airline details.
- Airline branding and logos.
- Flight results displayed in an organized layout.

### 3. Passenger Management
- Add and manage multiple passengers.
- Maintain passenger details during the booking process.
- Associate seat selections with individual passengers.

### 4. Interactive Seat Selection
- Interactive aircraft seat layout.
- Multiple seating categories:
  - Standard
  - Preferred
  - Premium
  - Extra Legroom
- Seat availability and selection status.
- Prevent duplicate seat assignments.
- Display selected seat details and pricing.

### 5. Meal Selection
- Meal selection interface.
- Customize meal preferences during booking.

### 6. Booking Summary & Confirmation
- Review passenger and flight information.
- View selected seats and additional charges.
- Calculate the total booking cost.
- Booking confirmation interface.

### 7. Digital Boarding Pass
- Generate digital boarding passes.
- Display passenger, flight, and seat information.
- QR code generation for boarding pass representation.

### 8. Responsive User Interface
- Modern and clean design.
- Organized navigation and booking workflow.
- Responsive layouts for different screen sizes.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Front-end application development |
| JavaScript (ES6+) | Application logic and interactions |
| Vite | Development server and production build |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| React Hooks | State and component management |
| React Leaflet / Leaflet | Interactive map functionality, where integrated |
| qrcode.react | QR code generation |
| Browser Local Storage | Demo authentication and local data persistence |
| Git & GitHub | Version control and source code hosting |
| GitHub Pages | Application deployment |

---

## 📁 Project Structure

```text
flight-seat-selection/
│
├── public/
│   ├── airlines/
│   │   ├── air-india-express.png
│   │   ├── air-india.png
│   │   ├── akasa.png
│   │   └── indigo.png
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   ├── AccountPage.jsx
│   │   ├── AirlineLogo.jsx
│   │   ├── AircraftLayout.jsx
│   │   ├── AuthModal.jsx
│   │   ├── BookingConfirmation.jsx
│   │   ├── BookingSummary.jsx
│   │   ├── DigitalBoardingPasses.jsx
│   │   ├── FlightResults.jsx
│   │   ├── HomePage.jsx
│   │   ├── MealSelector.jsx
│   │   ├── PassengerSelector.jsx
│   │   ├── SeatDetails.jsx
│   │   └── ...
│   │
│   ├── data/
│   │   ├── passengers.js
│   │   └── seats.js
│   │
│   ├── utils/
│   │   └── pricing.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following tools are installed:

- Node.js (version 22 recommended)
- npm
- Git

### Step 1: Clone the repository

```bash
git clone https://github.com/kriti41/flight-seat-selection.git
```

### Step 2: Navigate to the project directory

```bash
cd flight-seat-selection
```

### Step 3: Install dependencies

```bash
npm install
```

Alternatively, use `npm ci` to install dependencies from the committed lockfile.

### Step 4: Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, typically:

```text
http://localhost:5173/
```

### Step 5: Create a production build

```bash
npm run build
```

The optimized production files will be generated inside the `dist/` directory.

### Step 6: Preview the production build

```bash
npm run preview
```

---

## 🚀 Deployment

SkySelect is deployed using **GitHub Pages** with GitHub Actions.

The deployment workflow automatically:

1. Checks out the latest repository code.
2. Sets up the Node.js environment.
3. Installs project dependencies.
4. Builds the React application using Vite.
5. Publishes the generated `dist/` directory to GitHub Pages.

Every new commit pushed to the `main` branch triggers the deployment workflow.

**Live Application:**  
https://kriti41.github.io/flight-seat-selection/

---

## 💾 Data Persistence

The application uses browser Local Storage for demo-level user information and client-side persistence.

**Note:** This is a front-end technical assessment project. It does not currently implement a production backend, airline API integration, payment gateway, or real flight ticket booking system. Authentication and booking information should be treated as demonstration data.

---

## 🔮 Future Enhancements

- Backend integration for persistent user accounts and bookings.
- Real-time flight search through airline or travel APIs.
- Secure authentication and authorization.
- Online payment gateway integration.
- Booking history synchronized with a database.
- Email notifications and booking confirmations.
- Enhanced mobile-first experience.

---

## 👩‍💻 Author

**Kriti Mishra**

M.Tech – Artificial Intelligence

GitHub: [@kriti41](https://github.com/kriti41)

---

## 📄 License

This project was developed as part of a technical assessment and is intended for educational and demonstration purposes.

