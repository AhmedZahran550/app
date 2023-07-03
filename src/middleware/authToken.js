import { asyncHandler } from "./errorHandling.js";
import { productModel } from "./../../DB/models/product/product.model.js";
import { adminModel } from './../../DB/models/admin/admin.model.js';


export const authSession = asyncHandler(async (req, res, next) => {
  if (!req.session?.product?._id) {
    req.flash("productIdError", "Session Expired pls login");
    return res.redirect("/login");
  }
  const product = await productModel.findById(req.session?.product?._id);
  if (!product) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }});
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
  const admin = await adminModel.findById(req.session?.admin?._id);
  if (!admin) {
    req.flash("emailError", "Admin on longer Exist");
    return res.redirect("/admin");
  }
  req.admin = admin ; 
    return next();
    
});


