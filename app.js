require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const connectDB = require('./config/dbconn')


connectDB()
const PORT = process.env.PORT || 3900
// middle ware

app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connection.once('open',()=>{
    console.log('conneted to mongoDB')
    app.listen(PORT , ()=>{
        console.log(`server running on port ${PORT} `)
    })
})


