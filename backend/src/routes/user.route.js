import {Router} from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { 
    loginUser,
    registerUser,
    updateProfileDetails
} from '../controllers/user.controller.js';

const router= Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/update-profile").patch(verifyJWT, updateProfileDetails)

export default router;