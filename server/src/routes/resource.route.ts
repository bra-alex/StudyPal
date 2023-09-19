import multer from 'multer'
import express from 'express'

import { resourceExists } from '../middleware/exists'
import { resourceStorage } from '../util/multer.config'
import validateInput from '../middleware/validateInput'
import { deleteResource } from '../middleware/isAuthorised'

import {
  httpGetAllResources,
  httpGetResource,
  httpCreateResource,
  httpDeleteResource,
} from '../controllers/resource.controller'

import {
  createResourceSchema,
  deleteResourceSchema,
  getResourceSchema,
} from '../schema/resources/resources.schema'

const resourceRoute = express.Router()

resourceRoute.get('/', httpGetAllResources)
resourceRoute.get('/:resourceId', validateInput(getResourceSchema), resourceExists, httpGetResource)

resourceRoute.post(
  '/',
  multer({ storage: resourceStorage }).single('file'),
  validateInput(createResourceSchema),
  httpCreateResource,
)
resourceRoute.delete(
  '/:resourceId',
  validateInput(deleteResourceSchema),
  resourceExists,
  deleteResource,
  httpDeleteResource,
)

export default resourceRoute
