const fs = require('fs-extra')
const multer = require('multer')
const express = require('express')

const { imageMimeTypes, videoMimeTypes } = require('../util/mimeTypes')

const postStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        const path = `uploads/forum/posts/${req.body.author}/`
        fs.mkdirsSync(path)
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const commentStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        const path = `uploads/forum/posts/${req.post.author}/comments`
        fs.mkdirsSync(path)
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (videoMimeTypes.includes(file.mimetype) || imageMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const { postExists, commentExists } = require('../middlewares/exists')
const forumController = require('../controllers/forum.controller')

const forumRoute = express.Router()

forumRoute.get('/', forumController.httpFetchAllPosts)
forumRoute.get('/:postId', postExists, forumController.httpFetchPost)

forumRoute.post('/', multer({ storage: postStorage, fileFilter }).array('postMedia', 4), forumController.httpCreatePost)
forumRoute.delete('/:postId', postExists, forumController.httpDeletePost)

forumRoute.post('/:postId/comment', postExists, multer({ storage: commentStorage, fileFilter }).array('postMedia', 4), forumController.httpAddComment)
forumRoute.delete('/:postId/comment/:commentId', postExists, commentExists, forumController.httpDeleteComment)

module.exports = forumRoute