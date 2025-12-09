import express from "express";
import User from "../models/User.js"; // <- import your User model
import { signupUser, loginUser, contactUs, deleteUser, updateUser, addToCart, getUser, getMyOrders } from "../controllers/userController.js";
import { upload, verifyUser } from "../jwt.js";

const router = express.Router();

// Signup, Login, Contact
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/contactus", contactUs);

router.post("/cart", verifyUser, addToCart);

// Get current logged-in user
router.get("/me", verifyUser, getUser);

router.put("/update", verifyUser, upload.single("profilePhoto"), updateUser);

// ------------------------
// DELETE /user/delete
// ------------------------
router.delete("/delete", verifyUser, deleteUser);


router.get("/getOrders", verifyUser, getMyOrders);

export default router;
