import { asyncHandler } from "./../../../middleware/errorHandling.js";
import fs from "fs";
import { codeModel } from "../../../../DB/models/codes/code.model.js";
import cloudinary from "./../../../utils/Multer/cloudinary.js";
import { productModel } from "./../../../../DB/models/product/product.model.js";

export const addCode = asyncHandler(async (req, res, next) => {
  const product =await productModel.findById(req.params.productId);
  if (!product) {
    return next(new Error("Invalid product Id "));
  }
  if (!req.file) {
    return next(new Error("file is required"));
  }
  const text = fs.readFileSync(req.file?.path, "utf8").replace(/\r/g, "");
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file?.path,
    { folder: `files/${req.params?.productId}`, resource_type: "auto" }
  );
  let newCode = await codeModel.create({
    text,
    productId: req.params.productId,
    length: text?.length,
    description: req.body.description,
    version: req.body.version,
    path: { secure_url, public_id },
  });
  if (!product.codeId) {
    product.codeId = newCode._id ;
  }
  return  res.redirect(`/admin/details/${req.params.productId}`);
});

// export const update = asyncHandler(async (req, res, next) => {
//   const { codeId } = req.params;
//   await productModel.updateOne(
//     { _id: req.product._id },
//     { codeId, restartWithCode: true }
//   );
//   req.flash("updating", true);
//   return res.redirect("/profile");
// });
