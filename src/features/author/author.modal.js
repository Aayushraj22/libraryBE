import mongoose, { Schema } from "mongoose";
import AppError from "../../middleware/errorHandler.middleware.js";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    booksWritten: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Books' 
    }],
    imgurl: {
        type: String,
    },

})

export const authorCollection = mongoose.model('authors', schema)

export default class AuthorModal {
    
    constructor() {
        this.collection = new authorCollection();
    }

    createNewAuthor = (data) => {
        return new this.collection(data);
    } 

    addAuthor = async (dataObj) => {
        const doc = this.collection(dataObj)
        const result = await doc.save()
        return result
    }

    deleteAuthor = async (id) => {
        const response = await findOneAndDelete({id})

        return response?.modifiedCount
    }

    updateAuthor = async (id, updatedObj) => {
        const updatedDoc = await findOneAndUpdate({id}, {
            $set: updatedObj
        }, {new: true})

        return updatedDoc.modifiedCount ? updatedDoc : 'author not present'
    }

    authorInfo = async (id) => {
        const author = await findOne({id})

        return author ?? 'author not present';
    }
}

