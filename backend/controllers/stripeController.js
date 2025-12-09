// import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.stripe, { apiVersion: "2022-11-15" });

// export const createCheckoutSession = async (req, res) => {
//     try {
//         const { lineItems } = req.body;

//         if (!lineItems || !lineItems.length)
//             return res.status(400).json({ message: "Cart is empty" });

//         // Map to Stripe's expected format
//         const stripeLineItems = lineItems.map(item => ({
//             price_data: {
//                 currency: item.currency,
//                 product_data: {
//                     name: item.name,
//                     description: item.description,
//                     // images: item.images || [], // optional
//                 },
//                 unit_amount: item.amount, // amount in cents
//             },
//             quantity: item.quantity,
//         }));

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: stripeLineItems,
//             mode: "payment",
//             success_url: "http://localhost:5173/checkout/success",
//             cancel_url: "http://localhost:5173/checkout",
//         });

//         res.status(200).json({ url: session.url });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };
import Stripe from "stripe";
import User from "../models/User.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";


export const createCheckoutSession = async (req, res) => {
    try {
        const { lineItems } = req.body;
        console.log(lineItems)
        const userId = req.user.id; // assuming you have middleware that sets req.user

        if (!lineItems || !lineItems.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Map to Stripe format
        const stripeLineItems = lineItems.map(item => ({
            price_data: {
                currency: item.currency,
                product_data: {
                    name: item.name,
                    description: item.description,
                },
                unit_amount: item.amount,
            },
            quantity: item.quantity,
        }));

        // Calculate total amount
        const totalAmount = lineItems.reduce((acc, item) => acc + item.amount * item.quantity, 0);

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: stripeLineItems,
            mode: "payment",
            success_url: "https://localhost:5173/checkout/success",
            cancel_url: "https://localhost:5173/checkout",
            metadata: { userId }, // store user for webhook
        });

        // Create pending order in DB
        const orderItems = lineItems.map(item => ({
            product: new mongoose.Types.ObjectId(item.productId), // make sure you send productId in lineItems
            quantity: item.quantity,
            price: item.amount / 100, // store as normal price
        }));
        console.log(orderItems)

        const order = new Order({
            user: new mongoose.Types.ObjectId(userId),
            items: orderItems,
            totalAmount: totalAmount / 100,
            status: "pending",
            paymentIntentId: session.payment_intent,
        });

        await order.save();

        // Optionally: clear user cart now (or wait for webhook)
        await User.findByIdAndUpdate(userId, { cart: [] });

        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
