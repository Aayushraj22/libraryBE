export default class AppError extends Error{
    constructor( status = 500, msg = 'Internal server error') {
        super(msg)
        this.status = status
    }

}

const errorHandlerMiddleware = (error, req, res, next) => {
    res.status(error.status).json({
        status: error.status,
        message: error.message
    })
}

export {AppError, errorHandlerMiddleware}
