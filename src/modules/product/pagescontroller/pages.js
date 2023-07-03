import { productModel } from "../../../../DB/models/product/product.model.js";
import { asyncHandler } from "./../../../middleware/errorHandling.js";




// contact page
export const displayContact = asyncHandler(async (req, res, next) => {
  if (req.session?.product) {
    req.flash("isLogged", true);
  }
  return res.render("contact", {
    pageTitle: "Contact",
    css: "/shared/css/style.css",
    productInfo: req.product,
    isLogged: req.flash("isLogged")[0],
  });
});
// help page
export const displayHelp = asyncHandler(async (req, res, next) => {
  if (req.session?.product) {
    req.flash("isLogged", true);
  }
  return res.render("help", {
    pageTitle: "Help",
    css: "/shared/css/style.css",
    productInfo: req.product,
    isLogged: req.flash("isLogged")[0],
  });
});


// ==============productList
export const productList = asyncHandler(async (req, res, next) => {
  const products = await productModel.find({},{productId:1 ,description:1})
  if (req.session?.product) {
    req.flash("isLogged", true);
  }
  return res.render("productList", {
    pageTitle: "productList",
    css: "/shared/css/home.css",
    products,
    isLogged: req.flash("isLogged")[0],
  });
});