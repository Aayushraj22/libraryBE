import {Router} from 'express'
import AuthorController from './author.controller.js'

const router = Router()
const {addAuthor, getAuthor, deleteAuthor, updateAuthor} = new AuthorController()


router.route('/')
.post(addAuthor)
.get(getAuthor)

router.route('/:id')
.put(updateAuthor)
.delete(deleteAuthor)


export default router