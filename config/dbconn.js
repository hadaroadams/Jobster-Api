const { error } = require('console')
const mongoose = require('mongoose')

const connectDB =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DATABASE_URL)
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDB