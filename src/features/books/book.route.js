import {Router} from 'express'
import BookController from './book.controller.js'
import purchaseRouter from '../purchase/purchase.route.js'
import { bookDataValidation } from '../../middleware/bookMiddleware.js'

const { getBooks, getBook, searchBooks, top5bookByFeatures, addBook, updateBook, deleteBook} = new BookController()

const router = Router()

// BOOKS ROUTE : 'api/v1/books'

router.route('/')
.get(getBooks)    // GET ALL BOOKS

router.route('/search')
.get(searchBooks)     // SEARCH FOR BOOK BY NAME AND AUTHOR NAME

//  PURCHASE ROUTE WILL BE LOOKED BY IT
router.use('/:id/purchase', purchaseRouter)

router.route('/:id')
.get(getBook)   // GET A BOOK BY ID

router.route('/top5/:category')
.get(top5bookByFeatures)

// routes only for admin 
router.route('/')
.post(bookDataValidation, addBook)      // ADD A NEW BOOK

router.route('/:id')
.put(updateBook)     // UPDATE THE BOOK 
.delete(deleteBook)     // DELETE THE BOOK



export default router