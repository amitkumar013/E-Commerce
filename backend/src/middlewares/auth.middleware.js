 import { ApiError } from "../services/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization, process.env.ACCESS_TOKEN_SECRET
    );
      
    req.user = decode;
      next();

  } catch (error) {
    throw new ApiError(401, "Unauthorized: Invalid token must be provided");
  }
};

export { verifyJWT };

