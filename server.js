import express from 'express'
import { errorHandlerMiddleware } from './src/middleware/errorHandler.middleware.js';
import {serve, setup} from 'swagger-ui-express';
import {swaggerJSON} from './swagger.js';
import cors from 'cors'
import connectToDB from './mongoDB.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import globalRouter from './globalRouter.js'

// configuring env variable accessiblity across application
dotenv.config()

// creating a server
const app = express();
const PORT = process.env.PORT || 8000;

// neccessary middleware

// parse the json
app.use(express.json())

// get the form data
app.use(express.urlencoded({extended: true}))

// Cookie parser
app.use(cookieParser())

// making my application to be accessible by these domain only
app.use(cors({
    origin: process.env.CROSS_ORIGIN_ACCESS.split('_'),
    credentials: true,
    sameSite: 'None'
}))


// APPLICATION IS LIVE OR NOT TESTING ROUTE
app.get('/', (req,res) => {
    res.json({
        status: 'Live',
        "read-doc": '/api-docs',
        "featuringRoutes": [
            "api/v1/books"
        ]
    })
})

app.use('/api/v1', globalRouter)


// all unknown route is handled by this function
app.use(errorHandlerMiddleware)

// my server api documentation route
app.use('/api-docs', serve, setup(swaggerJSON));

// run the server
app.listen(PORT, () => {
    console.log(`app is running at http://localhost:${PORT}`)
    connectToDB()
})