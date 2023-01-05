const express = require('express')

const forumController = require('../controllers/forum.controller')

const forumRoute = express.Router()

forumRoute.get('', forumController.httpFetchAllPosts)
forumRoute.get(':postId', forumController.httpFetchPost)

forumRoute.post('', forumController.httpCreatePost)
forumRoute.delete('', forumController.httpDeletePost)

module.exports = forumRoute