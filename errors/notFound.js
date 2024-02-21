const {StatusCodes} = require('http-status-codes')
const CustomError = require('./customError')

class NOtFound extends CustomError {
    constructor (message){
        super(message)
        this.status =StatusCodes.NOT_FOUND
    }
}

module.exports = NOtFound