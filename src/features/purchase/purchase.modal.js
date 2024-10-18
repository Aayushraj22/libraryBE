import mongoose from "mongoose";
import AppError from "../../middleware/errorHandler.middleware.js";


const purchaseSchema = new mongoose.Schema({
    // _id: {type: String},
    paid: {type: String, require: true},
    price: {type: String, required: true},
    bookId: {type: String, required: true},
    userId: {type: String, required: true},
    pType: {type: String, required: true},
    qty: {type: Number, required: true},
}, { timestamps: true })



export const purchaseCollection = new mongoose.model('soldBooks', purchaseSchema)

const purchaseModal = {

    allPurchase: async () => {
        return await purchaseCollection.find({});
    },

    addPurchase: async (purchasedData) => {
        const doc = new purchaseCollection(purchasedData)

        const addedPurchasedInfo = await doc.save()

        return addedPurchasedInfo;  // RETURN THE PURCHASEDINFO OBJECT
    },

    purchaseInfo: async (id) => {
        const purchasedInfo = await purchaseCollection.findOne({_id: new mongoose.Types.ObjectId(id)})
        
        if(!purchasedInfo){
            throw new AppError(404, 'not found')
        }

        return purchasedInfo
    },

    updatePurchaseById: async (id, modifiedObj) => {
        const purchasedInfo = await purchaseCollection.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, {$set: modifiedObj}, {new: true})

        if(!purchasedInfo){
            throw new AppError(404, 'not found')
        }

        return purchasedInfo
    },

    deletePurchase: async (id) => {
        const purchasedInfo = await purchaseCollection.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)})

        if(!purchasedInfo){
            throw new AppError(404, 'not found')
        }

        return purchasedInfo
    },

    purchasedBookList: async (userId) => {
        const bookList = await purchaseCollection.find({userId})
        // console.log('model booklist: ',bookList)
        return bookList;
    },


}

export default purchaseModal
