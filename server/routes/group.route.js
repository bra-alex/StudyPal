const express = require('express')

const { groupExists } = require('../middlewares/exists')
const { deleteGroup } = require('../middlewares/isAuthorised')
const isAuthenticated = require('../middlewares/isAuthenticated')
const groupController = require('../controllers/group.controller')

const groupRoute = express.Router()

groupRoute.get('/groups', isAuthenticated, groupController.httpGetAllGroups)
groupRoute.get('/group/:groupId', isAuthenticated, groupExists, groupController.httpGetGroup)

groupRoute.post('/group', isAuthenticated, groupController.httpCreateGroup)
groupRoute.delete('/group/:groupId', isAuthenticated, groupExists, deleteGroup, groupController.httpDeleteGroup)

groupRoute.get('/group/:groupId/messages', isAuthenticated, groupExists, groupController.httpGetGroupMessages)
groupRoute.post('/group/:groupId/message', isAuthenticated, groupExists, groupController.httpCreateGroupMessage)

module.exports = groupRoute