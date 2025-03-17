import { startSession } from "mongoose"
import { ApiResponse } from "../services/ApiResponse.js"
import { asyncHandler } from "../services/asyncHandler.js"

const healthCheck = asyncHandler(async (req, res) => {
     
    return res
    .status(200)
    .json(new ApiResponse(200, 
        {
            status: "OK",
            timestamp: new Date(),
            message: "Server is healthy"
        },  "Server is up and running"
    ))
        
})

export { healthCheck }