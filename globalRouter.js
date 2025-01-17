import {Router} from 'express'

import userRouter from './src/features/users/users.route.js'
import rateRouter from './src/features/rates/rate.route.js'
import bookRouter from './src/features/books/book.route.js'
import commentRouter from './src/features/comment/comment.route.js'
import authorRouter from './src/features/author/author.route.js'
import wishRouter from './src/features/wish/wish.route.js'
import recommendSearchTextRouter from './src/features/recentSearches/recentSearches.route.js'

const router = Router()

// books route
router.use('/books', bookRouter)

// user route
router.use('/users', userRouter)

// recommend searchText route
router.use('/rst', recommendSearchTextRouter)


//  ------   PROTECTED ROUTES   ---------  //
// rating route
router.use('/rates', rateRouter)

// comment route
router.use('/comments', commentRouter)

// author route
router.use('/author', authorRouter)

// wish route
router.use('/wish', wishRouter)

export default router