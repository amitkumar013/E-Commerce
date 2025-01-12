import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createCategories, 
    deleteCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory
} from "../controllers/category.controller.js";

const router = Router();
router.use(verifyJWT)

router.route("/create-category").post(createCategories)
router.route("/get-all-category").get(getAllCategories)
router.route("/get-single-category/:slug").get(getCategoryById)
router.route("/update-category/:id").patch(updateCategory)
router.route("/delete-category/:id").delete(deleteCategory)

export default router;
