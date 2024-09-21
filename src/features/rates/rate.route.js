import {Router} from 'express'
import { rateController } from './rate.controller.js'
import { isAuthenticUserMiddleware } from '../../middleware/userMiddleware.js'
import { errorHandlerMiddleware } from '../../middleware/errorHandler.middleware.js'

const router = Router()

// rate the book
router.route('/:bookId')
.post(isAuthenticUserMiddleware, rateController.ratingTheBook)
.put(isAuthenticUserMiddleware, rateController.ratingTheBook)  // UPDATE THE RATING
.delete(isAuthenticUserMiddleware, rateController.deleteRatingOnBook)  // DELETE THE RATING


// all unknown route is handled by this function
router.use(errorHandlerMiddleware)

export default router

