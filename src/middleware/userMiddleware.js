import { verifyToken } from "../utility.js"

const isAuthenticUserMiddleware = (req,res,next) => {
    // check for the cookie
    const token = req?.cookies?.token

    if(!token) {
        return res.status(401).json({
            statusCode: 401,
            status: 'UnAuthorised Access'
        })
    }

    // in token presence
    // verify the token
    const obj = verifyToken(token);
    
    if(obj.errMsg){
        return res.status(401).json({
            statusCode: 401,
            status: obj.errMsg
        })
    }

    // if none of the above run then obj contains payload
    req.userId = obj.userId;

    next()

}

export {isAuthenticUserMiddleware}