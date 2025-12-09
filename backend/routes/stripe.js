import express from "express";
import { createCheckoutSession } from "../controllers/stripeController.js";
import { verifyUser } from "../jwt.js";
const router = express.Router();

router.post("/create-checkout-session", verifyUser, createCheckoutSession);

export default router;
