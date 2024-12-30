import mongoose, { Schema } from "mongoose";
import AppError from "../../middleware/errorHandler.middleware.js";


const schema = new Schema({
    bookId: {
        type: String,
        require: true,
    },
    userId: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    }
})

export const collection = mongoose.model('comments', schema)

export default class CommentsModal {
    constructor(){
        this.collection = collection 
    }

    // add a comment
    addComment = async (comment) => {
        const doc = new this.collection(comment)
        const result = await doc.save()
        return result
    }

    // comment by id
    commentById = async (id) => {
        const comment = await this.collection.findById({_id: id})

        return comment;
    }

    // return all documents in collection
    allCommentsByBookId = async (bookId) => {
        const list = await this.collection.find({bookId}) 
        return list;
    }

    // user can only update their comment
    modifyComment = async (userId, id, text) => {
        const modifiedComment = await this.collection.findOneAndUpdate({_id: id, userId}, {
            content: text
        }, {new: true})

        return modifiedComment; // return modified comment object
    }

    // a user can delete their comment by id
    deleteComment = async (userId ,id) => {
        const deletedComment = await this.collection.findOneAndDelete({_id: id, userId}, {new: true})

        return deletedComment;  // return deleted comment object
    }

}
