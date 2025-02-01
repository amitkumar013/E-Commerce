import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true,
    }

}, {timestamps: true})

export const Category = mongoose.model("Category", categorySchema);
