import Product from "../models/Product.js";

// Get All Products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const addRating = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { id } = req.params;
        console.log(req.user); // product ID
        const userId = req.user.id;
        console.log(userId) // from verifyUser middleware

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be 1-5" });
        }

        const product = await Product.findById(id);

        if (!product) return res.status(404).json({ error: "Product not found" });

        // Check if user has already rated
        const existing = product.ratings.find(r => r.user && r.user.toString() === userId);

        if (existing) {
            existing.rating = rating;
            existing.comment = comment || existing.comment;
        } else {
            product.ratings.push({ user: userId, rating, comment: comment || "" });
        }

        await product.save();
        res.status(200).json({ message: "Rating submitted successfully", product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};


// Get Single Product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
