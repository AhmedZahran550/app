import { Router } from "express";
import { DataTypes, uploadFile } from "../../utils/Multer/multer.local.js";
import * as controller from "./controller/code.controller.js";

const router = Router();

router.post(
  "/:productId/add",
  uploadFile({ customPath: "codes", CustomDataType: DataTypes.file }).single(
    "code"
  ),
  controller.addCode
);

export default router;
