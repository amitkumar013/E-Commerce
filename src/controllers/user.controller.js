import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../services/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const createToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET)
}


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

    const token = createToken(user._id)
  
    const createdUser = await User.findById(user._id).select(
      "-password "
    );
  
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong");
    }
  
    return res
      .status(201)
      .json(new ApiResponse(200, {createdUser, token}, "User registered successfully"));
  });

//-------------------Login User------------------------
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    if (!password) {
      throw new ApiError(400, "Password is required");
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    try {
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
      }
  
      const token = createToken(user._id)
    
      return res
      .status(200)
      .json(new ApiResponse(200, {user, token}, "User logged in successfully"));
      
    } catch (error) {
      throw new ApiError(500, "Something went wrong");
    }
  });


export {
  registerUser, 
  loginUser 
};
