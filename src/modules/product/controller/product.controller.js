import { asyncHandler } from "./../../../middleware/errorHandling.js";
import { productModel } from "./../../../../DB/models/product/product.model.js";
import { getCompered, getHashed } from "../../../utils/hashPassword.js";
import { codeModel } from './../../../../DB/models/codes/code.model.js';







// start of home page
export const displayHome = asyncHandler(async (req, res, next) => {
  if (req.session?.product) {
    req.flash("isLogged", true)
  }
  return res.render("home", {
    pageTitle: "home page",
    css: "/shared/css/home.css",
    isLogged:req.flash("isLogged")[0],
  });
});



// start of  login page
export const displayLoginPage = asyncHandler(async (req, res, next) => {
  if (req.session?.product) {
    res.redirect("/")
  }
  return res.render("index", {
    pageTitle: "home page",
    css: "./shared/css/style.css",
    oldData: req.flash("oldData")[0],
    productIdError: req.flash("productIdError")[0],
    passwordError: req.flash("passwordError")[0],
  });
});


export const loginToDashboard = asyncHandler(async (req, res, next) => {
  const { productId, password } = req.body;
  const product = await productModel.findOne({
    productId: productId.toLowerCase(),
  });
  if (!product) {
    req.flash("productIdError", "in-valid Product ID");
    req.flash("oldData", req.body);
    return res.redirect("/login");
  }
  if (!getCompered(password, product.password)) {
    req.flash("passwordError", "in-valid Product password");
    req.flash("oldData", req.body);
    return res.redirect("/login");
  }
  req.flash("productInfo",
     {
     id: product._id,
      productId, 
      codeId: product.codeId,
      isRefresh : product.refresh,
      isClose : product.close ,
      isRestart: product.restart
      }
    );

  req.session.product = {
    _id: product._id,
    productId: productId,
  };
  return res.redirect("/profile");
});
// end of login page




// start of profile page
export const displayProfile = asyncHandler(async (req, res, next) => {
  return res.render("profile", {
    pageTitle: "profile",
    css: "/shared/css/home.css", 
    productInfo: req.flash("productInfo")[0],
    isLogged:true 
  });
});


// change in the product parameters
export const changeParameters = asyncHandler(async (req, res, next) => {
  const product = await productModel.findByIdAndUpdate(req.session.product._id, req.query);
  return res.json({ message: "done", product });
});



// ==============productList
export const productList = asyncHandler(async (req, res, next) => {
  if (req.session?.product) {
    req.flash("isLogged", true)
  }
  return res.render("productList", {
    pageTitle: "productList",
    css: "/shared/css/home.css", 
    products: req.flash("products")[0],
    isLogged: req.flash("isLogged")[0]
  });
});




export const updateProductPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const hash = getHashed(password);
  await productModel.updateOne({ _id: req.product._id }, { password: hash });
  return res.json({ message: "done" });
});



// logOut from the product profile
export const Logout = asyncHandler(async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});



