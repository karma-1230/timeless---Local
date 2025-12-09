import express from "express";
import { adminLogin, addItem, updateItem, getItems, deleteProduct } from "../controllers/adminController.js";
import { upload, verifyAdmin } from "../jwt.js";

const router = express.Router(); // store files in memory

// Admin login
router.post("/login", adminLogin);

// Add item with multiple images (max 5)
router.post("/item", verifyAdmin, upload.single("image"), addItem);
// Update item by ID
router.put("/item/:id", verifyAdmin, upload.single("image"), updateItem);

// View all items
router.get("/items", verifyAdmin, getItems);

router.delete("/items/:id", verifyAdmin, deleteProduct);
export default router;
