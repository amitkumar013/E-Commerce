import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true},
    sizes: { type: Array, required: true },
    images: { type: Array, required: true },
    bestSeller: { type: Boolean },
    quantity: { type: Number, default: 1 },
    delivery: { type: String },
    brand: { type: String },
    stock: { type: String },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    colors: [
      {
        name: { type: String },
        hexCode: { type: String },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    sellerName: { type: String },

  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
