import crypto from "crypto";
import Razorpay from "razorpay";
import { Payment } from "../models/payment.model.js";
import { Order } from "../models/order.model.js";
import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { ApiResponse } from "../services/ApiResponse.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
import dotenv from "dotenv";
dotenv.config();

 
//--------------------Checkout API---------------------
const checkout = asyncHandler(async (req, res) => {
  const { orderItems, totalAmount, shippingAddress, paymentMethod , orderId} = req.body;
  const userId = req.user.id;
  
  if (!userId) throw new ApiError(401, "Unauthorized User");

  const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `order_rcptid_${userId}`,
  };
  
  const order = await razorpay.orders.create(options);
  
  if (!order) throw new ApiError(500, "Error creating Razorpay order");
  
  return res.status(201).json(new ApiResponse(201, {
      orderId: order.id,
      totalAmount,
      shippingAddress,
      paymentMethod,
      orderItems,
  }, "Razorpay Order Created Successfully"));
});

//--------------------Verify Payment API----------------
const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderItems,
    totalAmount,
    shippingAddress,
    paymentMethod,
    paymentStatus,
    orderStatus,
  } = req.body;
  const userId = req.user?.id;
  if (!userId) throw new ApiError(401, "Unauthorized User");

  // Verify Razorpay signature
  // const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.RAZORPAY_SECRET)
  //   .update(body)
  //   .digest("hex");

  // if (expectedSignature !== razorpay_signature) {
  //   throw new ApiError(400, "Payment verification failed");
  // }

  // Save payment details
  const payment = await Payment.create({
    buyer: userId,
    orderItems,
    totalAmount,
    paymentMethod: "Online",
    paymentStatus: "paid",
    orderStatus: "order placed",
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  // Save order details (Only after payment is verified)
  const order = await Order.create({
    buyer: userId,
    orderItems,
    totalAmount,
    shippingAddress,
    paymentMethod: "Online",
    paymentStatus: "paid",
    orderStatus: "order placed",
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { payment, order, success: true }, "Payment verified and order placed successfully"
      )
    );
});

export { checkout, verifyPayment };
