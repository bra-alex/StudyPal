const express = require('express')

const existsMiddleware = require('../middlewares/exists')
const forumController = require('../controllers/forum.controller')

const forumRoute = express.Router()

forumRoute.get('/', forumController.httpFetchAllPosts)
forumRoute.get('/:postId', existsMiddleware.postExists, forumController.httpFetchPost)

forumRoute.post('/', forumController.httpCreatePost)
forumRoute.delete('/:postId', existsMiddleware.postExists, forumController.httpDeletePost)

forumRoute.post('/:postId/comment', existsMiddleware.postExists, forumController.httpAddComment)
forumRoute.delete('/:postId/comment/:commentId', existsMiddleware.postExists, existsMiddleware.commentExists, forumController.httpDeleteComment)

module.exports = forumRoute