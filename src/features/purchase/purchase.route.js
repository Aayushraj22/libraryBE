import { Router } from "express";
import purchaseController from "./purchase.controller.js";
import { isAuthenticUserMiddleware } from "../../middleware/userMiddleware.js";

const {listOfPurchase, newPurchase, purchaseDetailById, modifyPurchaseDetail, deletePurchase} = purchaseController

const router = Router({ mergeParams: true })


router.route('/')
.get(isAuthenticUserMiddleware, listOfPurchase)          // GET ALL THE PURCHASES
.post(isAuthenticUserMiddleware, newPurchase)         // PURCHASE BOOK ROUTE

router.route('/:purchaseId')
.get(isAuthenticUserMiddleware, purchaseDetailById)          // GET PURCHASE DETAILS
.put(isAuthenticUserMiddleware, modifyPurchaseDetail)
.delete(isAuthenticUserMiddleware, deletePurchase)

// GET ALL PURCHASE LIST, MODIFY PURCHASE, DELETE PURCHASE -> THESE WILL HAVE ONLY PERMISSION OF APPLICATION ADMIN NOT ANY AUTHED USER


export default router;