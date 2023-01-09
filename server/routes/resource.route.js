const express = require('express')

const { resourceExists } = require('../middlewares/exists')
const resourceController = require('../controllers/resource.controller')

const resourceRoute = express.Router()

resourceRoute.get('', resourceController.httpGetAllResources)
resourceRoute.get('/:resourceId', resourceExists, resourceController.httpGetResource)

resourceRoute.post('', resourceController.httpCreateResource)
resourceRoute.delete('/:resourceId', resourceExists, resourceController.httpDeleteResource)

module.exports = resourceRoute