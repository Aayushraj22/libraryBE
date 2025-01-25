import mongoose from "mongoose";
import AppError from "../../middleware/errorHandler.middleware.js";


const purchaseSchema = new mongoose.Schema({
    price: {type: Number, require: true},
    bookId: {type: String, require: true},
    userId: {type: String, require: true},
    pType: {type: String, require: true},
    qty: {type: Number, require: true},
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

    purchasedBookListGroupedByBookId: async () => {
        const purchaseList = await purchaseCollection.aggregate([
            {
              $group: {
                _id: "$bookId", // Group by bookId
                totalDocs: { $sum: 1 }, // Count documents in each group
                total: { $sum: "$qty" }, // Sum the qty field for each group
              },
            },
            {
              $project: {
                _id: 0, // Exclude _id from output
                bookId: "$_id", // Rename _id to bookId
                totalDocs: 1,
                total: 1,
              },
            }, {
                $sort: {total: -1},  // sort the list by total in descending order
            }
        ])

        return purchaseList
    }



}

export default purchaseModal
