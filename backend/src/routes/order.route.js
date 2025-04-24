import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getAllOrdersDetail, 
    getOrderDetail, 
    orderPlaced, 
    updateOrderStatus 
} from "../controllers/order.controller.js";

const router = Router();
router.use(verifyJWT)

router.route("/cod-checkout").post(orderPlaced);
router.route("/get-order").get(getOrderDetail);
router.route("/get-all-orders").get(getAllOrdersDetail);
router.route("/update-order-status/:orderId").patch(updateOrderStatus);

 
export default router;
