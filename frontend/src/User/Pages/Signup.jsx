import styles from "../Styles/Signup.module.css";
import { signupUser } from "../../api";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --------------------
// ZOD SCHEMA
// --------------------
const signupSchema = z.object({
    fName: z.string().min(1, "First name is required"),
    lName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fName: "",
            lName: "",
            address: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        console.log("User submitted:", data);
        signupUser(data);

        reset();
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
                <h3 className={styles.title}>Create new account.</h3>
                <p className={styles.subtitle}>
                    Already a member?{" "}
                    <a href="/login" className={styles.link}>Log in</a>
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.row}>
                        <div>
                            <input
                                type="text"
                                placeholder="First name"
                                className={styles.input}
                                {...register("fName")}
                            />
                            {errors.fName && (
                                <span className={styles.error}>{errors.fName.message}</span>
                            )}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Last name"
                                className={styles.input}
                                {...register("lName")}
                            />
                            {errors.lName && (
                                <span className={styles.error}>{errors.lName.message}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Address"
                            className={styles.input}
                            {...register("address")}
                        />
                        {errors.address && (
                            <span className={styles.error}>{errors.address.message}</span>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className={styles.input}
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
                            Create account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
