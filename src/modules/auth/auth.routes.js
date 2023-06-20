import {Router} from 'express'
import { adminSession } from '../../middleware/authToken.js';
import * as controller from './controller/auth.controller.js'

const router = Router()



router.get("/" ,  controller.displayLoginPage)
router.post("/" ,  controller.login)

router.get("/home" ,  controller.displayAdminHome)



router.post("/admin" ,  controller.addAdmin)

router.post("/add", adminSession, controller.addProduct);





export default router ;
