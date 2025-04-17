import AppError from "../../middleware/errorHandler.middleware.js";
import { generateToken, tryCatch, verifyToken } from "../../utility.js";
import UserModel from "./users.modal.js";

const { findUser, verifyUser, addUser } = new UserModel()

export default class UserController {

    getUserById = async ( req, res, next ) => {   
        const {id} = req.params  // user's Id

        const user = await tryCatch( () => findUser('id', id), next )
        if(!user) {
            return
        }
        res.status(200).send(user)
    }

    getAllUser = async ( req, res, next ) => {
        const allUser = await tryCatch( () => allUser(), next )
        if(!allUser) {
            return
        }
        res.status(200).send(allUser)
    }

    registerUser = async ( req, res, next ) => {
        const data = req.body;

        const user = await tryCatch(() => addUser(data), next)
        if(!user) {
            return
        }
        res.status(201).json({
            status: 201,
            message: 'successfully registered',
            uid: user?.id,
        })
    }

    loginUser = async ( req, res, next ) => {
        const data = req.body;

        const verification = await tryCatch( () => verifyUser(data), next )
        if(!verification) {
            return
        }

        const token = generateToken({
            uid: verification?.user?.id
        })

        // set the cookie named 'token'
        res.cookie('token', token, { maxAge: 3600000, sameSite: 'None', secure: true })   // 1 hr  
        res.cookie('uid', verification.user.id, {maxAge: 3600000, sameSite: 'None', secure: true} )
        res.status(200).json({
            status: 200, 
            message: 'successfully sign-in', 
            uid: verification.user.id,
        })
    }

    userLoginStatus = async ( req, res, next ) => {

        // check for the cookie
        const token = req?.cookies?.token

        if(!token) {
            return next(new AppError(401, 'unAuthorized'))
        }

        // in token presence
        // verify the token
        const obj = verifyToken(token);
        
        if( !obj?.uid ){
            return next(new AppError(obj?.status, obj?.message))
        }
        
        // if none of the above run then obj contains payload
        if(obj.uid === req.uid) {
            res.status(200).json({
                status: 200,
                message: 'authorized',
            })
        } else {
            next(new AppError(401, 'unAuthorized'))
        }
    }

    signOut = async ( req, res ) => {
        res.clearCookie('token', {sameSite: 'None', secure: true})
        res.clearCookie('uid', {sameSite: 'None', secure: true})
        res.status(200).send('logout successfully')
    }

}
