import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getOrderDetail, orderPlaced } from "../controllers/order.controller.js";

const router = Router();
router.use(verifyJWT)

router.route("/cod-checkout").post(orderPlaced);
router.route("/get-order").get(getOrderDetail);

 
export default router;
