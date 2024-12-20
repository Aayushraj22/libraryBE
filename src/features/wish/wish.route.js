import { Router } from "express";
import { isAuthenticUserMiddleware } from "../../middleware/userMiddleware.js";
import WishController from "./wish.controller.js";

const router = Router()
const wishCtr = new WishController()

// adding new wish 
router.route('/')
.post(isAuthenticUserMiddleware, wishCtr.addWishItem)
.delete(isAuthenticUserMiddleware, wishCtr.deleteWishItem)
.get(isAuthenticUserMiddleware, wishCtr.getWishItem)    // return doc, in which wishlist field is list of book obj


export default router