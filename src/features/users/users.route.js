import Router from 'express'
import UserController from './users.controller.js'
import { userPurchaseRouter } from '../purchase/purchase.route.js'
import { isAuthenticUserMiddleware, validateUserData } from '../../middleware/userMiddleware.js'

const router = Router()
const {registerUser, loginUser, signOut, getUserById, userLoginStatus, getAllUser} = new UserController()

// ALL USER, BUT NOT BE USED GENERALLY
router.route('/')
.get(getAllUser)

// OWNED BOOKS ROUTE
router.use('/myBooks', userPurchaseRouter)

// ADD NEW USER
router.route('/register')
.post( validateUserData, registerUser )

// LOGIN USER
router.route('/login')
.post( validateUserData, loginUser )

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