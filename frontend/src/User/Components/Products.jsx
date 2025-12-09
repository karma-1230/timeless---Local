import React, { useEffect, useState } from "react";
import styles from "../Styles/Products.module.css";
import { getProducts } from "../../api";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";

export default function Products() {
  const [hoodies, setHoodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const url = "http://localhost:5000"

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const res = await getProducts(); // Your backend endpoint
        const data = await res.data;

        // Filter hoodies
        const hoodieProducts = data.filter((product) => product.category === "Hoodies");

        // Take only first 3 hoodies
        const firstThreeHoodies = hoodieProducts.slice(0, 3);

        setHoodies(firstThreeHoodies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper to calculate random discount up to 35%
  const getDiscountedPrice = (price) => {
    const discountPercent = Math.floor(Math.random() * 36); // 0-35%
    const discountedPrice = Math.round(price * (1 - discountPercent / 100));
    return { discountedPrice, discountPercent };
  };

  const handleChoose = (product) => {
    setSelectedProduct(product);   // save selected product in context
    navigate(`/product`); // navigate to product description page
  };
  const calcAvg = (product) => {
    const avg = product.ratings.reduce((acc, r) => acc + r.rating, 0) / product.ratings.length;
    return avg
  }

  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>;
  }

  return (
    <section className={styles.productsSection}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h1 className={`fw-bold mb-3 ${styles.sectionTitle}`}>
            CULT OF CYPHER VOLUME I IS LIVE NOW!
          </h1>
          <p className={`lead ${styles.sectionSubtitle}`}>
            DON'T SLEEP ON THIS DROP. COP IT BEFORE THE SELL-OUT IS REAL
          </p>
        </div>

        {/* Product Grid */}
        <div className="row g-4 justify-content-center">
          {hoodies.map((product) => {
            const { discountedPrice, discountPercent } = getDiscountedPrice(product.price);
            return (
              <div key={product._id || product.id} className="col-6 col-md-4">
                <div className={`card shadow-sm border-0 rounded-4 h-100 d-flex flex-column ${styles.productCard}`}>

                  {/* Product Image */}
                  <div className={styles.imageWrapper}>
                    <img
                      src={`${url}${product.image}` || "/placeholder.svg"}
                      alt={product.name}
                      className={`card-img-top img-fluid ${styles.productImage}`}
                    />
                    <span className={`badge bg-dark position-absolute top-0 start-0 m-3 px-3 py-2 ${styles.discountBadge}`}>
                      {discountPercent}% OFF
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className={`card-body d-flex flex-column p-4 ${styles.cardBody}`}>
                    <h5 className={`card-title fw-bold text-uppercase mb-3 ${styles.productName}`}>
                      {product.name}
                    </h5>

                    {/* Rating */}
                    <div className="d-flex align-items-center mb-3">
                      <div className={`me-2 ${styles.ratingStars}`}>
                        {"★".repeat(calcAvg(product))}
                        {"☆".repeat(5 - calcAvg(product))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className={`d-block ${styles.originalPrice}`}>
                        Rs {product.price.toLocaleString()}.00
                      </span>
                      <span className={`h5 fw-bold ${styles.salePrice}`}>
                        Rs {discountedPrice.toLocaleString()}.00
                      </span>
                    </div>

                    {/* Button */}
                    <button className={`btn btn-outline-dark btn-lg mt-auto rounded-pill ${styles.chooseButton}`} onClick={() => handleChoose(product)}>
                      Choose options
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
