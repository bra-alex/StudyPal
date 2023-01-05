const express = require('express')

const topicController = require('../controllers/topic.controller')

const topicRoute = express.Router()

topicRoute.get('/', topicController.httpFetchAllTopics)
topicRoute.get('/:topicId', topicController.httpFetchTopic)

topicRoute.post('/', topicController.httpCreateTopic)
topicRoute.delete('/:topicId', topicController.httpDeleteTopic)

module.exports = topicRoute