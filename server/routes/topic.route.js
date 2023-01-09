const express = require('express')

const { topicExists } = require('../middlewares/exists')
const topicController = require('../controllers/topic.controller')

const topicRoute = express.Router()

topicRoute.get('/', topicController.httpFetchAllTopics)
topicRoute.get('/:topicId', topicExists, topicController.httpFetchTopic)

topicRoute.post('/', topicController.httpCreateTopic)
topicRoute.delete('/:topicId', topicExists, topicController.httpDeleteTopic)

module.exports = topicRoute