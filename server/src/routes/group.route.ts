import express from 'express'

import { groupExists } from '../middleware/exists'
import validateInput from '../middleware/validateInput'
import { deleteGroup } from '../middleware/isAuthorised'

import {
  httpGetAllGroups,
  httpGetGroup,
  httpCreateGroup,
  httpDeleteGroup,
  httpGetGroupMessages,
  httpCreateGroupMessage,
} from '../controllers/group.controller'

import {
  createGroupSchema,
  deleteGroupSchema,
  getGroupSchema,
} from '../schema/groups/groups.schema'

import {
  createGroupMessageSchema,
  getGroupMessagesSchema,
} from '../schema/groups/groupMessages.schema'

const groupRoute = express.Router()

groupRoute.get('/', httpGetAllGroups)
groupRoute.get('/:groupId', validateInput(getGroupSchema), groupExists, httpGetGroup)

groupRoute.post('/', validateInput(createGroupSchema), httpCreateGroup)
groupRoute.delete(
  '/:groupId',
  validateInput(deleteGroupSchema),
  groupExists,
  deleteGroup,
  httpDeleteGroup,
)

groupRoute.get(
  '/:groupId/messages',
  validateInput(getGroupMessagesSchema),
  groupExists,
  httpGetGroupMessages,
)
groupRoute.post(
  '/:groupId/messages',
  validateInput(createGroupMessageSchema),
  groupExists,
  httpCreateGroupMessage,
)

export default groupRoute
