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
    rating: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    color: [
      {
        name: { type: String },
        hexCode: { type: String }
      }
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
      }
    ],
    // wishlist: [
    //   {
    //     productId: {
    //       type: mongoose.Schema.Types.ObjectId, 
    //       ref: 'Product' 
    //     }
    //   }
    // ]
  }, {timestamps: true}
   
);

export const Product = mongoose.model("Product", productSchema);
