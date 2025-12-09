import { useState, useEffect } from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import styles from "../Styles/Navbar.module.css";
import axios from "axios";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoggedIn(!!token);

    // Fetch user cart if logged in
    if (token) {
      axios
        .get("http://localhost:5000/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const cart = res.data.user?.cart || [];
          // Sum up quantity of each cart item
          const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
          setCartCount(totalItems);
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div>
      {/* Top Strip */}
      <div className={`${styles.topBar} py-1`}>
        <div className="d-flex align-items-center justify-content-center">
          <marquee className="mx-auto fw-bold">
            CULT OF CYPHER VOLUME I IS OUT NOW!
          </marquee>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom py-3">
        <div className="container">
          {/* Brand */}
          <a className={`navbar-brand fw-bold ${styles.brand}`} href="/">
            T I M E L E S S
          </a>

          {/* Toggler */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div className="collapse navbar-collapse justify-content-center" id="mainNav">
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <a className="nav-link text-dark" href="/products/All">ALL COLLECTION</a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown">
                  TOPS
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/products/T-Shirts">T-Shirts</a></li>
                  <li><a className="dropdown-item" href="/products/Hoodies">Hoodies</a></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown">
                  BOTTOMS
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/products/Pants">Pants</a></li>
                </ul>
              </li>
            </ul>

            {/* Right-side icons */}
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              {loggedIn ? (
                <>
                  <li className="nav-item me-3">
                    <a className="nav-link text-dark position-relative" href="/checkout">
                      <FaShoppingCart size={20} />
                      {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartCount}
                        </span>
                      )}
                    </a>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-dark d-flex align-items-center"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      <FaUserCircle size={20} className="me-1" /> Profile
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><a className="dropdown-item" href="/profile">My Account</a></li>
                      <li><a className="dropdown-item" href="/orders">Orders</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link text-dark fw-bold" href="/login">Login</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
