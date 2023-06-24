import { Router } from "express";
import * as controller from "./controller/product.controller.js";
import {authSession } from "./../../middleware/authToken.js";

const router = Router();


//================display home
router.get("/" , controller.displayHome);



//================login======
router.get("/login", controller.displayLoginPage);
router.post("/login", controller.loginToDashboard);

 
//===============displayProfile
router.get("/profile",authSession,controller.displayProfile)



//===============Product Options 
router.get("/options",authSession,controller.displayOptions)
router.post("/options",authSession,controller.changeOptions);


router.patch("/changPassword", authSession, controller.updateProductPassword);



// ==============productList 
router.get("/productList" , controller.productList)

//================logout 
router.get("/logout", authSession , controller.Logout);





export default router;
