import { tryCatch } from "../../utility.js";
import commentsModal from "./comment.modal.js"


const commentsController = {

    getAllComments: (req,res) => {
        res.status(200).send(commentsModal.allComment());
    },

    getCommentById: (req,res,next) => {      //  route -> comment/:commentId
        const {commentId} = req.params
        const comment = tryCatch(() => commentsModal.commentById(commentId), next)

        if(comment)
            res.status(200).send(comment)
    },

    addAComment: (req,res) => {
        const comment = req.body;
        comment.userId = req.userId;
        
        if(commentsModal.addComment(comment)){
            res.status(201).send('Added Successfully')
        } else {
            res.status(500).send('Internal Server Error')
        }
    },

    updateAComment: (req,res,next) => {
        const {commentId} = req.params;
        const text = req.body;

        const comment = tryCatch(() => commentsModal.modifyComment(commentId, text), next)

        if(comment){
            res.status(200).send('Updated Successfully')
        }
    },

    deleteAComment: (req,res,next) => {
        const {commentId} = req.params;

        const comment = tryCatch(() => commentsModal.deleteComment(commentId), next)

        if(comment){
            res.status(200).send('deleted Successfully')
        }
    }

}

export default commentsController