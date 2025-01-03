import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

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


export const User= mongoose.model("User", userSchema);
