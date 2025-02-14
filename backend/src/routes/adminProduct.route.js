import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    deleteAdminProduct,
    getAdminDetails, 
    getAdminProductById, 
    getAdminProducts, 
    updateAdminProduct
} from "../controllers/adminProduct.controller.js";

const router = Router();
router.use(verifyJWT)


router.route("/admin-user").get(getAdminDetails)
router.route("/get-admin-products").get(getAdminProducts)
router.route("/get-admin-product/:id").get(getAdminProductById)
router.route("/update-product/:id").patch(updateAdminProduct)
router.route("/delete-product/:id").delete(deleteAdminProduct)

export default router;
