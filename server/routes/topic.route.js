const express = require('express')

const { topicExists } = require('../middlewares/exists')
const topicController = require('../controllers/topic.controller')

const topicRoute = express.Router()

topicRoute.get('/topics', topicController.httpFetchAllTopics)
topicRoute.get('/topic/:topicId', topicExists, topicController.httpFetchTopic)

topicRoute.post('/topic/', topicController.httpCreateTopic)
topicRoute.delete('/topic/:topicId', topicExists, topicController.httpDeleteTopic)

module.exports = topicRoute