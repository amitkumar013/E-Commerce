import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkout, verifyPayment } from "../controllers/payment.controller.js";
 

const router = Router();
router.use(verifyJWT)


router.route("/razorpay-checkout").post(checkout)
router.route("/verify-payment").post(verifyPayment)
 
export default router;
