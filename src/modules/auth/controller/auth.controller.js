import { adminModel } from "../../../../DB/models/admin/admin.model.js";
import { getCompered, getHashed } from "../../../utils/hashPassword.js";
import { asyncHandler } from "./../../../middleware/errorHandling.js";
import jwt from "jsonwebtoken";

export const addAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email });
  if (admin) {
    return next(new Error("Admin already Exist", { cause: 404 }));
  }
  const hash = getHashed(password);
  const newAdmin = await adminModel.create({ email, password: hash });
  return res.json({ message: "done ", newAdmin });
});



export const displayLoginPage = asyncHandler(async (req, res, next) => {
  return res.render("adminLogin", {
    pageTitle: "Admin Login",
    css: "/shared/css/admin.css",
    oldData: req.flash("oldData")[0],
    emailError: req.flash("emailError")[0],
    passwordError: req.flash("passwordError")[0],
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email });
  if (!admin) {
    req.flash("oldData", req.body);
    req.flash("emailError" , "Email not exist");
    return res.redirect('/admin');
  }
  if (!getCompered(password, admin.password)) {
    req.flash("oldData", req.body);
    req.flash("passwordError" , "wrong Password");
    return res.redirect('/admin');
  }
 req.session.admin={
  _id:admin._id,
  email:admin.email
 }
  return res.redirect("/admin/home");
});

  
export const displayAdminHome = asyncHandler(async (req, res, next) => {
  return res.render("adminHome", {
    pageTitle: "Admin Home",
    css: "/shared/css/adminHome.css",
  });
});