import { generateToken } from "../../utility.js";
import usersModal from "./users.modal.js";

const usersController = {

    healthyUser: (req,res) =>  {
        console.log('user healthy called')
        res.status(200).send('healthy user')
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
            return res.status(404).send(validation.msg);
        }

        try {
            // verify the user
            const verify = await usersModal.verifyUser(data)

            if(!verify.status){
                return res.status(400).send(verify.msg);
            }

            const token = generateToken({userId: verify.user.id})


            // set the cookie named 'token'
            res.cookie('token', token, {maxAge: 1800000})   // 30 
            res.status(200).send('login success')

        } catch (error) {
            console.log('login error: ',error)
            return res.status(500).send('database error')
        }
    },

    signOut: async (req, res) => {
        res.clearCookie('token')
        res.status(200).send('logout successfully')
    }
}

export default usersController;