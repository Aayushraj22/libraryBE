import {Router} from 'express'
import bookController from './book.controller.js'
import { errorHandlerMiddleware } from '../../middleware/errorHandler.middleware.js'

import purchaseRouter from '../purchase/purchase.route.js'

const router = Router()

// BOOKS ROUTE

router.route('/')
.get(bookController.getAllBooks)    // GET ALL BOOKS
.post(bookController.addABook)      // ADD A NEW BOOK

router.route('/search')
.get(bookController.searchBook)     // SEARCH FOR BOOK

//  PURCHASE ROUTE WILL BE LOOKED BY IT
router.use('/:id/purchase', purchaseRouter)

router.route('/:id')
.get(bookController.getABook)   // GET A BOOK BY ID
.put(bookController.updateABook)     // UPDATE THE BOOK 
.delete(bookController.deleteABook)     // DELETE THE BOOK


router.route('/top5/:category')
.get(bookController.top5bookByFeatures)


// all unknown route is handled by this function
router.use(errorHandlerMiddleware)


export default router