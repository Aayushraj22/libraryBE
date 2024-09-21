import { Router } from "express";
import commentsController from './comment.controller.js'
import { errorHandlerMiddleware } from "../../middleware/errorHandler.middleware.js";
import { isAuthenticUserMiddleware } from "../../middleware/userMiddleware.js";

const router = Router()

const {getCommentById, addAComment, updateAComment, deleteAComment, getAllComments} = commentsController

router.route('/')
.get(getAllComments)      // RETURN LIST OF COMMENTS

// route 'domain/api/v1/comment/:commentId'
router.route('/:commentId')
.get(getCommentById)        // RETURN A COMMENT BY ID
.put(updateAComment)        // UPDATE THE COMMENT BY ID
.delete(deleteAComment)     // DELETE THE COMMENT BY ID

// route 'domain/api/v1/comment/add'
router.route('/add')
.post(isAuthenticUserMiddleware, addAComment)      // ADD A NEW COMMENT



router.use(errorHandlerMiddleware)


export default router