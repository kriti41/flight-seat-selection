
import { useState } from "react";
import "./AuthModal.css";

const STORAGE_KEY = "skyselect_demo_users";
const CURRENT_USER_KEY = "skyselect_current_user";

function getUsers() {
  try {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  } catch {
    return [];
  }
}

export default function AuthModal({
  mode,
  onClose,
  onSwitch,
  onAuthenticated,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const isSignup = mode === "signup";

  const sendOtp = () => {
    setMessage("");

    if (isSignup) {
      if (name.trim().length < 2) {
        setMessage("Please enter your full name.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setMessage("Please enter a valid email address.");
        return;
      }
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMessage("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    const users = getUsers();

    const existingUser = users.find(
      (user) => user.mobile === mobile
    );

    if (isSignup && existingUser) {
      setMessage("This number already has an account. Please log in.");
      return;
    }

    if (!isSignup && !existingUser) {
      setMessage("No account found for this number. Please sign up first.");
      return;
    }

    setOtpSent(true);
    setOtp("");
    setMessage("Demo OTP: 123456. No SMS is sent.");
  };

  const verifyOtp = () => {
    setMessage("");

    if (otp !== "123456") {
      setMessage("Incorrect OTP. For this demo, enter 123456.");
      return;
    }

    const users = getUsers();
    let user;

    if (isSignup) {
      user = {
        id: `SS${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        mobile,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...users, user])
      );
    } else {
      user = users.find(
        (item) => item.mobile === mobile
      );

      if (!user) {
        setMessage("Account not found. Please sign up first.");
        return;
      }
    }

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(user)
    );

    onAuthenticated?.(user);
  };

  const switchMode = () => {
    setMessage("");
    setOtp("");
    setOtpSent(false);
    onSwitch?.(isSignup ? "login" : "signup");
  };

  return (
    <div
      className="ss-auth-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        className="ss-auth-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ss-auth-title"
      >
        <button
          type="button"
          className="ss-auth-close"
          onClick={onClose}
          aria-label="Close authentication"
        >
          ×
        </button>

        <div className="ss-auth-brand">
          <span className="ss-auth-brand-mark">S</span>
          <span>skyselect</span>
        </div>

        <div className="ss-auth-heading">
          <span className="ss-auth-eyebrow">
            YOUR JOURNEY STARTS HERE
          </span>

          <h2 id="ss-auth-title">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>

          <p>
            {isSignup
              ? "Sign up to make your travel experience simpler."
              : "Log in to continue your journey with SkySelect."}
          </p>
        </div>

        <div className="ss-auth-form">
          {isSignup && (
            <>
              <label className="ss-auth-field">
                <span>Full name</span>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </label>

              <label className="ss-auth-field">
                <span>Email address</span>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
            </>
          )}

          <label className="ss-auth-field">
            <span>Mobile number</span>

            <div className="ss-auth-mobile">
              <span>+91</span>

              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(event) =>
                  setMobile(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                placeholder="10-digit mobile number"
                autoComplete="tel-national"
              />
            </div>
          </label>

          {otpSent && (
            <label className="ss-auth-field">
              <span>Enter OTP</span>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(event) =>
                  setOtp(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="Enter 123456"
                autoComplete="one-time-code"
              />
            </label>
          )}

          {message && (
            <p
              className="ss-auth-message"
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          {!otpSent ? (
            <button
              type="button"
              className="ss-auth-primary"
              onClick={sendOtp}
            >
              Continue <span>→</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                className="ss-auth-primary"
                onClick={verifyOtp}
              >
                Verify and {isSignup ? "create account" : "log in"}
                <span>→</span>
              </button>

              <button
                type="button"
                className="ss-auth-secondary"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setMessage("");
                }}
              >
                Change mobile number
              </button>
            </>
          )}
        </div>

        <div className="ss-auth-switch">
          {isSignup
            ? "Already have an account?"
            : "New to SkySelect?"}

          <button
            type="button"
            onClick={switchMode}
          >
            {isSignup ? "Log in" : "Create an account"}
          </button>
        </div>

        <p className="ss-auth-demo-note">
          Demo authentication only. Use OTP{" "}
          <strong>123456</strong>.
          No SMS is sent and no real account verification takes place.
        </p>
      </div>
    </div>
  );
}
