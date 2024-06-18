import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express'
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoute'
import userRoutes from './routes/userRoute'
import connectToDb from './config/dbConnection';
import { config } from 'dotenv'

config()
connectToDb()

const app: Application = express()
const PORT: Number = Number(process.env.PORT) || 4005

app.use(bodyParser.json());
app.use(express.json())
app.use('/user',userRoutes)
app.use('/todo', todoRoutes)


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message,
    })
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})