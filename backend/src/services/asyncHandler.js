
// const asyncHandler = (requestHandler) => async(req, res, next)=> {
//     try {
//        return await requestHandler(req, res, next);
//     }
//     catch(error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: err.message
//         });
//     }
// }

 
const asyncHandler = (fn)=> {
    return (req, res, next)=> {
        Promise.resolve(fn (req, res, next)).catch(
        (err) => next(err));
    }
}

export {asyncHandler}
