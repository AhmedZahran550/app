import { Router } from "express";
import * as controller from "./controller/product.controller.js";
import { adminSession, productToken } from "./../../middleware/authToken.js";

const router = Router();

router.get("/", controller.displayLoginPage);
router.post("/", controller.loginToDashboard);

router.get("/home", controller.displayHome);

router.post("/add", adminSession, controller.addProduct);
router.patch("/changPassword", productToken, controller.updateProductPassword);

export default router;
