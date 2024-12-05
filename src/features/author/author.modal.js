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

const author = mongoose.model('authors', schema)

export default class AuthorModal {

    async add (dataObj) {
        const doc = new author(dataObj)
        const result = await doc.save()
    }

    async delete (id) {
        const deletedDoc = await findOneAndDelete({id})

        if(!deletedDoc) { 
            throw new AppError(404, 'author not found!')
        }

        return true;
    }

    async update (id, updatedObj) {
        const updatedDoc = await findOneAndUpdate({id}, {$set: updatedObj}, {new: true})

        if(!updatedDoc) {
            throw new AppError(404, 'author not found')
        }

        return updatedDoc;
    }

    async authorInfo (id) {
        const author = await findOne({id})

        if(!author){
            throw new AppError(404, 'author not found')
        }

        return author;
    }
}

