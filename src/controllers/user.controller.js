import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../services/ApiResponse.js";
import mongoose from "mongoose";


//--------------------Register User--------------------
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
  
    if ([userName, email, password].some((field) => !field?.trim())) {
      throw new ApiError(400, "All fields must be required");
    }
  
    const existedUser = await User.findOne({ email })
  
    if (existedUser) {
      throw new ApiError(409, "User already exists");
    }
  
    const user = await User.create({
      userName: userName.toLowerCase(),
      email,
      password,
    });
  
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong");
    }
  
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  });


  export { registerUser }