const userModel = require('../models/users/users.model')
const messagesModel = require('../models/users/messages/messages.model')
const uuid = require('uuid')

async function httpGetAllUsers(req, res, next) {
    try {
        const users = await userModel.getAllUsers()

        res.status(200).json(users)
    } catch (e) {
        next(e)
    }
}

async function httpGetUser(req, res, next) {
    try {
        res.status(200).json(res.user)
    } catch (e) {
        next(e)
    }
}

async function httpGetUserMessages(req, res, next) {
    try {
        const messages = await userModel.getUserMessages(res.user.uid)

        res.status(200).json(messages)
    } catch (e) {
        next(e)
    }
}

async function httpCreateUser(req, res, next) {
    try {
        const uid = uuid.v4()
        const name = req.body.name
        const username = req.body.username
        const email = req.body.email
        const profileImageUrl = req.body.profileImageUrl

        const userDetails = {
            uid,
            name,
            username,
            email,
            profileImageUrl,
            posts: []
        }

        const createdUser = await userModel.createUser(userDetails)

        res.status(201).json(createdUser)
    } catch (e) {
        e.status = 500
        next(e)
    }
}

async function httpCreateMessage(req, res, next) {
    try {
        const message = {
            sender: req.body.sender,
            recipient: req.body.recipient,
            message: req.body.message,
            date: req.body.date
        }

        const newMessage = await messagesModel.createMessage(message)

        const sender = await userModel.getUserById(message.sender)
        const recipient = await userModel.getUserById(message.recipient)

        if (sender.messages.length === 0) {
            sender.messages = [newMessage.userMessage._id]
            await sender.save()
        }

        if (recipient.messages.length === 0) {
            recipient.messages = [newMessage.recipientMessage._id]
            await recipient.save()
        }

        res.status(201).json(newMessage)

    } catch (e) {
        if (!e.status) {
            e.status = 400
        }
        next(e)
    }
}

async function httpUpdateUser(req, res, next) {
    try {
        const uid = res.user.uid
        const name = req.body.name
        const username = req.body.username
        const email = req.body.email
        const profileImageUrl = req.body.profileImageUrl

        const userDetails = {
            uid,
            name,
            username,
            email,
            profileImageUrl
        }

        const createdUser = await userModel.updateUser(userDetails)

        res.status(200).json(createdUser)
    } catch (e) {
        next(e)
    }
}

async function httpDeleteUser(req, res, next) {
    try {
        await userModel.deleteUser(res.user.uid)

        res.status(201).json({
            message: 'User Deleted'
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    httpGetUser,
    httpCreateUser,
    httpUpdateUser,
    httpDeleteUser,
    httpGetAllUsers,
    httpCreateMessage,
    httpGetUserMessages
}