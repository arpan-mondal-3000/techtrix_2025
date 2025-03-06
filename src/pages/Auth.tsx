// App.tsx (or Auth.tsx)
import React, { useState } from "react";
import "../css/auth.css";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import background from "../assets/background.jpg";

const Auth: React.FC = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsRegisterActive(true);
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsRegisterActive(false);
  };

  // This function will be used for the Home button
  const handleHomeClick = () => {
    // Navigate to your home route; adjust the path as needed
    navigate("/");
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Navbar For Auth Route: show Home button */}
      <Navbar isAuthRoute={true} onHomeClick={handleHomeClick} />

      {/* Auth Content Centered in the remaining space */}
      <div className="flex-grow flex items-center justify-center">
        <div className={`wrapper ${isRegisterActive ? "active" : ""}`}>
          <span className="bg-animate"></span>
          <span className="bg-animate2"></span>

          {/* Login Form */}
          <div className="form-box login">
            <h2
              className="animation"
              style={{ "--i": 0, "--j": 21 } as React.CSSProperties}
            >
              Login
            </h2>
            <form action="">
              <div
                className="input-box animation"
                style={{ "--i": 1, "--j": 22 } as React.CSSProperties}
              >
                <input type="text" required />
                <label>Username</label>
                <i className="bx bxs-user"></i>
              </div>
              <div
                className="input-box animation"
                style={{ "--i": 2, "--j": 23 } as React.CSSProperties}
              >
                <input type="password" required />
                <label>Password</label>
                <i className="bx bxs-lock-alt"></i>
              </div>
              <button
                type="submit"
                className="btn animation"
                style={{ "--i": 3, "--j": 24 } as React.CSSProperties}
              >
                Login
              </button>
              <div
                className="logreg-link animation"
                style={{ "--i": 4, "--j": 25 } as React.CSSProperties}
              >
                <p>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="register-link"
                    onClick={handleRegisterClick}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="info-text login">
            <h2
              className="animation"
              style={{ "--i": 0, "--j": 19 } as React.CSSProperties}
            >
              Welcome Back!
            </h2>
            <p
              className="animation"
              style={{ "--i": 1, "--j": 20 } as React.CSSProperties}
            >
              Hope, You and your Family have a Great Day
            </p>
          </div>

          {/* Register Form */}
          <div className="form-box register">
            <h2
              className="animation"
              style={{ "--i": 17, "--j": 0 } as React.CSSProperties}
            >
              Sign Up
            </h2>
            <form action="">
              <div
                className="input-box animation"
                style={{ "--i": 18, "--j": 1 } as React.CSSProperties}
              >
                <input type="text" required />
                <label>Username</label>
                <i className="bx bxs-user"></i>
              </div>
              <div
                className="input-box animation"
                style={{ "--i": 19, "--j": 2 } as React.CSSProperties}
              >
                <input type="email" required />
                <label>Email</label>
                <i className="bx bxs-envelope"></i>
              </div>
              <div
                className="input-box animation"
                style={{ "--i": 20, "--j": 3 } as React.CSSProperties}
              >
                <input type="password" required />
                <label>Password</label>
                <i className="bx bxs-lock-alt"></i>
              </div>
              <button
                type="submit"
                className="btn animation"
                style={{ "--i": 21, "--j": 4 } as React.CSSProperties}
              >
                Register
              </button>
              <div
                className="logreg-link animation"
                style={{ "--i": 22, "--j": 5 } as React.CSSProperties}
              >
                <p>
                  Already have an account?{" "}
                  <a href="#" className="login-link" onClick={handleLoginClick}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="info-text register">
            <h2
              className="animation"
              style={{ "--i": 17, "--j": 0 } as React.CSSProperties}
            >
              Welcome!
            </h2>
            <p
              className="animation"
              style={{ "--i": 18, "--j": 1 } as React.CSSProperties}
            >
              Hope, You have a <br />Great Day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
