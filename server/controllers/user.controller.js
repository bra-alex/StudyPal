const fs = require('fs')

const { messagesNamespace } = require('../sockets')
const userModel = require('../models/users/users.model')
const messagesModel = require('../models/users/messages/messages.model')
const { deleteFile, deleteFolder } = require('../util/deleteFromStorage')

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
        const uid = req.uid
        const name = req.body.name
        const username = req.body.username
        const email = req.body.email
        const profileImageUrl = req.file.path

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
        if (!e.status) {
            e.status = 500
        }
        next(e)
    }
}

async function httpCreateMessage(req, res, next) {
    const messageNamespace = messagesNamespace().messagesNamespace
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

        messageNamespace.to(recipient.uid).emit('message', newMessage)

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
        let profileImageUrl = res.user.profileImageUrl

        if (req.file) {
            profileImageUrl = req.file.path
        }

        const userDetails = {
            uid,
            name,
            username,
            email,
            profileImageUrl
        }

        await userModel.updateUser(userDetails)

        if (req.file) {
            deleteFile(res.user.profileImageUrl)
        }

        res.status(200).json(userDetails)
    } catch (e) {
        if (!e.status) {
            e.status = 400
        }
        next(e)
    }
}

async function httpDeleteUser(req, res, next) {
    try {
        deleteFolder(`uploads/users/${res.user.uid}`)
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