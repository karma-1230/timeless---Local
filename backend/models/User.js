import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema({
    fName: { type: String, required: true, trim: true },
    lName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: String,
    profilePhoto: { type: String, default: "" }, // URL of profile photo
    address: { type: String, default: "" }, // simple string
    cart: [cartItemSchema],
    role: { type: String, default: "user" }, // user/admin
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
