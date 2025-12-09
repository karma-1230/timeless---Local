import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import styles from "../Styles/ProductDescription.module.css";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { addToCart, submitRating } from "../../api";

const ProductDescription = () => {
    const { selectedProduct: product } = useContext(ProductContext);
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    // If user refreshes → context is empty → redirect to product listing
    useEffect(() => {
        console.log(product)
        if (!product) {
            navigate("/products");
            return;
        }

        // Calculate average rating
        if (product.ratings && product.ratings.length > 0) {
            const avg =
                product.ratings.reduce((acc, r) => acc + r.rating, 0) /
                product.ratings.length;
            setAverageRating(avg);
        } else {
            setAverageRating(0);
        }
    }, [product, navigate]);

    if (!product) return null; // Prevent render crash during redirect

    const handleQuantityChange = (delta) => {
        setQuantity((prev) =>
            Math.max(1, Math.min(prev + delta, product.quantity))
        );
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(product._id, quantity);
            alert("Added to cart!");
        } catch (err) {
            console.error(err);
            alert("Failed to add to cart");
        }
    };

    const handleRatingSubmit = async () => {
        if (userRating < 1 || userRating > 5) {
            alert("Rating must be between 1 and 5");
            return;
        }

        try {
            await submitRating(product._id, userRating, "");

            // Manually update average rating locally (no API fetch needed)
            const newRatings = [...product.ratings, { rating: userRating }];
            const avg =
                newRatings.reduce((acc, r) => acc + r.rating, 0) /
                newRatings.length;

            setAverageRating(avg);
            setUserRating(0);
            setHoverRating(0);

            alert("Rating submitted!");
        } catch (err) {
            console.error(err);
            alert("Failed to submit rating");
        }
    };

    return (
        <>
            <Navbar />

            <div className={styles.productPage}>
                {/* LEFT SIDE IMG */}
                <div className={styles.leftColumn}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={`http://loaclhost:5000${product.image}`}
                            alt={product.title}
                            className={styles.productImage}
                        />
                    </div>
                </div>

                {/* RIGHT SIDE DETAILS */}
                <div className={styles.rightColumn}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.category}>{product.category}</p>

                    {/* PRICE */}
                    <div className={styles.price}>
                        {product.discount > 0 && (
                            <span className={styles.originalPrice}>
                                PKR{" "}
                                {(
                                    product.price *
                                    (100 / (100 - product.discount))
                                ).toFixed(0)}
                            </span>
                        )}

                        <span className={styles.salePrice}>
                            PKR {product.price}
                        </span>
                    </div>

                    {/* RATINGS */}
                    <div className={styles.ratingSection}>
                        <div className={styles.currentRating}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <span
                                    key={i}
                                    className={
                                        i < Math.round(averageRating)
                                            ? styles.filledStar
                                            : styles.emptyStar
                                    }
                                >
                                    ★
                                </span>
                            ))}
                            <span className={styles.averageText}>
                                ({averageRating.toFixed(1)})
                            </span>
                        </div>

                        {/* USER RATING INPUT */}
                        <div className={styles.userRating}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <span
                                    key={i}
                                    className={
                                        i < (hoverRating || userRating)
                                            ? styles.filledStar
                                            : styles.emptyStar
                                    }
                                    onMouseEnter={() => setHoverRating(i + 1)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setUserRating(i + 1)}
                                >
                                    ★
                                </span>
                            ))}
                            <button
                                className={styles.submitRatingBtn}
                                onClick={handleRatingSubmit}
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>

                    {/* QUANTITY SELECTOR */}
                    <div className={styles.quantitySelector}>
                        <button onClick={() => handleQuantityChange(-1)}>
                            -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange(1)}>
                            +
                        </button>
                    </div>

                    {/* ADD TO CART */}
                    <button
                        className={styles.addCartButton}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                    {/* DESCRIPTION */}
                    <div className={styles.descriptionSection}>
                        <h3>Product Details</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductDescription;
