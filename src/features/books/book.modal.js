import mongoose from "mongoose";
import AppError from "../../middleware/errorHandler.middleware.js";
import { getUUIDMethod } from "../../utility.js";


let books = [

  {
    "name": "Moby-Dick",
    "author": "Herman Melville",
    "price": "$11.99",
    "publishedAt": 1851,
    "description": "A novel about the voyage of the whaling ship Pequod.",
    "imgurl": "https://th.bing.com/th/id/OIP.qJq9h2JR_kqXCiZMu3JKMQHaLx?w=187&h=298&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {},
  },
  {
    "name": "War and Peace",
    "author": "Leo Tolstoy",
    "price": "$14.99",
    "publishedAt": 1869,
    "description": "A novel that chronicles the history of the French invasion of Russia.",
    "imgurl": "https://th.bing.com/th/id/OIP.IKbBafS4bOtZfBvnryGzzAHaLe?w=187&h=291&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {},
  },
  {
    "name": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "price": "$9.99",
    "publishedAt": 1951,
    "description": "A novel about the experiences of a young boy named Holden Caulfield.",
    "imgurl": "https://th.bing.com/th/id/OIP.EhOg_5HJS4hDMONihBcEoQHaMP?w=115&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {},
  },
  {
    "name": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "price": "$10.99",
    "publishedAt": 1937,
    "description": "A fantasy novel and children's book about the adventures of Bilbo Baggins.",
    "imgurl": "https://th.bing.com/th/id/OIP.3JECq-K6PyxdPt8j1fe8JQHaKD?w=187&h=254&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "ratings": {}
  }, 
  {
    "id": "GDYk",
    "name": "Fahrenheit 451",
    "author": "Ray Bradbury",
    "price": "$9.99",
    "publishedAt": 1953,
    "description": "A dystopian novel about a future society where books are banned and burned.",
    "imgurl": "https://example.com/fahrenheit451.jpg",
    "ratings": {},
  },
  {
    "id": "xr78",
    "name": "Jane Eyre",
    "author": "Charlotte Brontë",
    "price": "$12.99",
    "publishedAt": 1847,
    "description": "A novel about the experiences of the eponymous heroine, including her growth to adulthood and her love for Mr. Rochester.",
    "imgurl": "https://example.com/janeeyre.jpg",
    "ratings": {},
  },
  {
    "id": "RkfV",
    "name": "Brave New World",
    "author": "Aldous Huxley",
    "price": "$8.99",
    "publishedAt": 1932,
    "description": "A dystopian novel about a future world state where citizens are environmentally engineered into an intelligence-based social hierarchy.",
    "imgurl": "https://example.com/bravenewworld.jpg",
    "ratings": {},
  },
  {
    "id": "uP89",
    "name": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "price": "$20.99",
    "publishedAt": 1954,
    "description": "An epic high-fantasy novel about the quest to destroy the One Ring.",
    "imgurl": "https://example.com/thelordoftherings.jpg",
    "ratings": {},
  },
  {
    "id": "eV9Q",
    "name": "Animal Farm",
    "author": "George Orwell",
    "price": "$7.99",
    "publishedAt": 1945,
    "description": "A satirical allegorical novella about a group of farm animals who rebel against their human farmer.",
    "imgurl": "https://example.com/animalfarm.jpg",
    "ratings": {},
  },
  {
    "id": "CQSo",
    "name": "The Odyssey",
    "author": "Homer",
    "price": "$13.99",
    "publishedAt": -800,
    "description": "An ancient Greek epic poem about the journey of Odysseus.",
    "imgurl": "https://example.com/theodyssey.jpg",
    "ratings": {},
  },
  {
    "id": "0kT4",
    "name": "Crime and Punishment",
    "author": "Fyodor Dostoevsky",
    "price": "$11.99",
    "publishedAt": 1866,
    "description": "A novel about the mental anguish and moral dilemmas of an impoverished ex-student who plans to kill a pawnbroker.",
    "imgurl": "https://example.com/crimeandpunishment.jpg",
    "ratings": {},
  },
  {
    "id": "gwNV",
    "name": "The Brothers Karamazov",
    "author": "Fyodor Dostoevsky",
    "price": "$14.99",
    "publishedAt": 1880,
    "description": "A philosophical novel about the existential struggles of faith, doubt, and reason.",
    "imgurl": "https://example.com/thebrotherskaramazov.jpg",
    "ratings": {},
  },
  {
    "id": "fHJZ",
    "name": "Wuthering Heights",
    "author": "Emily Brontë",
    "price": "$10.99",
    "publishedAt": 1847,
    "description": "A novel about the intense and almost demonic love between Catherine Earnshaw and Heathcliff.",
    "imgurl": "https://example.com/wutheringheights.jpg",
    "ratings": {},
  },
  {
    "id": "5qJi",
    "name": "The Divine Comedy",
    "author": "Dante Alighieri",
    "price": "$15.99",
    "publishedAt": 1320,
    "description": "An epic poem about the journey of Dante through Hell, Purgatory, and Paradise.",
    "imgurl": "https://example.com/thedivinecomedy.jpg",
    "ratings": {},
  },
  {
    "id": "GZn2",
    "name": "The Iliad",
    "author": "Homer",
    "price": "$13.99",
    "publishedAt": -750,
    "description": "An ancient Greek epic poem about the Trojan War.",
    "imgurl": "https://example.com/theiliad.jpg",
    "ratings": {},
  },
  {
    "id": "kHHY",
    "name": "Les Misérables",
    "author": "Victor Hugo",
    "price": "$12.99",
    "publishedAt": 1862,
    "description": "A novel about the struggles of ex-convict Jean Valjean and his experience of redemption.",
    "imgurl": "https://example.com/lesmiserables.jpg",
    "ratings": {},
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

  allBooks: async () => {
    return await booksCollection.find({})
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

    const searchResult =  await booksCollection.find({[searchKey]: searchText.toLowerCase()})

    return searchResult;
  }

}

export default bookModal;


