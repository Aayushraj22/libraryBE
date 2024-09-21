import AppError from "../../middleware/errorHandler.middleware.js";
import { getUUIDMethod } from "../../utility.js";

const randomUUID = getUUIDMethod(6)

const commentsModal = {
    comments: [
        {
            id: 'GQY7aK',
            userId: '',
            bookId: 'RGuP',
            content: 'Awesom Book to read Youngester',
        }
    ],

    allComment(){
        return this.comments;
    },

    commentById(id){
        const comment = this.comments.find(c => c.id === id)

        if(!comment){
            throw new AppError(404, 'Comment Not Found!');
        }

        return comment;
    },

    addComment(comment){
        comment = {
            ...comment,
            id: randomUUID(),
        }

        this.comments.push(comment);
        return true;
    },

    modifyComment(id, text){
        const cIndex = this.comments.findIndex(c => c.id === id)

        if(!cIndex){
            throw new AppError(404, 'comment not found!')
        }

        this.comments[cIndex].content = text
        return this.comments[cIndex]; // return modified comment object
    },

    deleteComment(id){
        const cIndex = this.comments.findIndex(c => c.id === id)

        if(cIndex < 0){
            throw new AppError(404, 'Comment Not Found!')
        }

        this.comments = this.comments.filter(c => c.id !== id)
        return true;  // indicate deleted successfully
    }
}

export default commentsModal;