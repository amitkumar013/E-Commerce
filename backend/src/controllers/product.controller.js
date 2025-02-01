import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../services/ApiResponse.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import {Category} from "../models/category.model.js";
import { User } from "../models/user.model.js";

//--------------------Create Product--------------------
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    sizes,
    bestSeller,
    cart,
    ratings,
    quantity,
    color,
    category,
    wishlist,
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

    // Convert category names to ObjectIds
    const categoryIds = await Category.find({ name: { $in: category } }, "_id");

    // if (!categoryIds.length) {
    //   throw new ApiError(400, "Invalid categories provided");
    // }
    
    const product = await Product.create({
      name,
      price: Number(price),
      description,
      sizes,
      ownerId: userId,
      cart,
      ratings,
      quantity,
      color: colorArray,
      category: categoryIds.map((cat) => cat._id), // Store category as ObjectIds
      wishlist,
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
//  [{"name": "blue", "hexCode": "#0000FF"},]

//--------------------Get All Products-------------------
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
    .limit(12)
    .sort({ createdAt: -1 })
    .populate("category", "name slug")
    .exec();

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
    throw new ApiError(400, "Product ID is required");
  }

  try {
    // Find the user and check if the cart exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Find if the product already exists in the cart
    const existingCartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1; // Increase quantity if product exists
    } else {
      user.cart.push({ productId, quantity: 1 }); // Add new product
    }

    await user.save();

    return res.json(
      new ApiResponse(200, user.cart, "Product added to cart successfully")
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
    throw new ApiError(400, "Product ID is required");
  }

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Find product in cart
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1; // Decrease quantity if more than 1
      } else {
        user.cart = user.cart.filter(
          (item) => item.productId.toString() !== productId
        ); // Remove product from cart
      }
    } else {
      throw new ApiError(404, "Product not found in cart");
    }

    await user.save();

    return res.json(
      new ApiResponse(200, user.cart, "Product removed from cart successfully")
    );
  } catch (error) {
    console.error("Remove from cart error:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

//--------------------Rating Product---------------------
const ratingProduct = asyncHandler(async (req, res) => {
  const { rating } = req.body;
  const productId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }

  if (!productId) {
    throw new ApiError(400, "Invalid product ID");
  }

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Check if the user has already rated the product
    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.userId.toString() === userId
    );

    if (existingRatingIndex !== -1) {
      // Update existing rating
      product.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add new rating
      product.ratings.push({ userId, rating });
    }

    // Recalculate average rating
    const totalRatings = product.ratings.length;
    const sumRatings = product.ratings.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = sumRatings / totalRatings;

    await product.save();

    return res.json(
      new ApiResponse(200, { product, avgRating }, "Product rating updated successfully")
    );
  } catch (error) {
    console.error("Error updating rating:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

//--------------------Add Wishlist-----------------------
const addToWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }

  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if the product is already in the user's wishlist
    const isProductInWishlist = user.wishlist.some(
      (item) => item.productId.toString() === productId
    );

    if (!isProductInWishlist) {
      user.wishlist.push({ productId });
      await user.save();
    } else {
      throw new ApiError(400, "Product is already in wishlist");
    }

    return res.json(
      new ApiResponse(200, user.wishlist, "Product added to wishlist successfully")
    );
  } catch (error) {
    console.error("Add to wishlist failed:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

//--------------------Remove from Wishlist------------------
const removeFromWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized User");
  }

  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  try {
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if the product exists in the wishlist
    const isProductInWishlist = user.wishlist.some(
      (item) => item.productId.toString() === productId
    );

    if (!isProductInWishlist) {
      throw new ApiError(400, "Product is not in the wishlist");
    }

    // Remove product from wishlist
    user.wishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    return res.json(
      new ApiResponse(200, user.wishlist, "Product removed from wishlist successfully")
    );
  } catch (error) {
    console.error("Remove from wishlist failed:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});


export {
  addProduct,
  getAllProducts,
  getProductById,
  addToCart,
  removeFromCart,
  ratingProduct,
  addToWishlist,
  removeFromWishlist,
};
