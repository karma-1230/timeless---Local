import React from "react"
import styles from "../Styles/HeroSection.module.css"

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className="container-fluid">
        {/* Desktop View */}
        <div className={`row h-100 d-none d-md-flex ${styles.heroRow}`}>
          <div className="col-md-4 d-flex justify-content-center p-0 h-100">
            <img
              src="/images/left.jpg"
              alt="Left Banner"
              className={`${styles.image} w-100 h-100`}
            />
          </div>

          <div className={`col-md-4 text-center d-flex flex-column justify-content-center ${styles.centerContent}`}>
            <h1 className={styles.title}>Timeless</h1>
            <button className={`btn btn-outline-light btn-lg mt-3 ${styles.button}`}>
              Shop Now
            </button>
          </div>

          <div className="col-md-4 d-flex justify-content-center p-0 h-100">
            <img
              src="/images/right.jpg"
              alt="Right Banner"
              className={`${styles.image} w-100 h-100`}
            />
          </div>
        </div>

        {/* Mobile View */}
        <div className={`d-block d-md-none position-relative ${styles.mobileContainer}`}>
          <img
            src="/images/left.jpg"
            alt="Mobile Banner"
            className={`${styles.mobileImage} w-100`}
          />

          <div className={`position-absolute top-50 start-50 translate-middle text-center ${styles.mobileContent}`}>
            <h1 className={styles.mobileTitle}>Timeless</h1>
            <button className={`btn btn-outline-light btn-lg mt-3 ${styles.button}`}>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
