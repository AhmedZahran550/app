import { Router } from "express";
import * as controller from "./controller/product.controller.js";
import { adminSession, authSession, productToken } from "./../../middleware/authToken.js";

const router = Router();

router.get("/", controller.displayLoginPage);
router.post("/", controller.loginToDashboard);

router.get("/home", authSession , controller.displayHome);
 
router.post("/add", adminSession, controller.addProduct);
router.patch("/changPassword", productToken, controller.updateProductPassword);

// logout 
router.get("/logout", authSession , controller.Logout);


// change parameters
router.get("/param",authSession,controller.changeParameters)


export default router;
