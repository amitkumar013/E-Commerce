import { Router } from "express";
import { multerUpload } from "../middlewares/multer.middleware.js";
import { addProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/add").post(
    multerUpload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]),
    addProduct
)

export default router;
