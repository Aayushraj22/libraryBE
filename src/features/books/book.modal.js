import mongoose, { Schema } from "mongoose";
import AppError from "../../middleware/errorHandler.middleware.js";
import { getUUIDMethod } from "../../utility.js";
import AuthorModal, { authorCollection } from "../author/author.modal.js";


const bookSchema = new Schema({
  id: {type: String, require: true,},
  name: {type: String,require: true,},
  authors: [{
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'authors',
  }],
  price: {type: Number, require: true},
  publishedAt: {type: Number, require: true},
  description: {type: String, require: true},
  imgurl: {type: String, require: true},
  ratings: {
    type: Map,
    of: String
  },
  genre: {type: String, require: true},
  copies: {
    total: {
      type: Number,
      require: true,
      default: 1
    },
    available: {
      type: Number,
      require: true,
      default: 1
    }
  },
  language: {type: String, require: true},
}, {
  timestamps: true, // createdAt and updatedAt fields
})

export const booksCollection = mongoose.model('books', bookSchema)

// this method is called to generate unique ids
const randomUUID = getUUIDMethod(4)

export default class BookModel {

  constructor() {
    this.coln = booksCollection
  }

  allBooks = async ( page ) => {
    
    const listSize = await this.coln.countDocuments()
    let list = undefined;

    if(page){
      
      const toSkipCount = (page - 1)*10

      // limit the books doc by 10 only, now only 10 books can be fetched from any starting point
      list =  await this.coln.find({}).skip(toSkipCount).limit(10).populate({
        path: 'authors',
        select: 'name'
      })
    } else {  // fetch all docs of collection
      list =  await this.coln.find({})
    }

    const obj = {
      data: list,
      total: listSize,
    }

    // console.log('books: ',obj)
    return obj;
  }

  bookById = async ( id ) => {
    // find the book by id
    const book = await this.coln.findOne({id}).populate({
      path: 'authors',
      select: 'name'
    })
    
    if(!book) {
      throw new AppError(404, 'book not found');
    }

    return book
  }

  searchBook = async ( searchText ) => {

    const searchResult = await this.coln.aggregate([ 
      { $lookup: {
          from: 'authors', 
          localField: 'authors', 
          foreignField: '_id', 
          as: 'authorDetails', 
        }, 
      }, 
      { $unwind: { 
        path: '$authorDetails', 
        preserveNullAndEmptyArrays: true // Ensures books without authors are retained
        } 
      }, 
      { $match: { 
          $or: [ 
            { name: { $regex: searchText, $options: 'i' } }, 
            { 'authorDetails.name': { $regex: searchText, $options: 'i' } }, 
          ], 
        }, 
      },
      { $group: {
          _id: '$_id', 
          name: { $first: '$name' }, 
          publishedAt: {$first: '$publishedAt'},
          price: {$first: '$price'},
          copies: {$first: '$copies'},
          genre: {$first: '$genre'},
          language: {$first: '$first'},
          description: {$first: '$description'},
          imgurl: {$first: '$imgurl'},
          ratings: {$first: '$ratings'},
          authors: { $push: '$authorDetails' }, 
        },
      }
    ])

    return searchResult;
  }

  // method only for admin
  addBook = async ( book ) => {
    book.id = randomUUID()

    // book object contains author field if author is not present in our db, then first create an author document and then add the book to that author document

    // to add the author, book object should contain author field
    // also before adding the author, check if the author is already present in the db or not
    // if author is not present, then create a new author document and add the book to that author document
    // if author is present, then add the book to that author document


    // if( book?.author ) {
    //   // check if the author is already present in the db or not
      
    //   let bookAuthor = await authorCollection.findOne({
    //     name: book.author.name
    //   })
      
    //   if( !bookAuthor ) {
    //     const authorModel = new AuthorModal()
    //     bookAuthor = await authorModel.addAuthor({
    //       ...book.author
    //     })  
    //   } 
      
    //   book.authors = [bookAuthor._id]
    //   delete book.author
    // }

    book.ratings =  {}

    const doc = new this.coln(book);
    const addedBook = await doc.save()

    return addedBook  //  RETURN THE ADDED BOOK
  }

  updateBookById = async ( id, updateObj ) => {
    // check for the existing book
    const modifiedBook = await this.coln.findOneAndUpdate({id}, {$set: updateObj}, {new: true})

    if(!modifiedBook){
      throw new AppError(404, 'book not found');
    }

    return modifiedBook   // RETURN THE MODIFIED BOOK
  }

  deleteBookById = async ( id ) => {
    // check for the existing book
    const bookToDelete = await this.coln.findOneAndDelete({ id });

    if(!bookToDelete) {
      throw new AppError(404, 'book not found');    // as book not found
    } 
    
    return bookToDelete;  // DELETED BOOK RETURNED

  }

}




