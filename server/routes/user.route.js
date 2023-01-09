const express = require('express')

const { userExists } = require('../middlewares/exists')
const userController = require('../controllers/user.controller')

const userRoute = express.Router()

userRoute.get('/users', userController.httpGetAllUsers)
userRoute.get('/user/:uid', userExists, userController.httpGetUser)

userRoute.post('/user', userController.httpCreateUser)
userRoute.patch('/user/:uid', userExists, userController.httpUpdateUser)
userRoute.delete('/user/:uid', userExists, userController.httpDeleteUser)

module.exports = userRoute