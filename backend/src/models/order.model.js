import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: {
    type: Array,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["order placed", "processing", "shipped", "delivered", "canceled"],
    default: "order placed",
  },
  shippingAddress: {
    type: Object,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  razorpay_order_id: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);
