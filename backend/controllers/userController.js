import User from "../models/User.js"; // your user model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Create JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("Login successful");

        // IMPORTANT: send token in JSON instead of cookies
        res.status(200).json({
            message: "Logged in",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.fName + " " + user.lName,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


// Signup
export const signupUser = async (req, res) => {
    console.log("user is here", req.body);
    try {
        const { fName, lName, email, password, phone, profilePhoto, address } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fName,
            lName,
            email,
            password: hashedPassword,
            phone,
            profilePhoto,
            address,
        });

        await newUser.save();
        console.log("user created");
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Contact Us (just logs for now)
export const contactUs = (req, res) => {
    console.log("Contact Us Hit", req.body);
    res.status(200).json({ message: "Contact request received" });
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update fields
        user.fName = req.body.fName || user.fName;
        user.lName = req.body.lName || user.lName;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;

        // Update profile photo if uploaded
        if (req.file) {
            user.profilePhoto = `/uploads/${req.file.filename}`;
        }

        await user.save();
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.product");
        if (!user) return res.status(404).json({ message: "User not found" });

        // Send user data excluding sensitive info
        const { password, ...userData } = user._doc;
        res.status(200).json({ user: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user.id);

        const existing = user.cart.find(item => item.product && item.product.toString() === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        console.log("added");
        res.status(200).json({ message: "Product added to cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

import Order from "../models/Order.js";

// GET /orders/me — get orders for logged-in user
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id; // req.user set by auth middleware
        // Find all orders for this user, populate product details
        const orders = await Order.find({ user: userId })
            .populate("items.product");
        console.log(orders)

        res.status(200).json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

