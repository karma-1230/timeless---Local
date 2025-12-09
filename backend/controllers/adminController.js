import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



// --------------------
// Add Item with Images
// --------------------
export const addItem = async (req, res) => {
    try {
        const { title, category, description, price, quantity } = req.body;

        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const product = new Product({
            title,
            category,
            description,
            price: Number(price),
            quantity: Number(quantity),
            image: imagePath,
        });

        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};




// --------------------
// Admin Login
// --------------------
export const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT
    const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // token valid for 1 day
    );

    res.status(200).json({ message: "Admin logged in", token, admin });
};


// --------------------
// View Items
// --------------------
export const getItems = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// --------------------
// Update Item
// --------------------
export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, description, price, quantity } = req.body;

        // Find the product first
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Item not found" });

        // Update fields
        product.title = title;
        product.category = category;
        product.description = description;
        product.price = Number(price);
        product.quantity = Number(quantity);

        // If new image uploaded, replace it
        if (req.file) {
            product.image = `/uploads/${req.file.filename}`;
        }

        await product.save();

        res.status(200).json({ message: "Item updated successfully", product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update item", error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const deleted = await Product.findByIdAndDelete(id);
        console.log("not found");

        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
