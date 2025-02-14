import { Router } from "express";
import { multerUpload } from "../middlewares/multer.middleware.js";
import {
    addProduct,
    addToCart,
    addToWishlist,
    getAllProducts,
    getHomeProducts,
    getProductById,
    getSingleAndRelatedProducts,
    ratingProduct,
    removeFromCart,
    removeFromWishlist
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

router.route("/").get(getAllProducts);
router.route("/home-products").get(getHomeProducts)
router.route("/related-products/:id").get(getSingleAndRelatedProducts)

router.route("/:id").get(getProductById);
router.route("/add-cart/:id").patch(verifyJWT, addToCart)
router.route("/remove-cart/:id").delete(verifyJWT, removeFromCart)
router.route("/rating/:id").patch(verifyJWT, ratingProduct)
router.route("/add-wishlist/:id").patch(verifyJWT, addToWishlist)
router.route("/remove-wishlist/:id").patch(verifyJWT, removeFromWishlist)

export default router;
