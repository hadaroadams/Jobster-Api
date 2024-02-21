const express = require('express')
const router = express.Router()
const {logIn,register} =require('./../Controllers/usersController')

router.post('/register', register)
router.post('/login',logIn)

module.exports = router