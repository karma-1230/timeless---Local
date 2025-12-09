import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: String,          // e.g., hoodie, tee, jacket
    image: String,          // multiple image URLs
    quantity: { type: Number, default: 0 },
    discount: { type: Number, default: 0 }, // percentage discount
    ratings: [ratingSchema],
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
