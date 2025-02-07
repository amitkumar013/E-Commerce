import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    bestSeller: {
      type: Boolean,
    },
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    quantity: {
      type: Number,
      default: 1,
    },
    discount: { type: String },
    delivery: { type: String },
    brand: { type: String },
    colors: [
      {
        name: { type: String },
        hexCode: { type: String },
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
