import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { ApiResponse } from "../services/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
 
//--------------------Order Placed------------------------
const orderPlaced = asyncHandler(async (req, res) => {
  const { orderItems, totalAmount, shippingAddress, paymentMethod } =
    req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  if (!Array.isArray(orderItems) || !orderItems.length) {
    throw new ApiError(400, "Order Items must be an array and cannot be empty");
  }
  if (typeof totalAmount !== "number" || totalAmount <= 0) {
    throw new ApiError(400, "Total Amount must be a valid number");
  }
  if (!shippingAddress || typeof shippingAddress !== "object") {
    throw new ApiError(400, "Shipping Address is required");
  }
  if (!paymentMethod) {
    throw new ApiError(400, "Payment Method is required");
  }

  try {
    console.log("User ID from Token:", userId);
    console.log("Order Items Data:", orderItems);
    console.log("Total Amount:", totalAmount);

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const order = new Order({
      orderItems,
      buyer: userId,
      shippingAddress,
      paymentMethod,
      totalAmount,
      orderStatus: "order placed",
      paymentStatus: "cash",
      date: Date.now(),
    });

    await order.save();
    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order placed successfully"));
  } catch (error) {
    console.log("Order Placement Error:", error);
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export {
  orderPlaced,
};
