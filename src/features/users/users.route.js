import Router from 'express'
import usersController from './users.controller.js'

const {registerUser, loginUser, healthyUser, signOut} = usersController
const router = Router()

router.route('/register')
.post(registerUser)

router.route('/login')
.post(loginUser)

router.route('/healthy')
.get(healthyUser)

router.route('/all')
.get(usersController.getAllUser)

router.route('/logout')
.get(signOut)

export default router;