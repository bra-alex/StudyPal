const express = require('express')

const forumController = require('../controllers/forum.controller')

const forumRoute = express.Router()

forumRoute.get('', forumController.httpFetchAllPosts)
forumRoute.get(':postId', forumController.httpFetchPost)

forumRoute.post('', forumController.httpCreatePost)
forumRoute.delete(':postId', forumController.httpDeletePost)

forumRoute.post(':postId/comment', forumController.httpAddComment)
forumRoute.delete(':postId/comment/:commentId', forumController.httpDeleteComment)

module.exports = forumRoute