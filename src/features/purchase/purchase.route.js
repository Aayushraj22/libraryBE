import { Router } from "express";
import purchaseController from "./purchase.controller.js";
import { isAuthenticUserMiddleware } from "../../middleware/userMiddleware.js";

const {listOfPurchase, newPurchase, purchaseDetailById, modifyPurchaseDetail, deletePurchase, purchasedBookListOfUser} = purchaseController

const router = Router({ mergeParams: true })
const userPurchaseRouter = Router();

// ROUTE ( GET / POST ) :- '/api/v1/books/:id/purchase'  -> id = bookId
// ROUTE ( GET / PUT / DELETE ) :- 'api/v1/books/:id/purchase/:purchaseId'
// ROUTE ( GET ) :- 'api/v1/users/myBooks?userId=sjdlf'

userPurchaseRouter.route('/')
.get(isAuthenticUserMiddleware, purchasedBookListOfUser)          // GET LIST OF BOOKS BOUGHT/RENTED BY A USER

router.route('/')
.get(isAuthenticUserMiddleware, listOfPurchase)          // GET ALL THE PURCHASES
.post(isAuthenticUserMiddleware, newPurchase)         // PURCHASE BOOK ROUTE


router.route('/:purchaseId')
.get(isAuthenticUserMiddleware, purchaseDetailById)          // GET PURCHASE DETAILS OF A BOOK
.put(isAuthenticUserMiddleware, modifyPurchaseDetail)        // UPDATE PURCHASE DETAILS
.delete(isAuthenticUserMiddleware, deletePurchase)          // DELETE PURCHASE DETAILS

// GET ALL PURCHASE LIST, MODIFY PURCHASE, DELETE PURCHASE -> THESE WILL HAVE ONLY PERMISSION OF APPLICATION ADMIN NOT ANY AUTHED USER

export {userPurchaseRouter}
export default router;