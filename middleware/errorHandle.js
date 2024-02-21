const {CustomError} =require('./../errors/index')
const {StatusCodes} = require('http-status-codes')

const errorHandle = (err,req,res,next)=>{
    if(err instanceof CustomError){
        return res.status(err.status).json({message:err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrongf"})
}

module.exports = errorHandle