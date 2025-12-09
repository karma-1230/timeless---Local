import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>TIMELESS</div>

            <div className={styles.links}>
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/manage-items"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Manage Items
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Orders
                </NavLink>

                {/* Logout styled like a link */}
                <button
                    onClick={handleLogout}
                    className={styles.link}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
