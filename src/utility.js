import ShortUniqueId from "short-unique-id";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// this method return an property (function) of instance of ShortUniqueId class, and accepting a parameter length (integer) which is passed to the constructor function
function getUUIDMethod(length){
    const {randomUUID} = new ShortUniqueId({length})
    return randomUUID;
}

async function tryCatch (cb, next) {
    
    try {
        return await cb()
    } catch (error) {
        next(error)
    }
        
}


// sign a user data and returing token
function generateToken(userdata) {
    const token = jwt.sign(userdata,process.env.SECRET_KEY,{expiresIn: '1h'})

    return token;
}

function verifyToken(token) {
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        return payload;
    } catch (error) {
        if(error.message === 'Network Error') {
            return {
                status: 500,
                message: error.message
            }
        } 

        return {
            status: 401,
            message: 'Invalid token'
        }
    }
}

function getPayload(token) {
    return jwt.verify(token.process.env.SECRET_KEY)
}


// hash password
function encryptText(plainText) {
    const saltRounds = 10;

    // Technique 1 (generate a salt and hash on separate function calls):
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainText, salt);  
    return hash
}

// check password
function verifyEncryptedText(plainText, hash){
    return bcrypt.compareSync(plainText, hash);
}



class Heap {
    
    constructor(list, filterOn) {
        this.store = []
        this.capacity = 5
        this.filterOn = filterOn
        this.list = list
    }
    
    heapify(obj){
        let childIndex = this.store.length;
        
        let parentIndex = Math.ceil((childIndex - 2) / 2);
        
        while(parentIndex >= 0 && obj[this.filterOn] < this.store[parentIndex][this.filterOn]){
            
            this.store[childIndex] = {
                ...this.store[parentIndex]
            }
            
            childIndex = parentIndex;
            parentIndex = Math.ceil((childIndex - 2) / 2);
        }
        
        this.store[childIndex] = { ...obj };
        
    }
    
    actualHeapify(list, size, index) {
        let smallestIndex = index;
        let leftChildIndex = index*2 + 1;
        let rightChildIndex = index*2 + 2;
        
        if(leftChildIndex < size && list[smallestIndex][this.filterOn] > list[leftChildIndex][this.filterOn]) {
            smallestIndex = leftChildIndex
        }
        
        if(rightChildIndex < size && list[smallestIndex][this.filterOn] > list[rightChildIndex][this.filterOn]) {
            smallestIndex = rightChildIndex;
        }
        
        if(smallestIndex !== index) {
            [list[smallestIndex], list[index]] = [list[index], list[smallestIndex]]
            this.actualHeapify(list, size, smallestIndex);
        }
    }
    
    heapsort(list) {
        let length = list.length;
        for(let i=length-1; i>0; i--) {
            [list[i], list[0]] = [list[0], list[i]]
            length -- ;
            
            this.actualHeapify(list, length, 0)
        }
        
        return list;
    }
    
    top5Books() {
        for(let book of this.list) {
            
            if(this.store.length === this.capacity) {
                if(this.store[0][this.filterOn] < book[this.filterOn]) {
                    this.store.shift()
                    this.actualHeapify(this.store, this.store.length, 0)
                } else 
                    continue;
            } 
            
            this.heapify(book)
        }
        
        const heapList = this.store
        const sortedList = this.heapsort(this.store)
        
        return sortedList;
        return heapList
    }
    
    
    
}

function getTop5Books(bookList, propertyToFilterOn){   
    const h = new Heap(bookList, propertyToFilterOn)
    const books = h.top5Books()
    return books;
}



export {tryCatch, getUUIDMethod, generateToken, verifyToken, getPayload, getTop5Books, verifyEncryptedText, encryptText}
