import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: {
    type: Array
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  shippingAddress: {
    type: Object
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["order placed", "confirmed", "shipped", "delivered", "cancelled"],
    default: "order placed",
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
  paymentDate: { type: Date, default: Date.now },
});

export const Payment = mongoose.model("Payment", paymentSchema);
