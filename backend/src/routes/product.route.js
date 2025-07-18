import { Router } from "express";
import { multerUpload } from "../middlewares/multer.middleware.js";
import {
    addProduct,
    addToCart,
    addToWishlist,
    getAllProducts,
    getHomeProducts,
    getProductById,
    getSimilarProducts,
    getSingleAndRelatedProducts,
    ratingProduct,
    removeFromCart,
    removeFromWishlist,
    searchProducts
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(verifyJWT,
    multerUpload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]),
    addProduct
)
router.route("/all-products").get(getAllProducts);
router.route("/home-products").get(getHomeProducts)
router.route("/related-products/:id").get(getSingleAndRelatedProducts)
router.route("/similar-products/:pid/:cid").get(getSimilarProducts)

router.route("/single-product/:id").get(getProductById);
router.route("/add-cart/:id").patch(verifyJWT, addToCart)
router.route("/remove-cart/:id").delete(verifyJWT, removeFromCart)
router.route("/rating/:id").patch(verifyJWT, ratingProduct)
router.route("/add-wishlist/:id").patch(verifyJWT, addToWishlist)
router.route("/remove-wishlist/:id").patch(verifyJWT, removeFromWishlist)
router.route("/search/:keyword").get(searchProducts)


export default router;
