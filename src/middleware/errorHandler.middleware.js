export default class AppError extends Error{
    constructor(status,msg) {
        super(msg)
        this.status = status
    }

}

const errorHandlerMiddleware = (error, req, res, next) => {
    const sts = error.status || 500
    const msg = error.message || 'Internal server error'
    res.status(sts).send(msg)
}

export {AppError, errorHandlerMiddleware}
