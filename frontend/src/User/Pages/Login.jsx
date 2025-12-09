import { useRef } from "react";
import styles from "../Styles/Login.module.css";
import { loginUser } from "../../api";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --------------------
// ZOD SCHEMA
// --------------------
const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

function Login() {
    const emailRef = useRef(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data) => {
        console.log("User data:", data);

        const res = await loginUser(data);

        reset();
        localStorage.setItem("token", res.data.token);

        if (res.data.user.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>

                {/* Header */}
                <div className={styles.header}>
                    <h5 className={styles.brand}>T I M E L E S S</h5>
                    <nav className={styles.nav}>
                        <a href="/" className={styles.navLink}>Home</a>
                    </nav>
                </div>

                {/* Title */}
                <h3 className={styles.title}>Login to your account</h3>
                <p className={styles.subtitle}>
                    Don’t have an account?{" "}
                    <a href="/signup" className={styles.link}>Sign Up</a>
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className={styles.input}
                            ref={emailRef}
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className={styles.error}>{errors.email.message}</span>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className={styles.error}>{errors.password.message}</span>
                        )}
                    </div>

                    <div className={styles.buttonRow}>
                        <button type="button" className={styles.googleBtn}>
                            Google
                        </button>

                        <button type="submit" className={styles.submitBtn}>
                            Login
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Login;
