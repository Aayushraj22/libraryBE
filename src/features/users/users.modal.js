import mongoose from 'mongoose';
import AppError from '../../middleware/errorHandler.middleware.js';
import {getUUIDMethod} from '../../utility.js'

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

    verifyUser: async (data) => {
        const {email, password} = data;

        // find the user by email
        const user = await usersCollection.findOne({email})

        if(!user){
            return {
                status: false,
                msg: 'Invalid email',
            };
        }

        if(user.password !== password) {
            return {
                status: user.password === password,
                msg: 'Wrong Password',
            } 
        }

        return {
            status: true,
            user: user
        }
    },

    validateUserData(data, authType) {
        //user should provide the name, email, password, username
        const {name, username, email, password} = data;

        if(!email){
            return {
                status: false,
                msg: 'please provide Email address',
            }
        } else if(!password) {
            return {
                status: false,
                msg: 'please provide password'
            }
        } else if(authType==='register' && !name) {
            return {
                status: false,
                msg: 'please provide your name'
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
        
        const doc = new usersCollection({...userdata})
        await doc.save()

        return userdata;    // RETURN THE NEW USER DATA
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

