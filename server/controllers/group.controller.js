const { groupsNamespace } = require('../sockets')
const User = require('../models/users/users.mongo')
const groupModel = require('../models/groups/groups.model')
const groupMessagesModel = require('../models/groups/group-messages/groupMessages.model')

let groupNamespace

async function httpGetAllGroups(req, res, next) {
    try {
        let groups = await groupModel.getAllGroups()

        groups = groups.filter(g => g.isPublic === true || g.members.includes(req.userId))

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
    groupNamespace = groupsNamespace().groupsNamespace
    try {
        const groupDetails = req.body

        const createdGroup = await groupModel.createGroup(groupDetails)

        createdGroup.members.forEach(async (member) => {
            const user = await User.findById(member)
            groupNamespace.to(user.uid).emit('group', {
                action: 'create',
                group: createdGroup
            })
        })

        res.status(201).json(createdGroup)
    } catch (e) {
        if (!e.status) {
            e.status = 400
        }
        next(e)
    }
}

async function httpCreateGroupMessage(req, res, next) {
    groupNamespace = groupsNamespace().groupsNamespace
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

        res.group.members.forEach(async (member) => {
            if (member._id.toString() !== message.sender) {
                const user = await User.findById(member)
                groupNamespace.to(user.uid).emit('message', groupMessages)
            }
        })

        res.status(201).json(groupMessages)
    } catch (e) {
        if (!e.status) {
            e.status = 400
        }
        next(e)
    }
}

async function httpDeleteGroup(req, res, next) {
    groupNamespace = groupsNamespace().groupsNamespace
    try {
        await groupModel.deleteGroup(res.group._id)

        res.group.members.forEach(async (member) => {
            const user = await User.findById(member)
            groupNamespace.to(user.uid).emit('group', {
                action: 'delete',
                group: res.group._id
            })
        })

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