require('dotenv').config()
const jwt = require('jsonwebtoken')

const userModel = require('../models/users/users.model')

const { encryptPassword, decryptPassword } = require('../util/password')

async function signUp(req, res, next) {
    try {
        console.log(req.body);
        const uid = req.uid
        const name = req.body.name
        const username = req.body.username
        const email = req.body.email
        const profileImageUrl = req.file.path
        const password = await encryptPassword(req.body.password)
        console.log(username)
        console.log(email)

        const userDetails = {
            uid,
            name,
            username,
            email,
            password,
            profileImageUrl,
            posts: []
        }

        const createdUser = await userModel.createUser(userDetails)

        const token = jwt.sign({
            userId: createdUser._id.toString(),
            userUID: createdUser.uid
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.status(201).json({
            message: 'User Created',
            userId: createdUser.uid,
            token
        })
    } catch (e) {
        if (!e.status) {
            e.status = 500
        }
        next(e)
    }
}

async function login(req, res, next) {
    try {
        const user = res.user
        const password = req.body.password

        const isEqual = await decryptPassword(password, user.password)

        if (!isEqual) {
            const e = new Error('Invalid email or password')
            e.status = 400
            throw e
        }

        const token = jwt.sign({
            userId: user._id.toString(),
            userUID: user.uid
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.status(200).json({
            message: 'Logged in successfully',
            userId: user.uid,
            token,
        })
    } catch (e) {
        if (!e.status) {
            e.status = 500
        }
        next(e)
    }
}

async function logout(req, res, next) {
    try {
        const authHeader = req.headers["authorization"]
        jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to logout'
                })
            }

            res.status(200).json({
                message: 'Logged out'
            })
        })
    } catch (e) {
        if (!e.status) {
            e.status = 500
        }
        next(e)
    }
}

module.exports = {
    signUp,
    login,
    logout
}