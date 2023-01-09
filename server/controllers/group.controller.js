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

        const createdGroup = await groupModel.createGroup(groupDetails)

        res.status(201).json(createdGroup)
    } catch (e) {
        e.status = 400
        next(e)
    }
}

async function httpDeleteGroup(req, res, next) {
    try {
        await groupModel.deleteGroup(res.groupId)

        res.status(200).json({
            message: 'Group Deleted'
        })
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