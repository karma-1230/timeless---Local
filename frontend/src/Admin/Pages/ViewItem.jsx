import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/ViewItems.module.css";
import { fetchItems, deleteItem } from "../../api";
import { useNavigate } from "react-router-dom";

const ViewItems = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(true);

    const [items, setItems] = useState([]);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");

    // ---------------- ADMIN AUTH + LOAD ITEMS ----------------
    useEffect(() => {
        const loadItems = async () => {
            try {
                const res = await fetchItems();
                console.log("Fetched items:", res.data);
                setItems(res.data);   // ONLY REAL ITEMS
            } catch (err) {
                console.log("Error fetching items:", err);
            }
        };

        loadItems();

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
        } catch (err) {
            navigate("/login");
        }
    }, [navigate]);

    if (loading) return <p>Checking access...</p>;
    if (!auth) return <p>UNAUTHORIZED</p>;

    // ---------------- DELETE ITEM ----------------
    const handleDelete = async (item) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await deleteItem(item._id);

            // update UI
            setItems((prev) => prev.filter((i) => i._id !== item._id));

            alert("Item deleted!");
        } catch (err) {
            alert("Error deleting item.");
        }
    };

    // ---------------- FILTERING ----------------
    const filteredItems = items.filter((item) => {
        const matchCategory = category === "All" || item.category === category;
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <>
            <Navbar />

            <div className={styles.page}>
                <main className={styles.main}>

                    <div className={styles.header}>
                        <h1>Manage Store Items</h1>

                        <div className={styles.filters}>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={styles.dropdown}
                            >
                                <option value="All">All Categories</option>
                                <option value="Hoodies">Hoodies</option>
                                <option value="T-Shirts">T-Shirts</option>
                                <option value="Pants">Pants</option>
                                <option value="Accessories">Accessories</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Search item..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={styles.search}
                            />
                        </div>
                    </div>

                    <div className={styles.grid}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item._id} className={styles.card}>
                                    <img
                                        src={
                                            item.image
                                                ? `http://localhost:5000${item.image}`
                                                : "/placeholder.jpg"
                                        }
                                        alt={item.title}
                                        className={styles.image}
                                    />

                                    <div className={styles.info}>
                                        <h3>{item.title}</h3>
                                        <p className={styles.category}>{item.category}</p>

                                        <p className={styles.price}>PKR {item.price}</p>

                                        <p
                                            className={`${styles.stock} ${item.quantity === 0
                                                ? styles.out
                                                : item.quantity <= 5
                                                    ? styles.low
                                                    : styles.in
                                                }`}
                                        >
                                            {item.quantity === 0
                                                ? "Out of Stock"
                                                : item.quantity <= 5
                                                    ? "Low Stock"
                                                    : "In Stock"}
                                        </p>
                                    </div>

                                    <div className={styles.actions}>
                                        <button onClick={() => navigate(`/update-item/${item._id}`)} className={styles.edit}>Edit</button>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className={styles.delete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noItems}>No items found.</p>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default ViewItems;
