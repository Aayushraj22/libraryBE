import {Router} from 'express'
import AuthorController from './author.controller.js'

const router = Router()
const author = new AuthorController()

router.route('/')
.post(author.addAuthor)
.get(author.getAuthor)
.put(author.updateAuthor)
.delete(author.deleteAuthor)

export default router