// import { ApiError } from "../services/ApiError.js";
// import jwt from "jsonwebtoken";

// const verifyJWT = async (req, res, next) => {
//   try {
//     const decode = jwt.verify(
//       req.headers.authorization, process.env.ACCESS_TOKEN_SECRET
//     );
      
//     req.user = decode;
//       next();

//   } catch (error) {
//     throw new ApiError(401, "Unauthorized: Invalid token must be provided");
//   }
// };

// export { verifyJWT };



import { ApiError } from "../services/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1]; 
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    req.user = decode;
    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    next(new ApiError(401, "Unauthorized: Invalid token"));
  }
};

export { verifyJWT };
