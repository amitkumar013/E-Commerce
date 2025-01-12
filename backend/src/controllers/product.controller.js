import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../services/ApiResponse.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import {Category} from "../models/category.model.js";

//--------------------Create Product--------------------
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    sizes,
    bestSeller,
    cart,
    rating,
    quantity,
    color,
    category,
  } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  try {
    if (!name || !price || !description || !sizes || !color) {
      throw new ApiError(400, "All fields are required");
    }
    if (isNaN(price) || price <= 0) {
      throw new ApiError(400, "Price must be a positive number");
    }

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    if (!image1) {
      throw new ApiError(400, "Image is required");
    }

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imageUploadPromises = images.map((image) =>
      uploadOnCloudinary(image.path)
    );
    const imageUploadResults = await Promise.all(imageUploadPromises);

    const colorArray = color.split(",").map((colorName) => ({
      name: colorName.trim(),
      hexCode: "", // Add hexCode if available or set it to an empty string
    }));

    const product = await Product.create({
      name,
      price: Number(price),
      description,
      sizes,
      ownerId: userId,
      cart,
      rating,
      quantity,
      color: colorArray,
      category,
      bestSeller: bestSeller === "true" ? true : false,
      images: imageUploadResults.map((result) => result.url),
    });

    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product created successfully"));
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});
//  [{"name": "blue", "hexCode": "#0000FF"}, {"name": "light blue", "hexCode": "#ADD8E6"}]

//--------------------Get All Products-------------------
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
    .limit(12)
    .sort({ createdAt: -1 })
    .populate('category');

    if (!products) {
      throw new ApiError(404, "No products found");
    }
    return res.status(200).send({
      totalCount: products.length,
      products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
});

//--------------------Get Single Product-----------------
const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  //console.log("productId: " + productId)

  if (!productId) {
    throw new ApiError(400, "Product not found");
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return res.json(
      new ApiResponse(200, product, "Product fetched successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error.message);
  }
});

//--------------------Add to Cart Item-------------------
const addToCart = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }

  if (!productId) {
    throw new ApiError(400, "Product not found");
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const isProductInCart = product.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (isProductInCart) {
      isProductInCart.quantity += 1;
    } else {
      product.cart.push({ productId, quantity: 1 });
    }

    await product.save();

    return res.json(
      new ApiResponse(200, product, "Product added to cart successfully")
    );
  } catch (error) {
    console.error("Add to cart error:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

//--------------------Remove to Cart Item----------------
const removeFromCart = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }
  if (!productId) {
    throw new ApiError(400, "Product not found");
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const isProductInCart = product.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (isProductInCart) {
      if (isProductInCart.quantity > 1) {
        isProductInCart.quantity -= 1;
      } else {
        product.cart = product.cart.filter(
          (item) => item.productId.toString() !== productId
        );
      }
    }
    await product.save();
    return res.json(
      new ApiResponse(200, product, "Product removed from cart successfully")
    );
  } catch (error) {
    console.error("Remove from cart error:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

//--------------------Rating Product---------------------
const ratingProduct = asyncHandler(async (req, res) => {
  try {
    const { rating } = req.body;
    const productId = req.params.id;
    if (!productId) {
      throw new ApiError(400, "Invalid product id");
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { rating },
      { new: true }
    );
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return res.json(
      new ApiResponse(200, product, "Product rating updated successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error.message);
  }
});

export {
  addProduct,
  getAllProducts,
  getProductById,
  addToCart,
  removeFromCart,
  ratingProduct,
};
