import { Router } from "express";
import { adminSession } from "../../middleware/authToken.js";
import * as controller from "./controller/auth.controller.js";

const router = Router();

router.get("/", controller.displayLoginPage);
router.post("/", controller.login);

router.get("/home", adminSession, controller.displayAdminHome);

router.get("/details/:id", adminSession, controller.displayProductDetails);
 
router.get("/:codeId/edit", adminSession, controller.displayProductDetails);

router.get(
  "/:productId/delete/:codeId",
  adminSession,
  controller.deleteCode
);

router.post("/admin", controller.addAdmin);

router.post("/product/add", adminSession, controller.addProduct);

export default router;
