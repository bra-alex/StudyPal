const userModel = require('../models/users/users.model')
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
        const user = await userModel.getUser(res.uid)

        res.status(200).json(user)
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

async function httpUpdateUser(req, res, next) {
    try {
        const uid = res.uid
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
        await userModel.deleteUser(res.uid)

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
}