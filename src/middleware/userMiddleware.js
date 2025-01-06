import { verifyToken } from "../utility.js"

const isAuthenticUserMiddleware = (req,res,next) => {
    // check for the cookie
    const token = req?.cookies?.token

    if(!token) {
        return res.status(401).json({
            status: 401,
            message: 'unAuthorized '
        })
    }

    // in token presence
    // verify the token
    const obj = verifyToken(token);
    
    if(obj.status === 500 || obj.status === 401){
        return res.status(401).json({...obj})
    }

    // if none of the above run then obj contains payload
    req.userId = obj.userId;

    next()

}

export {isAuthenticUserMiddleware}