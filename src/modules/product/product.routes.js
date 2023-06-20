import { Router } from "express";
import * as controller from "./controller/product.controller.js";
import { adminSession, authSession, productToken } from "./../../middleware/authToken.js";

const router = Router();


//================display home
router.get("/" , controller.displayHome);



//================login======
router.get("/login", controller.displayLoginPage);
router.post("/login", controller.loginToDashboard);

 
//===============displayProfile
router.get("/profile",authSession,controller.displayProfile)


//===============change parameters
router.get("/param",authSession,controller.changeParameters);


router.patch("/changPassword", productToken, controller.updateProductPassword);



// ==============productList 

router.get("/productList" , controller.productList)

//================logout 
router.get("/logout", authSession , controller.Logout);





export default router;
