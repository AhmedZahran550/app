import { Router } from "express";
import { cloudUpload } from "../../utils/Multer/cloud.multer.js";
import { DataTypes } from "../../utils/Multer/multer.local.js";
import * as controller from "./controller/code.controller.js";
import { authSession } from "./../../middleware/authToken.js";

const router = Router();

router.post(
  "/:productId/add",
  cloudUpload(DataTypes.file).single("code"),
  controller.addCode
);

router.get("/:codeId/update", authSession, controller.update);

export default router;
