const express = require('express')

const resourceController = require('../controllers/resource.controller')

const resourceRoute = express.Router()

resourceRoute.get('', resourceController.httpGetAllResources)
resourceRoute.get('/:resourceId', resourceController.httpGetResource)

resourceRoute.post('', resourceController.httpCreateResource)
resourceRoute.delete('/:resourceId', resourceController.httpDeleteResource)