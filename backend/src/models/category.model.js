import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    categoryType: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
