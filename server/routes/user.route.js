const fs = require('fs-extra')
const multer = require('multer')
const express = require('express')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const path = `uploads/users/${req.body.uid}/avatar`
        fs.mkdirsSync(path)
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const { userExists } = require('../middlewares/exists')
const generateUUID = require('../middlewares/generateUUID')
const userController = require('../controllers/user.controller')

const userRoute = express.Router()

userRoute.get('/users', userController.httpGetAllUsers)
userRoute.get('/user/:uid', userExists, userController.httpGetUser)

userRoute.post('/user', generateUUID, multer({ storage, fileFilter }).single('avatar'), userController.httpCreateUser)
userRoute.patch('/user/:uid', userExists, userController.httpUpdateUser)
userRoute.delete('/user/:uid', userExists, userController.httpDeleteUser)

userRoute.get('/user/:uid/messages', userExists, userController.httpGetUserMessages)
userRoute.post('/user/:uid/message', userExists, userController.httpCreateMessage)

module.exports = userRoute