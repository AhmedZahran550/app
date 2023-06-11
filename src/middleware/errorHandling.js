


export const asyncHandler = (fn)=>{
    return (req,res,next)=>{
        return fn(req,res,next).catch((error)=>{
            return next(new Error(error , {cause:500}));
        })
    }
};


export const globalError = (err ,req,res,next)=>{
        if (err) {
            return res.status(err.cause || 500).json({message:err.message , Error:err , stack :err.stack})
        }
}