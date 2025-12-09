import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user cart or show message
        localStorage.removeItem("cart"); // if storing cart locally
        // Or call backend to empty cart
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Thank you for your order!</h2>
            <p>Your payment was successful.</p>
            <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    );
}
