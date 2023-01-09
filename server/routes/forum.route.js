const express = require('express')

const { postExists, commentExists } = require('../middlewares/exists')
const forumController = require('../controllers/forum.controller')

const forumRoute = express.Router()

forumRoute.get('/', forumController.httpFetchAllPosts)
forumRoute.get('/:postId', postExists, forumController.httpFetchPost)

forumRoute.post('/', forumController.httpCreatePost)
forumRoute.delete('/:postId', postExists, forumController.httpDeletePost)

forumRoute.post('/:postId/comment', postExists, forumController.httpAddComment)
forumRoute.delete('/:postId/comment/:commentId', postExists, commentExists, forumController.httpDeleteComment)

module.exports = forumRoute