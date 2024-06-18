import {Router} from 'express'
import { loginUser, postUser } from '../controllers/userController'

const router = Router()

router.post('/register', postUser)
router.post('/login', loginUser)
export default router