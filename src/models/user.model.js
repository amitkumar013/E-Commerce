import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const validator = require("validator");

const userSchema = new mongoose.Schema (
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exists'],
            validate: validator.default.isEmail,
            
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        avatar: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
 
)

userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
  });

  userSchema.methods.isPasswordCorrected = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
  }

  userSchema.methods.generateAccessToken= async function(){
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
  }

  userSchema.methods.generateRefreshToken= async function(){
    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
  }


export const User= mongoose.model("User", userSchema);
