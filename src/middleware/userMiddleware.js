import { verifyToken } from "../utility.js"

const isAuthenticUserMiddleware = (req,res,next) => {
    // check for the cookie
    const token = req?.cookies?.token

    if(!token) {
        return res.status(401).send('UnAuthorised Access')
    }

    // in token presence
    // verify the token
    const obj = verifyToken(token);
    

    if(obj.errMsg){
        return res.status(400).send(obj.errMsg)
    }

    // if not above run the obj contains payload
    req.userId = obj.userId;

    next()

}

export {isAuthenticUserMiddleware}