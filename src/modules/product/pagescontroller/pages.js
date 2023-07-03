
import { asyncHandler } from './../../../middleware/errorHandling.js';

// contact page 
export const displayContact = asyncHandler(async (req, res, next) => {
    if (req.session?.product) {
        req.flash("isLogged", true);
      }
    return res.render("contact", {
      pageTitle: "Contact",
      css: "/shared/css/style.css",
      productInfo: req.product,
      isLogged:req.flash("isLogged")[0],
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
      isLogged:req.flash("isLogged")[0],
    });
  });