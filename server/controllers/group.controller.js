const groupModel = require('../models/groups/groups.model')
const groupMessagesModel = require('../models/groups/group-messages/groupMessages.model')

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
        res.status(200).json(res.group)
    } catch (e) {
        next(e)
    }
}

async function httpGetGroupMessages(req, res, next) {
    try {
        const groupMessages = await groupModel.getGroupMessages(res.group._id)

        res.status(200).json(groupMessages)
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

async function httpCreateGroupMessage(req, res, next) {
    try {
        let groupMessages;
        const message = req.body

        const existingGroupMessages = await groupMessagesModel.getMessageById(res.group.messages)

        if (!existingGroupMessages) {
            groupMessages = await groupMessagesModel.createMessage(message)
        } else {
            groupMessages = await groupMessagesModel.updateMessages(existingGroupMessages, message)
        }

        if (!res.group.messages) {
            res.group.messages = groupMessages._id
            await res.group.save()
        }

        res.status(201).json(groupMessages)
    } catch (e) {
        e.status = 400
        next(e)
    }
}

async function httpDeleteGroup(req, res, next) {
    try {
        await groupModel.deleteGroup(res.group._id)

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
    httpGetAllGroups,
    httpGetGroupMessages,
    httpCreateGroupMessage
}