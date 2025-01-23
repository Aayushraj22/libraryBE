import { Router } from "express";
import CommentsController from './comment.controller.js'
import { errorHandlerMiddleware } from "../../middleware/errorHandler.middleware.js";
import { isAuthenticUserMiddleware } from "../../middleware/userMiddleware.js";

const router = Router()

const {getCommentById, addAComment, updateAComment, deleteAComment, getAllCommentsByBookId} = new CommentsController()

router.route('/')
.get(getAllCommentsByBookId)      // RETURN LIST OF COMMENTS

// route 'domain/api/v1/comments/:commentId'
router.route('/:commentId')
.get(getCommentById)        // RETURN A COMMENT BY ID
.put(isAuthenticUserMiddleware, updateAComment)        // UPDATE THE COMMENT BY ID
.delete(isAuthenticUserMiddleware, deleteAComment)     // DELETE THE COMMENT BY ID

// route 'domain/api/v1/comments/add'
router.route('/add')
.post(isAuthenticUserMiddleware, addAComment)      // ADD A NEW COMMENT



router.use(errorHandlerMiddleware)


export default router