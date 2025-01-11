import { generateToken, tryCatch, verifyToken } from "../../utility.js";
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
            res.status(500).json({
                status: 500,
                message: 'Internal server error'
            })
        }
    },

    registerUser: async (req,res) => {
        const data = req.body;
        
        // validate the user data
        const validation = usersModal.validateUserData(data, 'register');
        
        if(!validation.status){
            return res.status(400).json({
                status: 400,
                message: validation.msg
            })
        }
        
        try {
            // checking for unique email address
            const user = await usersModal.uniqueUserByEmail(data.email)
            if(user){
                return res.status(400).json({
                    status: 400,
                    message: 'Email already used'
                })
            }
            
            // add user data
            const doc = await usersModal.addUser(data)

            res.status(201).send(doc)
            
        } catch (error) {
            // console.log(error)
            res.status(500).json({
                status: 500,
                message: 'Internal server error'
            })
        }
    },

    loginUser: async (req,res) => {
        const data = req.body;

        // validate the user data
        const validation = usersModal.validateUserData(data);
        
        if(!validation.status){
            return res.status(400).json({
                status: 400,
                message: validation.msg
            });
        }

        try {
            // verify the user
            const verify = await usersModal.verifyUser(data)

            if(!verify.status){
                return res.status(400).json({
                    status: 400,
                    message: verify.msg
                });
            }

            const token = generateToken({userId: verify.user.id})


            // set the cookie named 'token'
            res.cookie('token', token, { maxAge: 1800000, sameSite: 'None', secure: true })   // 30 min 
            res.cookie('uid', verify.user.id, {maxAge: 1800000, sameSite: 'None', secure: true} )
            res.status(200).json({
                status: 200, 
                message: 'success Login', 
                uid: verify.user.id,
            })

        } catch (error) {
            // console.log('login error: ',error)
            return res.status(500).json({
                status: 500,
                message: 'Internal server error'
            })
        }
    },

    userLoginStatus: async (req,res) => {

        // check for the cookie
        const token = req?.cookies?.token

        if(!token) {
            return res.status(401).json({
                status: 401,
                message: 'unAuthorized',
            })
        }

        // in token presence
        // verify the token
        const obj = verifyToken(token);
        
        if(obj.status === 401 || obj.status === 500){
            return res.status(401).json({...obj})
        }
        
        // if none of the above run then obj contains payload
        
        if(obj.uid === req.uid) {
            res.status(200).json({
                status: 200,
                message: 'authorized',
            })
        } else {
            res.status(401).json({
                status: 401,
                message: 'unAuthorized'
            })
        }
    },

    signOut: async (req, res) => {
        res.clearCookie('token', {sameSite: 'None', secure: true, domain: process.env.SITE_DOMAIN})
        res.clearCookie('uid', {sameSite: 'None', secure: true, domain: process.env.SITE_DOMAIN})
        res.status(200).send('logout successfully')
    }
}

export default usersController;