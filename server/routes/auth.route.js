const multer = require('multer')
const express = require('express')

const { signUpExists, loginExists } = require('../middlewares/exists')
const { imageMimeTypes } = require('../util/mimeTypes')
const generateUUID = require('../middlewares/generateUUID')
const authController = require('../controllers/auth.controller')

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

const authRoute = express.Router()

authRoute.post('/signup', signUpExists, generateUUID, multer({ storage, fileFilter }).single('avatar'), authController.signUp)
authRoute.post('/login', loginExists, authController.login)
authRoute.post('/logout', authController.logout)

module.exports = authRoute