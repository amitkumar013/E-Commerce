import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../services/ApiResponse.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import { User } from "../models/user.model.js";
import { Category } from "../models/category.model.js";
import mongoose from "mongoose";

//--------------------Create Product--------------------
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    discountPrice,
    discountPercentage,
    description,
    bestSeller,
    cart,
    ratings,
    quantity,
    delivery,
    brand,
    sizes,
    colors,
    category,
    wishlist,
    stock,
    sellerName,
  } = req.body;

  if (
    !name ||
    !price ||
    !discountPrice ||
    !discountPercentage ||
    !description ||
    !colors ||
    !sizes
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (!category) {
    throw new ApiError(400, "Category is required");
  }

  const categoryId = await Category.findById(category);
  if (!categoryId) {
    throw new ApiError(404, "Invalid category selected");
  }

  // Parse colors and sizes correctly
  const colorArray = JSON.parse(colors || "[]").map((colorName) => ({
    name: colorName.trim(),
    hexCode: "",
  }));
  const parsedSizes = JSON.parse(sizes || "[]");

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

  const product = await Product.create({
    name,
    price: Number(price),
    discountPrice: Number(discountPrice),
    discountPercentage: Number(discountPercentage),
    description,
    sizes: parsedSizes,
    ownerId: req.user?.id,
    cart,
    ratings,
    quantity,
    colors: colorArray,
    category: categoryId._id,
    wishlist,
    delivery,
    brand,
    stock,
    sellerName: req.user?.userName,
    bestSeller: bestSeller === "true",
    images: imageUploadResults.map((result) => result.url),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

//--------------------Get All Products-------------------
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(12)
      .sort({ createdAt: -1 })
      .populate("category", "name slug categoryType")
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
  const { rating, comment } = req.body;
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
    const user = await User.findById(userId).select("userName");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Check if the user has already rated the product
    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.userId.toString() === userId
    );

    if (existingRatingIndex !== -1) {
      product.ratings[existingRatingIndex].rating = rating;
      product.ratings[existingRatingIndex].comment = comment;
      product.ratings[existingRatingIndex].userName = user.userName;
      product.ratings[existingRatingIndex].date = new Date();
    } else {
      product.ratings.push({ 
        userId, 
        rating,
        comment,
        userName: user.userName,
        date: new Date(), 
      });
    }
    await product.save();

    return res.json(
      new ApiResponse(
        200,
        { product },
        "Product rating updated successfully"
      )
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
      new ApiResponse(
        200,
        user.wishlist,
        "Product added to wishlist successfully"
      )
    );
  } catch (error) {
    console.error("Add to wishlist failed:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

//--------------------Remove from Wishlist---------------
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
      new ApiResponse(
        200,
        user.wishlist,
        "Product removed from wishlist successfully"
      )
    );
  } catch (error) {
    console.error("Remove from wishlist failed:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

//--------------------Get Home page products-------------
const getHomeProducts = asyncHandler(async (req, res) => {
  try {
    // Trending and Best Seller Products
    const trendingProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("category")
      .lean();
    const bestSellerProducts = await Product.find({ bestSeller: true })
      .limit(8)
      .populate("category")
      .lean();

    // Category-wise products fetching manually
    const shoesCategory = await Category.findOne({ name: "shoes" }).lean();
    const sareeCategory = await Category.findOne({ name: "saree" }).lean();
    const mobileCategory = await Category.findOne({ name: "mobile" }).lean();

    const shoesProducts = shoesCategory
      ? await Product.find({ category: shoesCategory._id })
          //.where({ name: "Shoes" })
          .sort({createdAt: -1})
          .limit(8)
          .populate("category")
          .lean()
      : [];
    const sareeProducts = sareeCategory
      ? await Product.find({ category: sareeCategory._id })
          .sort({createdAt: -1})
          .limit(8)
          .populate("category")
          .lean()
      : [];
    const mobileProducts = mobileCategory
      ? await Product.find({ category: mobileCategory._id })
          .sort({ createdAt: -1 })
          .limit(8)
          .populate("category")
          .lean()
      : [];

    console.log("TotalTranding:"+ trendingProducts.length)
    console.log("TotalBestSeller:"+ bestSellerProducts.length)
    console.log("TotalShoes:"+ shoesProducts.length)
    console.log("TotalSaree:"+ sareeProducts.length)
    console.log("TotalMobile:"+ mobileProducts.length)

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          trendingProducts,
          bestSellerProducts,
          shoesProducts,
          sareeProducts,
          mobileProducts,
        },
        "Home products fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

//--------------Get single and Related products-----------
const getSingleAndRelatedProducts = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }
  console.log("Received Product ID:", productId); // Debugging

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    console.error("Invalid product ID:", productId); // Debugging
    throw new ApiError(400, "Invalid product ID");
  }

  try {
    // Fetch the single product
    const product = await Product.findById(productId).lean();
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Ensure the product has a category before querying related products
    let relatedProducts = [];
    if (product.category) {
      relatedProducts = await Product.find({
        category: product.category,
        _id: { $ne: productId }, // Exclude the current product
      })
        .limit(12)
        .lean();
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalRelatedProducts: relatedProducts.length,
          product,
          relatedProducts,
        },
        "Products fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw new ApiError(500, `Something went wrong: ${error.message}`);
  }
});

//--------------------Get Similar Products ---------------
const getSimilarProducts = asyncHandler(async (req, res) => {
  const { pid: productId, cid: categoryId } = req.params;
  
  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  const products = await Product.find({
    category: categoryId,
    _id: { $ne: productId },
  })
  .limit(8)
  .populate("category")
  .lean();
  
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalSimilarProducts: products.length,
        similarProducts: products,
      },
      "Similar products fetched successfully"
    )
  );

});

export {
  addProduct,
  getAllProducts,
  getHomeProducts,
  getSingleAndRelatedProducts,
  getProductById,
  addToCart,
  removeFromCart,
  ratingProduct,
  addToWishlist,
  removeFromWishlist,
  getSimilarProducts,
};
