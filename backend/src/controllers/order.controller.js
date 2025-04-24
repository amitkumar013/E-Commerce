import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { ApiResponse } from "../services/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
 
//--------------------Order Placed-----------------------
const orderPlaced = asyncHandler(async (req, res) => {
  const { orderItems, totalAmount, shippingAddress, paymentMethod } = req.body;
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
      orderStatus: "Order placed",
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

//--------------------Get User Order Detail--------------
const getOrderDetail = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  try {
    const orders = await Order.find({ buyer: userId })
    .populate("buyer", "userName")
    .populate("orderItems.product")
    .sort({ date: -1 });

    if (!orders.length) {
      throw new ApiError(404, "No orders found for this user");
    }
    return res.json(new ApiResponse(200, orders, "Order Details fetched successfully"));
    
  } catch (error) {
    console.log("Order Detail Error:", error);
    throw new ApiError(500, error.message || "Something went wrong");
  }
})

//--------------------Get All Orders Detail--------------
const getAllOrdersDetail = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  try {
    const orders = await Order.find({})
    .populate("buyer", "userName")
    .populate("orderItems.product")
    .sort({ date: -1 });

    if (!orders.length) {
      throw new ApiError(404, "No orders found");
    }
    return res.json(new ApiResponse(200, orders, "All Order Details fetched successfully"));
    
  } catch (error) {
    console.log("Order Detail Error:", error);
    throw new ApiError(500, error.message || "Something went wrong");
  }
})

//--------------------Update Order Status----------------
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const userId = req.user?.id;
  
    if (!userId) {
      throw new ApiError(401, "Unauthorized User");
    }
    if (!orderId) {
      throw new ApiError(400, "Order ID is required");
    }
    if (!status) {
      throw new ApiError(400, "Status is required");
    }
  
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
        { new: true}
      );

      if (!order) {
        throw new ApiError(404, "Order not found");
      }
      return res.json(new ApiResponse(200, order, "Order status updated successfully"));
      
    } catch (error) {
      console.log("Update Order Status Error:", error);
      throw new ApiError(500, error.message || "Something went wrong");
    }
  })

export {
  orderPlaced,
  getOrderDetail,
  getAllOrdersDetail,
  updateOrderStatus,
};
