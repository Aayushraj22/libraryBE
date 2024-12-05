import Router from 'express'
import usersController from './users.controller.js'
import { userPurchaseRouter } from '../purchase/purchase.route.js'
import { isAuthenticUserMiddleware } from '../../middleware/userMiddleware.js'

const {registerUser, loginUser, signOut, getUserById, userLoginStatus} = usersController
const router = Router()

// ALL USER, BUT NOT BE USED GENERALLY
router.route('/')
.get(usersController.getAllUser)

// OWNED BOOKS ROUTE
router.use('/myBooks', userPurchaseRouter)

// ADD NEW USER
router.route('/register')
.post(registerUser)

// LOGIN USER
router.route('/login')
.post(loginUser)

// USER AUTH STATUS
router.route('/auth-status')
.get(userLoginStatus)

// LOGOUT USER
router.route('/logout')
.get(signOut)

// RETURN A USER SEARCHED BY ID
router.route('/:id')
.get(isAuthenticUserMiddleware ,getUserById)



export default router;