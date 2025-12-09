import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles/Checkout.module.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Checkout() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setLoading(false);
                    return;
                }

                const res = await axios.get("http://localhost:5000/user/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data.user);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleOrderNow = async () => {
        if (!user?.cart || user.cart.length === 0) return;

        try {
            const token = localStorage.getItem("token");

            const lineItems = user.cart
                .map(item => ({
                    productId: item.product._id,
                    name: item.product.title,
                    description: item.product.description,
                    amount: item.product.price * 100,
                    currency: "pkr",
                    quantity: item.quantity,
                }));

            const res = await axios.post(
                "http://localhost:5000/order/create-checkout-session",
                { lineItems },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            window.location.href = res.data.url;
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Error creating checkout session.");
        }
    };

    if (loading) return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;
    if (!user) return <p style={{ textAlign: "center", marginTop: "100px" }}>Please log in to checkout.</p>;

    const totalPrice = user.cart?.reduce(
        (acc, item) => acc + (item.product?.price || 0) * item.quantity,
        0
    );

    return (<>
        <Navbar />
        <div className={styles.container}>
            <h2 className={styles.title}>Checkout</h2>

            {user.cart?.length > 0 ? (
                <>
                    <div className={styles.cartItems}>
                        {user.cart.map((item, idx) => (
                            <div key={idx} className={styles.cartItem}>
                                <img
                                    src={`http://localhost:5000${item.product?.image}`}
                                    alt={item.product?.title}
                                    className={styles.image}
                                />
                                <div className={styles.details}>
                                    <h5>{item.product?.title}</h5>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: PKR {item.product?.price}</p>
                                    <p>Subtotal: PKR {(item.product?.price || 0) * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <h4>Total: PKR {totalPrice}</h4>
                        <button className={styles.orderBtn} onClick={handleOrderNow}>
                            Checkout
                        </button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
        <Footer />
    </>
    );
}
