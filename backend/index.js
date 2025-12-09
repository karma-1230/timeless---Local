import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import stripeRoutes from "./routes/stripe.js"

dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
}));
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ Mongo Error:", err));


app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/order", stripeRoutes)
import path from "path";

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



// ---------------------- SERVER START --------------------------------

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
