import { response } from "express";
import { tryCatch } from "../../utility.js";
import CommentsModal from "./comment.modal.js"

export default class CommentsController {
    constructor() {
        this.modal = new CommentsModal()
    }

    // all comments for a particulate bookId
    getAllCommentsByBookId = async (req, res, next) => {
        const { bookId } = req.query
        const commentLists = await tryCatch(() => this.modal.allCommentsByBookId(bookId), next)

        if(commentLists)
            res.status(200).send(commentLists);
    }

    //  route -> comment/:commentId
    getCommentById = async (req,res,next) => {     
        const { commentId } = req.params
        const response = await tryCatch(() => this.modal.commentById(commentId), next)

        res.status(response ? 200 : 404).send(response ? response : 'comment not found')
    }

    // add a new comment
    addAComment = async (req, res, next) => {
        const comment = req.body;
        const { bookId } = req.query
        comment.userId = req.userId;
        comment.bookId = bookId
        
        const response = await tryCatch(() => this.modal.addComment(comment), next)

        if(response)
            return res.status(200).send(response)
    }

    // modify the comment content
    updateAComment = async (req,res,next) => {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.userId

        const response = await tryCatch(() => this.modal.modifyComment(userId, commentId, content), next)

        res.status(response ? 200 : 404).send(response ? response : 'comment not found')
    }

    // delete existing comment
    deleteAComment = async (req,res,next) => {
        const {commentId} = req.params;
        const userId = req.userId

        const response = await tryCatch(() => this.modal.deleteComment(userId, commentId), next)

        res.status(response ? 200 : 404).send(response ? 'comment deleted' : 'comment not found')
    }

}
