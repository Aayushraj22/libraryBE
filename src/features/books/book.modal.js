import mongoose, { Schema } from "mongoose";
import AppError from "../../middleware/errorHandler.middleware.js";
import { getUUIDMethod } from "../../utility.js";
import { authorCollection } from "../author/author.modal.js";


const bookSchema = new Schema({
  id: {type: String, require: true,},
  name: {type: String,require: true,},
  authors: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'authors',
  }],
  price: {type: Number, required: true},
  publishedAt: {type: Number, required: true},
  description: {type: String, required: true},
  imgurl: {type: String, required: true},
  ratings: {
    type: Map,
    of: String
  }
})

export const booksCollection = mongoose.model('books', bookSchema)

// this method is called to generate unique ids
const randomUUID = getUUIDMethod(4)

const bookModal = {

  allBooks: async (page) => {
    
    const listSize = await booksCollection.countDocuments()
    let list = undefined;

    if(page){
      
      const toSkipCount = (page - 1)*10

      // limit the books doc by 10 only, now only 10 books can be fetched from any starting point
      list =  await booksCollection.find({}).skip(toSkipCount).limit(10).populate({
        path: 'authors',
        select: 'name'
      })
    } else {  // fetch all docs of collection
      list =  await booksCollection.find({})
    }


    const obj = {
      data: list,
      total: listSize,
    }

    // console.log('books: ',obj)
    return obj;
  },

  addBook: async(book) => {
    book.id = randomUUID()

    // const author = new authorCollection({
    //   name: book.authors
    // })

    // only if not already present
    // author.save()

    // if present the add current book into that author book fiels 

    const doc = new booksCollection(book);
    const addedBook = await doc.save()

    return addedBook  //  RETURN THE ADDED BOOK
  },

  bookById: async(id) => {
    // find the book by id
    const book = await booksCollection.findOne({id}).populate({
      path: 'authors',
      select: 'name'
    })
    
    if(!book) {
      throw new AppError(404, 'book not found!');
    }

    return book
  },

  updateBookById: async (id, updateObj) => {
    // check for the existing book
    const modifiedBook = await booksCollection.findOneAndUpdate({id}, {$set: updateObj}, {new: true})

    if(!modifiedBook){
        throw new AppError(404, 'book not found!');
            // as book not found
    }

    return modifiedBook   // RETURN THE MODIFIED BOOK
  },

  deleteBookById: async(id) => {
    // check for the existing book
    const bookToDelete = await booksCollection.findOneAndDelete({ id });

    if(!bookToDelete) {
      throw new AppError(404, 'book not found!');    // as book not found
    } 
    
    return bookToDelete;  // OBJECT HAVE SOME ACK REGARDING DELETION OF DOCUMENT

  },

  searchBook: async (text) => {
    // book search directly without any flag
    // books by author search, use flag  a:authorName
    // books by published year search, use flag  y:authorName
    // books by prices search, use flag p:price

    // console.log('text:',text)

    const searchText = text[1] === ':' ? text.slice(2) : text
    const keyMap = {
        'a' : 'author',
        'y' : 'published Year',
        'p' : 'price',
    }

    const searchKey = text[1] === ':' ? keyMap[text[0]] : 'name'

    // console.log('searchText: ',searchText.toLowerCase())

    const searchResult =  await booksCollection.find({[searchKey]: { $regex: new RegExp(searchText, 'i') }}).populate({
      path: 'authors',
      select: 'name',
    })
    
    return searchResult;
  },


  updateBook: async (id) => {
    const updatedBook = await findOneAndUpdate()
  }
}

export default bookModal;


