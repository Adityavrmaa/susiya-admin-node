import express from 'express';
import 'dotenv/config'
import './database/dbConnect.js'
import cors from 'cors';
import morgan from 'morgan';
import cartRoute from './api/routes/cart.js';
import authRouter from './api/routes/auth.js';
import bodyParser from "body-parser"

const app = express();

app.use(cors())
app.use('/uploads',express.static('uploads'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status= 400
    next() // 404 errors 
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: {
        message:error.message
    } })
})

// global route
app.use('/auth', authRouter)
app.use('/cart', cartRoute)

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('welcome')
})

app.listen(PORT , ()=>{
    console.log(`server listening on ${PORT} :)`)
})