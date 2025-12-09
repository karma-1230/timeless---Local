import React, { useRef } from "react";
import styles from "../Styles/ContactUs.module.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { sendContactForm } from "../../api";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --------------------
// ZOD VALIDATION SCHEMA
// --------------------
const contactSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    message: z.string().min(1, "Message is required"),
});

function ContactUs() {
    const firstInputRef = useRef(null);

    // --------------------
    // useForm + resolver
    // --------------------
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    // --------------------
    // Submit Handler
    // --------------------
    const onSubmit = async (data) => {
        console.log("Submitted Data:", data);

        alert(`Thank you, ${data.firstName}! We’ll get back to you soon.`);

        await sendContactForm(data);

        reset();
    };

    return (
        <>
            <Navbar />
            <div className={styles.contactContainer}>
                {/* Left image */}
                <div className={styles.imageSection}>
                    <img src="/images/contactUs.jpg" alt="Karvaan Apparel" />
                </div>

                {/* Right form */}
                <div className={styles.formSection}>
                    <h2>TIMELESS Support</h2>
                    <p>Leave your message and we’ll get back to you shortly.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <div className={styles.nameRow}>
                            <div>
                                <input
                                    ref={firstInputRef}
                                    type="text"
                                    placeholder="First name*"
                                    {...register("firstName")}
                                />
                                {errors.firstName && (
                                    <span className={styles.error}>
                                        {errors.firstName.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Last name*"
                                    {...register("lastName")}
                                />
                                {errors.lastName && (
                                    <span className={styles.error}>
                                        {errors.lastName.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email*"
                                {...register("email")}
                            />
                            {errors.email && (
                                <span className={styles.error}>
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Phone"
                                {...register("phone")}
                            />
                        </div>

                        <div>
                            <textarea
                                placeholder="Message*"
                                rows="4"
                                {...register("message")}
                            />
                            {errors.message && (
                                <span className={styles.error}>
                                    {errors.message.message}
                                </span>
                            )}
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Next
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContactUs;
