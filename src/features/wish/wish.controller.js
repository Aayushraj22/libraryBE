import { tryCatch } from "../../utility.js";
import WishModal from "./wish.modal.js";

export default class WishController {

    constructor() {
        this.modal = new WishModal();
    }

    addWishItem = async (req, res, next) => {
        const userId = req.cookies.uid 
        const { bookId } = req.body

        await tryCatch(() => this.modal.addWish(userId, bookId), next)

        res.status(201).send('book added into your wish')
    }

    deleteWishItem = async (req, res, next) => {
        const userId = req.cookies.uid 
        const { bookId } = req.query

        const response = await tryCatch(() => this.modal.deleteWish(userId, bookId), next)

        res.status(201).send(response ? 'deleted book from wish' : 'was absent in your wish') 
    }

    // return a doc of userId, in which wishlist (array) data is populated (book object)
    getWishItem = async (req, res, next) => {
        const userId = req.cookies.uid 

        const response = await tryCatch(() => this.modal.getWish(userId), next)

        res.status(200).send(response)
    }

}