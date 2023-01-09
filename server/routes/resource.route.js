const express = require('express')

const { resourceExists } = require('../middlewares/exists')
const resourceController = require('../controllers/resource.controller')

const resourceRoute = express.Router()

resourceRoute.get('/resources/', resourceController.httpGetAllResources)
resourceRoute.get('/resource/:resourceId', resourceExists, resourceController.httpGetResource)

resourceRoute.post('/resource/', resourceController.httpCreateResource)
resourceRoute.delete('/resource/:resourceId', resourceExists, resourceController.httpDeleteResource)

module.exports = resourceRoute