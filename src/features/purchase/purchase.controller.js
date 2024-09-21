import { tryCatch } from "../../utility.js"
import purchaseModal from "./purchase.modal.js";

const purchaseController = {
    listOfPurchase: async (req,res,next) => {
        const purchaseList = await tryCatch(purchaseModal.allPurchase, next)

        if(purchaseList)
            res.status(200).send(purchaseList);
    },

    newPurchase: async (req,res,next) => {
        const purchaseInfo = req.body;
        const bookId = req.params.id

        purchaseInfo.bookId = bookId;
        purchaseInfo.userId = req.userId;

        const purchasedObj = await tryCatch(() => purchaseModal.addPurchase(purchaseInfo), next)

        if(purchasedObj){
            res.status(200).send('congratulation Reader 👍')
        }
    },

    purchaseDetailById: async (req,res,next) => {
        const {purchaseId} = req.params;

        const purchasedObj = await tryCatch(() => purchaseModal.purchaseInfo(purchaseId), next)

        if(purchasedObj){
            res.status(200).send(purchasedObj)
        }
    },

    modifyPurchaseDetail: async (req, res, next) => {
        const {purchaseId} = req.params;
        const purchasedObj = req.body;

        const modifiedObj = await tryCatch(() => purchaseModal.updatePurchaseById(purchaseId, purchasedObj), next)

        if(modifiedObj) {
            res.status(200).send('modified successfully')
        }
    },

    deletePurchase: async (req,res,next) => {
        const {purchaseId} = req.params;

        const status = await tryCatch(() => purchaseModal.deletePurchase(purchaseId), next)

        if(status){
            res.status(200).send('purchase deleted successfully')
        }
    }
}

export default purchaseController