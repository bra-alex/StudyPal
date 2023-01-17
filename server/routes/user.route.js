const fs = require('fs-extra')
const multer = require('multer')
const express = require('express')

const { userExists } = require('../middlewares/exists')
const { imageMimeTypes } = require('../util/mimeTypes')
const userController = require('../controllers/user.controller')
const isAuthenticated = require('../middlewares/isAuthenticated')
const { updateUser, deleteUser } = require('../middlewares/isAuthorised')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const path = `uploads/users/${req.uid}/avatar`
        fs.mkdirsSync(path)
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (imageMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const userRoute = express.Router()

userRoute.get('/users', isAuthenticated, userController.httpGetAllUsers)
userRoute.get('/user/:uid', isAuthenticated, userExists, userController.httpGetUser)

userRoute.patch('/user/:uid', isAuthenticated, userExists, multer({ storage, fileFilter }).single('avatar'), updateUser, userController.httpUpdateUser)
userRoute.delete('/user/:uid', isAuthenticated, userExists, deleteUser, userController.httpDeleteUser)

userRoute.get('/user/:uid/messages', isAuthenticated, userExists, userController.httpGetUserMessages)
userRoute.post('/user/:uid/message', isAuthenticated, userExists, userController.httpCreateMessage)

module.exports = userRoute