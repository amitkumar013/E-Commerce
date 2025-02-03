import { Category } from "../models/category.model.js";
import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { ApiResponse } from "../services/ApiResponse.js";
import slugify from "slugify";

//---------------------Create a new category----------------
const createCategories = asyncHandler(async (req, res)=> {
    const { name } = req.body;
    const ownerId = req.user?.id;
    if (!ownerId) {
        throw new ApiError(401, "Unauthorized User");
    }
    if (!name) {
        throw new ApiError(400, "Category Name is required");
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        throw new ApiError(400, "Category already exists");
    }

    try {
    const newCategory = new Category({
        name: name,
        slug: slugify(name, { lower: true }),
    });
    await newCategory.save();
    return res
    .status(201)
    .json(new ApiResponse(201, newCategory, "Category created successfully"));
        
    } catch (error) {
        throw new ApiError(500, error.message)      
    }
})

//---------------------Get All Categories-------------------
const getAllCategories = asyncHandler(async (req, res)=> {
    const ownerId = req.user?.id;
    if (!ownerId) {
        throw new ApiError(401, "Unauthorized User");
    }
    try {
        const category = await Category.find({});
        return res
        .status(200)
        .json(new ApiResponse(200, category, "Categories fetched successfully"));
        
    } catch (error) {
        throw new ApiError(500, error.message)      
    }
})

//---------------------Get a single category----------------
const getCategoryById = asyncHandler(async (req, res)=> {
    const ownerId = req.user?.id;
    const slug = req.params?.slug;
    if (!ownerId) {
        throw new ApiError(401, "Unauthorized User");
    }
    if (!slug) {
        throw new ApiError(400, "Category is required");
    }
    try {
        const category = await Category.findOne({slug});
        if (!category) {
            throw new ApiError(404, "Category not found");
        }
        //console.log(`Category found: ${JSON.stringify(category)}`);
        return res
       .status(200)
       .json(new ApiResponse(200, category, "Category fetched successfully"));
        
    } catch (error) {
        console.error(`Error fetching category: ${error.message}`);
        throw new ApiError(500, error.message)      
    }
})

//---------------------Update a category--------------------
const updateCategory = asyncHandler(async (req, res)=> {
    const { name } = req.body;
    const ownerId = req.user?.id;
    const categoryId = req.params.id;
    if (!ownerId) {
        throw new ApiError(401, "Unauthorized User");
    }
    if (!categoryId) {
        throw new ApiError(400, "Category ID is required");
    }
    if (!name) {
        throw new ApiError(400, "Category Name is required");
    }
   try {
     const category = await Category.findByIdAndUpdate(
         categoryId,
         { name: name, slug: slugify(name, { lower: true }) },
         { new: true }
     );
     if (!category) {
         throw new ApiError(404, "Category not found");
     }
     return res
     .status(200)
     .json(new ApiResponse(200, category, "Category updated successfully"));
     
   } catch (error) {
    throw new ApiError(500, error.message)
   }
})

//---------------------Delete a category--------------------
const deleteCategory = asyncHandler(async (req, res)=> {
    const ownerId = req.user?.id;
    const categoryId = req.params.id;
    if (!ownerId) {
        throw new ApiError(401, "Unauthorized User");
    }
    if (!categoryId) {
        throw new ApiError(400, "Category ID is required");
    }
    try {
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            throw new ApiError(404, "Category not found");
        }
        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Category deleted successfully"));
        
    } catch (error) {
        throw new ApiError(500, error.message)      
    }
})

export {
    createCategories,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}
