import { productModel } from "../../../../DB/models/product/product.model.js";
import { asyncHandler } from "../../../middleware/errorHandling.js";
import { genToken } from "../../../utils/generateToken.js";
import { getCompered } from "../../../utils/hashPassword.js";



// login API 
export const login = asyncHandler(async (req, res, next) => {
    const { productId, password } = req.body;
    const product = await productModel.findOne({ productId:productId.toLowerCase() });
    if (!product) {
      return next(new Error("in-valid product Id" ,  {cause:404}));
    }
    if (!getCompered(password, product.password)) {
      return next(new Error("in-valid password" ,  {cause:409}));
    }
    const token = genToken({data:{id:product._id ,productId} , signature:process.env.TOKEN_SIGNATURE})
    return res.json({message:"done" , token});
  });