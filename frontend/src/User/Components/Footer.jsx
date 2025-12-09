import React from "react";
import styles from "../Styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={`${styles.textCenter} text-center`}>
          <h2 className={styles.title}>Subscribe to our emails</h2>
          <p className={styles.subtitle}>
            Be the first to know about new collections and exclusive offers.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.emailInput}
                />
                <button className={styles.submitBtn}>→</button>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.linksSection} row`}>
          <div className="col-6 col-md-4 mb-4">
            <h4 className={styles.heading}>timeless Clothing</h4>
            <div className={styles.textBlock}>
              <p>
                <strong>Address:</strong> Block 19, Gulistan-E-Johar, Karachi,
                Sindh, Pakistan
              </p>
              <p>
                <strong>Hotline:</strong> 0310-3000547
              </p>
              <p>
                <strong>Other:</strong> 0313-3942250
              </p>
              <p>
                <strong>Email:</strong> support@timeless.pk
              </p>
            </div>
          </div>

          <div className="col-6 col-md-4 mb-4">
            <h4 className={styles.heading}>Our Company</h4>
            <div className={styles.linkGroup}>
              <p><a href="/AboutUs">About Us</a></p>
              <p><a href="/ContactUs">Contact Us</a></p>
            </div>
          </div>

          <div className="col-6 col-md-4 mb-4">
            <h4 className={styles.heading}>Customer Support</h4>
            <div className={styles.linkGroup}>
              <p><a href="#">FAQ</a></p>
              <p><a href="#">Delivery</a></p>
              <p><a href="#">Returns & Refunds</a></p>
              <p><a href="#">Payment Methods</a></p>
              <p><a href="#">Information Security</a></p>
              <p><a href="#">Store System</a></p>
            </div>
          </div>
        </div>

        <div className={styles.footerEnd}>
          <div className={styles.brand}>
            T I M E L E S s
            <div className={styles.tagline}>HOUSE OF STREETWEAR</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
