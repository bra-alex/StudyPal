const express = require('express')

const { groupExists } = require('../middlewares/exists')
const groupController = require('../controllers/group.controller')

const groupRoute = express.Router()

groupRoute.get('/groups', groupController.httpGetAllGroups)
groupRoute.get('/group/:groupId', groupExists, groupController.httpGetGroup)

groupRoute.post('/group', groupController.httpCreateGroup)
groupRoute.delete('/group/:groupId', groupExists, groupController.httpDeleteGroup)

module.exports = groupRoute