import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../Components/Navbar";
import styles from "../Styles/AddItem.module.css";
import { addItem } from "../../api";
import { useNavigate } from "react-router-dom";

// ---------------- Zod Schema ----------------
const addItemSchema = z.object({
    title: z.string().min(2, "Title is required"),
    category: z.string().min(1, "Please select a category"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    price: z.number().min(1, "Price must be greater than 0"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    image: z.any().optional(), // allow image to be optional
});

const AddItem = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(true);
    const [preview, setPreview] = useState(null); // for image preview

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        resolver: zodResolver(addItemSchema),
    });

    // ---------------- AUTH CHECK ----------------
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            if (payload.role !== "admin") {
                setAuth(false);
                return;
            }

            setAuth(true);
            setLoading(false);
        } catch (error) {
            navigate("/login");
        }
    }, [navigate]);

    // ---------------- IMAGE PREVIEW ----------------
    const imageFile = watch("image");
    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const objectUrl = URL.createObjectURL(imageFile[0]);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl); // cleanup
        } else {
            setPreview(null);
        }
    }, [imageFile]);

    // ---------------- FORM SUBMIT ----------------
    const onSubmit = (data) => {
        const formData = new FormData();

        // Add single image
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]); // match backend field
        }

        // Add other fields
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("quantity", data.quantity);

        addItem(formData)
            .then((res) => {
                console.log("Item added:", res.data);
                alert("Item added successfully!");
                reset();
                setPreview(null);
            })
            .catch((err) => {
                console.error(err);
                alert("Error adding item.");
            });
    };

    if (loading && auth) return <p>Checking access...</p>;
    if (!auth) return <p>UNAUTHORIZED</p>;

    return (
        <div className={styles.page}>
            <Navbar />

            <main className={styles.main}>
                <h1 className={styles.title}>Add New Item</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {/* Image Upload */}
                    <div className={styles.inputGroup}>
                        <label>Upload Image</label>
                        <input type="file" {...register("image")} accept="image/*" />
                        {errors.image && <p className={styles.error}>{errors.image.message}</p>}
                        {preview && (
                            <div className={styles.preview}>
                                <img src={preview} alt="Preview" className={styles.previewImage} />
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className={styles.inputGroup}>
                        <label>Title</label>
                        <input type="text" {...register("title")} />
                        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
                    </div>

                    {/* Category */}
                    <div className={styles.inputGroup}>
                        <label>Category</label>
                        <select {...register("category")}>
                            <option value="">Select category</option>
                            <option value="Hoodies">Hoodies</option>
                            <option value="T-Shirts">T-Shirts</option>
                            <option value="Pants">Pants</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        {errors.category && <p className={styles.error}>{errors.category.message}</p>}
                    </div>

                    {/* Description */}
                    <div className={styles.inputGroup}>
                        <label>Description</label>
                        <textarea rows="4" {...register("description")}></textarea>
                        {errors.description && <p className={styles.error}>{errors.description.message}</p>}
                    </div>

                    {/* Price & Quantity */}
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Price (PKR)</label>
                            <input type="number" {...register("price", { valueAsNumber: true })} />
                            {errors.price && <p className={styles.error}>{errors.price.message}</p>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Quantity</label>
                            <input type="number" {...register("quantity", { valueAsNumber: true })} />
                            {errors.quantity && <p className={styles.error}>{errors.quantity.message}</p>}
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Add Item
                    </button>
                </form>
            </main>
        </div>
    );
};

export default AddItem;
