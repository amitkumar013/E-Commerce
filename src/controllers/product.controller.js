import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../services/ApiResponse.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";

//--------------------Create Product--------------------
const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, subCategory, sizes, bestSeller } =
    req.body;
  try {
    if (!name || !price || !description || !category || !sizes) {
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

    const imageUploadPromises = images.map((image) => uploadOnCloudinary(image.path));
    const imageUploadResults = await Promise.all(imageUploadPromises);

    const product = await Product.create({
      name,
      price: Number(price),
      description,
      category,
      subCategory,
      sizes,
      bestSeller: bestSeller === "true" ? true : false,
      images: imageUploadResults.map((result) => result.url),
      date: Date.now(),
    });

    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product created successfully"));
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

export { addProduct };
