const express = require('express')

const { groupExists } = require('../middlewares/exists')
const groupController = require('../controllers/group.controller')

const groupRoute = express.Router()

groupRoute.get('/groups', groupController.httpGetAllGroups)
groupRoute.get('/group/:groupId', groupExists, groupController.httpGetGroup)

groupRoute.post('/group', groupController.httpCreateGroup)
groupRoute.delete('/group/:groupId', groupExists, groupController.httpDeleteGroup)

groupRoute.get('/group/:groupId/messages', groupExists, groupController.httpGetGroupMessages)
groupRoute.post('/group/:groupId/message', groupExists, groupController.httpCreateGroupMessage)

module.exports = groupRoute