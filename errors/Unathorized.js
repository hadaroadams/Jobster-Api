const {StatusCodes} = require('http-status-codes')
const CustomError = require('./customError')


class Unathorized extends CustomError {
    constructor (message){
        super(message)
        this.status=StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unathorized