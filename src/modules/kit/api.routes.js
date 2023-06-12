import {Router} from 'express'
import * as controller from './controller/api.js'

const router = Router()

router.get("/getData" , controller.login)






export default router ;
