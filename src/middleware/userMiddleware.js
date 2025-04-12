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

const validateUserData = ( req, res, next ) => {
    const endpoint = req.path 
    const { name, email, password } = req.body 

    if( !email || !password || !password.trim() ) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid credentials',
        })
    }

    // signup user need to provide name
    if( endpoint === 'register' && ( !name || !name.trim() ) ) {
        return res.status(400).json({
            status: 400,
            message: 'provide your name',
        })
    }
    
    // everything fine then move to the next middleware
    next()
}

export { isAuthenticUserMiddleware, validateUserData}