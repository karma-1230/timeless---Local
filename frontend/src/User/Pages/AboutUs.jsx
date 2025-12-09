import styles from "../Styles/AboutUs.module.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function AboutUs() {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>About Us</h1>
                    <p>
                        Welcome to <strong>Kaaven</strong>, where we redefine elegance by offering premium-quality
                        formal attire at affordable prices. Our journey began with a simple goal: to provide
                        impeccably crafted clothing that exudes sophistication and style without breaking the bank.
                    </p>
                </div>

                <section>
                    <h2>Our Vision</h2>
                    <p>
                        At Kaaven, we believe that everyone deserves to look their best, regardless of budget or
                        occasion. That’s why we set out to design the finest formal wear that blends affordability
                        and quality effortlessly. We aim to make premium-quality formal wear accessible to all,
                        ensuring that our customers can express their true style with confidence.
                    </p>
                </section>

                <section>
                    <h2>Quality Craftsmanship</h2>
                    <p>
                        We are passionate about craftsmanship and attention to detail. Each garment in our
                        collection is meticulously designed and crafted using the finest materials and techniques.
                        From the precision of our tailoring to the softness of our fabrics, every piece of our
                        clothing reflects our commitment to quality and excellence.
                    </p>
                </section>

                <section>
                    <h2>Affordable Luxury</h2>
                    <p>
                        While we uphold the highest standards of quality, we also believe in offering exceptional
                        value. By maintaining global production partnerships and cutting out unnecessary expenses,
                        we’re able to offer our customers premium formal wear at prices that won’t break the bank.
                        Our mission is to make luxury accessible to all, without compromising on quality or style.
                    </p>
                </section>

                <section>
                    <h2>Timeless Elegance</h2>
                    <p>
                        Our clothing embodies timeless elegance and classic sophistication. We believe in
                        impeccable silhouettes, refined designs, and enduring value that transcends time and
                        trends. Whether it’s for a business meeting, a grand occasion, or an elegant evening out,
                        our collection ensures that you look poised and polished in every moment.
                    </p>
                </section>

                <section>
                    <h2>Customer Satisfaction</h2>
                    <p>
                        At Kaaven, customer satisfaction is our top priority. We are committed to providing an
                        exceptional shopping experience. From our expert styling team to our attention to every
                        detail, we ensure that you feel confident, inspired, and fully satisfied every time you
                        wear one of our pieces. We are here to help you find the perfect attire that not only fits
                        your body but also accentuates your impeccable taste.
                    </p>
                </section>

                <section>
                    <h2>Join Us</h2>
                    <p>
                        We invite you to explore our collection and discover the perfect formal attire that
                        complements your personal style. Follow us on our social platforms and become part of the
                        Kaaven family. With every piece you wear, experience the elegance, quality, and confidence
                        that define our brand.
                    </p>
                    <p className={styles.closing}>
                        Thank you for being a part of our journey towards timeless sophistication and affordable
                        luxury.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
