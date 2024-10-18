import mongoose from "mongoose";
import AppError from "../../middleware/errorHandler.middleware.js";
import { getUUIDMethod } from "../../utility.js";


let books = [
  {
    "name": "The Discovery of India",
    "author": "Jawaharlal Nehru",
    "price": "$6.99",
    "publishedAt": 1946,
    "description": "A comprehensive history of India written by the first Prime Minister of India.",
    "imgurl": "https://th.bing.com/th/id/OIP.wgJADY7vfWnErV2PgYyo9QAAAA?w=187&h=272&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  },
  {
    "name": "The Story of My Experiments with Truth",
    "author": "Mahatma Gandhi",
    "price": "$4.99",
    "publishedAt": 1927,
    "description": "An autobiography of Mahatma Gandhi, detailing his life and philosophy.",
    "imgurl": "https://th.bing.com/th/id/OIP.bKem2vN6dJ6d4kmXJ7QHBgHaLZ?w=187&h=288&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  },
  {
    "name": "Gitanjali",
    "author": "Rabindranath Tagore",
    "price": "$3.99",
    "publishedAt": 1910,
    "description": "A collection of poems by Rabindranath Tagore, which won the Nobel Prize in Literature.",
    "imgurl": "https://th.bing.com/th/id/OIP.VTBq8_0SsKhX6IP3AD8DgwHaJ4?w=186&h=248&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  },
  {
    "name": "The Argumentative Indian",
    "author": "Amartya Sen",
    "price": "$5.99",
    "publishedAt": 2005,
    "description": "A collection of essays by Nobel laureate Amartya Sen, exploring Indian history and identity.",
    "imgurl": "https://th.bing.com/th/id/OIP.KFhoKB2EE-HCkpnqZv-vEgHaLV?w=186&h=285&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  },
  {
    "name": "Myth = Mithya: Decoding Hindu Mythology",
    "author": "Devdutt Pattanaik",
    "price": "$4.99",
    "publishedAt": 2006,
    "description": "An exploration of Hindu mythology and its relevance in modern times.",
    "imgurl": "https://th.bing.com/th/id/OIP.u7F7Z0f6e6d02vQVhDx8ywAAAA?w=146&h=176&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  },
  {
    "name": "The Mahabharata",
    "author": "Vyasa",
    "price": "$12.99",
    "publishedAt": -400,
    "description": "An ancient Indian epic that narrates the struggle for sovereignty between two groups of cousins.",
    "imgurl": "https://th.bing.com/th/id/OIP.Veh0Ktk8gtGEIjjKOt9LOQHaFj?w=264&h=198&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  },
  {
    "name": "The Ramayana",
    "author": "Valmiki",
    "price": "$11.99",
    "publishedAt": -500,
    "description": "An ancient Indian epic that follows Prince Rama's quest to rescue his wife Sita from the demon king Ravana.",
    "imgurl": "https://th.bing.com/th/id/OIP.s-coBGI7G8eo2Qg_q_sR3wHaJ-?w=131&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  },
  {
    "name": "The Guide",
    "author": "R.K. Narayan",
    "price": "$3.99",
    "publishedAt": 1958,
    "description": "A novel about a tour guide who becomes a spiritual guide.",
    "imgurl": "https://th.bing.com/th/id/OIP.5ZmTn6OykFtCB_tgh0IKcgHaL7?w=186&h=299&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  },
  {
    "name": "A Suitable Boy",
    "author": "Vikram Seth",
    "price": "$9.99",
    "publishedAt": 1993,
    "description": "A novel that follows the lives of four families in post-independence India.",
    "imgurl": "https://th.bing.com/th/id/OIP.bbYDt6BVvVpzx0gxh1fE8AAAAA?w=183&h=282&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  },
  {
    "name": "The God of Small Things",
    "author": "Arundhati Roy",
    "price": "$6.99",
    "publishedAt": 1997,
    "description": "A novel that explores the lives of fraternal twins in Kerala, India.",
    "imgurl": "https://th.bing.com/th/id/OIP.hMOlhqxGc0mkm4kPSjnmFgHaLI?w=186&h=280&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  }
]

const bookSchema = new mongoose.Schema({
  id: {type: String, require: true,},
  name: {type: String,require: true,},
  author: {type: String, required: true},
  price: {type: String, required: true},
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

      // limit the books doc by 10 only, now only 10 books can be fetched for any range
      list =  await booksCollection.find({}).skip(toSkipCount).limit(page*10)
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

    const doc = new booksCollection(book);
    const addedBook = await doc.save()

    return addedBook  //  RETURN THE ADDED BOOK
  },

  bookById: async(id) => {
    // find the book by id
    const book = await booksCollection.findOne({id})
    
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

    const searchResult =  await booksCollection.find({[searchKey]: { $regex: new RegExp(searchText, 'i') }})
    
    return searchResult;
  }

}

export default bookModal;


