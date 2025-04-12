import mongoose from "mongoose";

// object will looks as 
{/*
    {
        userId: 'userid',
        wishlist: ['bookId1', 'bookId2']
    }
*/}

const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },

    wishlist: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'books'
    }]
})

export const wishCollection = mongoose.model('wish', schema);

export default class WishModal {

    constructor() {
        this.collection = wishCollection
    }

    // create a new doc for wishCollection
    createDoc (userId, bookId) {
        return new this.collection({
            userId,
            wishlist: [bookId],
        })
    }

    // add this bookId in the wishlist field of doc having userId = userId 
    async addWish(userId, bookId) {
        const isPresent = await this.isWishExist(userId)

        let response = undefined

       if(isPresent) {  
            response = await this.collection.updateOne({userId}, {
                $addToSet: {wishlist: bookId}
            }, {new: true})

       } else {
            response = await this.createDoc(userId,bookId).save();
       }

       return response
    }

    // delete bookId from wishlist field of doc with userId
    async deleteWish(userId, bookId) {
        const response = await this.collection.updateOne({userId},{
            $pull: {wishlist: bookId}
        })
        
        return response?.modifiedCount
    }

    async getWish(userId) {
        const response = await this.collection.findOne({userId}).populate('wishlist')
        
        return response ?? []
    }

    // check wish exist for the user or not
    async isWishExist (userId) {
        const response = await this.collection.findOne({userId})

        return !!response
    }
    
}