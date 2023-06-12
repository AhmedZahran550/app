import { asyncHandler } from "./../../../middleware/errorHandling.js";
import { productModel } from "./../../../../DB/models/product/product.model.js";
import { getCompered, getHashed } from "../../../utils/hashPassword.js";
import { codeModel } from './../../../../DB/models/codes/code.model.js';

// start of  login page
export const displayLoginPage = asyncHandler(async (req, res, next) => {
  if (req.session?.product) {
    return res.redirect("/home");
  } 
  return res.render("index", {
    pageTitle: "home page",
    css: "./shared/css/style.css",
    oldData: req.flash("oldData")[0],
    productIdError: req.flash("productIdError")[0],
    passwordError: req.flash("passwordError")[0],
    endSession: req.session.destroy(),
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
    return res.redirect("/");
  }
  if (!getCompered(password, product.password)) {
    req.flash("passwordError", "in-valid Product password");
    req.flash("oldData", req.body);
    return res.redirect("/");
  }

  req.session.product = {
    _id: product._id,
    productId: productId,
  };
  return res.redirect("/home");
});
// end of login page

// start of home page
export const displayHome = asyncHandler(async (req, res, next) => {
  return res.render("home", {
    pageTitle: "home page",
    css: "/shared/css/home.css",
  });
});


export const addProduct = asyncHandler(async (req, res, next) => {
  const { productId, password } = req.body;
  const product = await productModel.findOne({
    productId: productId.toLowerCase(),
  });
  if (product) {
    return next(new Error("Duplicated productId "));
  }
  const hash = getHashed(password);
  const newProduct = await productModel.create({
    productId: productId.toLowerCase(),
    password: hash,
    adminId: req.session?.admin?._id,
  });
  return res.json({ message: "created", newProduct });
});



export const updateProductPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const hash = getHashed(password);
  await productModel.updateOne({ _id: req.product._id }, { password: hash });
  return res.json({ message: "done" });
});



// logOut from the product home
export const Logout = asyncHandler(async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});



// change in the product parameters
export const changeParameters = asyncHandler(async (req, res, next) => {
      console.log(req.session.product);
      const {withCode} = req.query ; 
      const product = await productModel.findByIdAndUpdate(req.session.product._id ,req.query);
      return res.json({message:"done" ,product})
});