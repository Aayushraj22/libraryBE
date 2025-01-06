import mongoose from 'mongoose';
import AppError from '../../middleware/errorHandler.middleware.js';
import {encryptText, getUUIDMethod, verifyEncryptedText} from '../../utility.js'

const randomUUID = getUUIDMethod(5)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
})

export const usersCollection = mongoose.model('users', userSchema)

const usersModal = {

    allUser: async() => {
        return await usersCollection.find({});
    },

    userById: async (id) => {

        let user = await usersCollection.findOne({id})

        if(!user){
            throw new Error();
        }

        return user
    },

    verifyUser: async (data) => {
        const {email, password} = data;

        // find the user by email
        const user = await usersCollection.findOne({email})


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
    },

    validateUserData(data, authType) {
        //user should provide the name, email, password, username
        const {name, email, password} = data;

        if(!email){
            return {
                status: false,
                msg: 'please provide Email',
            }
        } else if(!password) {
            return {
                status: false,
                msg: 'please provide Password'
            }
        } else if(authType==='register' && !name) {
            return {
                status: false,
                msg: 'please provide your Name'
            }
        }

        return {
            status: true,
            msg: 'validated data success'
        }
    },

    uniqueUserByEmail : async (email) => {
        const user = await usersCollection.findOne({email})
        return Boolean(user)
    },

    uniqueUserByUsername: async(username) => {
        const user = await usersCollection.findOne({username})
        return Boolean(user)
    },

    addUser: async (userdata) => {
        userdata.id = randomUUID()
        
        // hashed password
        userdata.password =  encryptText(userdata.password)
        
        const doc = new usersCollection({...userdata})
        const userData = await doc.save()

        return userData;    // RETURN THE NEW USER DATA
    },

    modifyUser: async (userId, modifiedObj) => {
        const user = usersCollection.findOne({id:userId})

        if(!user){
            throw new AppError(400, 'user not found!')
        }

        const updatedUser = await usersCollection.updateOne({...modifiedObj})

        return updatedUser;   // RETURN THE MODIFIED USER DATA
    },

    // deleteUser(userId){
    //     const uIndex = this.users.findIndex(u => u.id === userId)

    //     if(uIndex < 0){
    //         throw new AppError(400, 'user not found!')
    //     }

    //     this.users = this.users.filter(u => u.id !== userId)
    //     return true;
    // }

}

export default usersModal;

