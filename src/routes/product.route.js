import { Router } from "express";
import { multerUpload } from "../middlewares/multer.middleware.js";
import {
    addProduct,
    addToCart,
    getAllProducts,
    getProductById,
    removeFromCart
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
router.route("/:id").get(getProductById);
router.route("/add-cart/:id").patch(verifyJWT, addToCart)
router.route("/remove-cart/:id").delete(verifyJWT, removeFromCart)

export default router;
