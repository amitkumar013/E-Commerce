import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../services/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  try {
    console.log("Creating token for user ID:", id);
    const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIR });
    console.log("Token created:", token);
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new ApiError(500, "Something went wrong while generating access token");
  }
};

//--------------------Register User--------------------
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, phone, role } = req.body;
  
    if (!userName) { 
      throw new ApiError(400, "Username is required");
    }
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    if (!password) {
      throw new ApiError(400, "Password is required");
    }
    if (!phone) {
      throw new ApiError(400, "Phone number is required");
    }
  
    const existedUser = await User.findOne({ email })
  
    if (existedUser) {
      throw new ApiError(409, "User already exists");
    }
  
    try {
      const user = await User.create({
        userName,
        email,
        password,
        phone,
        role: role || "user",
      });
    
      const createdUser = await User.findById(user.id).select(
        "-password "
      );
    
      if (!createdUser) {
        throw new ApiError(500, "Something went wrong");
      }
    
      return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"));
    } catch (error) {
      console.error("Registration error:", error);
      throw new ApiError(500, "Something went wrong");
    }
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
      throw new ApiError(404, "User does not exist");
    }
  
    try {
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        throw new ApiError(401, "Invalid user password");
      }
  
      const token = createToken(user._id)

      const loggedInUser = await User.findById(user._id).select(
        "-password"
      );
    
      return res
      .status(200)
      .json(new ApiResponse(200, {loggedInUser, token}, "User logged in successfully"));
      
    } catch (error) {
      console.error("Login error:", error);
      throw new ApiError(500, "Something went wrong");
    }
  });


export {
  registerUser, 
  loginUser 
};
