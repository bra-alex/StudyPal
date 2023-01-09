const express = require('express')

const existsMiddleware = require('../middlewares/exists')
const topicController = require('../controllers/topic.controller')

const topicRoute = express.Router()

topicRoute.get('/', topicController.httpFetchAllTopics)
topicRoute.get('/:topicId', existsMiddleware.topicExists, topicController.httpFetchTopic)

topicRoute.post('/', topicController.httpCreateTopic)
topicRoute.delete('/:topicId', existsMiddleware.topicExists, topicController.httpDeleteTopic)

module.exports = topicRoute