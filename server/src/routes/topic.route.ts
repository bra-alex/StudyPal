import express from 'express'

import { topicExists } from '../middleware/exists'
import validateInput from '../middleware/validateInput'
import { deleteTopic } from '../middleware/isAuthorised'
import {
  createTopicSchema,
  deleteTopicSchema,
  getTopicSchema,
} from '../schema/topics/topics.schema'

import {
  httpFetchAllTopics,
  httpFetchTopic,
  httpCreateTopic,
  httpDeleteTopic,
} from '../controllers/topic.controller'

const topicRoute = express.Router()

topicRoute.get('/', httpFetchAllTopics)
topicRoute.get('/:topicId', validateInput(getTopicSchema), topicExists, httpFetchTopic)

topicRoute.post('/', validateInput(createTopicSchema), httpCreateTopic)
topicRoute.delete(
  '/:topicId',
  validateInput(deleteTopicSchema),
  topicExists,
  deleteTopic,
  httpDeleteTopic,
)

export default topicRoute
