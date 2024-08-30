import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = () => {
  const [tokn, setTokn] = useState(localStorage.getItem("Authdata"));
  const handleLogout = () => {
    localStorage.removeItem("Authdata");
    setTokn(localStorage.removeItem("RToken"));
  };

  return (
    <>
      <header className="header">
        <nav className="nav container">
          <NavLink to="/" className="nav__logo">
            eVitalRX
          </NavLink>

          <div className={"nav__menu"} id="nav-menu">
            <ul className="nav__list">
              {!tokn ? (
                <>
                  <li className="nav__item">
                    <NavLink to="/register" className="nav__link nav__cta">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav__item">
                    <NavLink to="/login" className="nav__link nav__cta">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav__item">
                    <NavLink to="/login">
                      <button
                        className="nav__link nav__cta"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
