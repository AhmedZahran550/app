import {Router} from 'express'
import * as controller from './controller/api.js'

const router = Router()

router.post("/getData" , controller.login)






export default router ;
