import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './router/index'

dotenv.config();

const app = express();

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(express.json())

const server = http.createServer(app)

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080/")
})

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/', router())