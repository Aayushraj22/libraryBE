import {Router} from 'express'
import AuthorController from './author.controller.js'

const router = Router()
const {addAuthor, authorList, getAuthor, deleteAuthor, updateAuthor} = new AuthorController()


router.route('/')
.post(addAuthor)
.get(authorList)

router.route('/:id')
.get(getAuthor)
.put(updateAuthor)
.delete(deleteAuthor)


export default router