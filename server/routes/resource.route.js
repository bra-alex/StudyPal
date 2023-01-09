const express = require('express')

const existsMiddleware = require('../middlewares/exists')
const resourceController = require('../controllers/resource.controller')

const resourceRoute = express.Router()

resourceRoute.get('', resourceController.httpGetAllResources)
resourceRoute.get('/:resourceId', existsMiddleware.resourceExists, resourceController.httpGetResource)

resourceRoute.post('', resourceController.httpCreateResource)
resourceRoute.delete('/:resourceId', existsMiddleware.resourceExists, resourceController.httpDeleteResource)

module.exports = resourceRoute