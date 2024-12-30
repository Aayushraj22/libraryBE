import { tryCatch } from "../../utility.js";
import AuthorModal from "./author.modal.js";

export default class AuthorController {
    
    constructor () {
        this.modal = new AuthorModal()
    }

    addAuthor = async (req, res, next)  => {
        const author = req.body
        
        const authorDoc = await tryCatch(() => this.modal.addAuthor(author), next)

        if(authorDoc){
            res.status(201).send(authorDoc)
        }
    }

    updateAuthor = async (req,res,next) => {
        const updateObj = req.body
        const {id} = req.params

        const response = await tryCatch(() => this.modal.updateAuthor(id, updateObj), next)
        
        res.status(response ? 200 : 404).send(response ? response : 'author not found')
    }

    deleteAuthor = async (req,res,next) => {
        const {id} = req.params

        const response = await tryCatch(() => this.modal.deleteAuthor(id), next)

        res.status(response ? 200 : 404).send(response ? 'author deleted' : 'author not found')
    }


    getAuthor = async (req, res, next) => {
        const {id} = req.query
        const response = await tryCatch(() => this.modal.authorInfo(id), next)

        res.status(response ? 200 : 404).send(response ? response : 'author not found')
    }

}