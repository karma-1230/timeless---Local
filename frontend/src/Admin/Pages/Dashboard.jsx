import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // No token → redirect to login
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            // If role is not admin → go to not authorized page
            if (payload.role !== "admin") {
                setAuth(false);
                return;
            }

            // Allow page to load
            setLoading(false);

        } catch (error) {
            navigate("/login");
        }
    }, [navigate]);
    console.log(loading, auth);

    if (loading && auth) return <p>Checking access...</p>;
    if (!auth) return <p>UNAUTHORIZED</p>

    return (
        <div className={styles.dashboard}>
            <Navbar />
            <div className={styles.content}>
                <h1>Admin Dashboard</h1>
                <p>Welcome back, Commander of the Streets 🕶️</p>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <h3>Total Items</h3>
                        <p>320</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Pending Orders</h3>
                        <p>12</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Revenue (This Month)</h3>
                        <p>Rs 275,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
