import { generateToken, tryCatch } from "../../utility.js";
import usersModal from "./users.modal.js";

const usersController = {

    getUserById: async (req, res) => {
        const {id} = req.params  // user's Id

        try {
            const user =  await usersModal.userById(id)
            res.status(200).send(user)
        } catch (error) {
            res.status(404).send('User Not Found')
        }
    },

    getAllUser: async (req,res) => {
        try {
            const allUser = await usersModal.allUser()
            res.status(200).send(allUser)
        } catch (error) {
            res.status(500).send('server Error')
        }
    },

    registerUser: async (req,res) => {
        const data = req.body;
        
        // validate the user data
        const validation = usersModal.validateUserData(data, 'register');
        
        if(!validation.status){
            return res.status(404).send(validation.msg);
        }
        
        try {
            // checking for unique email address
            const user = await usersModal.uniqueUserByEmail(data.email)
            if(user){
                return res.status(400).send('Email already used')
            }

            // add user data
            const doc = await usersModal.addUser(data)
            res.status(201).send(doc)
            
        } catch (error) {
            console.log(error)
            res.status(500).send('Database error')
        }
    },

    loginUser: async (req,res) => {
        const data = req.body;

        // validate the user data
        const validation = usersModal.validateUserData(data);
        
        if(!validation.status){
            return res.status(400).send(validation.msg);
        }

        try {
            // verify the user
            const verify = await usersModal.verifyUser(data)

            if(!verify.status){
                return res.status(400).send(verify.msg);
            }

            const token = generateToken({userId: verify.user.id})


            // set the cookie named 'token'
            res.cookie('token', token, { maxAge: 1800000})   // 30 min 
            res.cookie('uid', verify.user.id )
            res.status(200).send('login success')

        } catch (error) {
            console.log('login error: ',error)
            return res.status(500).send('database error')
        }
    },

    signOut: async (req, res) => {
        res.clearCookie('token')
        res.clearCookie('uid')
        res.status(200).send('logout successfully')
    }
}

export default usersController;