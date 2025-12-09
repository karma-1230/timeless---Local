import express from "express";
import { getProducts, getProductById, addRating } from "../controllers/productController.js";
import { verifyUser } from "../jwt.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/:id/rate", verifyUser, addRating);

export default router;
