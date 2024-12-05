import { tryCatch } from "../../utility.js";
import AuthorModal from "./author.modal.js";

export default class AuthorController {
    constructor () {
        this.modal = new AuthorModal()
    }

    async addAuthor(req, res, next) {
        const author = req.body

        const authorDoc = await tryCatch(() => this.modal.add(author), next)

        if(authorDoc){
            res.status(201).send(authorDoc)
        }
    }

    async updateAuthor (req,res,next) {
        const updateObj = req.body
        const {id} = req.params

        const updatedDoc = await tryCatch(() => this.update(id, updateObj), next)

        if(updatedDoc){
            res.status(200).send(updatedDoc)
        }
    }

    async deleteAuthor (req,res,next) {
        const {id} = req.params

        const response = await tryCatch(() => this.deleteAuthor(id), next)

        if(response) {
            console.log('response : ',response)
            res.status(200).send('deletion success')
        }

    }

    async getAuthor (req, res, next) {
        const {id} = req.params
        const author = await tryCatch(() => this.getAuthor(id), next)

        if(author) {
            res.status(200).send(author)
        }
    }
}