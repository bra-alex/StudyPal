const express = require('express')

const existsMiddleware = require('../middlewares/exists')
const userController = require('../controllers/user.controller')

const userRoute = express.Router()

userRoute.get('/users', userController.httpGetAllUsers)
userRoute.get('/user/:uid', existsMiddleware.userExists, userController.httpGetUser)

userRoute.post('/user', userController.httpCreateUser)
userRoute.patch('/user/:uid', existsMiddleware.userExists, userController.httpUpdateUser)
userRoute.delete('/user/:uid', existsMiddleware.userExists, userController.httpDeleteUser)

module.exports = userRoute