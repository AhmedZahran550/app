import { asyncHandler } from "./errorHandling.js";
import { productModel } from "./../../DB/models/product/product.model.js";


export const authSession = asyncHandler(async (req, res, next) => {
  if (!req.session?.product?._id) {
    req.flash("productIdError", "Session Expired pls login");
    return res.redirect("/login");
  }
  const product = await productModel.findById(req.session?.product?._id);
  if (!product) {
    req.flash("productIdError", "In-valid product Id ");
    return res.redirect("/login");
  }
  req.product = product 
  return next();
});


export const adminSession = asyncHandler(async (req, res, next) => {
  if (!req.session?.admin?._id) {
    req.flash("emailError", "Session Expired pls login");
    return res.redirect("/admin");
  } 
  req.admin = admin ; 
    return next();
  
});


