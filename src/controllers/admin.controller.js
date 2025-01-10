import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../services/ApiResponse.js";
import { Product } from "../models/product.model.js";

//--------------------Get User Details--------------------
const getAdminDetails = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ApiError(404, "Admin user not found");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, user));
});

//--------------------Get Admin All Products--------------
const getAdminProducts = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  try {
    const products = await Product.find({ ownerId: userId });
    return res.json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
});

//--------------------Get Admin ProductByID----------------
const getAdminProductById = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const productId = req.params.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  if (!productId) {
    throw new ApiError(400, "Product is not available");
  }
  try {
    const product = await Product.findOne({ _id: productId, ownerId: userId });
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return res.json(new ApiResponse(200, product, "Product fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error.message);
  }
});

//--------------------Update Admin Product-----------------
const updateAdminProduct = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const productId = req.params.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  if (!productId) {
    throw new ApiError(400, "Product is not available");
  }
  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId, ownerId: userId },
      req.body,
      { new: true }
    );
    if (!product) {
      throw new ApiError(404, "Product not update try again");
    }
    return res.json(new ApiResponse(200, product, "Product updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error.message);
  }
});

//--------------------Delete Admin Product-----------------
const deleteAdminProduct = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const productId = req.params.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  if (!productId) {
    throw new ApiError(400, "Product is not available");
  }
  try {
    const product = await Product.findOneAndDelete({ _id: productId, ownerId: userId });
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return res.json(new ApiResponse(200, product, "Product deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error.message);
  }
});


export {
    getAdminDetails,
    getAdminProducts,
    getAdminProductById,
    updateAdminProduct,
    deleteAdminProduct,
};
