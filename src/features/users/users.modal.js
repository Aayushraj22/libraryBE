import mongoose from 'mongoose';
import AppError from '../../middleware/errorHandler.middleware.js';
import {encryptText, getUUIDMethod, verifyEncryptedText} from '../../utility.js'

const randomUUID = getUUIDMethod(5)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    }, 
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    id: {
        type: String,
        require: true,
    },
})

export const usersCollection = mongoose.model('users', userSchema)

export default class UserModel {
    constructor() {
        this.coll = usersCollection
    }

    allUser = async () => {
        return await this.coll.find({});
    }

    /**
     * @description this method is used to find a user by key { 'username', 'email', 'id' } and value
     * @param {string} key 
     * @param {string} value
     * @returns {Boolean} true if user found, false otherwise
     */
    findUser = async (key, value) => {
        const keys = ['email', 'username', 'id']

        // check if the key is valid
        if(!keys.includes(key)){
            return null 
        }

        // for valid keys, find the user by key
        const user = await this.coll.findOne({[key] : value})
        return user
    }

    verifyUser = async (data) => {
        const {email, password} = data;

        // find the user by email
        const user = await this.findUser('email', email)


        if(!user || !verifyEncryptedText(password, user?.password)){
            return {
                status: false,
                msg: 'Invalid Credentials',
            };
        }

        return {
            status: true,
            user: user
        }
    }

    addUser = async (userdata) => {
        userdata.id = randomUUID()
        
        // hashed password
        userdata.password =  encryptText(userdata.password)
        
        const doc = new this.coll({...userdata})
        const userData = await doc.save()

        return Boolean(userData);    // RETURN TRUE IF USER ADDED SUCCESSFULLY
    }

    modifyUser = async (userId, modifiedObj) => {
        const user = await this.findUser('id', userId)

        if(!user){
            throw new AppError(400, 'user not found!')
        }

        const updatedUser = await this.coll.updateOne({ 'id': userId }, {...modifiedObj})

        return updatedUser;   // RETURN THE MODIFIED USER DATA
    }

};


