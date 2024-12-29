import mongoose, { Schema } from "mongoose";
import AppError from "../../middleware/errorHandler.middleware.js";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    booksWritten: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'books' 
    }],
    imgurl: {
        type: String,
    },
    bio: {
        type: String,
    },
    age: {
        type: String,
    },
    gender: {
        type: String,
    },
    nationality: {
        type: String,
    },

})

export const authorCollection = mongoose.model('authors', schema)

export default class AuthorModal {
    
    constructor() {
        this.collection = authorCollection;
    }

    createNewAuthor = (data) => {
        return new this.collection(data);
    } 

    addAuthor = async (dataObj) => {
        const doc = this.createNewAuthor(dataObj)
        const result = await doc.save()
        return result
    }

    deleteAuthor = async (id) => {
        const response = await this.collection.findOneAndDelete({id})

        return response?.modifiedCount
    }

    updateAuthor = async (id, updatedObj) => {
        const updatedDoc = await this.collection.findOneAndUpdate({id}, {
            $set: updatedObj
        }, {new: true})

        return updatedDoc.modifiedCount ? updatedDoc : 'author not present'
    }

    authorInfo = async (id) => {
        const author = await this.collection.findOne({_id: id}).populate({
            path: 'booksWritten',
            populate: {
                path: 'authors',   
            }
        })
        
        return author ?? 'author not present';
    }
}

