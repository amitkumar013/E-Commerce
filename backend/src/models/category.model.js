import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
    },
    categoryType: {
      type: String,
      required: true,
      lowercase: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
