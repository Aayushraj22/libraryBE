import { tryCatch } from "../../utility.js";
import AuthorModal from "./author.modal.js";

export default class AuthorController {
    
    constructor () {
        this.modal = new AuthorModal()
    }

    addAuthor = async (req, res, next)  => {
        const author = req.body
        
        const authorDoc = await tryCatch(() => this.modal.add(author), next)

        if(authorDoc){
            res.status(201).send(authorDoc)
        }
    }

    updateAuthor = async (req,res,next) => {
        const updateObj = req.body
        const {id} = req.params

        const response = await tryCatch(() => this.update(id, updateObj), next)

        res.status(200).send(response)
    }

    deleteAuthor = async (req,res,next) => {
        const {id} = req.params

        const response = await tryCatch(() => this.deleteAuthor(id), next)

        // console.log('response : ',response)
        res.status(200).send(response ? 'author deleted' : 'author not present')
    }


    getAuthor = async (req, res, next) => {
        const {id} = req.params
        const author = await tryCatch(() => this.getAuthor(id), next)

        res.status(200).send(author)
    }

}