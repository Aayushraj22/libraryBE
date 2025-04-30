import { getTop5Books, tryCatch } from "../../utility.js"
import BookModel from "./book.modal.js"
import { rateModal } from "../rates/rate.modal.js"
import purchaseModal from "../purchase/purchase.modal.js"

const bookModal = new BookModel()

export default class BookController {
    getBooks = async (req, res, next) => {
        const { page, genre } = req.query

        const allBooks = await tryCatch(() => bookModal.allBooks( page, genre ), next)

        if(allBooks)
            res.status(200).send(allBooks)
    }

    getBook = async (req, res, next) => {
        const {id} = req.params
        
        const book = await tryCatch(() => bookModal.bookById(id), next)

        if(book){
            res.status(200).send(book)
        }
    }

    searchBooks = async (req, res, next) => {
        let {searchText} = req.query

        searchText = searchText.trim().toLowerCase().split('%20').join(' ')
        
        const searchResult = await tryCatch(() => bookModal.searchBook(searchText), next)
        // console.log('search result: ',searchResult)
        if(searchResult) {
            res.status(200).send(searchResult)
        }
    }

    top5bookByFeatures = async ( req, res, next ) => {
        const {category} = req.params;
        
        try {
            if(category === 'rated'){
                const rating = await rateModal.allRating()
                const list =  getTop5Books(rating, 'rated')
                res.status(200).send(list);

            } else if(category === 'selled') {
                const purchaseList = await purchaseModal.purchasedBookListGroupedByBookId()
                res.status(200).send(purchaseList.slice(0,5));   

            } else {
                res.status(404).send('not found!')
            }
        } catch (error) {
            next(error)
        }

       
    }

    // method only for  admin
    addBook = async (req, res, next) => {
        const book = req.body;

        const msg = await tryCatch(() => bookModal.addBook(book), next)

        if(msg){
            res.status(201).send(msg)
        }
    }

    updateBook = async (req, res, next) => {
        const {id} = req.params
        const changedObj = req.body;

        const msg = await tryCatch(() => bookModal.updateBookById(id, changedObj), next)
        
        if(modifiedBook){
            res.status(200).json({
                status: 200,
                message: 'book updated successfully',
                bookId: modifiedBook.id
            })
        }
    }

    deleteBook = async (req, res, next) => {
        const {id} = req.params

        const deletedBook = await tryCatch(() => bookModal.deleteBookById(id), next)
        
        if(deletedBook){
            res.status(200).json({
                status: 200,
                message: 'book deleted successfully',
                bookId: deletedBook.id
            })
        }
    }

}
