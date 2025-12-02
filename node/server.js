const express = require('express')
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 2222
const cors = require('cors')
const corsOption = require('./config/corsOptions')
const connectToDB = require('./config/connectDB')
const mongoose = require('mongoose')

//middlewares
app.use(cors(corsOption))
app.use(express.json())
app.use(express.static("public"))

//routes
app.use('/api/product',require('./routs/productRouter'))
app.use('/api/auth',require('./routs/authRouter'))
app.use('/api/basket',require('./routs/basketRouter'))

//db
connectToDB()
mongoose.connection.once('open', () => {
    console.log("connected to DB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})

mongoose.connection.on('error', err => console.log(err))




