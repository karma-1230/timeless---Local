import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../Components/Navbar";
import styles from "../Styles/UpdateItem.module.css";
import { updateItem, getProductById } from "../../api"; // make sure you have these
import { useNavigate, useParams } from "react-router-dom";

// ---------------- Zod Schema ----------------
const updateSchema = z.object({
    title: z.string().min(2, "Title is required"),
    category: z.string().min(1, "Select a category"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    price: z.number().min(1, "Price must be greater than 0"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    image: z.any().optional(), // optional new image
});

const UpdateItem = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // get item id from URL
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(true);
    const [currentImage, setCurrentImage] = useState(null); // show current image

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(updateSchema),
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
        } catch (error) {
            navigate("/login");
        }
    }, [navigate]);

    // ---------------- FETCH ITEM ----------------
    useEffect(() => {
        if (!id) return;

        const loadItem = async () => {
            try {
                const res = await getProductById(id);
                const item = res.data;

                // Fill form fields
                setValue("title", item.title);
                setValue("category", item.category);
                setValue("description", item.description);
                setValue("price", item.price);
                setValue("quantity", item.quantity);

                // Show current image
                setCurrentImage(`http://localhost:5000${item.image}`);

                setLoading(false);
            } catch (error) {
                console.error(error);
                alert("Failed to load item.");
            }
        };

        loadItem();
    }, [id, setValue]);

    // ---------------- IMAGE PREVIEW ----------------
    const newImageFile = watch("image");
    const preview = newImageFile && newImageFile[0] ? URL.createObjectURL(newImageFile[0]) : currentImage;

    // ---------------- FORM SUBMIT ----------------
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("category", data.category);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("quantity", data.quantity);

            // If new image uploaded
            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            await updateItem(id, formData);
            alert("Item updated successfully!");
            navigate("/view-items"); // redirect after update
        } catch (err) {
            console.error(err);
            alert("Failed to update item.");
        }
    };

    if (loading && auth) return <p>Loading item...</p>;
    if (!auth) return <p>UNAUTHORIZED</p>;

    return (
        <div className={styles.page}>
            <Navbar />
            <main className={styles.main}>
                <h1 className={styles.title}>Update Item</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {/* Image */}
                    <div className={styles.imageBox}>
                        {preview && <img src={preview} alt="Item" className={styles.currentImage} />}
                        <input type="file" {...register("image")} accept="image/*" />
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

                    <button type="submit" className={styles.saveBtn}>
                        Update Item
                    </button>
                </form>
            </main>
        </div>
    );
};

export default UpdateItem;
