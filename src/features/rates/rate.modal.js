import AppError from "../../middleware/errorHandler.middleware.js";

import {getUUIDMethod} from '../../utility.js'
import bookModal, { booksCollection } from "../books/book.modal.js";

const randomUUID = getUUIDMethod(7)


const rateModal = {
    // all rating 
    allRating: async () => {
        const booksList = await booksCollection.find({})
        const rating = booksList.map(book => {
            const ratingCount = Array.from(book.ratings.keys()).length

            return {
                bookId: book.id,
                ratingCount,
                ratings: book.ratings,
            }
        })

        return rating;
    },

    // serve both adding and modifying rating purpose
    addRating: async (rated, userId, bookId) => {

        let updatedBook = await booksCollection.findOneAndUpdate({id: bookId}, {$set: {[`ratings.${userId}`] : rated}}, { new: true })  // THE LAST PARAMETER RETURN THE UPDATED OBJECT

        if(!updatedBook) {
            throw new AppError(404, 'book not found')
        }

        return updatedBook;    //  RETURN THE UPDATED BOOK
    },

    deleteRating: async (userId, bookId) => {

        // FIND THE OBJECT, IF FOUND THEN DELETE IT OTHERWISE AN ERROR GENERATES
        let response = await booksCollection.findOneAndUpdate({id: bookId}, {$unset: {[`ratings.${userId}`] : ''}},  { new: true })

        if(!response) {
            throw new AppError(404, 'book not found')
        }
        
        return response;   // RETURN THE STATUS THROUGH BOOLEAN VALUE
    },

}



export {rateModal}