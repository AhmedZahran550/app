import { asyncHandler } from "./../../../middleware/errorHandling.js";
import fs from "fs";
import { codeModel } from "../../../../DB/models/codes/code.model.js";



export const addCode = asyncHandler(async (req, res, next) => {
  const text = fs.readFileSync(req.file.path, "utf8").replace(/\r/g, '');
  const newCode = await codeModel.create({
    text,
    productId: req.params.productId,
    length: text?.length,
    fileUrl: req.file.url,
  });
  return res.json({ newCode });
});
