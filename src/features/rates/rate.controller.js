import { tryCatch } from "../../utility.js";
import { rateModal } from "./rate.modal.js";

const rateController = {

    // serve both adding and modifying rating purpose
    ratingTheBook: async (req, res, next) => {
        const userId = req.userId  // GET IT FROM REQUEST OBJ
        const {bookId} = req.params
        const {rated} = req.body   // JSON OBJECT HAVING RATED PROPERTY

        const updatedBook = await tryCatch(() => rateModal.addRating(rated, userId, bookId), next)
        
        if(updatedBook){
            res.status(201).send('Successfully Rated')
        }

        // res.status(200).send('printing test')
    },

    deleteRatingOnBook: async (req, res, next) => {
        const {bookId} = req.params
        const userId = req.userId

        const response = await tryCatch(() => rateModal.deleteRating(userId, bookId))

        if(response){
            res.status(200).send('rating deletion success')
        }
    }
}

export {rateController}