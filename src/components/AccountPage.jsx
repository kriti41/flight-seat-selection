
import React from "react";
import "./AccountPage.css";

export default function AccountPage({ user, onBack, onLogout }) {
  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="ss-account-page">
      <header className="ss-account-navbar">
        <button className="ss-account-brand" onClick={onBack}>
          <span className="ss-account-brand-mark">S</span>
          skyselect
        </button>

        <button className="ss-account-back" onClick={onBack}>
          ← Back to homepage
        </button>
      </header>

      <main className="ss-account-container">
        <div className="ss-account-heading">
          <span>YOUR SKySELECT ACCOUNT</span>
          <h1>My Account</h1>
          <p>Manage your personal information and travel profile.</p>
        </div>

        <section className="ss-account-profile-card">
          <div className="ss-account-avatar">
            {initials || "S"}
          </div>

          <div>
            <h2>{user?.name || "SkySelect Traveller"}</h2>
            <p>SkySelect Member</p>
          </div>

          <span className="ss-account-status">ACTIVE</span>
        </section>

        <section className="ss-account-details-card">
          <div className="ss-account-card-heading">
            <div>
              <span>PERSONAL INFORMATION</span>
              <h2>Profile details</h2>
            </div>
            <span className="ss-account-lock">🔒</span>
          </div>

          <div className="ss-account-detail-grid">
            <div>
              <span>FULL NAME</span>
              <strong>{user?.name || "Not available"}</strong>
            </div>

            <div>
              <span>EMAIL ADDRESS</span>
              <strong>{user?.email || "Not available"}</strong>
            </div>

            <div>
              <span>MOBILE NUMBER</span>
              <strong>+91 {user?.mobile || "Not available"}</strong>
            </div>

            <div>
              <span>MEMBER SINCE</span>
              <strong>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "long", year: "numeric" }
                    )
                  : "Not available"}
              </strong>
            </div>
          </div>
        </section>

        <section className="ss-account-actions-card">
          <div>
            <h3>Manage your account</h3>
            <p>Your profile information is stored locally in this demo.</p>
          </div>

          <button onClick={onLogout}>
            Log out
          </button>
        </section>

        <p className="ss-account-demo-note">
          This is a demonstration account. Your information is stored
          in this browser and is not connected to a live booking service.
        </p>
      </main>
    </div>
  );
}
