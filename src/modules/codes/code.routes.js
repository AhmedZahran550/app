import { Router } from "express";
import { cloudUpload } from "../../utils/Multer/cloud.multer.js";
import { DataTypes, uploadFile } from "../../utils/Multer/multer.local.js";
import * as controller from "./controller/code.controller.js";

const router = Router();

router.post(
  "/:productId/add",
  cloudUpload(DataTypes.file).single("code"),
  controller.addCode
);

export default router;
