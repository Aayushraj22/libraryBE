import { getTop5Books, tryCatch } from "../../utility.js"
import bookModal from "./book.modal.js"
import { rateModal } from "../rates/rate.modal.js"


const bookController =  {

    getAllBooks: async (req, res, next) => {
        const {page} = req.query

        const allBooks = await tryCatch(() => bookModal.allBooks(page), next)

        if(allBooks)
            res.status(200).send(allBooks)
    },

    getABook: async (req, res, next) => {
        const {id} = req.params
        
        const book = await tryCatch(() => bookModal.bookById(id), next)

        if(book){
            res.status(200).send(book)
        }
    },

    addABook: async (req, res, next) => {
        const book = req.body;

        const msg = await tryCatch(() => bookModal.addBook(book), next)

        if(msg){
            res.status(201).send(msg)
        }
    },

    updateABook: async (req, res, next) => {
        const {id} = req.params
        const changedObj = req.body;

        const msg = await tryCatch(() => bookModal.updateBookById(id, changedObj), next)
        
        if(msg){
            res.status(200).send(msg)
        }

    },

    deleteABook: async (req, res, next) => {
        const {id} = req.params

        const msg = await tryCatch(() => bookModal.deleteBookById(id), next)
        
        if(msg){
            res.status(200).send(msg)
        }
    },

    searchBook: async (req, res, next) => {
        let {searchText} = req.query

        searchText = searchText.trim().split('%20').join(' ')
        
        const searchResult = await tryCatch(() => bookModal.searchBook(searchText), next)

        res.status(200).send(searchResult)
    },

    top5bookByFeatures: async (req,res,next) => {
        const {category} = req.params;
        const rating = await rateModal.allRating()

        if(category === 'rated'){
            const list =  getTop5Books(rating, 'rated')
            // console.log('top 5 books: ',list)
            
            res.status(200).send(list);
        } else if(category === 'selled') {
            const list =  getTop5Books(rating, 'rated')  // rating -> purchased books
            res.status(200).send(list);   
        } else if(category === 'loved') {
            // have to write
        } else {
            res.status(404).send('not found!')
        }
    }


}

export default bookController