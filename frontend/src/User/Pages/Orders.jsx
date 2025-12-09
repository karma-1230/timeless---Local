import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import styles from "../Styles/Orders.module.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!token) return;
                const res = await axios.get("http://localhost;5000/user/getOrders", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setOrders(res.data.orders);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [token]);

    if (loading) {
        return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;
    }

    if (!orders.length) {
        return (
            <>
                <Navbar />
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>My Orders</h2>
                    <p className={styles.noOrders}>You have no orders yet.</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className={styles.wrapper}>
                <h2 className={styles.title}>My Orders</h2>
                {orders.map((order) => (
                    <div key={order._id} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                            <span><strong>Order ID:</strong> {order._id}</span>
                            <span><strong>Status:</strong> <span className={styles[order.status]}>{order.status.toUpperCase()}</span></span>
                            <span><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.itemsList}>
                            {order.items.map((item) => (
                                <div key={item.product._id} className={styles.itemRow}>
                                    {console.log(item)}
                                    <img src={`http://localhost:5000${item.product.image}` || "/images/default-avatar.jpg"} alt={item.product.title} />
                                    <div className={styles.itemDetails}>
                                        <h4>{item.product.title}</h4>
                                        <p>Qty: {item.quantity}</p>
                                        <p>Price: Rs {item.price}</p>
                                        <p>Subtotal: Rs {item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.orderFooter}>
                            <span><strong>Total:</strong> Rs {order.totalAmount}</span>
                            <span><strong>Payment:</strong> {order.paymentIntentId ? "Paid" : "Pending"}</span>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}
