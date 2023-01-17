const express = require('express')

const { topicExists } = require('../middlewares/exists')
const isAuthenticated = require('../middlewares/isAuthenticated')
const { deleteTopic } = require('../middlewares/isAuthorised')
const topicController = require('../controllers/topic.controller')

const topicRoute = express.Router()

topicRoute.get('/topics', isAuthenticated, topicController.httpFetchAllTopics)
topicRoute.get('/topic/:topicId', isAuthenticated, topicExists, topicController.httpFetchTopic)

topicRoute.post('/topic/', isAuthenticated, topicController.httpCreateTopic)
topicRoute.delete('/topic/:topicId', isAuthenticated, topicExists, deleteTopic, topicController.httpDeleteTopic)

module.exports = topicRoute