import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema (
    {
        userName: {
            type: String,
            required: true,
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
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            unique: [true, 'Phone number already exists'],
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        cart: [
            {
              productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
              quantity: { type: Number, default: 1 },
            },
        ],
        wishlist: [
            {
              productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}
            }
          ]
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


export const User= mongoose.model("User", userSchema);
