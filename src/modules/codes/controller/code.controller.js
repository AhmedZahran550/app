import { asyncHandler } from "./../../../middleware/errorHandling.js";
import fs from "fs";
import { codeModel } from "../../../../DB/models/codes/code.model.js";
import cloudinary from "./../../../utils/Multer/cloudinary.js";

export const addCode = asyncHandler(async (req, res, next) => {
  const text = fs.readFileSync(req.file.path, "utf8").replace(/\r/g, "");
  if (!req.file) {
    return next(new Error("file is required"));
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file?.path,
    { folder: `files/${req.params?.productId}`, resource_type: "auto" }
  );
  
  let newCode = await codeModel.create({
    text,
    productId:req.params.productId,
    length: text?.length,
    description:req.body.description,
    path: { secure_url, public_id },
  });
  return res.json({ newCode });
});
