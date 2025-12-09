import React, { useState, useEffect, useContext } from "react";
import styles from "../Styles/ProductsDisplay.module.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { getProducts, addToCart } from "../../api";
import { ProductContext } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

function ProductsDisplay() {
    var prods = [];
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [cartMessage, setCartMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(null);

    const { setSelectedProduct } = useContext(ProductContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts();
                if (category != "All") {
                    prods = res.data;
                    setProducts(prods.filter((products) => products.category === category))
                }
                else
                    setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setCartMessage("Please login to add items to cart");
            return;
        }

        setAdding(product._id);

        try {
            await addToCart(product._id, 1);
            setCartMessage(`${product.title} added to cart!`);
            setTimeout(() => setCartMessage(""), 2000);
        } catch (err) {
            console.error(err);
            setCartMessage("Failed to add item to cart");
        } finally {
            setAdding(null);
        }
    };

    const openProduct = (product) => {
        setSelectedProduct(product);
        navigate("/product");
    };

    if (loading)
        return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;

    if (products.length === 0)
        return <p style={{ textAlign: "center", marginTop: "100px" }}>No products available.</p>;

    return (
        <>
            <Navbar />
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <h1>TIMELESS COLLECTION</h1>
                    <p>
                        No trends, no validation—just original street identity.
                        “Street Aura” isn’t about fitting in, it’s about standing apart.
                    </p>

                    <div className={styles.meta}>
                        <span>Sort by: Featured</span>
                        <span>{products.length} Products</span>
                    </div>

                    {cartMessage && <p className={styles.cartMessage}>{cartMessage}</p>}
                </header>

                <div className={styles.grid}>
                    {products.map((p) => (
                        <div
                            key={p._id}
                            className={styles.card}
                            onClick={() => openProduct(p)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className={styles.imageContainer}>
                                <img
                                    src={`http://localhost:5000/${p.image.replace(/^\/+/, "")}`}
                                    alt={p.title}
                                />
                                <span
                                    className={`${styles.badge} ${p.quantity === 0 ? styles.soldOut : ""
                                        }`}
                                >
                                    {p.quantity === 0 ? "Sold Out" : "20% OFF"}
                                </span>
                            </div>

                            <div className={styles.info}>
                                <h3>{p.title}</h3>
                                <p className={styles.price}>
                                    <span className={styles.oldPrice}>
                                        Rs {p.price + p.price * 0.2}
                                    </span>{" "}
                                    Rs {p.price}
                                </p>

                                <button
                                    className={styles.btn}
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent card click navigation
                                        handleAddToCart(p);
                                    }}
                                    disabled={p.quantity === 0 || adding === p._id}
                                >
                                    {p.quantity === 0
                                        ? "Sold Out"
                                        : adding === p._id
                                            ? "Adding..."
                                            : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ProductsDisplay;
