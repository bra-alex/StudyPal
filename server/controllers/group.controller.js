const groupModel = require('../models/groups/groups.model')

async function httpGetAllGroups(req, res, next) {
    try {
        const groups = await groupModel.getAllGroups()

        res.status(200).json(groups)
    } catch (e) {
        next(e)
    }
}

async function httpGetGroup(req, res, next) {
    try {
        const group = await groupModel.getGroup(res.groupId)

        res.status(200).json(group)
    } catch (e) {
        next(e)
    }
}

async function httpCreateGroup(req, res, next) {
    try {
        const groupDetails = req.body

        const createdGroup = groupModel.createGroup(groupDetails)

        res.status.json(createdGroup)
    } catch (e) {
        next(e)
    }
}

async function httpDeleteGroup(req, res, next) {
    try {
        await groupModel.deleteGroup(res.groupId)

    } catch (e) {
        next(e)
    }
}

module.exports = {
    httpGetGroup,
    httpCreateGroup,
    httpDeleteGroup,
    httpGetAllGroups
}